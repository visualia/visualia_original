export const fit = (value, start1, stop1, start2 = -2, stop2 = 2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

export const random = (from = 0, to = 1, integer = false) => {
  const r = from + Math.random() * (to - from);
  return integer ? Math.floor(r, 2) : r;
};

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
