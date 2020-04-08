import { useSvgStyling, useSvgTransform } from "../internals.js";

export const VSquareSvg = {
  setup(props) {
    const r = props.r;
    const styling = useSvgStyling(props);
    const transform = useSvgTransform(props);
    return { r, styling, transform };
  },
  template: `
    <rect 
      :x="-r"
      :y="-r"
      :width="r * 2"
      :height="r * 2"
      :fill="styling.fill"
      :stroke="styling.stroke"
      :stroke-width="styling.strokeWidth"
      :opacity="styling.opacity"
      :transform="transform"
    />`,
};
