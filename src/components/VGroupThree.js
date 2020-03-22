import { inject, watch, provide } from "../deps/vue.js";

import { Group } from "../deps/three.js";

import { transformThreeProps, useThreeTransform } from "../internals.js";

export const VGroupThree = {
  props: { ...transformThreeProps },
  setup(props, { slots }) {
    const sceneContext = inject("sceneContext");

    watch(
      () => slots.default(),
      _ => {
        sceneContext.update();
      }
    );
    const group = new Group();
    useThreeTransform(props, group);
    sceneContext.scene.add(group);
    provide("sceneContext", { ...sceneContext, scene: group });
  },
  template: `<slot  />`
};
