---
layout: post
title:  "Polyfill and Transform in Babel"
date:   2018-08-20
---

## The concept

Babel transpiles JS code, which involves two processes: transform and polyfill. According to this [article](https://medium.com/@jcse/clearing-up-the-babel-6-ecosystem-c7678a314bf3), the difference between these two are "whether or not you can reimplement the feature today, in ES5": that means we need to **transform** certain syntax features, like arrow function, but for `Array.from`, polyfills would suffice.

For polyfilling features, babel uses core-js under the hood. `@babel/polyfill` is just the combination of stable `core-js` features and `regenerator-runtime` for generators and async functions. 

As a full equal of `@babel/polyfill`, you can use this:
```js
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

Since babel 7.4.0, it's deprecated in favor of modular approach for global import will pollute the namespace. Instead we should use `env-preset`,  and `useBuiltIns`, `corejs` options. `@babel-preset-env` will add direct references to core-js modules as bare imports (or requires), whether it's individual requires to different `core-js` entry points based on environment in a single entry file(*entry* option), or specific imports for polyfills when they are used in each file(*usage* option).

The other option is to use `@bable/runtime`. It is intended to be paired with a transform plugin:`babel-plugin-transform-runtime`. Instead polyfill, `babel-runtime` does ponyfill: instead of patching functionality, essentially modifying native prototype, a ponyfill provides that functionality as a standalone module you can use. So basically your code is transformed to use a series of helper functions that achieves the same goal, at the same time avoid pollute the global namesapce.

Basically, in this wat you can use built-ins such as Promise, Set, Symbol, etc., as well use all the Babel features that require a polyfill seamlessly, without global pollution, making it extremely suitable for libraries.

## The usage

Either:

```javascript
// in main.js
import 'core-js'
...

// .babelrc
presets: [
  ['env', {
    targets: {
      browsers: ['> 1%']
    },
    useBuiltIns: entry, // includes only the polyfills needed
    corejs: '3'
    debug: true // Outputs Babel's targets/plugins/polyfills used and why
  }]
]
```

After this your code looks like:

```javascript
Array.prototype.from = function () {...}

myArray.from(array-like);
```

Or

```javascript
// .babelrc
presets: [
  ['env', {
    targets: {
      browsers: ['> 1%']
    }
  }]
],
plugins: ["transform-runtime"]
// also add @bable/runtime to your depedencies
```

After this your code looks like:

```javascript
function Arrayfrom = function () {...}

Arrayfrom(myArray, array-like)
```
