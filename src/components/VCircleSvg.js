import { useSvgStyling, useSvgTransform } from "../internals.js";

export const VCircleSvg = {
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
