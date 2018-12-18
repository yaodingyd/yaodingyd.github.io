---
layout: post
title:  "How Lerna Enables Monorepo to work"
date:   2018-12-18
---

We need to know how [Node module resolution algorithm](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders) works first: When looking for package A, it looks in a local `node_modules/A` directory, then in `../node_modules/A`, `../../node_modules/A`, `../../../node_modules/A`, etc.

So the issue with monorepo is **local dependencies** and **duplicate dependencies**.

### Local Dependencies

That's easy. When Lerna bootstraps, it would replace all local modules in node_modules to sim links pointing to your local directory.

Does that means all the `packages` folder's node_modules are flooded with sim links (and other non-local dependencies)?

### Duplicated dependencies

Lerna solves this by hoisting all dependencies to the top-level directory, similar to variable hosting in javascript. Because of how node resolves module, the dependencies can all be found in the top-level directory, usually the root of this project's node_modules.
