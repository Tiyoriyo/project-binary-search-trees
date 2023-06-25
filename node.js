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

export default node;
