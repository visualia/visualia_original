import { computed } from "../deps/vue.js";
import { circlepoints } from "../utils.js";
import { stylingProps, transformTwoProps } from "../internals.js";

const regularProps = {
  count: {
    default: 6,
    suggest: "6",
    type: [Number, String],
    docs: "Number of sides",
  },
  r: {
    default: 10,
    suggest: "10",
    type: [Number, String],
    docs: "Radius size",
  },
};

export const VRegularpolygon = {
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
      :strokeWidth="strokeWidth"
      :position="position"
      :rotation="rotation"
      :scale="scale"
  />
  `,
};
