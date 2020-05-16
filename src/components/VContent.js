import { computed, Suspense } from "../deps/vue.js";
import { parseContent, slideGridStyle } from "../internals/content.js";

export const VContent = {
  components: { Suspense },
  props: {
    content: {
      default: "",
      type: String,
      docs: "Content to be compiled into VueJS template",
    },
    routes: {
      default: {},
      type: Object,
      docs: "Routes object",
    },
    toc: {
      default: false,
      type: [Boolean, String],
      docs: "Show table of contents?",
    },
  },
  setup(props) {
    const parsedContent = computed(() => parseContent(props.content));

    return { parsedContent, slideGridStyle };
  },
  template: `
  <div style="display: flex; justify-content: center;">
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
          <suspense>
          <template #default>
            <v-compiler :content="cell" />
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
          </suspense>
        </div>
        <v-toc v-if="toc" :toc="slide.toc" :routes="routes" />
      </div>
    </div>
  </div>
  `,
};
