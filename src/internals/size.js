import { computed } from "../deps/vue.js";

import { toNumber } from "../../visualia.js";

export const sizeProps = {
  width: {
    default: 200,
    type: [String, Number],
    docs: "Scene width in pixels"
  },
  height: {
    default: 200,
    type: [String, Number],
    docs: "Scene height in pixels"
  }
};

export const useSize = props => {
  const width = computed(() => toNumber(props.width));
  const height = computed(() => toNumber(props.height));
  const viewBox = computed(() => `0 0 ${props.width} ${props.height}`);
  return { width, height, viewBox };
};
