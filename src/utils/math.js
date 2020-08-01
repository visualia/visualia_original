export const scale = (value, start1, stop1, start2, stop2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

export const docs_scale = `

\`scale(value, start1, stop1, start2, stop2)\`

Scales linearily the input \`value\` from the input range between \`start1\` and \`stop1\` to the output range between \`start2\` and \`stop2\`.

~~~live

{{ scale(50, 0, 100, 0, 1) }}

~~~
`;

export const random = (from = 0, to = 1) => from + Math.random() * (to - from);

export const docs_random = `

\`random(from = 0, to = 1)\`

Generates a random floating point number beween \`start\` and \`stop\`.

~~~live

{{ random() }}
{{ random(0, 100) }}

~~~
`;

export const snap = (value, step = 1, type = "round") =>
  Math[type](value / step) * step;

export const docs_snap = `

\`snap = (value, step = 1, type = "round")\`

Snaps a value to the nearest multiplier of \`step\` with optional \`type\` parameter.

~~~live

{{ snap(0.1,1) }}
{{ snap(55.5,10) }}

{{ snap(0.1,1,"floor") }}
{{ snap(50.5,10,"floor") }}

{{ snap(0.1,1,"ceil") }}
{{ snap(50.5,10,"ceil") }}

~~~
`;

export const trunc = (value, decimals = 1) =>
  Number(Math.round(value + "e" + decimals) + "e-" + decimals);

export const docs_trunc = `

\`trunc = (value, decimals = 1)\`

Truncates a floating point value (without rounding)

~~~live

{{ trunc(0.123456789, 2) }}
{{ trunc("0.123456789", 2) }}

~~~
`;

export const test_trunc_floatingpoint = () => {
  return [trunc(0.123456789, 2), 0.12];
};

export const test_trunc_string = () => {
  return [trunc("0.123456789", 3), 0.123];
};

export const range = (from, to, step = 1) => {
  const length = Math.floor((to - from) / step) + 1;
  return Array.from({ length }).map((_, i) => from + i * step);
};

export const docs_range = `

\`range(from, to, step = 1)\`

Generates an array of integer numbers in between \`from\` and \`to\` with optional \`step\` parameter.

~~~live

{{ range(-2, 2) }}
{{ range(-2, 2, 2) }}
{{ range(-2, 2, 0.5) }}

~~~
`;

export const distance = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const docs_distance = `

\`distance(x1, y1, x2, y2)\`

Calculates the distance between two points

~~~live

{{ distance(100, 100, 150, 150) }}

~~~

`;

export const docs_pointatline = `

\`pointatline(x1, y1, x2, y2, distance)\`

Finds point coordinates at the line.

~~~live

{{ pointatline(10,10,20,20,10) }}

~~~
`;

export const pointatline = (x1, y1, x2, y2, d) => {
  const dis = distance(x1, y1, x2, y2);
  const x3 = x1 + (d / dis) * (x2 - x1);
  const y3 = y1 + (d / dis) * (y2 - y1);
  return [x3, y3];
};
