import { circlexy, array } from "../utils.js";

export const circlepoints = (count = 6, radius = 10) =>
  array(count).map((_, i) => [...circlexy((360 / count) * i, radius), 0]);

export const docs_circlepoints = `

\`circlepoints(count = 6, radius = 10)\`

~~~live

{{ circlepoints() }}

<v-scene>
  <v-group position="100 100">
    <v-point v-for="p in circlepoints(6, 50)" :position="p" />
  </v-group>
</v-scene>

~~~

`;

export const gridpoints = (count = 20, step = 10) => {
  let arr = [];
  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      arr.push([x * step, y * step, 0]);
    }
  }
  return arr;
};

export const docs_gridpoints = `

\`gridpoints(count = 20, step = 10)\`

~~~live

<v-scene>
  <v-point v-for="p in gridpoints(20, 10)" :position="p" />
</v-scene>

~~~

`;
