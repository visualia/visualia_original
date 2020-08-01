import { transformTwoProps, useSvgTransform } from "../internals.js";

export default {
  props: {
    ...transformTwoProps,
  },
  setup(props) {
    const transform = useSvgTransform(props);
    return { transform };
  },
  template: `
    <g :transform="transform"><slot /></g>`,
};
