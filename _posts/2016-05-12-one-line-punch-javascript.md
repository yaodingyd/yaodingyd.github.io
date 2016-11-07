---
layout: post
title:  "One Line Punch JavaScript"
date:   2016-05-12 
---

#### Check a number is power of n
`n > 0 && Math.log10(a) / Math.log10(n)  % 1  === 0`

### Check a number is power of 2
`n > 0 && !(n & (n-1))`

#### Merge/flatten a multidimensional array in JavaScript
`Var merged = Array.prototype.concat.apply([], array)`

### Nodelist to array
`Array.prototype.slice.call(document.childNodes)`

### Implement Spacify('hello world')  => 'h e l l o  w o r l d'
`str.split('').join(' ')`

### Reverse a string
`str.split(‘’).reverse.join(‘’)`

### Duplicate an array
`var b = a.concat(a.slice())`

### Implement isInteger() function
`x^0 === x or Math.floor(x) === x or x%1 === x`


### Adding digits of an integer(also called digital root)
`num === 0 ? 0 :num - 9 * Math.floor((num-1)/9)`

### Sort array based on numbers
`array.sort(function(a, b){return a-b;})`

### Generate a random string
`Math.random().toString(36).substr(2)`

### Binary to Gray
`num ^ (num>>1)`

### Number less than n bit
`num < 1<< n`

### Get linked list center
`fast = head.next.next, slow = head.next`
