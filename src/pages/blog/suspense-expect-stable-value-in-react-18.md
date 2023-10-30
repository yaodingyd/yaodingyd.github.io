---
layout: "../../layouts/BlogPost.astro"
title:  "Suspense Expects Stable Value in React 18"
pubDate:   October 27, 2023
---

I've been banging my head over a page stuck in loading spinner issue at work for a long time. Some background: this page uses `Suspense` to lazy-load a component that uses react-query to fetch some data, and we display a spinner before `useQuery` gets data. Ever since we migrated to react 18, we began to see  that one `useQuery` never resolved, even though the underlying http call finished. So I wildly guess that react 18's concurrent scheduling somewhat messed with react query. Well it turned out it's much simpler (or harder to find) than that: react 18 now expects a stable value within `Suspense`.

Let's look at some examples: a very simple react 18 application that has a `Suspense` and one state update to trigger a rerender. I have added a `console.log` to show when rerender happens.

# Examples

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

Now we can see that in react 18 new root mode, `Suspense` would require a *stable value* to not rerender. If you are not familiar with what is stable value yet, shopify engineering has a wonderful [blog](https://shopify.engineering/master-reacts-stable-values) on it, basically it means values which are the same across multiple renders. Here the same "value" is from react's point of view, so more accurately it should be the same equality through shallow comparison. Thus when using a value from `useState` hook, it is kept the same through renders.
It's a bit unfortunate that this is not documented anywhere in react docs. I have since filed a [bug](https://github.com/facebook/react/issues/27611) in react repo and see if this is intended or not. 
