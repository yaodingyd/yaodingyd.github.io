---
layout: post
title:  "This in React"
date:   2020-06-024
---


1. We only need to bind `this` for event handler because these functions are executed in `window` context where `this` points to `window`. For other functions executed inside component context there is no need to bind it.
2. If you don't provide your own constructor, then a default constructor will be supplied for you. If your class is a base class, the default constructor is empty:
```javascript
constructor() {}
```
If your class is a derived class, the default constructor calls the parent constructor, passing along any arguments that were provided:
```javascript
constructor(...args) {
  super(...args);
}
```