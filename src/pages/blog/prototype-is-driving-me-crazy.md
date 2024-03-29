---
layout: "../../layouts/BlogPost.astro"
title:  "Prototype Is Driving Me Crazy"
pubDate: "Sep 7 2016"
---

JavaScript being a mixed paradigm of everything is driving me crazy. 

### `Prototype` property vs `[[Prototype]]`

JavaScript objects all have 'prototype', but it is considered as a "internal property", denoted by double brackets(`[[Prototype]]`), which links back to `Object.prototype`. A function, which is a object too, has the *visible* prototype property. This is why the following code runs like this in Chrome:

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

In ES6 there is a new function `Object.setPrototypeOf` sets the prototype (internal `[[Prototype]]`) of a specified object to another object or null. On MDN it warning about the slow operated yet subtle and far-flung effect. In Babel, in the polyfill for `class`, there is this snippet:

```javascript
if (superClass) 
    Object.setPrototypeOf ? 
        Object.setPrototypeOf(subClass, superClass) : 
        subClass.__proto__ = superClass
```

Basically it sets subClass's `__proto__` point to superClass.

### Chicken and egg

Here is one interesting part about `Function` and `Object`'s prototype. We know that `Object.prototype` would be at the top of all prototype chain, so

```javascript
Object.prototype.__proto__ === null // true
```

And you can use `new Object()`, so `Object` is also a function, and `Function` is an object, thus
```javascript
Object instanceof Function // true
Function instanceof Object // true
```

Here is the tripping part:
```javascript
Function.prototype === Function.__proto__ // true
Function.prototype.__proto__ === Object.prototype // true
```

This is because of EMCA specs:

>Every built-in function and every built-in constructor has the Function prototype object, which is the initial value of the expression Function.prototype (15.3.4), as the value of its [[Prototype]] internal property.

>Unless otherwise specified every built-in prototype object has the Object prototype object, which is the initial value of the expression Object.prototype (15.2.4), as the value of its [[Prototype]] internal property, except the Object prototype object itself.

>The Function prototype object is itself a Function object (its [[Class]] is "Function") that, when invoked, accepts any arguments and returns undefined.

>The value of the [[Prototype]] internal property of the Function prototype object is the standard built-in Object prototype object (15.2.4). The initial value of the [[Extensible]] internal property of the Function prototype object is true.

>The Function prototype object does not have a valueOf property of its own; however, it inherits the valueOf property from the Object prototype Object.

### Constructor

A constructor is a just another function used for initializing new objects, and you use the `new` keyword to call the constructor. So technically speaking, there is no "constructor function", there is only "constructor call". Prototype property would also has a constructor property(`Object.prototype.constructor`). So for a constructor function `objectConstructor`, `objectConstructor.prototype.constructor` would be itself.

So When a new object_constructor() is called, JavaScript does four things:
1. It creates a new object.
2. It sets the constructor property of the object to object_constructor.(In ES6)
3. It sets up the object to *delegate* to object_constructor.prototype.
4. It calls object_constructor() in the context of the new object.

In this way, whatever property initialized in constructor would be new object's own property; whatever property delegated from prototype would also become new object's property, but not its *own*( with `Object.keys()`). This is also how prototype chain work: all property followed by the prototype chain would be the new object's properties. Thus, when we do a `for...in...` to iterate properties in object, we use `hasOwnProperty` to make sure.

Currently in ES5, prototype.constructor is kind of a placeholder property to ensure that your newly created object is an instance of your parent. Note that the value of this property is a reference to the function itself, and it can be treated as 'read-only'.  If you change your prototype.constructor,  and create a new child with new parent(), the child’s property stays the same, you can try it! Only if you deliberately use the constructor function, it will be used. 

Contructor also introduce an issue, that is `instanceof`. `instanceof` checks type by checking 'instance''s [[Prototype]] is equal to 'constructor's prototype. Read this more on [this article](https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e#.av1qtyvf9).

### Static method vs Prototype method
In ES6, using the `class` syntax sugar could help you create a more OOP-like JavaScript object. And you can even use `static` to declare static method. The ones without `static` keyword are declared as prototype methods. It would be something like this:

```javascript
function myClass () {
    this.staticMethod = function () {
        // normally it's a utility class, and we don't use `this` that much
    }
}

myClass.prototype.prototypeMethod = function () {
    // `this` is used a lot because it's uauslly used on an instance
}
```

The reason why we put instance method in prototype is that using "this" results in every instance of the class  having its own independent copy of method, whereas using prototype will mean that each instance of class  will use the same copy of method. Thus, declaring methods on the prototype is more memory efficient.

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

### Subclass a built-in 

One difference for ES6 class from ES5 is that it makes possible to subclass all buit-in constructors, like `Date` and `Array`.
There are work-arounds for ES5, but these have significant limitations

### Inheritance vs Delegation

"Inheritance" always implies a copy operation. This is what happens in Java, so if you extend a children class from parent class, all parent's property will be copied to children class. But JavaScript doesn't copy object properties (natively, by default). Instead, JS creates a link between two objects, where one object can essentially delegate property/function access to another object. So we should call "Prototype Delegation". In ES6 though it uses `extend` to make it look like a 'copy', deep down it still is a delegation.


### Reference

1. [You Dont Know JS](https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes)
2. [The details of subclass](http://2ality.com/2015/02/es6-classes-final.html#the-details-of-subclassing)
3. [Subclass in ES5](http://speakingjs.com/es5/ch28.html)
4. [How to extend `Date`](http://dailichun.com/2018/01/15/howtoextenddate.html)















