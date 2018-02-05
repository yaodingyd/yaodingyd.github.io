---
layout: post
title:  "Reading Virtual Dom Implementation"
date:   2017-09-28
tags:   
    - Vue
---

Some thoughts on reading the source code on *preact*, *snabbdom* and other virtual DOM implementations.

## Jargons

*`vnode`*: A abstract model of node, using POJO to represent a DOM node; usually have three properties: `tagName`, `props` for attributes, and `children` for children DOM nodes or plain text.
*`h`*: function to create vnode; usually returns a virtual dom tree, or a `vtree`. In react-like libraries, we use JSX syntax to structure HTML. Babel would transpile JSX to a series of `createElement` or `h` functions. 
*`diff`*: function to compare two `vtree` to get patches.
*`patch`*: function to apply patches to real DOM.
*`render`*: the process of turning a `vnode` into a real DOM element.
*`hydration`*: usually means to do rendering in server side, then apply `state` in client side.

## Ideas:

Once you have a set of patches, you could apply them immediately, but it's better to queue them and flush this queue at a fixed interval like 60 times per second. Only doing our DOM manipulation with the callback to requestAnimationFrame will give us a performance boost and minimize the number of DOM operations we do. We also call batch in before we apply our patches to squash our list of diffs to the minimal set of operations.

The basic idea to use virtual dom is the same: use JavaScript object to represent DOM node and construct a tree based on vnode, whenever there is change on vnode, we diff the old and new tree, and only patch the diff results.

There are two ways to do patching: first we do `diff` and store patches in a queue, then do `patch`; or we can do `diff` and `patch` together.

## Preact

Preact shines on the small file size, only 3kb gzipped. In order to reduce file size, a lot of logic are minimal. While most other libraries compare two `vnode` to do `diff`, whenever a `vnode` renders, the actually DOM node would have a property of its vnode. So in code `diff` is implemented with a DOM node and a `vnode`. This would introduce some overhead. 

Because DOM node and `vnode` both keep reference to each other, so preact needs to manually do garbage collection to prevent out of DOM reference memory leak. Basically `vnode` and DOM's reference needs to be cleared after they are removed.

There are several technique preact uses to improve its speed:

1. With `h` function preact would first check `vnode`'s type and determine if it is a *simple* node, which is essentially a text node; if two simple nodes are next to each other, preact would concatenate them together, and results in fewer nodes.

2. Preact would hash previous removed component(`vnode` and its DOM reference) into a map. If following actions would have the same component constructor, the cached DOM node would be reused.


## Snabbdom

Snabbdom's source code reads very smoothly. Because snabbdom is just a virtual DOM implementation and has no component involved, code is simpler than  react-like libraries.

`diff` for children is similar between snabbdom and preact, though snabbdom's code is much better to understand: for two groups of`vnode` children, we create maps based on their `key`, if there is a same keyed child, patch child; if not, try to find two nodes of the same type, and pay attention to two special case: previous head moves to tail, and previous tail moves to head. The difference is that Snabbdom converts all keyed children to index and use index to do more detailed comparing.

## DIY implementations:

https://github.com/creeperyang/blog/issues/33

https://github.com/livoras/blog/issues/13

https://github.com/berwin/Blog/issues/18
