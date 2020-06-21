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

import { flatten, slug, useSize } from "../utils.js";

import {
  VMenu,
  VMenuIcon,
  VCompiler,
  parseContent,
  sectionGridStyle,
  formatHash,
} from "../internals.js";

const VSection = {
  components: { Suspense, VCompiler },
  props: ["section"],
  setup(props) {
    const title = computed(() => props.section.title);
    provide("sectionContext", { title });
    const id = computed(() => slug(props.section.title));
    return { id, sectionGridStyle };
  },
  template: `
  <div
    :style="{
      padding: 'var(--base6) var(--base4)',
      display: 'grid',
      ...sectionGridStyle(section)
    }"
    :id="id"
  >
    <div v-for="cell in section.content">
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
  `,
};

const setSectionTitle = (section, i) => {
  if (!section.title) {
    section.title =
      section.menu && section.menu[0]
        ? section.menu[0].text
        : `Section ${i + 1}`;
  }
  return section;
};

export default {
  components: { VSection, VMenu, VMenuIcon },
  props: {
    content: {
      default: "",
      type: String,
      docs: "Content to be compiled into VueJS template",
    },
    menu: {
      default: false,
      type: [Boolean, String],
      docs: "Show table of contents?",
    },
  },
  setup(props) {
    const router = inject("router");

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

    const parsedContent = computed(() =>
      parseContent(props.content).map(setSectionTitle)
    );

    const contentMenu = computed(() =>
      flatten(
        parsedContent.value.map((section, i) => {
          section.menu = section.menu.map((item) => {
            item.anchor = formatHash([slug(section.title), item.anchor]);
            return item;
          });
          return [
            {
              anchor: slug(section.title),
              level: 1,
              text: section.title,
            },
            section.menu.filter(
              (item, i) => i !== 0 || section.title !== item.text
            ),
          ];
        })
      )
    );

    const activeParsedContent = computed(() =>
      parsedContent.value.filter((section) => {
        return router.value[0] ? router.value[0] === slug(section.title) : true;
      })
    );

    return {
      activeParsedContent,
      contentMenu,
      sectionGridStyle,
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
      <v-menu :menu="contentMenu" />
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
      @touchstart="showMenu = !showMenu"
    >
      <v-menu-icon />
    </div>
    <div style="flex: 1; position: relative; display: flex; justify-content: center;">
      <div  style="max-width: 900px; width: 100%;">
        <v-section v-for="(section,i) in activeParsedContent" :key="i" :section="section">
      </div>
    </div>
  </div>
  `,
};
