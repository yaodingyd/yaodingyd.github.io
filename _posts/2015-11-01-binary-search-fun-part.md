---
layout: post
title:  "Binary Search Fun Part"
date:   2015-11-01
tags:   
    - Algorithm
---

Binary search seems very simple but it can be tricy too.

### The basic implementation

Very intuitive: 
```javascript
function binarySearch(nums, target) {
  var left = 0
  var right = nums.length - 1
  var middle
  while (left <= right) {
    middle = Math.floor((left + right)/ 2)
    if (nums[middle] === target) {
      return middle
    } else if (nums[middle] > target) {
      right = middle - 1
    } else {
      left = middle + 1
    }
  }
  return -1
}
```

Pitfalls to watch for:
1. Exclude `middle` from setting `right`/`left`
2. While condition includes `==` for it would be handled by `return`, so there is no infinite loop
3. `middle` could be equal to `left`


### Get range

There is a variation that in a sorted array which could contain duplicates, returns the leftmost and rightmost target index. So in [1,2,3,4,5,5,5,6,7,8], the leftmost 5 index is 4, the rightmost 5 index is 6.

This can be solved by a variation of binary search: instead of returning the index once we find the target, we try to get the closest (left, right) pair.
```javascript
function getLeftmost(nums, target) {
  var left = 0
  var right = nums.length - 1
  var middle
  while (left < right) {
    middle = Math.floor((left + right)/ 2)
    if (nums[middle] >= target) {
      right = middle
    } else {
      left = middle + 1
    }
  }
  return left
}

function getRightmost(nums, target) {
  var left = 0
  var right = nums.length - 1
  var middle
  while (left < right) {
    middle = Math.floor((left + right + 1)/ 2)
    if (nums[middle] <= target) {
      left = middle
    } else {
      right = middle - 1
    }
  }
  return left
}
```
Now the while condition doesn't include equal because it would result in a infinite loop when `middle` is assigned to right.

It is easy to understand to include middle into left/right:

```
// the target is 4
l        r
----------
1, 2, 3, 4, 5, 6, 7            

         l        r
         ----------
1, 2, 3, 4, 5, 6, 7
```

The tricky part is how to prevent infinite loop. When there is only two numbers in left to right range, middle would be left if  `Math.floor((left + right)/ 2)`, and in the next if condition middle is reassgined to left, thus an infinite loop. Here computing middle is  `Math.floor((left + right + 1)/ 2)`, in this way middle would be right if there are only two numbers.

