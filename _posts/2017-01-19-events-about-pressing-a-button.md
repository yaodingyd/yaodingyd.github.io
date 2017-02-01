---
layout: post
title:  "Events About Pressing A Button"
date:   2017-01-19
tags:   
    - Web Fundamental
---

Recently I had simple task turned out to be not that simple. My goal is to write a input mask for SSN, and I use `keydown` and `keyup` event to do my magic. Here comes the problem: in (some, or all) Android devices, `keydown` and `keyup` event returns `keycode` all as `229`, which essentially breaks my function.

There are several events fired after a button is pressed. (in Chrome)

1. `keydown` is triggered first and we have `event.keyCode`.
2. `keypress` is triggered after and I'm not very fond of this event after all.
3. `textInput` is triggered. This event is available in Chrome and IE 9+.
4. At this point the input will have value.
5. `input` is triggered. `event.target.value` would have input's value.
6. `keyup` is triggered at last and we still have `event.keyCode`.

So for  Android devices, `keypress` event may or may not fire and `keyup`, `keydown` would not give you correct `keyCode`. [Bottomline, the problem is the predictive text functionality](https://github.com/RobinHerbots/Inputmask/blob/3.x/README_android.md) and see this post for more info.


##### 2/1/2017 Update 

Now webkit has a post on `Input` event [here](https://webkit.org/blog/7358/enhanced-editing-with-input-events/).

