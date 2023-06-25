/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
import node from './node.js';
import mergeSort from './mergeSort.js';
import duplicateRemover from './duplicateRemover.js';
import prettyPrint from './prettyPrint.js';

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

const treeArray = tree([3, 3, 3, 1, 2, 3, 4]);
// 2, 3, 4, 5, 6, 8, 10
console.log(prettyPrint(treeArray.root));
