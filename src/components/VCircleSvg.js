import {
  stylingProps,
  useSvgStyling,
  transformTwoProps,
  useSvgTransform
} from "../internals.js";

export const VCircleSvg = {
  props: { r: { default: 1 }, ...transformTwoProps, ...stylingProps },
  setup(props) {
    const styling = useSvgStyling(props);
    const transform = useSvgTransform(props);
    return { transform, styling };
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
    />`
};
