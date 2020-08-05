import { chroma } from "../../dist/deps/chroma.js";
import { scaleLinear } from "../../dist/deps/d3-scale.js";

import { getCssVariable, range } from "../utils.js";

export const color = (name) => {
  const color = getCssVariable(`--${name}`);
  return color ? color.trim() : name.trim();
};

export const docs_color = `

\`color('name')\`

Returns a color value. If \`name\` matches one of framework colors, framework color value is returned. If not, a standard CSS color name is returned.

~~~live

{{ color('red') }}
{{ color('rebeccapurple') }}

~~~

`;

export const rgb = (r, g, b, a = null) =>
  a ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;

export const docs_rgb = `

\`rgb(r, g, b, a = false)\`

Outputs a CSS \`rgba()\` string

~~~live

{{ rgb(50,100,50,0.5) }}
{{ rgb(50,100,50) }}

~~~

`;

export const hsl = (h, s = 100, l = 50, a = null) =>
  a ? `hsla(${h},${s}%,${l}%,${a})` : `hsl(${h},${s}%,${l}%)`;

export const docs_hsl = `

\`hsl(h, s = 100, l = 50, a = 1)\`

Outputs a CSS \`hsla()\` string

~~~live

{{ hsl(50,100,50,0.5) }}
{{ hsl(50,100,50) }}
{{ hsl(50) }}

~~~

`;

export function rgb2hsl(r, g = 0, b = 0, a = null, array = false) {
  let c = null;
  if (typeof r === "string") {
    c = chroma(r);
  } else {
    c = chroma({ r, g, b });
  }
  if (array) {
    const hsl = c.hsl();
    const arr = [hsl[0], hsl[1] * 100, hsl[2] * 100];
    return a ? [...arr, a] : arr;
  }
  return a ? c.alpha(a).css("hsla") : c.css("hsl");
}

export const docs_rgb2hsl = `

\`rgb2hsl(r, g = 0, b = 0, a = null, array = false)\`

Converts RGB to HSL, outputting CSS string. You can also pass \`array = true\` setting to output the values as an array.

~~~live

{{ rgb2hsl(255,0,0) }}
{{ rgb2hsl(255,0,0,0.5) }}
{{ rgb2hsl(255,0,0,0.5,true) }}

~~~
`;

export function hsl2rgb(h, s = 100, l = 50, a = null, array = false) {
  let c = null;
  if (typeof h === "string") {
    c = chroma(h);
  } else {
    c = chroma({ h, s: s / 100, l: l / 100 });
  }
  if (array) {
    return a ? [...c.alpha(a).rgb(), a] : c.rgb();
  }
  return a ? c.alpha(a).css("rgba") : c.css("rgb");
}

export const docs_hsl2rgb = `

Converts HSL to RGB, outputting CSS string. You can also pass \`array = true\` setting to output the values as an array.

\`hsl2rgb(h, s = 100, l = 50, a = null, array = false)\`

~~~live

{{ hsl2rgb(0,100,50) }}
{{ hsl2rgb(0,100,50,0.5) }}
{{ hsl2rgb(0,100,50,0.5,true) }}

~~~
`;

export const colorscale = (start, stop, count = 6, mode = "hsl") => {
  const color = chroma
    .scale([start, stop])
    .domain([0, count - 1])
    .mode(mode);
  return Array.from({ length: count }).map((_, i) => color(i).css("hsl"));
};

export const docs_colorscale = `

\`colorscale = (start, stop, count = 6, mode = 'hsl')\`

Generates a color scale between \`start\` and \`stop\` colors with \`count\` steps. Optionally an [interpolation mode](https://vis4.net/chromajs/#scale-mode) can be specified.

~~~live
{{ colorscale('red','yellow') }}
~~~

`;

export const aihues = () => [
  0,
  17.5,
  35,
  47.5,
  60,
  97.5,
  135,
  180,
  225,
  250,
  275,
  317.5,
];

export const docs_aihues = `

\`aihues()\`

Returns hue values for Adobe Illustrator color wheel, similar to [Johannes Itten's RBY color wheel](https://en.wikipedia.org/wiki/Johannes_Itten).

~~~live

{{ aihues() }}

~~~
`;

export const docs_ai2hue = `

\`ai2hue(hue)\`

Maps Adobe Illustrator color wheel hue value (RBY color system), to HSL hue values.

~~~live

{{ ai2hue(180) }}

~~~

`;

export const ai2hue = (ai) =>
  scaleLinear()
    .domain(aihues())
    .range(range(0, 360, 360 / aihues().length))(ai);

export const hue2ai = (hue) =>
  scaleLinear()
    .domain(range(0, 360, 360 / aihues().length))
    .range(aihues())(hue);

export const docs_hue2ai = `

\`hue2ai(hue)\`

Maps HSL hue value to Adobe Illustrator color wheel hue value (RBY color system).

~~~live

{{ hue2ai(180) }}

~~~

`;

export const colors = () => [
  "purple",
  "darkpurple",
  "red",
  "yellow",
  "lightyellow",
  "lighteryellow",
  "lightblue",
  "blue",
  "green",
  "orange",
  "paleblue",
  "darkblue",
  "black",
  "darkestgray",
  "darkergray",
  "darkgray",
  "gray",
  "lightgray",
  "lightergray",
  "lightestgray",
  "white",
];

export const docs_colors = `

\`colors()\`

Return array of color names used in the framework.


~~~live

{{ colors() }}

~~~

`;
