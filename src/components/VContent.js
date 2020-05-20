import {
  computed,
  Suspense,
  onMounted,
  watch,
  ref,
  nextTick,
} from "../deps/vue.js";
import { flatten } from "../utils.js";
import { parseContent, slideGridStyle } from "../internals.js";

const useResize = () => {
  const el = ref(null);
  const width = ref(null);
  const height = ref(null);
  onMounted(() => {
    const observer = new ResizeObserver(async (entries) => {
      await nextTick();
      width.value = entries[0].contentRect.width;
    });
    observer.observe(el.value);
  });
  return { el, width };
};

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
    const { el, width } = useResize();
    const isMobile = computed(() => width.value < 800);
    const showMenu = ref(true);

    const parsedContent = computed(() => parseContent(props.content));
    const contentToc = computed(() =>
      flatten(parsedContent.value.map((slide) => slide.toc))
    );
    return {
      parsedContent,
      contentToc,
      slideGridStyle,
      el,
      showMenu,
      isMobile,
    };
  },
  template: `
  <div ref="el" style="display: flex; position: relative;">
    <div v-if="toc && !isMobile && showMenu" style="width: 300px; background: gray;"></div>
    <div v-if="toc && showMenu"
      :style="{
        boxShadow: isMobile ? '0 0 20px hsla(200, 19%, 28%, 0.5)' : ''
      }"
      style="
      z-index: 1000;
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
    <div
      v-if="toc"
      style="
        position: fixed;
        top: 0px;
        left: 10px;
        z-index: 10000;
        font-size: 32px;
        cursor: pointer;
        opacity: 0.75;
      "
      @click="showMenu = !showMenu"
    >≡</div>
    <div style="flex: 1; position: relative; display: flex; justify-content: center;">
      <div  style="max-width: 900px; width: 100%;">
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
