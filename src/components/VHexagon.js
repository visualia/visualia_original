import { stylingProps, transformTwoProps } from "../internals.js";

export const VHexagon = {
  props: {
    ...stylingProps,
    ...transformTwoProps,
  },
  template: `
    <v-regularpolygon
      :fill="fill"
      :stroke="stroke"
      :strokeWidth="strokeWidth"
      :position="position"
      :rotation="rotation"
      :scale="scale"
  />
  `,
};
