---
layout: post
title:  "Concurrent Logins Limit Implementation in PHP"
date:   2016-12-05
tag:    
    - PHP
---

Many times a web app would have a feature that limit how many simultaneous logins could one account have. This and the 'Remember me' implementation would be the most important part in session management for a web app.

The user authenticaion with long-time persistance solution is very well explained at [this post](https://paragonie.com/blog/2015/04/secure-authentication-php-with-long-term-persistence). To sum it up, when a user tries to login, a unique token associated with this user's identification is stored in both database and cookie. Cookie would have a persistant period. During this period, if user revisits the sites, backend would do a match between cookie's token and databases. If there is a match, then relog user in. Token should be encrypted.

The PHP code looks something like this:

```php
<? php
//login part
if (isset($_POST['remember']) && $_POST['remember'] != NULL) { // we only use cookie if remember me is checked
    setcookie('id', $user['id'], time() + (86400 * 7), "/");
    $plaintext_token = mcrypt_create_iv(10, MCRYPT_DEV_URANDOM); 
    $hashed_token = hash('sha256', $plaintext_token); 
    setcookie('token', $plaintext_token, time() + (86400 * 7), "/");
    $stmt = $pdo->prepare("INSERT INTO token(id, token) VALUES (?, ?)");
    $stmt->execute([$user['id'], $hashed_token]);                   
}

//relogin part
$relogged_in = FALSE;
if (!isset($_SESSION['id']) && isset($_COOKIE['id']) && isset($_COOKIE['token'])) {
    $stmt = $pdo->prepare("SELECT token FROM token WHERE uid = ?");
    $stmt->execute([$_COOKIE['id']]);
    $data = $stmt->fetchAll(PDO::FETCH_COLUMN);
    //because user could have logged in multiple devices, so in database there could be multipl entries of the same user 
    //record. We need iterate through all records and find a match. If there are no match, then relog-in fails.
    if ($data) {
        foreach ($data as $value) {
            if (hash_equals($value, hash('sha256', $_COOKIE['token']))) {
                //if there is a match, we need update token.
            }
        }
    }
}
//if relog in fails, clear cookie
if (!$relogged_in) {
    setcookie('uid', "", time() - 3600);
    setcookie('token', "", time() - 3600);
}
?>
``` 

For concurrent logins limit implementation, the big idea is:

1. In database, each token is associated with it's session id and active time-stamp, denoted as last_seen. Each request will update last_seen.
2. Whenever a request is made, it checks if it's an active session(for example, by check $_SESSION['id'],because sometimes the first ting for start a session is to set $_SESSION['uid']).
    2.1. If so, get token record with session id.
    
        2.1.1  If no records, that means this session is destroyed because user logged in other devices and reaches his maximum logins, so unset this session. *redirect to login page*.
        2.1.2  if there are records, *log user in, then enforce simultaneous logins limit*: get all token records with the same id, order by last_seen and check if it is a active record (time() - last_seen <= session_timeout)
            2.1.2.1 If it is a active record, current records increments by one. If current records sum is less than max login limit, then pass;
            2.1.2.2 If it is a active record and current records sum is more than max login limit, then delete this record;
            2.1.2.3 If it is not a active record, then pass.
    2.2 If not, then check cookie for token and id
        2.2.1 If so, get all token records with the same id and see if there is a matched token
            2.2.1.1 If so, *log user in and update token and session id*;
            2.2.1.2 if not, delete cookie because token is not valid any more, and ot, *redirect to login page*.
        2.2.2 If not, *redirect to login page*.
3. When a user logs in,
    3.1 If 'remember me' is not checked, store token with session id and last_seen in database. Set cookie only for token, and it expires in a short time period.
    3.2 If 'remember me' is checked, store token with session id and last_seen in database. Set cookie for token and it, and they expire in a long time period.
4. Whenever a user logs out, clear cookie, and delete the token entry.


For a acurate last_seen, we also need to implement our own session timeout. [This stack overflow thread](http://stackoverflow.com/questions/520237/how-do-i-expire-a-php-session-after-30-minutes) is pretty good.

 
