---
layout: post
title:  "Making Web App Fullscreen"
date:   2017-01-02
tags:   
    - Web Fundamental
---

Google developer has a very good [post](https://developers.google.com/web/fundamentals/native-hardware/fullscreen/) about how to make a web app fullscreen. Long story short, only iOS Safari doesn't have a fullscreen API, and we can use `element.requestFullscreen()` (if prefixed) in all other modern browsers.

We can launch a fullscreen web app from home screen on iOS with the help of meta tag `<meta name="apple-mobile-web-app-capable" content="yes">`. One annoying thing is that because after iOS6, all home screen web app run in a sandbox other than Safari, the session cannot be kept. See this [Stack Overflow post](http://stackoverflow.com/questions/7077518/ios-full-screen-web-app-drops-cookies) for solutions.

TO BE CONTINUED...

