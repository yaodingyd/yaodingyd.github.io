---
layout: post
title:  "From Jasmine-ajax to jQuery Ajax"
date:   2018-02-10
tags:   
    - jQuery
---

jQuery Ajax has gone through some very important changes over the years, and I have never found them until today with testing using Jasmine-ajax.

## Some background

I need to test some UI components from legacy codes in which view and model are tightly coupled. (I know I probably need to refactor them later). Anyway there is one big logic part where it sits before an Ajax call. Naturally I used jasmine-ajax, because the project uses jasmine, but I can never pass the tests. I looked up online and in jasmine's offcial guide, it uses `XMLHttpRequest`, and I was using jQuery 1.11's `$.ajax`, so I thought there must be something different in here, thus I opened a can of worms.

First of all, jasmine-ajax just hijacks the native `XMLHttpRequest`, so when we make a Ajax call, it would call the stubbed function as response. Setting up `XMLHttpRequest` and its response in native JavaScript are all synchronous code with no task involved at all, so no hard stuff in here.

Things start to get interesting with jQuery. With 1.11, `Deferred` is not `promise a+` compliant, so I thought it should pass, but it doesn't; while with 3.0+, `Deferred` is `promise a+` compliant, but with `$.ajax().done()` it works.

## Now why it that?

Because jQuery's `ajax` returns a `Deferred().promise` object, so I was saying it should match whether or not `Deferred` is compliant with `promise a+` implementation. To be compliant, `onFulfilled` and `onRejected`, or jQuery's `then`, `done`, and `fail`, should be called in a new context stack, which means it should be run in a task(`setTimeout`, or with micro-task `Mutation Observer`). But in jQuery 1.11, it is not implemented in this way. It uses jQuery's `Callbacks()`'s `add` function, which could run in synchronous manner. *BUT*, ajax's callback for `onreadystatechange` is wrapped in a `setTimeout`, so callback for `done` is still executed in next tick, so my tests would not pass.

With jQuery 3.0, `Deferred` changes to be compliant with `promise a+`, that means only `then` would return a `thenable` object, but not `done`, what a surprise! So `done` is still called in a synchronous way. Also `ajax`'s callback for `done` is registered on `onload` event too, which makes perfect sense: if the `XMLHttpRequest` is completed when it's set, `onreadystatechange` should be called immediately. So with jQuery 3.0+, `done` can be used, but not `then`.