---
layout: post
title:  "Scheduling in React"
date:   2018-09-20
tags:   
    -  React
---

This is about the internal sheduling mechanism of React's `setState`, originated from this [Preact issue](https://github.com/developit/preact/issues/1137). It also applies for Vue's `nextTick`.

We all know React/Preact's `setState` is asynchronous, that it batches DOM events, so why not use `requestAnimationFrame` for its default implementation?

> requestAnimationFrame has too long a delay (compared to microtask)

`rAF` is only called at the beginning of a frame. Microtask could happen anytime during one frame, as long as no other JavaScript is mid-execution, so it could get called **after a callback**, or at the end of each task. 

> requestAnimationFrame is quite indeterministic

According to [https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model), any queued requestAnimationFrame callbacks should be executed before the next style recalculation/layout/paint. Currently Chrome and Firebox follow this spec, Safari and Edge do not.

There is a lengthy [thread](https://github.com/facebook/react/issues/11171) on why React doesn't use `rAF` to do render. The gist is: 

1. For interactive events (such as clicks), using `rAF` batching is not suitable. Because these events are usually intentional and can happen multiple times in a single frame, delaying all flushing until a rAF breaks React rendering model and developer expectations in cases where the value of event handler depends on the state, or when event handlers read the state. Thus we need to flush each of them at the end of each event.

2. Other effects can be deferred until later than next frame is suitable for a task to handle. React uses `requestIdleCallback`.

3. The above two strategy would satisfy most use cases. For animation-specific usage, provide a migration path to allow user to use `rAf` for rendering. So in preact we have `options.debounceRendering`.

This also applies to React's `setState` callback. We know that the callback will be called after component is updated, but again it could happen inside one frame, and when that happens, your expected animation would not happen.

When you want your `state` to change in different frames, the only working way I found out is nested `rAF`. 

Based on [requestAnimationFrame Scheduling For Nerds](https://medium.com/@paul_irish/requestanimationframe-scheduling-for-nerds-9c57f7438ef4)

> All rAF callbacks always run in the same or next frame of work Any rAFs queued in your event handlers will be executed in the ​same frame​. Any rAFs queued in a rAF will be executed in the next frame​. (Same for any queued within IntersectionObserver or ResizeObserver callbacks.)




