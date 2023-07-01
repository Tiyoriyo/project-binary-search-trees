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

  function processData(array) {
    return mergeSort(duplicateRemover(array));
  }

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

  function heightRec(root) {
    if (!root) return 0;
    let leftH = heightRec(root.left);
    let rightH = heightRec(root.right);
    return Math.max(leftH, rightH) + 1;
  }

  function depthRec(root, value) {
    if (!root) return -Infinity;
    if (value > root.value) {
      return depthRec(root.right, value) + 1;
    } if (value < root.value) {
      return depthRec(root.left, value) + 1;
    }
    return 1;
  }

  function isBalanced(root) {
    let leftH = heightRec(root.left);
    let rightH = heightRec(root.right);
    let difference = (leftH - rightH) * -1;
    return !((difference > 1));
  }

  function rebalance(root) {
    let values = inorderRec(root);
    setData(values);
    return buildTree(0, data.length - 1);
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

  function height() {
    return heightRec(this.root) - 1;
  }

  function depth(value) {
    let result = depthRec(this.root, value) - 1;
    return (result >= 0) ? result : null;
  }

  function balancedCheck() {
    return isBalanced(this.root);
  }

  function makeBalanced() {
    this.root = rebalance(this.root);
  }

  function setData(array) {
    data = processData(array);
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
    height,
    depth,
    balancedCheck,
    makeBalanced,
  };
};

function arrayNumbers() {
  let array = [];

  for (let i = 0; i < 15; i += 1) {
    let number = Math.floor(Math.random() * 100);
    while (number > 100) {
      number = Math.floor(Math.random() * 100);
    }
    array.push(number);
  }
  return array;
}

function driverScript() {
  const treeArray = tree(arrayNumbers());
  console.log(prettyPrint(treeArray.root));
  console.log(treeArray.balancedCheck());
  console.log('Pre Order: ', treeArray.preorder());
  console.log('In Order: ', treeArray.inorder());
  console.log('Post Order: ', treeArray.postorder());
  (() => {
    for (let i = 0; i < 15; i += 1) {
      let number = Math.floor(Math.random() * 2000);
      treeArray.insertValue(number);
    }
  })();
  console.log(prettyPrint(treeArray.root));
  console.log('Balance Check: ', treeArray.balancedCheck());
  treeArray.makeBalanced();
  console.log(prettyPrint(treeArray.root));
  console.log('Balance Check: ', treeArray.balancedCheck());
  console.log('Pre Order: ', treeArray.preorder());
  console.log('In Order: ', treeArray.inorder());
  console.log('Post Order: ', treeArray.postorder());
}

driverScript();
