---
layout: post
title:  "Passport Authentication with JWT and Facebook-login"
date:   2017-02-21
tags:   
    - Node
---

JSON Web Token(JWT)s are usually stored in localStorage and do authentication for SPAs. With JWT, when using Passport to do authentication, we don't have to use session because JWT is stateless. 

The node implementation is `jsonwebtoken`. We use `jsonwebtoken` to sign a token, which should be sent back to client side, and SPA would store it in localStorage. Express uses middleware `express-jwt` to validation JWT.

For example, if we use `passport-local` stragey, so 

```javascript
// login stragey
import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt-nodejs'
import dbConnection from '../dbConnection'
import jwt from 'jsonwebtoken'

const login = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  dbConnection.Auth().findOne({ email: email.trim() }, (err, user) => {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { message: 'Email not found in our database.' })
    }
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) return done(err)
      if (isMatch) {
        const payload = {
          sub: user._id
        }
        const token = jwt.sign(payload, 'just another secret');
        const data = {
          username: user.email,
          id: user._id,
          id_token: token,
          is_Admin: user.isAdmin
        }
        return done(null, data)
      }
      return done(null, false, {message: 'Incorrect password'})
    });
  })

})

export default login
```


```javascript
//signup stragey
import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt-nodejs'
import dbConnection from '../dbConnection'
import jwt from 'jsonwebtoken'

const signup = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const user = {
    email: email.trim(),
    password: password.trim()
  }

  dbConnection.Auth().findOne({ email: user.email }, (err, existingUser) => {
    if (existingUser) {
      return done(null, false, { message: 'This email is already registered. Please choose a different email address.' })
    } else {
        bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, null, (err, hash) => {
          if (err) return next(err)
          user.password = hash
          dbConnection.Auth().insertOne({
            email: user.email,
            password: user.password
          }, (err, newUser) => {
            if (err) console.log(err)
            const payload = {
              sub: newUser._id
            }
            const token = jwt.sign(payload, 'just another secret');
            const data = {
              username: user.email,
              id: newUser['ops'][0]['_id'],
              id_token: token
            }
            return done(null, data)
          })
        })
      })
    }
  })

})

export default signup
```

so in server.js, we would have 

```javascript
passport.use('local-signup', signup);
passport.use('local-login', login);
passport.use('facebook-login', facebook);

app.post('/signup', (req, res)=> {
  passport.authenticate('local-signup', {session: false}, (err, user, info) => {
    if (err) {
      res.status(500).json({
        message: err
      })
    } else if (!user) {
      res.status(400).json(info);
    } else {
      res.json(user);
    }
  })(req, res)
})

app.post('/login', (req, res)=> {
  passport.authenticate('local-login', {session: false}, (err, user, info) => {
    if (err) {
      res.status(500).json({
        message: err
      })
    } else if (!user) {
      res.status(400).json(info);
    } else {
      res.json(user);
    }
  })(req, res)

app.use(jwt({ secret: 'just another secret'}).unless({path: ['/login', '/signup',  '/', '/favicon.ico']}));

app.use(function(err, req, res, next) {
  if(401 == err.status) {
    res.redirect(401, '/login');
  }
});

```

And action-creator would do something like

```javascript
export const loginUser = (creds) => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds))
    return fetch(LOGIN_URL, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          localStorage.setItem('id_token', user.id_token)
          localStorage.setItem('username', user.username)
          localStorage.setItem('userId', user.id)
          dispatch(receiveLogin(user))
          browserHistory.push(`/browse`)
        }
      }).catch(err => console.log("Error: ", err))
  }
}
```

My understanding in this is that for a SPA, React-Redux framework for example, app would have two kinds of components: gated and ungated. Gated components would be the ones that requires user log in and display user data; ungated components would be index, login and signup pages. Gated components would have a entry point, since we cannot send JWT to directly get a route. But all API calls should be sent with JWT.

Persistent login is easy with JWT too. Just check if there is JWT stored in localStorage and send it back to authenticate it. So the index page would have something like this:

```javascript
// in a React component
componentDidMount () {
  if (localStorage.getItem('token') !== null) {
    let config = {
      method: 'get',
      headers: { 'Authorization': 'bear ' + localStorage.getItem('token')}
    }
    
    fetch(AUTH_URL, response => {
      if (response.status === '401') {
        // authentication fails. Clear token
        localStorage.clear()
      } else {
        // Succeed! Go to account page
        browserHistory.push('/account')
      }
    })
}
```

Passport have Facebook login stragegy too. The tricky part is how to get generated JWT. This is what I did:

```javascript
// in server.js, send tokens in query string
app.get('/auth/facebook', passport.authenticate('facebook-login'));
app.get('/auth/facebook/callback', (req, res)=> {
  passport.authenticate('facebook-login', {session: false}, (err, user, info) => {
    if (err) {
      res.redirect('/login');
    } else if (!user) {
      res.status(400).json(info);
    } else {
      res.redirect(`/login?id_token=${user.id_token}&username=${user.username}&id=${user.id}`);
    }
  })(req, res)
})

```

And in login component,

```javascript

componentDidMount = () => {
    if (typeof getParameterByName('id_token') === 'string') {
      let id_token = getParameterByName('id_token')
      let username = getParameterByName('username')
      let id = getParameterByName('id')
      this.props.fbLogin({
        id_token,
        username,
        id
      })
    }
    // fbLogin would dispatch an action that log user in and store all the credentials in localStorage

    function getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}

```

#### References
1. [https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/](https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/)
2. [https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt](https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt)