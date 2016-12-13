---
layout: post
title:  "Form and Submit"
date:   2016-10-20
tag:    
    - HTML 
    - Tip
---

### What Is Submit
Sumbit is a native function of form element. So if you want to use sumbit funciton, there must be a form first.

When `submit` is called, form data uses `GET` or `POST`, depending on your method, to send back to server. It either refresh your page or go to another url. 

When method is `GET`, it does the following:

>If the method is "get" and the action is an HTTP URI, the user agent takes the value of action, appends a `?' to it, then appends the form data set, encoded using the "application/x-www-form-urlencoded" content type.

The `GET` method would also implies that the query values have to come from the form values. So existing query string will be overwritten or deleted.

### How to Use It is HTML

```html
    <form onchange="submit()">
        <input>
    </form>

    <form>
        <input onchange="submit()">
    </form>

    <form>
        <input onchange="this.form.submit()">
    </form>
```

The last way is more semantic and easy to understand. But the second way is simpler, since it's in a form element, you can use `submit()` directly.

### The action attribute

`action` determines what to do with the submitted data. It uauslly is a script page, like `action="submit.php"` or `action="main.jsp"`. If there is no `action` or `action="#"`, it stays in the same page. 

### Enter in Form

Pressing `Enter` would default trigger `submit` event in form inputs. So be careful, user might submit accidentally.

### A mixed `GET` and `POST`

Sometimes I run into this kind of code:
```javascript
    $.ajax({
        type: "POST",
        url: "example.com?item1=test",
        data: {item2 : 'test'}
    });
```
Generally this is not a recommended practice that you have both `GET` and `POST`. But we can still get these request, for example, in PHP, `$_GET["item1"]` and `$_POST["item2"]` would work fine.

### Submit a form without HTML

This [thread](http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit) explains a way for doing this. The form has to be appended into DOM before it is submitted. This means that form is an inherently document-dependent entity, thus it makes more sense to use declarative forms in HTML to actually submit it.

There is also a standalone `FormData` object and can be used with `XMLHttpRequest`, in this way your `Content-Type` to be `multipart/form-data`, so you need extra parsing to do. This usually is used for submitting files.

The jQuery way of submitting form is:

```javascript
    var data = $('form').serialize();
    $.post('url', data);
```
