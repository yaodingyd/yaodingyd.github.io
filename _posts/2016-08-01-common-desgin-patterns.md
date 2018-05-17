---
layout: post
title:  "Common Design Patterns"
date:   2016-08-01
tag:    
    - Programming
---

A collection of common desgin patterns in JavaScript.

### Most commons ones I've used
1. Module 
2. Constructor
3. Prototype
4. Observer (Pub/Sub) 
5. Factory
6. Decorator

### Observer Pattern and Pub/Sub Pattern

First of all, read [this](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript).

Main idea: loose coupling. ["It's a somewhat event-based way of thinking, but the "events" aren't tied to a specific object."](http://stackoverflow.com/a/13513771/6901252). So for Pub/Sub, they don't even know if their counterparts exist. For Observer pattern, though observer must subscribe to the subject, observers don't know about each other.

Also, because subscribers are agnostic of publisher, they can implement an event handler published by any one.

In Angular 1, thw Observer Pattern is implemented through digest circle in `$scope`. Angular would add a watcher for each of these:

1. {% raw %}`{{expression}}`{% endraw %} or `ng-model`, implicitly by Angular;
2. `$scope.$watch`, explicitly by you

Too many watchers will lower application performances. For Angular 1, the offcial recommedation is that you should not have more than 2000 watchers in a single page. So either reduce watchers usages or use bind-once. 


In Angular 1, a subscriber ‘subscribes’ to an event using `$on(‘event’, callback)`, and a publisher ‘publishes’ an event using `$emit(‘event’, args)` or `$broadcast(‘event’, args)`.

### Factory Pattern

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