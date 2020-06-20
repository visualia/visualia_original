import {
  computed,
  Suspense,
  onMounted,
  inject,
  ref,
  nextTick,
  provide,
} from "../deps/vue.js";

import { flatten, slug, useSize } from "../utils.js";

import {
  VMenu,
  VMenuIcon,
  VCompiler,
  parseContent,
  sectionGridStyle,
} from "../internals.js";

const VSection = {
  components: { Suspense, VCompiler },
  props: ["section"],
  setup(props) {
    const title = computed(() => props.section.title);
    provide("sectionContext", { title });
    return { sectionGridStyle };
  },
  template: `
  <div
    :style="{
      padding: 'var(--base6) var(--base4)',
      display: 'grid',
      ...sectionGridStyle(section)
    }"
    :id="section.anchor || ''"
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

export const VContent = {
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
    const { el, width } = useSize();
    const isMobile = computed(() => width.value < 800);
    const showMenu = ref(true);
    const router = inject("router");

    const parsedContent = computed(() =>
      parseContent(props.content).map((section, i) => {
        if (!section.title) {
          //section.title = `Section ${i + 1}`;
          //console.log(section.menu);
          section.title = section.menu.length
            ? "X" + section.menu[0].text
            : `Section ${i + 1}`;
        }
        return section;
        // if (section.title) {
        //   section.anchor = formatHash([router.value[0], slug(section.title)]);
        // }
        //console.log(section);
        //return section;
      })
    );

    const contentMenu = computed(() =>
      flatten(
        parsedContent.value.map((section, i) => {
          //if (section.title) {
          section.menu = section.menu.map((item) => {
            item.anchor = slug(section.title) + item.anchor;
            return item;
          });
          return [
            {
              anchor: slug(section.title),
              level: 1,
              text: section.title,
            },
            section.menu,
          ];
          //}
          //return section.menu;
        })
      )
    );

    return {
      parsedContent,
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
      overflow: scroll;
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
    >
      <v-menu-icon />
    </div>
    <div style="flex: 1; position: relative; display: flex; justify-content: center;">
      <div  style="max-width: 900px; width: 100%;">
        <v-section v-for="(section,i) in parsedContent" :key="i" :section="section" >
      </div>
    </div>
  </div>
  `,
};
