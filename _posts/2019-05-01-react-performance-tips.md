---
layout: post
title:  "React Performance Tips"
date:   2018-12-18
---

1. Use `React.memo` to wrap static functional component to avoid rerender.
2. Use `useMemo` to create memoized value to pass to Provider value to avoid unneccessary rerender. The propagation from Provider to its descendant consumers is not subject to the `shouldComponentUpdate` method, so the consumer is updated even when an ancestor component bails out of the update. And because internally react use reference to compare the value, we need to use `useMemo` to create a memoized value(essentially same reference if its dependency is unchanged).
