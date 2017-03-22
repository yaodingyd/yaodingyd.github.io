---
layout: post
title:  "Most Depressing Part in Front-end Dev"
date:   2017-03-22
tags:   
    - Node
---

Use consistent `require/import`. Use either commonjs require or ES6 import throughout your whole project. This will bite your ass something when you use `import` for client source then switch to use `require` in server code but forget that you have to use `require('important-module').default` for all these `export default important-module` statements.

Webpack cannot pack non-node-native code. This will make you search for all your modules that uses `node-gyp` bindings and replace them with all JavaScript counterparts.



