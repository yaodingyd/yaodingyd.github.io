---
layout: post
title:  "Writing a Promise/A+ Implementation"
date:   2016-10-05
---
##

##Asynchronous Testing
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
function, so Mocha returns a timeout error. That's how promise works: 'resolve' also can throw an error, and it will be handled by `catch`; the codes below will not get executed. Remember, ALWAYS ADD CATCH TO YOUR PROMISE!

