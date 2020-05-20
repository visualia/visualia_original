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
    const mobile = false;
    return { parsedContent, contentToc, slideGridStyle, mobile };
  },
  template: `
  <div style="display: flex;">
    <div v-if="toc && !mobile" style="width: 300px;">
    </div>
    <div v-if="toc"
      :style="{
        boxShadow: mobile ? '0 0 20px hsla(200, 19%, 28%, 0.5)' : ''
      }"
      style="
      z-index: 10000;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 300px;
      overflow: scroll;
      background: white;
    ">
      <v-toc :toc="contentToc" :routes="routes" />
    </div>
    <div style="flex: 1; position: relative; display: flex; justify-content: center;">
      <div style="max-width: 800px; width: 100%;">
        <div
          v-for="(slide,i) in parsedContent"
          :style="{
            padding: 'var(--base8) var(--base4)',
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
        </div>
      </div>
    </div>
  </div>
  `,
};
