export const array = (length) => Array.from({ length });

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

export const flatten = (list) =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export const padArrayRight = (arr, length, fill) => {
  return [...arr, ...Array(length).fill(fill)].slice(0, length);
};

export const toObject = (array) =>
  array.reduce((acc, el) => {
    acc[el[0]] = el[1];
    return acc;
  }, {});
