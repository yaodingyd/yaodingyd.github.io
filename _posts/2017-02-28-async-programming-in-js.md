---
layout: post
title:  "Async Programming in JavaScript"
date:   2017-02-21
tags:   
    - Node
---

### Promises vs Event-based Architecture

There is a wonderful [post](https://gist.github.com/dmvaldman/12a7e46be6c3097aae31) explaining what's the relationship between these two. Basically we can treat `Promise` as a simple pattern over `EventEmitter` that only `resolve` once, which means `emit` just one `fulfill` or `reject`. They all depend on `event loop`.

### Function Queue

I wondered how is `next` working in connect, and 

```JavaScript
var middlewares = [
  function fun1(req, res, next) {
    parseBody(req, function(err, body) {
      if (err) return next(err);
      req.body = body;
      next();
    });
  },

  function fun2(req, res, next) {
    checkIdInDatabase(req.body.id, function(err, rows) {
      if (err) return next(err);
      res.dbResult = rows;
      next();
    });
  },

  function fun3(req, res, next) {
    if (res.dbResult && res.dbResult.length > 0) {
      res.end('true');
    }
    else {
      res.end('false');
    }
    next();
  }
]

function requestHandler(req, res) {
  var i=0;

  function next(err) {

    if (err) {
      return res.end('error:', err.toString());
    }

    if (i<middlewares.length) {
      middlewares[i++](req, res, next);
    } else {
      return ;
    }
  }

  next();
}

```

And this is all the `middleware` works. And that's why we need to add `next` to our middleware at the end. `use` is essentially added middlewares to our function queue, and we can also add a `setTimeout` or `process.nextTick` to calling the middleware function, to ensure event loop handle it correctly.