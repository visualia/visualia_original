export const array = (length = 1, def = 0) =>
  Array.from({ length }).map((_) => def);

export const docs_array = `

\`array(length = 1)\`

Creates an empty array with the \`length\` of items.

**Usage**

\`\`\`live
{{ array() }}
{{ array(3) }}
{{ array(3, 10) }}
{{ array(3, 'hey') }}
\`\`\`

`;

export const test_array_empty = () => {
  return [array(), [0]];
};

export const test_array_three = () => {
  return [array(3), [0, 0, 0]];
};

export const test_array_three_string = () => {
  return [array(3, "hey"), ["hey", "hey", "hey"]];
};

export const flatten = (list) =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export const docs_flatten = `

\`flatten(array)\`

Flattens multidimensional array

**Example**

~~~live
{{ flatten([0,1,[2,[3,4]]]) }}
~~~

> Note: \`flatten()\` helper function will be depreciated in favour of Javascript's native [flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) array method.
`;

export const chunk = (arr, length) =>
  Array.from({ length: Math.ceil(arr.length / length) }).map((_, n) =>
    arr.slice(n * length, n * length + length)
  );

export const docs_chunk = `

\`chunk(array, length)\`

Chunks array into smaller arrays

~~~live
{{ chunk([0,1,2,3],2) }}
~~~

`;

export const test_chunk = () => {
  return [
    chunk([0, 1, 2, 3], 2),
    [
      [0, 1],
      [2, 3],
    ],
  ];
};

export const docs_unique = `

\`unique(array)\`

Removes duplicates from the array

~~~live
{{ unique([0,0,1,2]) }}
~~~

`;

export const unique = (arr) => [...new Set(arr)];

export const test_unique = () => {
  return [unique([0, 0, 1, 2]), [0, 1, 2]];
};

/*
export const array = (length) => Array.from({ length });

export const flatten = (list) =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);


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
*/

export const padArrayRight = (arr, length, fill) => {
  return [...arr, ...Array(length).fill(fill)].slice(0, length);
};

export const toObject = (array) =>
  array.reduce((acc, el) => {
    acc[el[0]] = el[1];
    return acc;
  }, {});
