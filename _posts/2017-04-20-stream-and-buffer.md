---
layout: post
title:  "Stream and Buffer in Node"
date:   2017-04-20
tags:   
    - Node
---

`Buffer` is what node uses to handle raw chunks of binary data, when using `fs.readFile()`, that would take the file into a `Buffer`, and reading it all at once. `Stream`, on the other hand, reads data at chunks. `Stream` are all `EventEmitter` class: 

>This object was simply an EventEmitter that added a special pipe() method to do the streaming magic. 

and `response` and `request` are all `Stream`, so they can listen to events and get `pipe`d.

Libraries like though2 can make `stream` out of function so we can use it to handle streaming data. In other words, anything 'abstract interface' in a `pipe` call needs to be a `stream.transform` (most of the time), and we use though2 to wrap a function to be a `stream.transform`. 

`Stream` generally handle `Buffer` and `String`, but it can also be an object stream, where a POJO gets streamed. To do this we enable `objectMode: true`, in though2 would be `var stream = through2({ objectMode: true }, function(chunk, enc, callback) { })`.

It is how Gulp is using `Stream` inside, which would be a Vinyl object stream.