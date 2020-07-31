import { lineProps, stylingProps, transformTwoProps } from "../internals.js";

export default {
  props: {
    ...lineProps,
    points: {
      ...lineProps.points,
      suggest: "0 0, 10 10, 0 10",
    },
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
