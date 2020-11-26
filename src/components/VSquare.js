import { stylingProps, transformThreeProps } from "../internals.js";

export default {
  docs: `Creates a square`,
  props: {
    r: {
      default: 10,
      suggest: "10",
      type: [String, Number],
      docs: "Square radius (half of the width)",
    },
    ...stylingProps,
    ...transformThreeProps,
  },
  template: `
  <v-rect
    :x="-r"
    :y="-r"
    :width="r * 2"
    :height="r * 2"
    :fill="fill"
    :stroke="stroke"
    :position="position"
    :rotation="rotation"
    :scale="scale"
  />
  `,
};
