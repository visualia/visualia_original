import { regularProps, stylingProps, transformTwoProps } from "../internals.js";

export const VHexagon = {
  props: {
    r: regularProps.r,
    ...stylingProps,
    ...transformTwoProps,
  },
  template: `
    <v-regularpolygon
      :r="r"
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
