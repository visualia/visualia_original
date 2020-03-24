export const array = (length = 1) => Array.from({ length });

export const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export const padArrayRight = (arr, length, fill) => {
  return [...arr, ...Array(length).fill(fill)].slice(0, length);
};

export const test_padArrayRight_empty = () => {
  return [padArrayRight([], 2, "a"), ["a", "a"]];
};

export const test_padArrayRight_existing = () => {
  return [padArrayRight(["a"], 2, "b"), ["a", "b"]];
};

export const chunk = (arr, length) =>
  Array.from({ length: Math.ceil(arr.length / length) }).map((_, n) =>
    arr.slice(n * length, n * length + length)
  );
