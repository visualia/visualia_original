import { ref, watch } from "../deps/vue.js";
import anime from "../deps/anime.js";

import { set } from "../../visualia.js";
import { dynamicProps } from "../internals/dynamic.js";

export const VAnimate = {
  props: {
    ...dynamicProps,
    duration: { default: 10000, type: [String, Number] },
    easing: { default: "linear", type: String },
    alternate: { default: false, type: Boolean }
  },
  setup(props, { emit }) {
    const progress = ref(0);
    anime({
      targets: progress,
      value: [props.from, props.to],
      duration: props.duration,
      easing: props.easing,
      direction: props.alternate ? "alternate" : null,
      loop: true
    });
    watch(progress, progress => {
      const currentProgress = props.integer ? Math.floor(progress) : progress;
      emit("value", currentProgress);
      if (props.set) {
        set(props.set, currentProgress);
      }
    });
    return () => null;
  }
};
