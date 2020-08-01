import {
  computed,
  Suspense,
  onMounted,
  inject,
  ref,
  nextTick,
  provide,
  watch,
} from "../../dist/deps/vue.js";

import { slug, useSize } from "../utils.js";

import {
  VMenu,
  VMenuIcon,
  VCompiler,
  VSection,
  parseContent,
  sectionGridStyle,
  formatHash,
} from "../internals.js";

export default {
  components: { VMenuIcon },
  props: {
    menu: {
      default: false,
      type: [Boolean, String],
      docs: "Show table of contents?",
    },
  },
  setup() {
    const { el, width } = useSize();
    const isMobile = computed(() => width.value < 800);

    const showMenu = ref(false);
    const unwatch = watch(
      () => width.value,
      () => {
        if (width.value !== null) {
          showMenu.value = !isMobile.value;
          if (unwatch) {
            unwatch();
          }
        }
      },
      { immediate: true }
    );
    return {
      el,
      showMenu,
      isMobile,
    };
  },
  template: `
<div
  ref="el"
  style="display: flex; position: relative;"
  :style="{'--base': isMobile ? '7px' : '8px'}"
>
  <div v-if="menu && !isMobile && showMenu" style="width: 250px; background: gray;"></div>
  <div v-if="menu && isMobile && showMenu"
    style="
      z-index: 1000;
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      width: calc(100vw - 250px);
      background: rgba(0,0,0,0.2);
    "
    @click="showMenu = !showMenu"
  />
  <div v-if="menu && showMenu"
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
    overflow: auto;
    background: white;
  ">
    <slot name="menu" />
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
    @click="showMenu = !showMenu"
  >
    <v-menu-icon />
  </div>
  <div style="flex: 1; position: relative; display: flex; justify-content: center;">
    <div  style="max-width: 900px; width: 100%;">
      <slot name="content" />
    </div>
  </div>
</div>
`,
};
