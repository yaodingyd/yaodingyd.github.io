Use `map` over object

First there are several pitfalls using objects as a map:
Inheritance would affect reading properties. `for...in...` considers inherited enumerable properties. In contrast, `Object.keys()` lists only own properties. Also, special reserved property like `__proto__` limits usages.

You can use any type for `map`'s key, but object key can only be string.
Also `map` is better to do iterations on keys. You can use `forEach` and spread operator `...`
Moreover, `map.keys()` `map.values()` `map.entries()` alongn with `map` are all iterables, which can be used with `for...of...` and spread operator. 



#how to flatten an array

```javascript
const scalar = v => !Array.isArray(v);
const flatten = (deep, flat = []) => {
  if (deep.length === 0) return flat;
  let [head, ...tail] = deep;
  if (scalar(head)) {
    return flatten(tail, flat.concat(head));
  } else {
    return flatten(tail, flat.concat(flatten(head)));
  }
}
``` 


https://stackoverflow.com/questions/19779438/dom-tree-traversal