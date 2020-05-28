import {
  computed,
  Suspense,
  onMounted,
  inject,
  ref,
  nextTick,
} from "../deps/vue.js";
import { flatten, slug } from "../utils.js";
import { parseContent, slideGridStyle, formatHash } from "../internals.js";

const useResize = () => {
  const el = ref(null);
  const width = ref(null);
  const height = ref(null);
  onMounted(() => {
    const observer = new ResizeObserver(async (entries) => {
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
    menu: {
      default: false,
      type: [Boolean, String],
      docs: "Show menu?",
    },
  },
  setup(props) {
    const { el, width } = useResize();
    const isMobile = computed(() => width.value < 800);
    const activeMenu = ref(true);
    const router = inject("router");

    const menu = computed(() =>
      parseContent(props.content).map((slide) => {
        if (slide.title) {
          slide.anchor = formatHash([router.value[0], slug(slide.title)]);
        }
        return slide;
      })
    );

    const contentMenu = computed(() =>
      flatten(
        menu.value.map((slide) =>
          slide.anchor
            ? [
                {
                  anchor: slide.anchor,
                  level: 1,
                  text: slide.title,
                },
                slide.menu,
              ]
            : slide.menu
        )
      )
    );
    return {
      menu,
      contentMenu,
      slideGridStyle,
      el,
      activeMenu,
      isMobile,
    };
  },
  template: `
  <div
    ref="el"
    style="display: flex; position: relative;"
    :style="{'--base': isMobile ? '7px' : '8px'}"
  >
    <div v-if="menu && !isMobile && activeMenu" style="width: 250px; background: gray;"></div>
    <div v-if="menu && isMobile && activeMenu"
      style="
        z-index: 1000;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        width: calc(100vw - 250px);
        background: rgba(0,0,0,0.2);
      "
      @click="activeMenu = !activeMenu"
    />
    <div v-if="menu && activeMenu"
      :style="{
        boxShadow: isMobile ? '0 0 20px hsla(200, 19%, 28%, 0.5)' : ''
      }"
      style="
      z-index: 1000;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 250px;
      overflow: scroll;
      background: white;
    ">
      <v-menu :menu="menu" />
    </div>
    <div
      v-if="menu"
      style="
        position: fixed;
        top: 0px;
        left: 10px;
        z-index: 10000;
        font-size: 32px;
        cursor: pointer;
        opacity: 0.75;
      "
      @click="activeMenu = !activeMenu"
    >
      <v-menu-icon />
    </div>
    <div style="flex: 1; position: relative; display: flex; justify-content: center;">
      <div  style="max-width: 900px; width: 100%;">
        <div
          v-for="(slide,i) in menu"
          :style="{
            padding: 'var(--base6) var(--base4)',
            display: 'grid',
            ...slideGridStyle(slide)
          }"
          :id="slide.anchor || ''"
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
