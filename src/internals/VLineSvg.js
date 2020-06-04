import { computed } from "../deps/vue.js";
import { line } from "../deps/d3-shape.js";

import {
  lineProps,
  stylingProps,
  transformTwoProps,
  useSvgStyling,
  useSvgTransform,
  parseCoords,
} from "../internals.js";

export default {
  props: {
    ...lineProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props) {
    const styling = useSvgStyling(props);
    const transform = useSvgTransform(props);
    const path = computed(() => {
      let parsedPoints = parseCoords(props.points);
      if (props.closed) {
        parsedPoints = [...parsedPoints, parsedPoints[0]];
      }
      return line()(parsedPoints);
    });
    return { styling, transform, path };
  },
  template: `
    <path 
      :d="path"
      :fill="styling.fill"
      :stroke="styling.stroke"
      :opacity="styling.opacity"
      :stroke-width="styling.strokeWidth"
      :transform="transform"
    />`,
};
