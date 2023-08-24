---
layout: "../../layouts/BlogPost.astro"
title: "Raw String, Interpreted String, and Escaping Characters"
pubDate: "Jun 16 2023"
---

When we write a string in almost all programming languages, the string is actually interpreted, and it means that what you write is not always what you get. This is usually because of escaping characters, which are almost always represented by a backslash `\`. For example, the string "t\eam" has 5 characters in it, but if you print the length of this string, it will always be 4 no matter in what programming language, because the backslash is not treated as a regular character. When you print out the whole string, the escaping sequence would be checked for validity. If it's valid, the converted character is printed; otherwise, the escaping is discarded and the rest of the whole string is printed.

## Let's see an example

In Python, the `"\c"` sequence is not recognized as a special character sequence. Therefore, when you compare `"\c"` and `"\\c"`, they are considered equal because the second backslash "\" is treated as an escape character, representing a single backslash character. So both `"\c"` and `"\\c"` are treated as the same string `"\\c"`.

However, in JavaScript, although `"\c"` is also not recognized as a special character sequence. but when do comparison with `"\\c"`, they are not considered equal.

```python
# Python
"\c" == "\\c"   # true
len("\c") == 2  # true
len("\\c") == 2 # true
print("\c")     # \c
```

```
// JavaScript
"c" !== "\\c"; // true
"c".length === 1; // true
"\\c".length === 2; // true
console.log("c"); // c
```

In other languages like Go, if the escaping sequence is not valid, the compiler will throw an error. Therefore, "c" would not pass compilation at all. If you check `len("\\c")` and it equals 2, it matches the expected behavior.

If this is not already complicated enough, if you have some JSON data and want to convert it to an object notation in one programming language, you always have to do `\\\\` to represent one literal backslash. So for python code:

```python
my_string = "This is a literal backslash: \\"
```

you need to do

```json
"This is a literal backslash: \\\\"
```

# Raw string

If you want to obtain the raw representation of a string, then a raw string is what you're looking for. In Python, we have `r""` , and in JavaScript, we have `String.raw`. These treat every character within a string as a regular character.

```python
# Python
len(r"\c")   # 2
print(r"\c") # \c
```

```
// JavaScript
String.raw`\c`.length; // 2
console.log(String.raw`\c`); // \c
```
