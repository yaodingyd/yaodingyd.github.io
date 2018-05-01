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

*Rule of thumb to prevent infinite loop in binary search* if there is a `return` or `break` inside your while loop for equal condition, then you can use `left <= right`; otherwise use `left < right`


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
  return right
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
Now `while`  doesn't include equal because it would result in a infinite loop when `middle` is assigned to right.

It is easy to understand to include middle into left/right:

```
// the target is 4
l        r
----------
1, 2, 3, 4, 4, 4, 5, 6, 7            

               l        r
               ----------
1, 2, 3, 4, 4, 4, 5, 6, 7
```

The tricky part is how to prevent infinite loop. When there is only two numbers in left to right range, middle would be left if  `Math.floor((left + right)/ 2)`, and in the next if condition middle is reassgined to left, thus an infinite loop. Here computing middle is  `Math.floor((left + right + 1)/ 2)`, in this way middle would be right if there are only two numbers.


### Find number is a rotated array

Now there is another variation: a sorted array could rotate around a pivot, so `[1,2,3,4,5,6,7,8]` is `[4,5,6,7,8,1,2,3]` now. We can still use binary search, but we need to make sure of the sorted and unsorted half of the array. 

```javascript
function searchInRotatedArray(nums, target) {
  var left = 0, right = nums.length - 1
  while (left <= right) {
      var mid = left + (right-left)/2
      if(nums[mid]===target) return mid
      
      if (nums[mid] < nums[right]) { // right half sorted
          if (target > nums[mid] && target <= nums[mid])
              left = mid + 1;
          else
              right = mid - 1 ;
      }
      else  (nums[mid] > nums[left]) {  // left half sorted
          if (target >= nums[left] && target < nums[mid]) 
              right = mid - 1;
          else
              left = mid + 1;
      } else {
        right--
      }
  }
  return -1;
}
```

The last `else` is for if there are duplicates in the array, say `[1,3,1,1,1]`. Now the `mid`, `left` and `right` are both the same and we can't decide which half is sorted. In such scenario the only solution is to exclude left/right and time complexity goes from O(ln(n)) to O(n)