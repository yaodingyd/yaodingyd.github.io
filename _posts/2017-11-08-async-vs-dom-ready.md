---
layout: post
title:  "Async vs DOMContentLoaded"
date:   2017-11-08
tags:   
    - Web Fundamental
---

The different ways of "wait for" script to loading can be tricky.

### Async

`async` attribute makes executing the script asynchronously, that means parsing DOM and running the script at almost the same time. But be care when putting global scripts inside `async` and calling other dependent script inside a `DOMContentLoaded`: the latter might fire before the former.

I did a test with this situation: I have a script tag in `header`, and a `async` script in `body`, something like this:

```html
  <head>
    <script src="domready.js"></script>
  </head>
  <body>
    <script async src="async.js"></script>
  </body>
```

It turns out the domready fires before async. But if there are a certain amount of DOM node under `async` script, async fires first

```html
  <head>
    <script src="domready.js"></script>
  </head>
  <body>
    <script async src="async.js"></script>
    <div>blah</div>
    <!-->and more blah div under...<-->
  </body>
```

I did more test and roughly around 3k `div` would make async fires before `DOMContentLoaded`

### Defer

Since we are talking about this, I will throw `defer` here too, but it is pretty clear, according to MDN:
>This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing `DOMContentLoaded`. 

So it is certain that `defer` fires before `DOMContentLoaded`



