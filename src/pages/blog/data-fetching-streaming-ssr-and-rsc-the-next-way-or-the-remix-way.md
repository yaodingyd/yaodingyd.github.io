---
layout: "../../layouts/BlogPost.astro"
title: "Data Fetching, Streaming SSR and RSC: the Next way or the Remix way"
pubDate: "Nov 24 2022"
---

The recent two big announcements from the React community(or if you only care about React, then that qualifies as the whole web community) is the release of Next.js 13 and Remix joining Shopify. Admittedly, meta frameworks increasingly are like smartphones these days: they look alike, use similarly but are implemented differently to claim they run better benchmarks, and this applies for Next.js 13 and Remix too: a lot similarities (nested route, layout, server side data-fetching) but some fundamentally different implementations. 

Next.js 13 is deemed as almost the official React framework by the React core team, with its integration with streaming Server Side Rendering(SSR) and React Server Component(RSC), while Remix, coming from react-router, takes a different approach and leans more on the web platform. Let's look at these differences and learn about the tradeoffs.

## Streaming SSR

HTML streaming is not really a new thing. [There are posts dated as early as from 2005](https://blog.codinghorror.com/the-lost-art-of-progressive-html-rendering/), and it has been kept mentioned over the years, but just never took off. [Taylor Hunt wrote a nice article about why it is not common](https://dev.to/tigt/the-weirdly-obscure-art-of-streamed-html-4gc2), and aside from inconsistent naming and poor support, I think another reason on a deeper level is the gain of actual decreased Time to First Byte (TTFB) comparing with heavy implementation effort is just too marginal(see an example [here](https://remix.run/blog/react-server-components#ssr-streaming-nextjs-demo)).  

Even though this is considered as a core piece of [the React architecture](https://twitter.com/dan_abramov/status/1585095883309617154) and [soon will be in Remix](https://twitter.com/ryanflorence/status/1586820807581261824) too, I still feel like it will end up like web components: everyone knows about it but no one uses it just because there are better alternatives. But if somehow Next.js can make this as ergonomical and practical as possible, and it can be used out-of-the-box and app naturally get optimized TTFB, it might get adopted widely, so let's wait and see. 

## RSC

The biggest advantage of using RSC is of course to reduce the codes shipped to the client side. On the Remix side, it touts the concept of Progressive Enhancement, that apps will work correctly without JavaScript and all assets are prefetched/preloaded in parallel. So either way the initial runtime should not scale as the application codebase grows. Another big selling point of RSC is that server logic co-locates with corresponding components, and Remix achieves the same goal with route-level loader/actions. In my opinion, this view/logic colocation might be the best thing and drastically improves the developer experience, saving so much back-and-forth when developing APIs and views together. 

RSC definitely has its perks, although the mental model of differentiating server and client components could be repetitive and error prone, as mentioned in [Shopify's post about why they turn to the Remix model](https://hydrogen.shopify.dev/roadmap/?shpxid=a60ff6a6-660E-48E8-C426-B7CA02B7D7E9#data-loading). Developers would need to carefully plan their components structure and pay attention to the constraints of using server and client component, with [the incoming change to hooks](https://github.com/reactjs/rfcs/pull/229) further increases the cognitive efforts. My two cents is this very much feels like a leaky abstraction which can be solved with something like a compiler -- React would just know if this should be a server or client component, instead of asking user to do the grunt work. Hopefully there will be something like [React without memo](https://www.youtube.com/watch?v=lGEMwh32soc) in the future, but for RSC.

## Data Fetching

The key differences for data fetching as summed by the Shopify team is whether the queries are run on route-level (loader in Remix) or component-level (RSC in Next). For each request, for Remix all data fetchers within nested routes are called in parallel, then Remix return a completed rendered HTML; while Next.js returns HTML immediately with placeholders(Suspense), fetching data sequentially following component hierarchy, then returns with a completed rendered HTML. This seems to be a [philosophical design differences between these two projects](https://twitter.com/ryanflorence/status/1586820806625046529). Each pattern has its use case, as the [Remix team describes](https://remix.run/blog/react-server-components#our-take) RSC 

> has a chance of providing a better UX when your user's network is fast, but your server's data loading is slow.
 
That means if your server is always fast, and you cannot guarantee your user's network is fast too, Remix might be better. The interesting part about Shopify buying Remix, is that I would assume Shopify is very confident about its API will never be slow, so the server rendering model is better than the streaming model. 

## Final thoughts

There will never be a perfect web framework, and you should really weigh in the tradeoffs based on the use cases, but generally you can't go wrong choosing either one here. Both are battle-tested, developed by brilliant people and backed by large companies. Next.js might has the upper hand of having the largest community, but since Shopify bought Remix, it might also get more community support. I'm very excited about the future both frameworks bring to us!