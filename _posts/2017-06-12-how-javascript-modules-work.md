---
layout: post
title:  "How JavaScript Modules work"
date:   2017-06-12
tags:   
    - How it works
---

Some resources on how modules works in JavaScript.

### Subject on how Node's CommonJS works

[http://fredkschott.com/post/2014/06/require-and-the-module-system/](http://fredkschott.com/post/2014/06/require-and-the-module-system/)
[https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/)

### Node's module source code

[github url](https://github.com/nodejs/node/blob/master/lib/module.js)

### CommonJS Specs

[CommonJS's wiki](http://wiki.commonjs.org/wiki/Modules/1.1.1)


### How RequireJS works

From [this answer](https://www.quora.com/How-does-require-js-work-How-it-load-files-Does-it-make-ajax-call-to-load-files-or-any-other-way-Can-anyone-explain-it-clearly/answer/Gourab-Kar-2?srid=uk2Rp)

>1. Loading a file in requirejs is simply attaching a script tag with src to your mentioned filename. This is triggered by require () function. Now comes a beautiful feature. All the script tags have onchange event. When the file gets loaded, the onchange function is triggered and saved in a variable that will be used on demand by define () function. When all the dependencies are resolved, all the loaded files are arranged in there order of them being called and a map of it is created.

>2. You must have noticed the files that you can load by requirejs are AMD. The contents are enveloped in a define function and the function returns something. This prevents the variables / business objects to be exposed at window level. Everything you've written inside an AMD module is scoped to the define function and it is used when injected as an object in another function. When such files get loaded, the returned value is stored in the variable mentioned in point 1.

### AMD spec

[AMDjs github](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)


### Applications

Browserify would convert ES6 `import` to CommonJS modules, since most browsers cannot support it yet.