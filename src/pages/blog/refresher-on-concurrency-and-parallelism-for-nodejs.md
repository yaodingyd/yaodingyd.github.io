---
layout: "../../layouts/BlogPost.astro"
title: "Refresher on Concurrency and Parallelism for Node.js"
pubDate: "Dec 6 2024"
---

First of all, a disclaimer: some of the concept might not be 100% technical accurate, and it's intended to be easier for understanding these concepts. For starters, parallelism is more of an implementation to achieve concurrency, but in general we say that:
- *Concurrency*: do multiple tasks in overlapping time periods
- *Parallelism*: do multiple tasks simultaneously

So it might clear the first confusion why we say Node.js is single-threaded but still could be perfect to achieve concurrency, and that is because of event loop. When we talk about single-thread in Node.js, it would refer that the event loop runs on a single thread to take in tasks on a FIFO queue; however the actual processing of tasks is handled differently: if it's I/O-bound (disk operations, network calls), it's handled by libuv and that is actually multi-threaded; if it's CPU-bound (heavy computation) or memory-bound, it would be handled on the same thread, thus could be blocking. As long as the task is non-blocking, Node.js can keep take in next task without waiting for the current one to finish first, thus achieving concurrency in this process.

For parallelism, Node.js can do both multi-thread (worker thread) or multi-process (child process) by spawning more threads/processes to run tasks simultaneously. These would be perfect candidates to run these non-I/O-bound tasks that could potentially block the main thread. 

So why do we care about these? The golden rule of Node.js is "Don't block the event loop/main thread". The reason Node.js can run very fast is because the event loop, being single-threaded, can use very little resources to take order of tasks and reverse more resources to process them. It's like having only 10 stuff members to run a restaurant, would you prefer to have one person run the register, and the rest in the kitchen to cook food; or have 3 or 4 waiters to take order, then only 6 or less people to cook? 

As a bonus, event loop is not exclusive to Node.js; in python 3, the asyncio lib also implements event loop, there are certainly many differences but the key is event loop is baked into Node.js runtime but there are multiple implementations of it in python. With this feature, python 3 can now be on par with Node.js as web servers (for example, with FastApi), thanks to much improved support for concurrency.