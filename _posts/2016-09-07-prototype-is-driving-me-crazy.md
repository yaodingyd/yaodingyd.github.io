---
layout: post
title:  "Prototype Is Driving Me Crazy"
date:   2016-09-07
---


### 'Prototype' property vs [[Prototype]]
JavaScript objects all have 'prototype', but it is considered as a "internal property", denoted by double brackets(`[[]]`), which links back to 'Object.prototype'. A function, which is a object too, has the 'visible' prototype property. This is why the following code runs like this in Chrome:

```javascript
    var x = {};
    //x's [[Prototype]] would be undefined because it's 'hidden'
    console.log(x.prototype);

    var y = function(){};
    //y's Prototype would be Object, with a constructor function and __proto__
    console.log(y.prototype);
```

In Chrome, `__proto__` would be the non-standard accessible internal property of [[Prototype]], which links back to Object.prototype.

### Constructor
A constructor is a function used for initializing new objects, and you use the `new` keyword to call the constructor. Prototype property would also has a constructor property(Object.prototype.constructor). So for a constructor function  `object_constructor`, `object_constructor.prototype.constructor` would be itself.

So When new object_constructor() is called, JavaScript does four things:
1.It creates a new object.
2.It sets the constructor property of the object to object_constructor.(In ES6)
3.It sets up the object to delegate to object_constructor.prototype.
4.It calls object_constructor() in the context of the new object.

In this way, whatever property initialized in constructor would be new object's own property; whatever property delegated from prototype would also become new object's property, but not its own. This is also how prototype chain work: all property followed by the prototype chain would be the new object's properties. Thus, when we do a `for...in...` to iterate properties in object, we use `hasOwnProperty` to make sure.

Currently in ES5, prototype.constructor is kind of a placebo property to ensure that your newly created object is an instance of your parent. Note that the value of this property is a reference to the function itself, and it can be treated as 'read-only'.  If you change your prototype.constructor,  and create a new child with new parent(), the child’s property stays the same, you can try it. Only if you deliberately use the constructor function, it will be used. 

Contructor also introduce an issue, that is `instanceof`. `instanceof` checks type by checking 'instance''s [[Prototype]] is equal to 'constructor's prototype. Use this more on [this article](https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e#.av1qtyvf9).

### Create a subclass
Code first:

```javascript
    function Parent() {
        this.someProp = “some prop”;
    }
    function Child() {
        Parent.call(this); // call super constructor.
    }
    // Child.prototype.constructor is Child.
    // subclass extends superclass
    Child.prototype = Object.create(Parent.prototype); //assign prototype, but overwrite Child.prototype.constructor to Parent
    Child.prototype.constructor = Child; // restore constructor to Child
```

We use Object.create instead of new Super() to assign child.prototype because it complicates all of your constructor functions, limits their ability to detect construction errors, and requires that all constructors everywhere handle that form of use. And this is call Parasitic Combination Inheritance pattern.

Here is a simple polyfill of Object.create:

```javascript
    function createObject(proto) {
        function ctor() { }
        ctor.prototype = proto;
        return new ctor();
    }
```















