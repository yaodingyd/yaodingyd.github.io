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


# React-Router (with react-transition-groups)

1. Doing transition, two take-aways: always use `key` for `TransitionGroup` children, and use `location` for children route.

```javascript
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="route" timeout={300}>
      <Switch location={location}>
        <Route exact path="/" component={Welcome} />
        <Route path="/word" component={WordControl} />
        <Route path="/test" component={Welcome} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
```
Because `Transtion` takes a exited and entered components in this scenario, make sure all routes are already in place. For example, don't leaves out `/`.

# React-Transition-Group
1. By default component is always mounted. use `mountOnEnter` and `unmountOnExit`.
2. When using `TransitionGroup`, the individual `Transition`'s `in` prop is always overwritten by `TransitionGroup`.
