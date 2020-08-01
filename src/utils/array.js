export const array = (length = 0, def = 0) =>
  Array.from({ length }).map((_) => def);

export const docs_array = `

\`array(length = 1)\`

Creates an empty array with the \`length\` of items.

**Usage**

~~~live

{{ array() }}
{{ array(1) }}
{{ array(3, 10) }}
{{ array(3, 'hey') }}

~~~

`;

export const test_array_empty = () => {
  return [array(), []];
};

export const test_array_three = () => {
  return [array(3), [0, 0, 0]];
};

export const test_array_three_string = () => {
  return [array(3, "hey"), ["hey", "hey", "hey"]];
};

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

export const docs_shuffle = `

\`shuffle(array)\`

Sorts the array in random order.

~~~live
{{ shuffle([1,2,3]) }}
~~~
`;

export const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

export const any = function (arr) {
  return arr instanceof Array
    ? shuffle(arr)[0]
    : shuffle(Array.from(arguments))[0];
};

export const docs_any = `

\`any(array)\` or \`any(argument, argument, argument...)\`

Picks a random element from the array or function arguments.

~~~live
{{ any([0,1,2]) }}
{{ any(0,1,2) }}
~~~
`;

export const docs_intersection = `

\`intersection(array1, array2)\`

Returns the intersection of the two arrays

~~~live

{{ intersection([0,1,2],[1,2,3]) }}

~~~
`;

export const intersection = (arr1, arr2) =>
  arr1.filter((n) => arr2.includes(n));

export const test_intersection = () => {
  return [intersection([0, 1, 2], [1, 2, 3]), [1, 2]];
};
