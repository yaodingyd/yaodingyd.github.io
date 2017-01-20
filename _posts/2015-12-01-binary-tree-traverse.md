---
layout: post
title:  "Binary Tree Traversal"
date:   2015-12-01
tags:   
    - Algorithm
---

## Depth-first Search

### Pre-order, In-order, Post-order in recursive manner

```java
public class TreeTraversal {
    public ArrayList<Integer> traversal(TreeNode root) {
        ArrayList<Integer> res = new ArrayList<Integer>();
        if (root == null) {
            return res;
        }
        // traverse would be preOrder, inOrder, postOrder
        traverse(root, res);
        return res;
    }
    
    private void preOrder(TreeNode node, ArrayList<Integer> res) {
        if (node != null) {
          res.add(node.val);
          preOrder(node.left, res);
          preOrder(node.right, res);
        }
    }

    private void inOrder(TreeNode node, ArrayList<Integer> res) {
        if (node != null) {
          inOrder(node.left, res);
          res.add(node.val);
          inOrder(node.right, res);
        }
    }

    private void postOrder(TreeNode node, ArrayList<Integer> res) {
        if (node != null) {
          postOrder(node.left, res);
          postOrder(node.right, res);
          res.add(node.val);
        }
    }
}
```

### Iterative solution

```java
public ArrayList<Integer> preOrder(TreeNode root) {
    ArrayList<Integer> res = new ArrayList<Integer>();
    if (root == null) {
      return res;
    } 
    Stack<TreeNode> stack = new Stack<TreeNode>();
    TreeNode cur;
    stack.push(root);
    while(!stack.empty()) {
        cur = stack.pop();
        res.add(cur.val);
        if (cur.right != null) {
            stack.push(cur.right);
        }
        if (cur.left != null) {
            stack.push(cur.left);
        }
    }   
    return res;
}

// binary search tree construction
public ArrayList<Integer> inOrder(TreeNode root) {
    ArrayList<Integer> res = new ArrayList<Integer>();
    if (root == null) {
        return res;
    }
    
    Stack<TreeNode> stack = new Stack<TreeNode>();
    TreeNode cur = root;
    
    while(!stack.empty() || cur != null) {
        if (cur != null) {
            stack.push(cur);
            cur = cur.left;
        } else {
            cur = stack.pop();
            res.add(cur.val);
            cur = cur.right;
        }
    }
    
    return res;
}
// push action in one place
public ArrayList<Integer> postorderTraversal(TreeNode root) {
  Stack<TreeNode> stack = new Stack<TreeNode>();
  ArrayList<Integer> res = new ArrayList<Integer>();
  
  if (root == null) return res;
  TreeNode cur = root;
  TreeNode prev = null;
  
  while(!stack.empty() || cur != null) {
      if (cur != null ) {
          stack.push(cur);
          cur = cur.left;
      } else {
          TreeNode peek = stack.peek();
          // there is a right node and not visited, then we proceed with this node
          if (peek.right != null && peek.right != prev) {
              cur = peek.right;
          } else {
              res.add(peek.val);
              prev = stack.pop();
          }
      }
  }
  
  return res
}   
```


### Get max and min depth 
```java
public class Solution {
  public int maxDepth(TreeNode root) {
    return getDepth(root);
  }
  
  private int getMaxDepth(TreeNode node) {
    if (node == null) return 0;
    if (node.left == null && node.right == null) return 1;
    return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
  }

  private int getMinDepth(TreeNode node) {
    if (node == null) return Integer.Max_VALUE; // rule out non-tree branch
    if (node.left == null && node.right == null) return 1;
    return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
  }
```


### Breadth-first Search

```java
public ArrayList<Integer> postorderTraversal(TreeNode root) {
  Queue<TreeNode> queue = new Queue<TreeNode>();
  ArrayList<Integer> res = new ArrayList<Integer>();

  TreeNode cur = null;

  queue.add(root);
  while(!queue.empty()) {
    cur = queue.remove();
    res.add(cur.val);
    if (cur.left != null) {
      queue.add(cur.left);
    }
    if (cur.right != null) {
      queue.add(cur.right);
    }
  }
  return res;
}
```
