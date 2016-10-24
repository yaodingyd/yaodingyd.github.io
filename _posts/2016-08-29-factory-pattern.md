---
layout: post
title:  "Factory Pattern"
date:   2016-08-29
---

>To get a new JavaScript Object instance without using `new`.

It looks something like this:

```javascript
    function x(){};
    x.prototype.name = 'test';

    function createX(){
        return Object.create(x.prototype);
    }
```

So when we want a new instance, we just call `createX`, without `new`. There is no constructor function or class involved.

Factory also makes extending object possible, which is object composition. This is why jQuery uses factory pattern to create use instance: use `$()` rather than `new $()`. Extending jQuery function is easy, becasue `jQuery.fn` is alias for `jQuery.prototype` and we just add more custom functions onto prototype.

Concatenative inheritance is the process of copying the properties from one object to another, without retaining a reference between the two objects. It relies on JavaScript’s dynamic object extension feature.
Cloning is a great way to store default state for objects: This process is commonly achieved using `Object.assign()`. Prior to ES6, it was common to use similar `.extend()` methods from Lodash, Underscore, or jQuery.


