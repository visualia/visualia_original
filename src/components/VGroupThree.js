import { inject, watch, ref } from "../deps/vue.js";

import { Group } from "../deps/three.js";

import { transformThreeProps, useThreeTransform } from "../internals.js";

export const VGroupThree = {
  props: { ...transformThreeProps },
  setup(props, { slots }) {
    const key = ref(0);
    watch(
      () => slots.default(),
      _ => {
        key.value = Math.random();
      }
    );
    return { key };
    // const sceneContext = inject("sceneContext");
    // var group = new Group();
    // useThreeTransform(props, group, false);
    // sceneContext.scene = group;
    // return () => slots.default();
    // return a.value();
  },
  template: `<slot :key="key" />`
};
