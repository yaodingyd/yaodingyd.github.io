---
layout: post
title:  "Viewport Explained"
date:   2019-05-07
---

Today at work I run into a very werid issue: I have a `position:fixed; width: 100%` header, and it works perfectly fine when doing resize in desktop, but grows to 120% width when in device mode.

When an element is in fixed position, the measurement would be relative to viewport, so ideally `width: 100%` would be the same to `width: 100vw` right? Wrong! Well, most of time it is fine, unless when it's not. 

So we really need to talk about viewport. Already [so many good articles](https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts) have elaborated on this so I'll just cut to the chase: there are really two viewports, namely **layout viewport** and **visual viewport**. You can find more info [here](https://www.quirksmode.org/mobile/viewports2.html), *the tldr is*

> The *visual viewport* is the part of the page that’s currently shown on-screen. The user may scroll to change the part of the page he sees, or zoom to change the size of the visual viewport.

>However, the CSS layout, especially percentual widths, are calculated relative to the layout viewport, which is considerably wider than the visual viewport.

So it makes some sense now. The width is 100% relative to layout viewport, which is wider than the visual viewport. To check layout viewport, we can use `window.innerHeight` and `window.innerWidth`; to check visual viewport, we have `Visual Viewport API`. Since the layout viewport can be larger, sometime quite larger than the actual device size, under device mode the `window.innerWidth` could be much larger than `window.outerWidth`.

The last thing I want to mention is that for my case, using `vw` makes it work. Although I could not find any documentation on this, I feel like here `vw` is the visual viewport.







