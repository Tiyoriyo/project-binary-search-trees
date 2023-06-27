/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
import node from './node.js';
import mergeSort from './mergeSort.js';
import duplicateRemover from './duplicateRemover.js';
import prettyPrint from './prettyPrint.js';

const tree = (array) => {
  let data = mergeSort( // Returns Sorted Array with duplicates removed.
    duplicateRemover(array),
  );

  function buildTree(start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = node(data[mid]);
    root.setLeft(buildTree(start, mid - 1));
    root.setRight(buildTree(mid + 1, end));
    return root;
  }

  function insertRec(root, value) {
    if (root === null) return node(value);
    if (value > root.root) {
      root.setRight(insertRec(root.right, value));
    } else if (value < root.root) {
      root.setLeft(insertRec(root.left, value));
    }
    return root;
  }

  function deleteRec(root, value) {
    if (root.root === value) {
      if (!root.left && !root.right) return null;
      if (root.left && !root.right) return root.left;
      if (root.right && !root.left) return root.right;
      if (root.left && root.right) {
        let target = root;
        let temp = target.right;
        while (temp.left) { temp = temp.left; }
        target.root = temp.root;
        target.setRight(deleteRec(target.right, temp.root));
        return target;
      }
    }

    if (value > root.root) {
      root.setRight(deleteRec(root.right, value));
    } else if (value < root.root) {
      root.setLeft(deleteRec(root.left, value));
    }
    return root;
  }

  function insert(value) {
    this.root = insertRec(this.root, value);
  }

  function deleteValue(value) {
    this.root = deleteRec(this.root, value);
  }

  return {
    root: buildTree(0, data.length - 1),
    insert,
    deleteValue,
  };
};

const treeArray = tree([50, 23, 23, 10, 25, 34, 44]);
// 2, 3, 4, 5, 6, 8, 10

treeArray.insert(2);
treeArray.insert(12);
treeArray.insert(12);
treeArray.insert(37);
treeArray.insert(33);
treeArray.insert(1);
treeArray.insert(-12);
treeArray.insert(-12);
treeArray.insert(-13);
treeArray.insert(74);
treeArray.insert(333);
treeArray.insert(200);
treeArray.insert(45);
treeArray.insert(46);
treeArray.insert(47);
treeArray.deleteValue(50);
console.log(prettyPrint(treeArray.root));

// if (start > end) return null;
// const mid = Math.floor((start + end) / 2);
// const root = node(data[mid]);
// root.setLeft(buildTree(start, mid - 1));
// root.setRight(buildTree(mid + 1, end));
// return root;

// 3, 1, 2, 4
// 1, 2, 3, 4   Mid = index 1;  mid - 1 = 0; mid + 1 = 2; Root = Node(2);
// [1], /2/, [3, 4]
// 1 Root = 0; buildTree(0, 0-1)
// buildTreeRight(1, 0)
