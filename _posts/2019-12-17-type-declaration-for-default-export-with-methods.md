---
layout: post
title:  "Type Declaration for Default Export with Methods"
date:   2019-12-17
tags:
    - Typescript
---

Today at work I had to write a `d.ts` file for an old library. It is a customized `fetch` library which has a default export `fetch` function, and it also has `post`, `get`, `delete` and all the short methods, 
so you can use it like:

```javascript
fetch('someurl', 'get', {});
// or
fetch.get('someurl', {});
``` 

Solution first:

```typescript
declare function fetch(url: string, method: string, options: FetchOptions): Promise<T>;
declare namespace fetch {
  function shortMethod<T>(url: string, options?: FetchOptions): Promise<T>;
  // so we work around this by doing an aliased export
  export { 
    shortMethod as get,
    shortMethod as post,
    shortMethod as delete, 
  };
}

export default fetch;
```

As you can see, we have declared a function and namespace with the same name. This is call **Declaration Merging**. It means that the compiler merges multiple separate declarations declared with the same name into a single definition, and this merged definition has the features of all of the original declarations.
So you later in your typescript file, you can safely use both `fetch` and `fetch.get`.

OK, so why do we use alias then? That's because `delete` is a reserved word in typescript so we cannot directly do `export function delete`, in this way typescript would give you an error.

### Namespace (and module)

This is a typical, and possibly one of the only two actual usage of namespace: to port old javascript code. Most of the time when we want to group code together, we would use module instead. So what's the difference between these two?

Namespace is the typescript way to handle scope issue, and that's why we always say __global namespace__; it can be spread into multiple files, and we don't have to import them to use them. That is also why we want to move towards module, and the other usage is to define stuff on global namespace. 

Module, is almost the same as the one in ES6: we don't usually explicitly use the keyword `module`, whenever we do `import` or `export`, we are dealing with module. The one use case to use `module` is in ambient modules(declarations that don’t define an implementation, in other words, stuff in `d.ts` file).
For example, we want to import `url` nodejs module, or some __svg__ file, we can do:
```typescript
declare module "url" {
  export interface Url {
    pathname?: string;
  }
}
declare module "*.svg" {
  const content: any;
  export default content:
}
```
