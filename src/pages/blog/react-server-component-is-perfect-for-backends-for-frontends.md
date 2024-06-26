---
layout: "../../layouts/BlogPost.astro"
title:  "React Server Component is perfect for Backends-for-Frontends"
pubDate: "Jun 24 2024"
---
By now, you should be familiar with React Server Components (RSC) or at least have heard about them. RSC is the latest addition to React's feature set, offering significant benefits such as reduced client-side JavaScript bundles, improved user experience by eliminating extra network roundtrips, and the ability to run server code directly in React components. As someone who has always worked in a traditional team setup with separate backend and frontend teams, I've been contemplating the feasibility of both teams adopting this paradigm. It's clear that there are some major hurdles to overcome.

## How conventional backend/frontend works

Let's first revisit the non-RSC server/client development flow. Suppose you have a list of product features to implement. Typically, the following would occur:

1. A design review where backend and frontend teams agree upon an API specification that defines server behavior. While implementation is discussed, the focus is usually on the interface.
2. The Backend team will implement the server behavior with this API spec, and release under a version, like `/api/v1/my-product`.
3. The frontend team consumes this API and builds the UI behavior.
4. Work for backend and frontend teams might happen sequentially, but it could also occur in parallel. Once the API is defined, frontend teams can mock test data based on the API interface.
5. When new product requirements arise, the API can be enhanced or deprecated in favor of a new version with breaking changes. The frontend team can simply switch to different API versions to opt into different behaviors.

While this flow may seem to have significant overhead, it offers some notable benefits:
- Frontend and backend can test their parts completely in isolation and achieve end-to-end testing within their respective boundaries.
- API endpoints remain stable as long as the version doesn't change, ensuring consistent server behavior.
- Maintaining different versions of UIs is relatively inexpensive, as we can simply replace calls to different endpoints.

## Implementing RSC in Conventional Backend/Frontend Setup

Now, let's examine how RSC would work. For a fair comparison, we can assume both backend and frontend teams have domain knowledge of JavaScript and React. We can split work into a server component that handles data fetching and business logic processing, then passes data as props to a client component. Several considerations come to mind:

1. **Fuzzy server responsibilities**: Without a clear return from server components, everything becomes an implementation detail. Previously, API endpoints provided a defined contract to follow. With server components, we don't have explicit expectations from the server, requiring code analysis to determine what the server component should fetch and pass down to the client. This lack of clarity might reduce confidence in refactoring server code.
2. **Increased testing complexity**: How would you test that a server component is working as expected? With API endpoints, we can perform integration tests to ensure that given certain requests, responses match expectations. For server components, ensuring proper data fetching and return becomes more challenging, likely requiring extensive mocking and tapping into implementation details to test in isolation.
3. **Maintaining stable server behavior**: With API endpoints, we have versioning. Do we need to maintain different versions of server components? This could add another layer of ambiguity to server implementation.

For enterprise applications, debugging processes involving backend interactions with datastores can be particularly challenging. When server components handle all aspects, this complexity could increase significantly.

On a positive note, server actions may be easier to adopt as they are pure functions with clear inputs and outputs. We can treat them similarly to API endpoints, with stable and clear interfaces, isolated testing, and version control.

However, in large organizations where backend and frontend teams often work with different stacks or in separate repositories, implementing these approaches can be challenging.

## Backends-for-Frontends: A Perfect Fit for RSC

React Server Components (including server actions) could be an ideal fit for the [backends-for-frontends(BFF)](https://samnewman.io/patterns/architectural/bff/) pattern. In this pattern, we would have dedicated API endpoints for specific UI behavior, and the endpoints will typically be maintained by the UI team. We still have general-purpose backend that connects to datastore and do heavy-lifting business logic, and react server component will just handles the BFF part. 

As Sam Newman states:
> "The BFF is tightly focused on a single UI, and just that UI."

Since BFF is tightly coupled to a single UI, we needn't worry about strong contracts for server behavior, as the UI is the sole output. We should no longer test backend and frontend in isolation, as they are both part of the implementation details. Instead, we should focus on end-to-end testing.

The benefits of server components shine in this context:
- We can skip the overhead of releasing API endpoints.
- We achieve better code colocation for all frontend code.
- We eliminate multiple network roundtrips to fetch data.
- Client bundle size is significantly reduced.

It's a perfect match for the BFF pattern.

## Conclusion

Ryan Florence, creator of Remix (a React server framework), aptly described Remix as a [center stack](https://x.com/ryanflorence/status/1791477026060452091). I believe RSC serves a similar purpose, sitting between users and the general backend, bridging the network in the process. With that in mind, the future looks promising for React Server Components.
