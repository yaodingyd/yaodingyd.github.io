---
layout: post
title:  "About Cropping Image"
date:   2017-07-19
tags:   
    - CSS
---

When first thinking about cropping an image, I think of `clip`, or the new `clip-path`, but this doesn't help crop the center of the image.

Here is three ways of doing so:

### Use as background-image

Pretty straight-forward:

```css
background-position: center center;
background-repeat: no-repeat;
```

### Wrapper parent div with hidden overflow

Also self-explanatory:

```css
.parent {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

img {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
``` 

### use object-fit

`object-fit` is an handy property specifies how a replaced element, such as an `<img>` or `<video>`, should be resized to fit its container.

```css
object-fit: cover;
object-position: center;
```

Kind of like `background-size` and `background-position`. Of course IE doesn't support it, so you have to use the first method as fallback.

