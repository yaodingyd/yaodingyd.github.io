---
layout: post
title:  "Relearn Babel"
date:   2018-08-20
tags:   
    -  Web Fundamental
---

Notes on relearning Babel

## The concept

Babel does transpiling JS code, and this process involves two parts: transform and polyfill. According to this [article](https://medium.com/@jcse/clearing-up-the-babel-6-ecosystem-c7678a314bf3), the difference between these two are "whether or not you can reimplement the feature today, in ES5".

So we have most plugins called "babel-plugin-transform-xx-xx", and there is also "babel-polyfill" package for all polyfillable ES5+ features. 

Babel 6 also introduced the concept of a preset which is simply shorthand for a set of transforms. So using a `env` preset, you don't have to manually add a bunch of tranform plugins, babel does it for you.

Most of the time for projects I have seen, they use a different `babel-plugin-transform-runtime`. This would achieve the same polyfill effects as `babel-polyfill`, with [some difference](https://babeljs.io/docs/en/babel-plugin-transform-runtime.html).

## The usage

Either:

```javascript
// in main.js
import 'babel-polyfill'
...

// .babelrc
presets: [
  ['env', {
    targets: {
      browsers: ['> 1%']
    },
    useBuiltIns: true, // includes only the polyfills needed
    debug: true // Outputs Babel's targets/plugins/polyfills used and why
  }]
]

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
```
