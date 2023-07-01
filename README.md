# project-binary-search-trees
Binary Search Tree datastructure created with JavaScript, as instructed by the glorious Odin Project

## Features
- `tree(array)` factory function for binary search tree that initializes with given array
- `insertVal(value)` inserts a value into the BST
- `deleteVal(value)` deletes a value from the BST
- `find(value)` returns the node containing the given value
- `levelOrderItr(callback)` returns an array of values obtained via breadth first traversal, and calls each of them through the callback function if one is given
- `inorder(undefined, callback)` returns the BST values via inorder traversal, and calls each of them through the callback function if one is given.
- `preorder(undefined, callback)` returns the BST values via preorder traversal, and calls each of them through the callback function if one is given.
- `postorder(undefined, callback)` returns the BST values via postorder traversal, and calls each of them through the callback function if one is given.
- `height()` returns height of the BST
- `depth(value)` returns depth of the node containing the given value
- `balancedCheck()` returns true or false depending on if the BST is balanced or not
- `reblance()` rebalances the BST if it is unbalanced
