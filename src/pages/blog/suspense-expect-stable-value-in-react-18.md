---
layout: "../../layouts/BlogPost.astro"
title:  "Suspense Expects Stable Value At Least in React 18"
pubDate:   October 27, 2023
---

I've been banging my head over a page stuck in loading spinner issue at work for a long time. Some background: this page uses `Suspense` to lazy-load a component that uses react-query to fetch some data, and we display a spinner before `useQuery` gets data. Ever since we migrated to react 18, we began to see  that one `useQuery` never resolved, even though the underlying http call finished. So I wildly guess that react 18's concurrent scheduling somewhat messed with react query. Well it turned out it's much simpler (or harder to find) than that: react 18 now expects (at least) stable values within `Suspense`.


# Lazy component / Suspense 

Before I talked about my specific issue, let's revisit some concept first. Lazy components (components loaded from `React.lazy``) would suspend on first render, and when a component "suspends", it indicates to React that the component isn't "ready" to be rendered yet, and won't be until the asynchronous resource it's waiting for is loaded. When the resource finally loads, React will try to render the component again.([ref](https://relay.dev/docs/guided-tour/rendering/loading-states/)) Suspended states (including memo, etc) are also thrown out when it's rendered. ([react doc](https://react.dev/reference/react/Suspense#caveats)) So naturally, the following code will not work:

```
export default function App() {
  const LazyComp = lazy(() => import("./Comp"));
  return <LazyComp />;
}
```

This is because the lazy component will be suspended and its state will be destroyed every time it renders, the the follow up render will create a new instance of `lazyComp` so `App` will stuck in this infinite loop.

`Suspense` creates a boundary for suspended component and makes sure that react only unmounts and remounts and tree below. So this will work:

```
export default function App() {
  const LazyComp = lazy(() => import("./Comp"));
  return <Suspense><LazyComp /></Suspense>;
}
```

# Examples

Now let's look at some examples: a very simple react 18 application that has a `Suspense` and one state update to trigger a rerender. I have added a `console.log` to show when rerender happens.

First, react 18 with `ReactDOM.render` with the old root behavior:
<iframe src="https://codesandbox.io/embed/old-root-lazy-component-w7pflf?fontsize=14&hidenavigation=1&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="old root lazy component"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Next, react 18  with `createRoot`, and a stable value created with `useState` for suspended component:
<iframe src="https://codesandbox.io/embed/new-root-lazy-component-stable-sm7v2c?fontsize=14&hidenavigation=1&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="new root lazy component, stable"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Lastly react 18 with unstable value, notice that we now have over 1k console.log messages, indicating component keeps rerendering
<iframe src="https://codesandbox.io/embed/new-root-lazy-component-unstabled-sk53w3?fontsize=14&hidenavigation=1&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="new root lazy component, unstabled"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

# Stable Value

Now we can see that in react 18 new root mode, `Suspense` would require a *stable value* to not rerender. If you are not familiar with what is stable value yet, shopify engineering has a wonderful [blog](https://shopify.engineering/master-reacts-stable-values) on it, basically it means values which are the same across multiple renders. Here the same "value" is from react's point of view, so more accurately it should be the same referential equality through shallow comparison. When using a value from `useState` hook, it is kept the same through renders, so we won't have any re-render.


# Conclusion

Back to my original issue, because of the constant rerendering created from unstable component value, react-query lost reference to its original call so the `useQuery` never resolves to loaded state. 

React team actually suggested that "[Lazy should always either be hoisted to the top level of your file or cached outside of React](https://github.com/facebook/react/issues/24881#issuecomment-1179535114)" so the above pattern should be not be implemented in the first place (oh well), but if you have to do dynamic lazy load under certain situations, at least use a stable value to avoid rerenders.




