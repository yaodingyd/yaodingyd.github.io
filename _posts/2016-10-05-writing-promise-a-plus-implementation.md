---
layout: post
title:  "Writing a Promise/A+ Implementation"
date:   2016-10-05
tag:    
    - JavaScript 
    - Programming
---

When I first started to learn about promise, jQuery Deferred object helped me a lot understanding the core concept of promise. It kind of shaped promise for me. So later, when I looked at [this article](https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns) about how it is anti-patterns, I felt like I should really look into *promsie* itself.

So I knew about Promise/A+, and how the atrocious jQuery's Deferred was not Promise/A+ compliant. (well, now jQuery 3.0+ is). There I got a clear understanding for 'fulfill', 'reject', and 'thenable'. So the anti-pattern stuff, basically it tells us: 1) Deferred is a nice wrapper, but only for non-promise object; if it already is a promise, chain it! 2) `then` function takes a `resolve` and `reject`, you cannot tell the status of a promise until it is *resolved*, that includs fulfilled(success) and rejected(fail) 3) By doing the following two, there might be silent error that are not caught.

### The Writing Part
There are literally a bunch of Promise/A+ implementation out there, from tiny ones to complicated colossus. Anyway, I wrote my own library, called [Chengnuo](https://github.com/yaodingyd/Chengnuo.js), it means 'promise' in Chinese (also, naming stuff is hard).

So, you need these functions:
1.Fulfill and reject: change promise status and assign its value or reason
2.Then: create a new promise with handlers and add it to a queue
3.Handle: run asynchromous with native code, trying to resolve promise one by one from the queue
4.Resolve

The part I found tricky is how to understand 'resolve'. Resolve is the core functionality of how promise works. Resolve is the process of fulfilling or rejecting a promise, with another promise-like object, thenable. And this is also why promise is chainable: you resolve a promise, with the previous promise, then use this promise, resolve the next promise...(The confusion part for me, I think that's because of the language,before I always assumed that a resolved promise equals a fulfilled promise, well it is not.)

### Asynchronous Testing
There is one interesing part when I tested my Chengnuo.js using Mocha. Actually this process helps me understand how promise works better.

So for asynchronous tesing, Mocha( and Jamine) uses a callback, usually called "done", to indicate that the test if completed. For example:

```javascript
    it('test a asynchromous function', function(done){
        ...
        promise.then(function(){
            assert(...);
            done();   
        })
    });
```

Without the "done" callback, Mocha would take this spec as synchronous and finish testing, returns a "passed", but actually it might have failed.

This problem I encountered is that even though I added "done" in the `resolve` function, I missed it in `catch`
function, so Mocha returns a timeout error. That's how promise works: 'resolve' also can throw an error, and it will be handled by `catch`; the codes below will not get executed. Remember, **ALWAYS ADD CATCH TO YOUR PROMISE**!

