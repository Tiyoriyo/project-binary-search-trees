/* eslint-disable no-param-reassign */
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
    root.left = buildTree(start, mid - 1);
    root.right = buildTree(mid + 1, end);
    return root;
  }

  function insertRec(root, value) {
    if (root === null) return node(value);
    if (value > root.value) {
      root.right = insertRec(root.right, value);
    } else if (value < root.value) {
      root.left = insertRec(root.left, value);
    }
    return root;
  }

  function findMin(node) {
    let temp = node.right;
    while (temp.left) { temp = temp.left; }
    return temp.value;
  }

  function deleteRec(root, value) {
    if (!root.left && !root.right) return null;
    if (value < root.value) {
      root.left = deleteRec(root.left, value);
    } else if (value > root.value) {
      root.right = deleteRec(root.right, value);
    } else { // If root value equals given value
      if (root.left && !root.right) return root.left;
      if (root.right && !root.left) return root.right;
      if (root.right && root.left) {
        let tempValue = findMin(root);
        root.value = tempValue;
        root.right = deleteRec(root.right, tempValue);
        return root;
      }
    }
    return root;
  }

  function find(root, value) {
    if (!root) return null;
    if (value < root.value) {
      return find(root.left, value);
    } if (value > root.value) {
      return find(root.right, value);
    }
    if (value === root.value) { return root; }
  }

  function levelOrderItr(root, callback) {
    if (!root) return null;
    let queue = [];
    let array = [];
    queue.push(root);
    while (queue.length) {
      let current = queue[0];
      array.push(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      queue.shift();
    }
    return array;
  }

  function inorderRec(root, callback) {
    if (!root) return null;
    let array = [];
    if (root.left) array = array.concat(inorderRec(root.left));
    array.push(root.value);
    if (root.right) array = array.concat(inorderRec(root.right));

    return array;
  }

  function preorderRec(root, callback) {
    if (!root) return null;
    let array = [];
    array.push(root.value);
    if (root.left) array = array.concat(preorderRec(root.left));
    if (root.right) array = array.concat(preorderRec(root.right));

    return array;
  }

  function postorderRec(root, callback) {
    if (!root) return null;
    let array = [];
    if (root.left) array = array.concat(postorderRec(root.left));
    if (root.right) array = array.concat(postorderRec(root.right));
    array.push(root.value);

    return array;
  }

  function insertValue(value) {
    this.root = insertRec(this.root, value);
  }

  function deleteValue(value) {
    this.root = deleteRec(this.root, value);
  }

  function findPre(value) {
    return find(this.root, value);
  }

  function levelOrder(callback) {
    return levelOrderItr(this.root, callback);
  }

  function inorder(callback) {
    return inorderRec(this.root, callback);
  }

  function preorder(callback) {
    return preorderRec(this.root, callback);
  }

  function postorder(callback) {
    return postorderRec(this.root, callback);
  }

  return {
    root: buildTree(0, data.length - 1),
    insertValue,
    deleteValue,
    findPre,
    levelOrder,
    inorder,
    preorder,
    postorder,
  };
};

const treeArray = tree([50, 25, 5, 0, 75, 15]);
// 2, 3, 4, 5, 6, 8, 10

treeArray.insertValue(65);
treeArray.insertValue(63);
treeArray.deleteValue(50);
// console.log(treeArray.levelOrder());
console.log('Inorder:', treeArray.inorder());
console.log('Preorder:', treeArray.preorder());
console.log('Postorder:', treeArray.postorder());
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
