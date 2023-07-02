/* eslint-disable no-shadow */
function mergeSort(array) {
  function merge(array1, array2) {
    const array = []; let i = 0; let
      j = 0;
    let copy;

    while (i < array1.length && j < array2.length) {
      if (array1[i] > array2[j]) {
        array.push(array2[j]);
        j += 1;
      }
      if (array1[i] < array2[j]) {
        array.push(array1[i]);
        i += 1;
      }
      if (array1[i] === array2[j]) {
        array.push(array1[i]);
        i += 1;
      }
    }

    if (i >= array1.length) {
      copy = array2.slice(j);
    } else if (j >= array2.length) {
      copy = array1.slice(i);
    }

    return array.concat(copy);
  }

  if (array.length <= 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));

  return merge(left, right);
}

export default mergeSort;
