---
layout: post
title:  "What does sumbit do"
date:   2016-10-20
---
### What Is It
Sumbit is a native function of form element. So if you want to use sumbit funciton, there must be a form first.

When `submit` is called, form data uses `GET` or `POST`, depending on your method, to send back to server. It either refresh your page or go to another url. 

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