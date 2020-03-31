import { stylingProps, transformThreeProps } from "../internals.js";

export const VPoint = {
  props: {
    r: { type: [String, Number], default: 1, docs: "Point radius" },
    fill: { ...stylingProps.fill, default: "black" },
    ...transformThreeProps
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
  `
};
