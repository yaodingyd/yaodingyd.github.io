---
layout: post
title:  "Factory Pattern"
date:   2016-08-29
tag:    
    - JavaScript 
    - Programming
---

Basically, factory pattern is:
>To get a new JavaScript Object instance without using `new`.

In the ES5 & ES6 context, that means a function returns new object, without using `class`, `new`, or constructor function.

It looks something like this:

```javascript
    function x(){};
    x.prototype.name = 'test';

    function createX(){
        return Object.create(x.prototype);
    }
```

Or simpler, like this

```javascript
    function createX (name) {
        return {
            name: name
        }
    }
```

Or, with ES6's arrow function, even simpler

```javascript
    const createX = (name) => ({name: name})
```

Factory pattern usually works great in the scenario to instantiate complex objects and lots of small objects or components with same properties, which in other words means factory functions works great in composition:

```javascript
    const createX = (name) => ({ name })

    const createY = (age, name) => ({
        age,
        info: { createX() }
    })
```

Composing factories can build arbitrarily complex objects that doesn't mess around with `new` or `this`.Also, objects that can be expressed in terms of *has-a* relationships, rather than *is-a* can be implemented with composition, instead of inheritance.

Factory also makes extending object possible, which is also essentially object composition. This is why jQuery uses factory pattern to create use instance: use `$()` rather than `new $()`. Extending jQuery function is easy, becasue `jQuery.fn` is alias for `jQuery.prototype` and we just add more custom functions onto prototype. Another use is cloning. It is a great way to store default state for objects: This process is commonly achieved using `Object.assign()`. Prior to ES6, it was common to use similar `.extend()` methods from Lodash, Underscore, or jQuery. 

The last use is in High Order Function, where factory can be *enhanced* to return more complex object:

```javascript
    const createX = (name) => ({ name })

    const enhancer = factory => (name, age) => ({
        age,
        factory(name)
    })

    const createNameWithAge = enhancer(createX);
```


