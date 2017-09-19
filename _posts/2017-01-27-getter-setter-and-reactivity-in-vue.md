---
layout: post
title:  "Getter/Setter and Reactivity in Vue"
date:   2017-01-27
tags:   
    - Vue
---

One thing baffles me is what is the relationship between getter/setter and reactivity in Vue. The offcial doc says: 

> When you pass a plain JavaScript object to a Vue instance as its data option, Vue will walk through all of its properties and convert them to getter/setters using Object.defineProperty. This is an ES5-only and un-shimmable feature, which is why Vue doesn’t support IE8 and below.

then I saw [this post](https://blog.risingstack.com/writing-a-javascript-framework-data-binding-dirty-checking/) and it began to make sense now.

### How dirty checking was done (like in Angular 1.x)

Usually a observable, or `$watch` in Angular, would get called if a property is added, therefore we have a watcher, and it gets pushed to a big queue. It runs periodically to check on every watch, to see if there is a value changes. If so, coresponding handler would get triggers, like DOM update. 

### How Getter/Setter works 

When we use `Object.defineProperty`, a `set` and `get` can be configured with more than `this.value = newValue`. For every new `Vue` instance,  an `Observer` instance would be created for its `data`. This `Observer` would `walk` all properties to use `get` and `set` redefine property, and a `dep` to store all dependencies. `get` and `set` could listen to property change, and have dependeny notified, or add more dependencies.  

After this , `Watcher` is called when `Vue` instance is mounted and the property would add `Watcher` as dependencies. So next time a `set` called, dependencies would get notified and `Watcher` would fire callbacks. 

Because of this process, `Vue` cannot handle dynamically expended properties on root instance, for they missing the `set` abd `get`. This is also why we need to use global `vue.set` and `vue.delete` or its alias to handle property addition/deletion. 

Also because of this, if property is an array, set to a new array would always trigger reactivity. `Vue` changes several `array.prototype` method to make array mutation send `dep` notification, so we can only use these methods to modify array.

These code would be in vue's github repo `src/core/observer`. 

### How Reactivity is achieved in Preact

Lifecycle hooks would be called after `setState` is invoked.


