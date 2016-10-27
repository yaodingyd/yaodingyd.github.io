---
layout: post
title:  "Scrollbar And Window Width"
date:   2016-09-23
---

### Mac vs PC
In Mac, there is a system preference setting that hides scrollbar in browsers, so scrollbar does not take space. In IE, there is `-ms-overflow-style:-ms-autohiding-scrollbar` that does the same thing. But unfortunately for Chrome and Firefox on Windows, you cannot make the scrollbar not taking up space.

### jQuery(window).width() vs window.innerWidth
Since scrollbar can take up space or not, here comes the issue: it makes  `jQuery(window).width()` unreliable.
Also, you can get the horrible content shift when you open up a modal and set `overflow:hidden` on body.

Recently I took a lesson from this:   `jQuery(window).width()` returns different values for Chrome on Mac and on PC. It's because this method returns a computered width. This issue is fixed in the latest jQuery[this issue](https://github.com/jquery/jquery/issues/1729), but for 1.11, you still need to use `window.innerWidth` to get width with scrollbar.