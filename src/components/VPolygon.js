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
      :fill="fill"
      :stroke="stroke"
      :strokeWidth="strokeWidth"
      :opacity="opacity"
      :position="position"
      :rotation="rotation"
      :scale="scale"
  />
  `,
};
