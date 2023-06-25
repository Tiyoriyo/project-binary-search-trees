/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
import mergeSort from './mergeSort.js';
import duplicateRemover from './duplicateRemover.js';

const node = (value) => ({
  root: value,
  left: null,
  right: null,
  setLeft(x) {
    this.left = x;
  },
  setRight(x) {
    this.right = x;
  },
});

const tree = (array) => {
  let data = mergeSort(
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
  return {
    root: buildTree(0, data.length - 1),
  };
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.root}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
const treeArray = tree([3, 3, 3, 1, 2, 3, 4]);
// 2, 3, 4, 5, 6, 8, 10
console.log(prettyPrint(treeArray.root));
