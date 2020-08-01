import { inject, onBeforeUpdate } from "../../dist/deps/vue.js";

import {
  transformThreeProps,
  transformCanvas,
  transformCanvasReset,
} from "../internals.js";

export default {
  props: {
    ...transformThreeProps,
  },
  setup(props, { slots }) {
    return () => slots.default();
  },
};
