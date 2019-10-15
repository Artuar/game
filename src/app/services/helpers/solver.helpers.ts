export const randomInt = (n: number) => {
  return Math.floor(Math.random() * n);
};

export const randomElement = (arr: any[]) => {
  return arr[randomInt(arr.length)];
};

export const forEachNeighbor = (
  x: number,
  y: number,
  width: number,
  height: number,
  fn: any
) => {
  function call(x: number, y: number) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      fn(x, y);
    }
  }

  call(x - 1, y - 1);
  call(x, y - 1);
  call(x + 1, y - 1);
  call(x - 1, y);
  call(x + 1, y);
  call(x - 1, y + 1);
  call(x, y + 1);
  call(x + 1, y + 1);
};
