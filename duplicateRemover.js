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
