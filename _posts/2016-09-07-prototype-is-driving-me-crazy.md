---
layout: post
title:  "Prototype Is Driving Me Crazy"
date:   2016-09-07
tag:    
    - JavaScript 
    - Programming
---

### 'Prototype' property vs [[Prototype]]
JavaScript objects all have 'prototype', but it is considered as a "internal property", denoted by double brackets(`[[Prototype]]`), which links back to `Object.prototype`. A function, which is a object too, has the 'visible' prototype property. This is why the following code runs like this in Chrome:

```javascript
    var x = {};
    //x's [[Prototype]] would be undefined because it's 'hidden'
    console.log(x.prototype);
    // __proto__ would be Object.prototype 
    console.log(x.__proto__)

    var y = function(){};
    //y's Prototype would be Object, with a constructor function and __proto__
    console.log(y.prototype);

    var x1 = new y();
    // now __proto__ would be y, and prototype still be undefined
```

In Chrome, `__proto__` would be the non-standard accessible internal property of `[[Prototype]]`.

In ES6 there is a new function `Object.setPrototypeOf` sets the prototype ( internal `[[Prototype]]`) of a specified object to another object or null. On MDN it warning about the slow operated yet subtle and far-flung effect. In Babel, polyfill for `class` there is one line of code:

```javascript
if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
```

Basically it sets subClass's `__proto__` point to superClass.

### Chicken and egg

Here is one interesting part about `Function` and `Object`'s prototype. We know that `Object.prototype` would be at the top of all prototype chain, so 
```javascript
Object.prototype.__proto__ === null // true
```
And you can use `new Object()`, so Object is also a function, and Function is an object, thus
```javascript
Object instanceof Function // true
Function instanceof Object // true
```
But
```javascript
Function.prototype === Function.__proto__ // true
Function.prototype.__proto__ === Object.prototype // true
```
This is becauof of EMCA's specs:
>Every built-in function and every built-in constructor has the Function prototype object, which is the initial value of the expression Function.prototype (15.3.4), as the value of its [[Prototype]] internal property.

>Unless otherwise specified every built-in prototype object has the Object prototype object, which is the initial value of the expression Object.prototype (15.2.4), as the value of its [[Prototype]] internal property, except the Object prototype object itself.


### Constructor
A constructor is a just another function used for initializing new objects, and you use the `new` keyword to call the constructor. So technically speaking, there is no "constructor function", there is only "constructor call". Prototype property would also has a constructor property(Object.prototype.constructor). So for a constructor function  `object_constructor`, `object_constructor.prototype.constructor` would be itself.

So When a new object_constructor() is called, JavaScript does four things:
1.It creates a new object.
2.It sets the constructor property of the object to object_constructor.(In ES6)
3.It sets up the object to *delegate* to object_constructor.prototype.
4.It calls object_constructor() in the context of the new object.

In this way, whatever property initialized in constructor would be new object's own property; whatever property delegated from prototype would also become new object's property, but not its *own*( with `Object.keys()`). This is also how prototype chain work: all property followed by the prototype chain would be the new object's properties. Thus, when we do a `for...in...` to iterate properties in object, we use `hasOwnProperty` to make sure.

Currently in ES5, prototype.constructor is kind of a placeholder property to ensure that your newly created object is an instance of your parent. Note that the value of this property is a reference to the function itself, and it can be treated as 'read-only'.  If you change your prototype.constructor,  and create a new child with new parent(), the child’s property stays the same, you can try it! Only if you deliberately use the constructor function, it will be used. 

Contructor also introduce an issue, that is `instanceof`. `instanceof` checks type by checking 'instance''s [[Prototype]] is equal to 'constructor's prototype. Read this more on [this article](https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e#.av1qtyvf9).

### Create a 'subclass'
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

    // or this, I learned this from Babel's polyfill for class
    Child.prototype = Object.create(Parent && Parent.prototype, {
        constructor: {
            value: Child,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
```

We use `Object.create` instead of `new Super()` to assign `Child.prototype` because it complicates all of your constructor functions, limits their ability to detect construction errors, and requires that all constructors everywhere handle that form of use. And this is call Parasitic Combination Inheritance pattern.

Here is a simple polyfill of Object.create:

```javascript
    function createObject(proto) {
        function ctor() { }
        ctor.prototype = proto;
        return new ctor();
    }
```
This is called also 'Parasitic Combination Inheritance'.

### Inheritance vs Delegation

"Inheritance" always implies a copy operation. This is what happens in Java, so if you extend a children class from parent class, all parent's property will be copied to children class. But JavaScript doesn't copy object properties (natively, by default). Instead, JS creates a link between two objects, where one object can essentially delegate property/function access to another object. So we should call "Prototype Delegation". In ES6 though it uses `extend` to make it look like a 'copy', deep down it still is a delegation.


### Read more

This article is somewhat my cheatsheet to Prototype. Read the famous [You Dont Know JS](https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes) for a more thorough and deep understanding for Prototype. 
















