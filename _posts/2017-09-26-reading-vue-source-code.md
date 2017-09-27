---
layout: post
title:  "Reading Vue's Source Code"
date:   2017-09-26
tags:   
    - Vue
---

A couples of notes when I read through Vue's source code.

## Naming convention

About Vue instance properties naming convention:
Any related to DOM would have a `$` prefix;
Any related to inner property, which user would not want to access at the first place would have a `-` prefix;
The rest of public properties and methods would have no prefixs.
All Vue instance methods/property would be extended on `Vue.prototype` and prefixed with a `$`

## Vue instantiation:

Each time instantiated with a new Vue instance, so we have the `new` keyword. Essentially `Vue` is a constructor function, inside it calls `vue._init` function to instantiate a new Vue instance. Vue uses `vm` as a reference (ViewModel)


## Observer

This whole `Observer` is already discussed in my other post. Vue uses `Observer` to make data reactive with ES5 `Object.defineProperty` and `get` `set`. Also each reactive property has `Watcher` to manage its `Dep`, like DOM update. Each data change would push all `Watcher` in a queue managed by `Scheduler` class. On `nextTick`, the queue would be flushed and all `Watcher` callback would be applied.

Any reactive data changes -> dep.notify() -> watcher.update() -> queueWatcher() -> wait for nexttick to flush queue



## Init
_init 
  has `el` when initialized ? call public `$mount` -> mountComponet -> intialize a new `Watcher` ->  vm._update -> run patch, createElm, CreateComponent -> recursively create all children components -> mount all components




## Render?

Vue uses template to compile to render function, or you can use your own render function. render function would call createElement to get a new vnode. Vnode to do patch -> createComponent -> create an instance and mount

recursively mounted all children(componentInstance), then mount parent