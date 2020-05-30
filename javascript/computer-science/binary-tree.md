# Binary Trees

## Binary search tree (BST), ordered or sorted

> [Binary search tree](https://en.wikipedia.org/wiki/Binary_search_tree)

A tree with two leaves, each leave could be a tree.

Search complexity is `O(h)`, where `h` is the height of the tree.

The binary search tree is sorted when the left side value of the tree is not bigger than the root value (`<=`) and the right side value of the tree is not smaller than the root value (`=>`).

Example representation:

```text
      3
    /   \
   2     5
  /     / \
 1     4   6
            \
             7
Projection down:
1-2,3,4-5-6-7
```

```javascript
let createNode = (value, nodes = [], leaf = true) => ({value, nodes, leaf});
```

## Self-balancing (or height-balanced) binary search tree

> [Self-balancing (or height-balanced) binary search tree, Wikipedia](https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree)

## B tree

B tree nodes can store more values and also they can have more than two children per node.

Example representation:

```text
      4
    /   \
   2     [6, 8]
  / \    / \  \
 1   3  5   7 [9, 10, 11]
```

```javascript
let createNode = (values, nodes = [], leaf = true) => ({values, nodes, leaf});
```

## Balanced B tree

Two Implementations of the Self-balancing binary search tree:

- Red Black tree - symmetric binary B-tree.
- AVL tree is a self-balancing Binary Search Tree (BST) where the difference between heights of left and right subtrees cannot be more than one for all nodes.

Example of rebalance:

```text
      2        |       4
    /   \      |     /   \
   1     4     |    2     5
        / \    |   / \     \
       3   5   |  1   3     6
            \  |
             6 |
```

## B+ tree

[what-are-the-differences-between-b-trees-and-b-trees](https://stackoverflow.com/questions/870218/what-are-the-differences-between-b-trees-and-b-trees)

A B+ tree is similar to the B-tree in which each node contains only keys, and at the bottom level there one more level with linked leaves which has pointers to the data (nodes).

Example representation:

```text
        4
    /        \
   2         [6, 8]
  / \     /     |     \
 [1,2]>[3,4]>[5,6,7]>[8, 9]
```

```javascript
let createNode = (values, next, nodes = [], leaf = true) => ({values, next, nodes, leaf});
```
