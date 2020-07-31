import { computed } from "../../dist/deps/vue.js";

import { gridpoints } from "../utils.js";

const gridProps = {
  count: {
    default: 20,
    suggest: "20",
    type: [Number, String],
    docs: "Grid count",
  },
  step: {
    default: 10,
    suggest: "10",
    type: [Number, String],
    docs: "Grid step",
  },
};

export default {
  props: {
    ...gridProps,
  },
  setup(props) {
    const points = computed(() => gridpoints(props.count, props.step));
    return { points };
  },
  template: `
    <v-point
      v-for="point in gridpoints(10,10)"
      r="0.5"
      fill="gray"
      :position="point"
  />
  `,
};
