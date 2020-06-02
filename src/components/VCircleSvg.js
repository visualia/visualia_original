import {
  stylingProps,
  transformTwoProps,
  useSvgStyling,
  useSvgTransform,
} from "../internals.js";

export const VCircleSvg = {
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
  setup(props) {
    const r = props.r;
    const styling = useSvgStyling(props);
    const transform = useSvgTransform(props);
    return { r, transform, styling };
  },
  template: `
    <circle 
      cx="0"
      cy="0"
      :r="r"
      :transform="transform"
      :fill="styling.fill"
      :stroke="styling.stroke"
      :stroke-width="styling.strokeWidth"
      :opacity="styling.opacity"
    />`,
};
