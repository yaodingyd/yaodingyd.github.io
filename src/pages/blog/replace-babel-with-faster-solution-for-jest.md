---
layout: "../../layouts/BlogPost.astro"
title: "Replace Babel with Faster Solution for Jest"
pubDate: "August 23 2023"
---

## Introduction

Recently at work I stumble onto investigating how to improve unit tests run time. We have a large React codebase and use jest with babel for unit tests. All code are in EMS, so naturally the compilation time is the bottleneck. A brilliant colleague found out manually treeshake unused imports from test file greatly reduce testing time, meaning only to keep the actual used functions in test files' direct import. I went on another journey and tried to find if we can replace babel with [SWC](https://swc.rs/) or [esbuild](https://esbuild.github.io/).

## esbuild

First I looked into [esbuild-jest](https://github.com/aelbore/esbuild-jest) because we already used esbuild for production code. But I'm not sure if it's a good replacement:

1. it's not a huge deal, but it's not maintained by the official esbuild team;
2. it still uses some [babel code to do commonjs transform](https://github.com/aelbore/esbuild-jest/blob/master/src/transformer.ts#L6);
3. you'll need to [run node in experimental esm mode](https://github.com/aelbore/esbuild-jest/issues/48) to support some feature, like dynamic import

I spent one hour and was still not able to run a single test case successfully, mostly because our code are so complicated. So I guess I need to move on

## swc

[@swc/jest](https://swc.rs/docs/usage/jest) markets itself as "drop-in Rust replacement for babel-jest/ts-jest". I can say that this statement is 90% true: I did the initial setup and most of the tests passed, with some issues that are relative easy to fix (I'll talk about them later in detail). The performance gain is huge: when running locally for one of the expensive tests no cache, which last 60s, using @swc/jest saved 2/3 time to only 20s. I continued my tests and run the whole suite in CI. I can't share the actual images and numbers but the outcome is amazing: time on whole test suite cut in half! At this time it's more than enough to convince me that @swc/jest is the way to go.

## Possible issues of using swc

There are some issues when converting to swc, and it is clearly documented on their part. Mostly because [swc correctly implemented the ESM spec](https://github.com/swc-project/swc/issues/5205). The following issues are all part of it:

#### issue 1

Directly mock ESM would fail. For example the following code would throw error

```javascript
import * as Foo from "foo";
beforeEach(() => {
  jest.spyOn(Foo, "fooFunction").mockResolvedValue(redis);
});
// this would throw "TypeError: Cannot redefine property: fooFunction"
```

This is considered expected according to ESM spec, because an ESM import is not configurable, so you cannot change or redefine its property. Though in current babel transpilation it would work. [To fix it is easy too](https://github.com/aelbore/esbuild-jest/issues/26#issuecomment-968853688):

```javascript
import * as Foo from "foo";
// first mock the export, then mock its function
jest.mock("foo", () => ({
  __esModule: true,
  ...jest.requireActual("foo"),
}));

it("foo", () => {
  // now it will work
  jest.spyOn(Foo, "fooFunction");
});
```

#### issue 2

This is just a different format of the first issue, assigning jest mock function to imports would throw error. For example:

```javascript
import * as Foo from "foo";

Foo.fooFunction = jest.fn;

// TypeError: Cannot set property fooFunction of [object Object] which has only a getter
```

Again this is the correctly ESM export behavior as the exported object is read only, and `@swc/jest`` respects it, while babel-jest does not. To fix it is simple, just mock the import:

```javascript
import * as Foo from "foo";

jest.mock("foo", () => ({
  __esModule: true,
  ...jest.requireActual("foo"),
}));

Foo.fooFunction = jest.fn;

// now it works
```

#### issue 3

Calling jest.mock() with the module factory parameter will always throw error if it tries to access a variable. This will not work even if you prefix variable name with 'mock'. @swc/jest does not respect this disable check rule and [consider it a jest issue](https://github.com/swc-project/swc/issues/7005). So this will not work:

```javascript
const mockfunction = jest.fn();
jest.mock("foo", () => ({
  fooFunction: mockFunction,
}));
// this would throw "ReferenceError: Cannot access 'mockFunction' before initialization"
```

Again, it's easy to fix:

```javascript
import { fooFunction } from 'foo'

jest.mock('foo', () => ({
    fooFunction: jest.fn()
}))

const mockFunction = fooFunction as jest.MockFunction<typeof fooFunction>
// continue to use mockFunction as usual
```

## Conclusion

Overall the switching from `babel-jest` to `@swc/jest` is smooth enough, and fixing these issues actually made me learn more about ESM spec. I think I would default to use `@swc/jest` for any future project that uses jest for testing.
