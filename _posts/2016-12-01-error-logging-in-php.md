---
layout: post
title:  "Error Logging in PHP"
date:   2016-12-01
tag:    PHP
---

Error logging can be tricky for PHP. The complete solution is:

In your php.ini

```
    display_errors = On
    error_reporting = E_ALL
```

In your `.htacess`

```
    # suppress PHP errors from displaying in the browser (or display it, whatever you want)
    php_flag display_startup_errors off
    php_flag display_errors off
    php_flag html_errors off

    # log PHP errors to a file
    php_flag log_errors on
    php_value error_reporting 32767
    php_value error_log "/path/to/file"
```    

The integer `32767` is used to denote `E_ALL`.

In your global.php( a util file that is invoked before anything else)

```php
    ini_set('display_errors', 1); 
    error_reporting(E_ALL);
```

### Pitfalls

The problem is that for once I think setting error logging in my global.php is enough. But this would only log runtime error, any parse error would result in a `500 internal error` that drives me cazy to find where I missed a semicolon. So for logging all errors, make sure you have set up `php.ini` or `.htacess` file.
