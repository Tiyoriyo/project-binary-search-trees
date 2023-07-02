function arrayNumbers() {
  const array = [];

  for (let i = 0; i < 15; i += 1) {
    let number = Math.floor(Math.random() * 100);
    while (number > 100) {
      number = Math.floor(Math.random() * 100);
    }
    array.push(number);
  }
  return array;
}

export default arrayNumbers;
