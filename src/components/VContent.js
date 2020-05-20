import { computed, Suspense, watch } from "../deps/vue.js";
import { flatten } from "../utils.js";
import { parseContent, slideGridStyle } from "../internals.js";

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
    const contentToc = computed(() =>
      flatten(parsedContent.value.map((slide) => slide.toc))
    );
    return { parsedContent, contentToc, slideGridStyle };
  },
  template: `
  <div style="position: relative; display: flex; justify-content: center;">
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
        <v-toc v-if="toc" :toc="contentToc" :routes="routes" />
      </div>
    </div>
  </div>
  `,
};
