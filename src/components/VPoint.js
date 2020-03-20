import { stylingProps, transformThreeProps } from "../internals.js";

export const VPoint = {
  props: {
    fill: { ...stylingProps.fill, default: "black" },
    ...transformThreeProps
  },
  template: `
    <v-circle
      r="1"
      :fill="fill"
      stroke="none"
      :position="position"
      :rotation="rotation"
      :scale="scale"
    />
  `
};
