import { computed } from "../../src/deps/vue.js";
import { useSvgStyling, useSvgTransform } from "../internals.js";

import { stylingProps, sizeProps, transformTwoProps } from "../internals.js";

export default {
  props: {
    x: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner x coordinate",
    },
    y: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner y coordinate",
    },
    ...sizeProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props) {
    const x = computed(() => props.x);
    const y = computed(() => props.y);
    const width = computed(() => props.width);
    const height = computed(() => props.height);
    const styling = useSvgStyling(props);
    const transform = useSvgTransform(props);
    return { x, y, width, height, styling, transform };
  },
  template: `
    <rect 
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      :fill="styling.fill"
      :stroke="styling.stroke"
      :stroke-width="styling.strokeWidth"
      :opacity="styling.opacity"
      :transform="transform"
    />`,
};
