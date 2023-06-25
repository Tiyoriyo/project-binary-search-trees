function duplicateRemover(array) {
  const uniqueArray = [];
  for (let i = 0; i < array.length; i += 1) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}

export default duplicateRemover;

console.log(duplicateRemover([3, 3, 3, 1, 2, 3, 4]));

console.log([4, 3, 2].indexOf(9));
