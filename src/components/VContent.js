import { computed } from "../deps/vue.js";
import { parseContent, slideGridStyle } from "../internals/content.js";

export const VContent = {
  props: {
    content: {
      default: "",
      type: String,
      docs: "Content to be compiled into VueJS template",
    },
  },
  setup(props) {
    const parsedContent = computed(() => parseContent(props.content));

    return { parsedContent, slideGridStyle };
  },
  template: `
  <div style="display: flex; justify-content: center; position: relative;">
    <div style="max-width: 800px; width: 100%;">
      <div
        v-for="(slide,i) in parsedContent"
        :style="{
          padding: 'var(--base4)',
          display: 'grid',
          ...slideGridStyle(slide)
        }"
      >
        <div v-for="cell in slide.content">
          <v-compiler :content="cell" />
        </div>
      </div>
    </div>
    <div style="position: absolute; right: 0; bottom: 0; left: 0; opacity: 0.75;">
      <v-messages />
    </div>
  </div>
  `,
};
