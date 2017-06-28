---
layout: post
title:  "Redux/React-Router Practice"
date:   2016-08-20
tag:    React
---

# Redux

Do more in action-creator and do less in reducer.

Action-creator can be impure and have side effects. 

Export selectors with related reducers. Or put they in standalone selector files.

Use more selectors for improving render performance.


# React-Router

1. Doing transition, two take-aways: always use `key` for `CSSTransitionGroup` children, and use `location` for children route.