import { ref, watch, computed } from "../../dist/deps/vue.js";
import { anime } from "../../dist/deps/anime.js";

import { set, nearest } from "../utils.js";
import { dynamicProps } from "../internals.js";

export default {
  props: {
    ...dynamicProps,
    duration: {
      default: 10000,
      suggest: "10000",
      type: [String, Number],
      docs: "Animation duration in milliseconds",
    },
    easing: {
      default: "linear",
      type: String,
      docs: "Animation easing function",
    },
    loop: {
      default: true,
      type: Boolean,
      docs: "Loop animation",
    },
    alternate: {
      default: false,
      type: Boolean,
      docs: "Alternate between start and end value",
    },
  },
  setup(props, { emit }) {
    const progress = ref(props.from);
    anime({
      targets: progress,
      value: [props.from, props.to],
      duration: props.duration,
      easing: props.easing,
      direction: props.alternate ? "alternate" : null,
      loop: props.loop,
    });
    watch(
      () => progress,
      (progress) => {
        const currentProgress = computed(() =>
          props.step
            ? nearest(progress.value, props.step)
            : props.smooth
            ? progress.value
            : nearest(progress.value, 1)
        );
        emit("value", currentProgress);
        if (props.set) {
          set(props.set, currentProgress);
        }
      },
      { immediate: true }
    );
    return () => null;
  },
};
