import { transformTwoProps, useSvgTransform } from "../internals.js";

export const VGroupSvg = {
  props: {
    ...transformTwoProps
  },
  setup(props) {
    const transform = useSvgTransform(props);
    return { transform };
  },
  template: `
    <g :transform="transform"><slot /></g>`
};
