---
layout: post
title:  "Events About Pressing A Button"
date:   2017-01-19
tags:   
    - Web Fundamental
---

Events About Pressing A Button

### Problem

Recently I had simple task turned out to be not that simple. My goal is to write a input mask for SSN, and I use `keydown` and `keyup` event to do my magic. Here comes the problem: in (some, or all) Android devices, `keydown` and `keyup` event returns `keycode` all as `229`, which essentially breaks my function.

### Background

There are several events fired after a button is pressed. (in Chrome)

1. `keydown` is triggered with `event.keyCode`.
2. `keypress` is triggered with `event.keyCode`.
3. `textInput` is triggered. This event is available in Chrome and IE 9+.
4. At this point the input will have value.
5. `input` is triggered. `event.target.value` would have input's value.
6. `keyup` is triggered at last with `event.keyCode`.

In particular, keyCode on `keypress` events is usually redundant and shouldn't be used (except in old IE, which I don't care). It would returns a different keycode from `keyup` and `keydown` for alphabet.

Generally, use `keydown` for keycode, use `keypress` for event.

### Why
[Bottomline, the problem is the predictive text functionality](https://github.com/RobinHerbots/Inputmask/blob/3.x/README_android.md). Because my Android phone has predictive typing by default, so I got `229` for all my input. But if I disable predictive typing, `keydown` and `keyup` would behave normal. 

`input` event would also be the predictive text instead of single characters.

They way to disable predictive typing is to use `password` as input type. But we need a "display input" to sit above the hidden input and it can get complicated for actually code. 

The new `inputmode` in HTML5 would potentially save the day, but it is still in the future.


##### 2/1/2017 Update 

Now webkit has a post on `Input` event [here](https://webkit.org/blog/7358/enhanced-editing-with-input-events/).

