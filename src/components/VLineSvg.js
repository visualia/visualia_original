import { computed } from "../deps/vue.js";
import { line } from "../deps/d3-shape.js";

import {
  stylingProps,
  useSvgStyling,
  transformTwoProps,
  useSvgTransform,
  parseCoords
} from "../internals.js";

export const VLineSvg = {
  props: {
    points: {
      default: "0 0, 10 10",
      type: [String, Array, Object],
      docs: "Array of points that the line will follow"
    },
    ...transformTwoProps,
    ...stylingProps
  },
  setup(props) {
    const styling = useSvgStyling(props);
    const transform = useSvgTransform(props);
    const path = computed(() => {
      const parsedPoints = parseCoords(props.points);
      return line()(parsedPoints);
    });
    return { styling, transform, path };
  },
  template: `
    <path 
      :d="path"
      :fill="styling.fill"
      :stroke="styling.stroke"
      :stroke-width="styling.strokeWidth"
      :transform="transform"
    />`
};