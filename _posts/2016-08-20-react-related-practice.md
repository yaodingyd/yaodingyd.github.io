---
layout: post
title:  "Redux/React-Router Practice"
date:   2016-08-20
tag:    React
---

Might be outdated now...

## React

1. react render simply follows a top-down procedure: parent state changes will results in a re-render, and all children will go through the re-render lifecycle. This is why `pureComponent` is necessary, because sometimes children do not reply on parent state and can be spared from re-render.
2. We only need to bind `this` for event handler because these functions are executed in `window` context where `this` points to `window`. For other functions executed inside component context there is no need to bind it.
3. If you don't provide your own constructor, then a default constructor will be supplied for you. If your class is a base class, the default constructor is empty:
```javascript
constructor() {}
```
If your class is a derived class, the default constructor calls the parent constructor, passing along any arguments that were provided:
```javascript
constructor(...args) {
  super(...args);
}
```

## Redux

Do more in action-creator and do less in reducer.

Action-creator can be impure and have side effects. 

Export selectors with related reducers. Or put they in standalone selector files.

Use more selectors for improving render performance.


## React-Router (with react-transition-groups)

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
3. When combining FLIP animation technique, force a reflow on `onEnter` hook, otherwise the inverted transition would be overwritten without triggering any animation.
