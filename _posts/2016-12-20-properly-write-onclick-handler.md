---
layout: post
title:  "Properly Write Onclick Handler"
date:   2016-12-20
tags:   
    - Web Fundamental
---

When I write Angular, Vue and React, I often come to write an event handler for a element, and since these all use declaritive templates, the event handler would actually be in the HTML(JSX for React).

For Angular 1.x,

`<div ng-click="myFunction()"></div>`

For Vue,

`<div @click="myFunction()"></div>`

For React,

`<div onClick="myFunction" />`

And last, HTML

`<div onclick="myFunction()"></div>`

Notice any differences?

Any inline JavaScript in HTML would be an express to be run. So when this div is clicked, `myFunction()` will be run.

But for JSX, since it's JavaScript compiling to HTML, a `myFunction()` would execute this function and the returned result will be assigned to `onclick`(Rember, `onClick` is a React synthetic event handler).

So for Vue and Angular, it would follow HTML convention and have parenthesis after function. What's better is for Vue, even if you omit parenthesis in string templates, Vue would handle it for you.

### More for Angular

If we want to bind the function as "express" or "callback" using `&`, we have to use  `myFunction()` to finish the call. Also, the function invocation should follow its defined parameter behaviors, so if the function is defined in the controller like `myFunction = function(value, index){}`, in your directive call, it should also be like `some-attr="myFunction(value1, index1)"`, otherwise Angular would give you an error. However, if you would like bind funciton using `=`, then you don't have do invoke function in the attribute. Actually it would have some side effects if you do. So pay attention to the binding types of the function.

(One more reason to not use Angular anymore, I guess)






