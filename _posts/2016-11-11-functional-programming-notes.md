---
layout: post
title:  "Functional Programming Notes"
date:   2016-11-11 
---

### Glossary

#### Lamda Expression
Anonymous function, a function defined and called without being bound to an identifier.

#### Idempotence
Given the same inputs,it will always return the same output, regardless of the number of times the function is called. HTTP requests are idempotent too.

#### Side-effects
Global state( or shared state) is changed, input argument is modified or there is I/O events because of calling a function.

#### Pure Function
Pure function is idempotent and maintains immutability. It means:
1. Given the same input, will always return the same output.(idempotent)
2. Produces no side effects.
3. Relies on no external state.

#### Referential Transparency
An expression is said to be referentially transparent if it can be replaced with its corresponding value without changing the program's behavior. A pure function is referential transparent.

#### Immutable Variables
Based on the context, it always means a function would return new variables instead of modifying the input argument.

#### Function Composition
Build more complex function with smaller functions.


#### Function Currying
Call a function with fewer arguments than it wants and that function returns another function to accept the rest of the arguments


