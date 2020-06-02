import { h, inject, defineAsyncComponent } from "../deps/vue.js";

const VSphereThree = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VSphereThree.js"),
});

export const VSphere = (props, { slots }) => {
  const modes = {
    svg: () => null,
    canvas: () => null,
    three: VSphereThree,
    webgl: VSphereThree,
  };
  const sceneContext = inject("sceneContext");
  return modes[sceneContext.mode.value]
    ? h(modes[sceneContext.mode.value], { ...props }, slots)
    : null;
};
