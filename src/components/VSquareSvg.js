import {
  stylingProps,
  useSvgStyling,
  transformTwoProps,
  useSvgTransform
} from "../internals.js";

export const VSquareSvg = {
  props: { r: { default: 1 }, ...transformTwoProps, ...stylingProps },
  setup(props) {
    const styling = useSvgStyling(props);
    const transform = useSvgTransform(props);
    return { styling, transform };
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
      :transform="transform"
    />`
};
