import { inject, watch, provide } from "../../dist/deps/vue.js";

import { Group } from "../../dist/deps/three.js";

import { transformThreeProps, useThreeTransform } from "../internals.js";

export default {
  props: { ...transformThreeProps },
  setup(props, { slots }) {
    const sceneContext = inject("sceneContext");
    watch(
      () => slots.default(),
      (_) => {
        sceneContext.update();
      },
      { immediate: true }
    );
    const group = new Group();
    useThreeTransform(props, group);
    sceneContext.scene.add(group);
    provide("sceneContext", { ...sceneContext, scene: group });
    return () => slots.default();
  },
};
