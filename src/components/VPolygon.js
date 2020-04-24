import { h } from "../deps/vue.js";

import { lineProps, stylingProps, transformTwoProps } from "../internals.js";

export const VPolygon = {
  props: {
    ...lineProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  template: `
    <v-line
      :points="points"
      closed
      fill="blue"
      :stroke="stroke"
      :strokeWidth="strokeWidth"
      :position="position"
      :rotation="rotation"
      :scale="scale"
  />
  `,
};
