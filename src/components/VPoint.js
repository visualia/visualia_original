import { stylingProps, transformTwoProps } from "../internals.js";

export const VPoint = {
  props: {
    fill: {
      ...stylingProps.fill,
      default: "black",
      suggest: ["black", "red", "green", "blue"],
    },
    r: { type: [String, Number], default: 2, docs: "Point radius" },
    ...transformTwoProps,
  },
  template: `
    <v-circle
      :r="r"
      :fill="fill"
      stroke="none"
      :position="position"
      :rotation="rotation"
      :scale="scale"
  />
  `,
};
