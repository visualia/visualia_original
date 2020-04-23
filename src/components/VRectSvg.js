import { useSvgStyling, useSvgTransform } from "../internals.js";

export const VRectSvg = {
  setup(props) {
    const styling = useSvgStyling(props);
    const transform = useSvgTransform(props);
    return { styling, transform };
  },
  template: `
    <rect 
      :x="0"
      :y="0"
      :width="width"
      :height="height"
      :fill="styling.fill"
      :stroke="styling.stroke"
      :stroke-width="styling.strokeWidth"
      :opacity="styling.opacity"
      :transform="transform"
    />`,
};
