import { stylingProps, transformThreeProps } from "../internals.js";

import { parseCoords } from "../internals.js";

export const VPoint = {
  props: {
    r: { type: [String, Number], default: 1, docs: "Point radius" },
    fill: { ...stylingProps.fill, default: "black" },
    ...transformThreeProps
  },
  setup(props) {
    const positions = parseCoords(props.position);
    return { positions };
  },
  template: `
    <v-circle
      v-for="position in positions"
      :r="r"
      :fill="fill"
      stroke="none"
      :position="position"
      :rotation="rotation"
      :scale="scale"
  />
  `
};
