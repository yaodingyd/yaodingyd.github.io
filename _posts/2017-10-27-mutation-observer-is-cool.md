---
layout: post
title:  "Mutation Observer Is Cool"
date:   2017-10-27
tags:   
    - Web Fundamental
---

Mutation Observer is a well-supported  [CanIUse link](https://caniuse.com/#search=Mutation%20Observer) and very effcient API. Today I finally has a legit usecase for it.

### Detecting lazy-loaded ad is inserted
Today at work I run into this situation: on page there is a Google DFP ad and it is loaded in a iframe. I don't have any knowledge of knowing it this ad is being inserted into DOM, for on DOM ready it is just a placeholder. I tried setting a timeout for it but it could get tricky and there is no guarantee for it would always work. Thus enters Mutation Observer.

I would skip the code because there is always MDN. Later when I dig more into it, I found out [this article](https://eager.io/blog/three-real-world-use-cases-for-mutation-observer/) has included my usage. Also combining `contenteditable`, it would make a greate WYSIWYG editor.

### More usage

There is something intereting in Vue as it uses Mutation Observer as a fallback for `promise` to implement `nextTick`:

```javascript
var counter = 1;
var observer = new MutationObserver(nextTickHandler);
var textNode = document.createTextNode(String(counter));
observer.observe(textNode, {
  characterData: true
});
timerFunc = function () {
  counter = (counter + 1) % 2;
  textNode.data = String(counter);
};

// nextTickHandler is the hanlder for callbacks in Vue.nextTick(callback)
```

This works because handling is postponed and batched into subtree insertions with Mutation Observer.

### Some thoughts

Why isn't a well-supported and efficeint API not that generally used? I think it's because how the modern framework is designed: instead of keeping tracking of states with DOM, states is seperated into a dedicated JavaScript object. Also with virtual DOM, real DOM mutation triggered event might be delayed.



