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

  // FINISHED
  function buildTree(start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = node(data[mid]);
    root.left = buildTree(start, mid - 1);
    root.right = buildTree(mid + 1, end);
    return root;
  }

  // FINISHED
  function insertVal(value, root = this.root) {
    if (root === null) return node(value);
    if (value > root.value) {
      root.right = insertVal(value, root.right);
    } else if (value < root.value) {
      root.left = insertVal(value, root.left);
    }
    return root;
  }

  function findMin(node) {
    let temp = node.right;
    while (temp.left) { temp = temp.left; }
    return temp.value;
  }

  // Finished
  function deleteVal(value) {
    const findMin = (node) => {
      let temp = node.right;
      while (temp.left) { temp = temp.left; }
      return temp.value;
    };

    const deleteRec = (value, root) => {
      if (!root.left && !root.right) return null;
      if (value < root.value) {
        root.left = deleteRec(value, root.left);
      } else if (value > root.value) {
        root.right = deleteRec(value, root.right);
      } else { // If root value equals given value
        if (root.left && !root.right) return root.left;
        if (root.right && !root.left) return root.right;
        if (root.right && root.left) {
          let tempValue = findMin(root);
          root.value = tempValue;
          root.right = deleteRec(tempValue, root.right);
          return root;
        }
      }
      return root;
    };
    this.root = deleteRec(value, this.root);
  }

  function find(value, root = this.root) {
    if (!root) return null;
    if (value < root.value) {
      return find(value, root.left);
    } if (value > root.value) {
      return find(value, root.right);
    }
    if (value === root.value) { return root; }
  }

  function levelOrderItr(root = this.root, callback = undefined) {
    if (!root) return null;
    let queue = [];
    let array = [];
    queue.push(root);
    while (queue.length) {
      let current = queue[0];
      array.push((callback) ? callback(root.value) : root.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      queue.shift();
    }
    return array;
  }

  function inorder(root = this.root, callback = undefined) {
    if (!root) return null;
    let array = [];
    if (root.left) array = array.concat(inorder(root.left));
    array.push((callback) ? callback(root.value) : root.value);
    if (root.right) array = array.concat(inorder(root.right));
    return array;
  }

  function preorder(root = this.root, callback = undefined) {
    if (!root) return null;
    let array = [];
    array.push((callback) ? callback(root.value) : root.value);
    if (root.left) array = array.concat(preorder(root.left));
    if (root.right) array = array.concat(preorder(root.right));
    return array;
  }

  function postorder(root = this.root, callback = undefined) {
    if (!root) return null;
    let array = [];
    if (root.left) array = array.concat(postorder(root.left, callback));
    if (root.right) array = array.concat(postorder(root.right, callback));
    array.push((callback) ? callback(root.value) : root.value);
    return array;
  }

  // Evaluate Whether important or NOT (Height not removing -1);
  function height(root = this.root) {
    if (!root) return 0;
    let leftH = height(root.left);
    let rightH = height(root.right);
    return Math.max(leftH, rightH) + 1;
  }

  // FINISHED
  function balancedCheck(root = this.root) {
    let leftH = height(root.left); // Left Subtree Height
    let rightH = height(root.right); // Right Subtree Height
    let difference = Math.abs((leftH - rightH)); // Difference
    return !(difference > 1);
  }

  // UNFINISHED
  function depth(value) {
    function depthRec(value, root = this.root) {
      if (!root) return -Infinity;
      if (value > root.value) {
        return depthRec(root.right, value) + 1;
      } if (value < root.value) {
        return depthRec(root.left, value) + 1;
      }
      return 1;
    }

    let result = depthRec(value) - 1;
    return (result >= 0) ? result : null;
  }

  // FINISHED
  function rebalance() {
    let values = inorder(this.root); // Retrieve current values via traversal method
    data = mergeSort( // Sort values
      duplicateRemover(values),
    );
    this.root = buildTree(0, data.length - 1); // Replace current root with new balanced tree
  }

  return {
    root: buildTree(0, data.length - 1),
    insertVal,
    deleteVal,
    find,
    levelOrderItr,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    balancedCheck,
    rebalance,
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
      treeArray.insertVal(number);
    }
  })();
  console.log(prettyPrint(treeArray.root));
  console.log('Balance Check: ', treeArray.balancedCheck());
  treeArray.rebalance();
  console.log(prettyPrint(treeArray.root));
  console.log('Balance Check: ', treeArray.balancedCheck());
  console.log('Pre Order: ', treeArray.preorder());
  console.log('In Order: ', treeArray.inorder());
  console.log('Post Order: ', treeArray.postorder());
}

// driverScript();

// const treeArray = tree([0, 59, 23, 56, 47, 89, 48, 39, 6, 39, 28, 5, 4, 3, 45, 6, 7, 8]);
const treeArray = tree([23, 5]);
treeArray.deleteVal(5);
console.log(prettyPrint(treeArray.root));
