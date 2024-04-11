---
layout: "../../layouts/BlogPost.astro"
title:  "Think Twice When Introducing Effects to Existing React Components"
pubDate:   April 11, 2024
---

You don't need me to remind you the various footguns when working with `useEffect`, and the majority of them would end up in a maximum stack call, or infinite render issue. I just had another interesting encounter, so I'm writing this down to remind myself always think twice when introducing effects when modifying existing components.

The problem I was actually working on is also interesting enough that it might deserver its own blog, but the gist is to make UI state and app state temporarily out of syn when user is interacting with it, and resync their states when user is done. The long story is we have an input which subscribes to app state for value, and with a `onChange` handler to update app value. This handler will also do formatting and sometimes modifies user input, for example with `1.` it would format it to `1`, so it would be jarring to user when they are in the middle of typing.

The solution is to make UI has its own internal state for UI while keeping updating to app state. I created a `innerValue` state that `onChange` handler would modify, and input would use this `innerValue` for displaying; `innerValue` change would also trigger an effect to update app value. So here comes the problem: this effect was not in the existing component; in the old way, everything was handled in an event handler. Because of this effect, the new component could be in infinite rerendering situation when updating app value would subsequently cause this component to rerender(because app value is kept in parent state). 

So here comes my lesson: always consider to use alternative for `useEffect`. I mean, react team officially also says [you might not need `useEffect`](https://react.dev/learn/you-might-not-need-an-effect). I would go further and say just do not change event handler to `useEffect` under any circumstance; if it was working with an event handler, you can make it still work even with new states introduced. 


