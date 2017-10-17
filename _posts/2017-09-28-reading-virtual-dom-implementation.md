---
layout: post
title:  "Reading Virtual Dom Implementation"
date:   2017-09-28
tags:   
    - Vue
---


Some resources on how to implement virtual dom.

https://github.com/creeperyang/blog/issues/33

https://github.com/livoras/blog/issues/13

## Terms

*`vnode`*: A abstract model of node, using POJO to represent a DOM node; usually have three properties: `tagName`, `props` for attributes, and `children` for children DOM nodes or plain text.
*`h`*: function to convert to vnode; usually returns a virtual dom tree, or a `vtree`.
*`diff`*: function to compare two `vtree` to get patches.
*`patch`*: function to apply patches to real DOM.
*`render`*: the process of turning virtual DOM element into a real DOM element.
*`hydration`*: usually means to do rendering in server side, then apply `state` in client side.

## Ideas:

Once you have a set of patches, you could apply them immediately but it's better to queue them and flush this queue at a fixed interval like 60 times per second. Only doing our DOM manipulation with the callback to requestAnimationFrame will give us a performance boost and minimize the number of DOM operations we do. We also call batch in before we apply our patches to squash our list of diffs to the minimal set of operations.

The basic idea to use virtual dom is the same: use JavaScript object to represent DOM node and construct a tree based on vnode, whenever there is change on vnode, we diff the old and new tree, and only patch the diff results.

There are two ways to do patching: first we do `diff` and store patches in a queue, then do `patch`; or we can do `diff` and `patch` together.
