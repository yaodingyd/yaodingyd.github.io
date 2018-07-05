---
layout: post
title:  "Simple Infinite Loop Carousel Like Animation"
date:   2018-07-05
tags:   
    -  Web Fundamental
---

A very simple way to achieve infinite looping animation.

## The story

Currently I find there are two ways to achieve this: one is to add two cloned elements, one to the head and one to the tail, like the famous Slick; the other way is no cloned elements involved at all, but it requires re-positioning head/tail elements, and at least three elements to complete an infinite loop, as the famous Flickity. Then when I was reading the source code of awesome [number-flip](https://github.com/gaoryrt/number-flip) and found that this actually can be used for a very simple infinite loop carousel. This only needs one cloned element and doesn't require elements to be repositioned.

## The code

Like all other implementations, we need calculate and apply translations per frame. The inspiration is this single line of [code](https://github.com/gaoryrt/number-flip/blob/master/number-flip.js#L69), and we need to modify it to suit our usecases.

The HTML setup is similar to all, we need a fixed height/width `overflow:hidden` container, a track to hold all elements and to apply translation, and actual elements:

```html
<div style="position: relative; overflow: hidden; height: 20px;">
  <div id="track">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>1</div>
  </div>
</div>
```

Notice I already have the first element cloned and appended to the tail. We can do this by JavaScript too.

Then comes the animation:

```javascript
const el = document.getElementById('track')
const height = el.firstChild.clientHeight

function loop () {
  // we will figure out what is x
  el1.style.transform = `translateY(-${x}px)`
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)
```

So what should `x` be? Well, it should be something like this:

```javascript
x = (((percentage * translationDistance  ) % numberOfElements + numberOfElements) % numberOfElements) * elementHeight/Width
```

1. `percentage` is the current animation progress. Usually it is calculated by `(currentTime - startTime)/animationDuration`. 
2. `transaltionDistance` is the total distance from starting postion to end position. Usually it it calculated by `(endPositionIndex - startPositionIndex) * elementWidth/Height`.
3. `percentage * translationDistance` is the track's current translation position. It could be more than we actually need though, like when there are multiple loops, and we only need a mod value.
4. The next step is to make sure `x` is always a position value, so translation is always moving to the correct direction (where there are elements)
5. Till now what we get is the measured by how many elements we should move. But we need actually pixel values. So we multiply it by elementHeight/width.
6. One extra step is if we want to control the speed of the translation, we can have `percentage * translationDistance * speedFactor`, the larger `speedFactor` is, the faster animation goes.


See the final demo [here](https://codesandbox.io/s/m795zpjxlp).

