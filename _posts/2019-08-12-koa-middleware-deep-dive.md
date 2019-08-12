---
layout: post
title:  "Koa Middleware Deep Dive"
date:   2019-08-12
---

We are familiar with `Koa` middleware's **Onion Model** but how it works under the hood? More specifically, how I spend a day to understand the way of middlewares to get rid of a *404* error in my koa app.

So, the magic happens inside `koa-compose` where it transforms all middlewares to a (sort of) chain of promises, I don't event have to refactor the code for readability because it's so simple:

```javascript
  // last called middleware #
  let index = -1
  return dispatch(0)
  function dispatch (i) {
    if (i <= index) return Promise.reject(new Error('next() called multiple times'))
    index = i
    let fn = middleware[i]
    if (i === middleware.length) fn = next
    if (!fn) return Promise.resolve()
    try {
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
```

`Promise.resolve(fn(context, dispatch.bind(null, i + 1)))` is essentially the **promise chaining** part, so each middleware if actually wrappep inside a `Promise`.

So one problem comes up: what's the difference between `return next()`, `next()` and `await next()` in middlewares? Well, it only matters if you have `async` functions in your middlewares, I mean `await` logic inside your middleware, not your middleware is an `async` function. 

If all the logic are synchronous, you just make sure to call `next` in your middlewares and when all middlewares are resolved, which kind of makes no sense since they are all synchronous, `context` will have all the latest changes made to it and it's all peachy.

When there are asynchronous logic, you have to make sure all plain middlewares use `return next()` and all `async` middlewares use `await next()`, otherwise the `dispath` promise resolves before your async logic finishes and `context` will not be what you expect.

Example time:
```javascript
// This is a working example. All async middlewares use await next()
// to wait for the async logic (delay) to finish
const app = new koa();
// middleware A
app.use(async (ctx, next) => {
  await next();
});
// middleware B
app.use(async (ctx, next) => {
  await delay(200);
  await next();
});
// middleware C
app.use(async (ctx, next) => {
  await delay(200);
  ctx.body = 'Hello world'
});


// This is also a working example. We need to return next() to wait for 
// the downstream promises.
const app = new koa();
// middleware A
app.use((ctx, next) => {
  return next();
});
// middleware B
app.use(async (ctx, next) => {
  await delay(200);
  await next();
});
// middleware C
app.use(async (ctx, next) => {
  await delay(200);
  ctx.body = 'Hello world'
});

// This is not working. Downstream promises are not returned so the first middlewares
// resolves with nothing actually done.
const app = new koa();
// middleware A
app.use((ctx, next) => {
  next();
});
// middleware B
app.use(async (ctx, next) => {
  await delay(200);
  await next();
});
// middleware C
app.use(async (ctx, next) => {
  await delay(200);
  ctx.body = 'Hello world'
});
```