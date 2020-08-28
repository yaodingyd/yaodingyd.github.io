---
layout: post
title:  "Pass-By-Value"
date:   2020-08-28
---

Go and Javascript are both pass-by-value language, and both cannot create a reference type. In fact, because *reference* is overused in the general context, golang prefers to use `pointer type`. What does it mean?

We know a pointer is a value holds the memory address of some other value, so if `a` is a pointer that points to the address of value `b`, we can `a` is a reference of `b`. Later when we modify the content that `a` points to, we also modify `b`'s value.  

But this is still difference from a real `reference type`. The main difference is that when you reassign `a` to a different address, it has no impact on `b`, because `a` only holds the memory address of `b`, it cannot change `b`'s address. But in a language that has reference type, like C++, that would be true.

So there we have it: it's always pass-by-value for Go and Javascript, but sometimes the value can be a pointer(reference). For primitive type, like number, it's value for sure; in Javascript, when it's `Object`, it would be a pointer, so changing parameter's property would result in changing the original object, but reaasign parameter would have no effect on original object. For go, if it's a struct, we need to use a pointer type; if it's map, channel, interface or slice, they are already a pointer type under the hood, so usually we do not need to use pointer on them.

