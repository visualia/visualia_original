import { computed } from "../../dist/deps/vue.js";
import { circlepoints } from "../utils.js";
import { regularProps, stylingProps, transformTwoProps } from "../internals.js";

export default {
  docs: `Creates a equal-sided regular polygon`,
  props: {
    ...regularProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props) {
    const polygonPoints = computed(() => circlepoints(props.count, props.r));
    return { polygonPoints };
  },
  template: `
    <v-polygon
      :points="polygonPoints"
      closed
      :fill="fill"
      :stroke="stroke"
      :opacity="opacity"
      :strokeWidth="strokeWidth"
      :position="position"
      :rotation="rotation"
      :scale="scale"
  />
  `,
};
