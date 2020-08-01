import { inject, ref } from "../../dist/deps/vue.js";

import { sizeProps, useSize } from "../internals/size.js";

export default {
  props: { ...sizeProps },
  async setup(props) {
    const el = ref(null);
    const pdf = ref(null);
    const src = ref(null);

    const { width, height } = useSize(props);
    const sceneContext = inject("sceneContext");
    sceneContext.pdf = pdf;

    const { PDFDocument } = await import("../../dist/deps/pdf-lib.js");

    pdf.value = await PDFDocument.create();
    pdf.value.addPage([width.value, height.value]);

    sceneContext.update = async function () {
      const datauri = await pdf.value.saveAsBase64({ dataUri: true });
      src.value = datauri;
    };

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
