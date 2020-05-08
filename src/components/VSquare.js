import { stylingProps, transformTwoProps } from "../internals.js"

export const VSquare = {
  props: {
    r: {
      default: 10,
      suggest: "10",
      type: [String, Number],
      docs: "Square radius (half of the width)",
    },
    ...stylingProps,
    ...transformTwoProps,
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
}
