import {
  stylingProps,
  transformTwoProps,
  textProps,
  useSvgStyling,
  useSvgTransform,
} from "../internals.js";

export default {
  props: {
    fill: { ...stylingProps.fill, default: "black" },
    stroke: { ...stylingProps.stroke, default: "none" },
    strokeWidth: { ...stylingProps.strokeWidth, default: 0 },
    // TODO: Aligning by baseline hides the text with default props
    ...transformTwoProps,
    ...textProps,
  },
  setup(props) {
    const styling = useSvgStyling(props);
    const transform = useSvgTransform(props);
    return { transform, styling };
  },
  template: `
  <text
    :transform="transform"
    :fill="styling.fill"
    :stroke="styling.stroke"
    :stroke-width="styling.strokeWidth"
    :opacity="styling.opacity"
    :font-family="fontFamily"
    :font-size="fontSize"
  >
    <slot />
  </text>`,
};
