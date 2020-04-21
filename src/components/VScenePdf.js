import {
  inject,
  ref,
  onMounted,
  onBeforeUpdate,
  onUpdated,
} from "../deps/vue.js";

import { PDFDocument } from "https://visualia.github.io/pdf-lib/dist/pdf-lib.js";

import { sizeProps, useSize } from "../internals/size.js";

export const VScenePdf = {
  props: { ...sizeProps },
  async setup(props) {
    const el = ref(null);
    const pdf = ref(null);
    const src = ref(null);

    const { width, height } = useSize(props);

    const sceneContext = inject("sceneContext");
    sceneContext.pdf = pdf;

    //onMounted(async function () {
    const doc = await PDFDocument.create();
    pdf.value = doc.addPage([width.value, height.value]);
    const datauri = await doc.saveAsBase64({ dataUri: true });
    src.value = datauri;

    onUpdated(async function () {
      console.log("a");
      const datauri = await doc.saveAsBase64({ dataUri: true });
      src.value = datauri;
    });
    //});

    return { el, src, width, height };
  },
  template: `
  <slot />
  <iframe
    ref="el"
    :height="height"
    :width="width"
    :src="src"
    frameborder="0"
    scrolling="no"
  />
  `,
};
