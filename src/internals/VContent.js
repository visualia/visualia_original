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
  VSection,
  parseContent,
  sectionGridStyle,
  formatHash,
} from "../internals.js";

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

    const setSectionTitle = (section, i) => {
      if (!section.title) {
        section.title =
          section.menu && section.menu[0]
            ? section.menu[0].text
            : `Section ${i + 1}`;
      }
      return section;
    };

    const parsedContent = computed(() =>
      parseContent(props.content).map(setSectionTitle)
    );

    const visibleContent = computed(() => {
      return parsedContent.value.filter((section) => {
        return router.value[0] === slug(section.title);
      });
    });

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

    return {
      visibleContent,
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
        <template v-for="(section,i) in visibleContent">
          {{ section.visible }}
          <v-section :key="i" :section="section" />
        </template>
      </div>
    </div>
  </div>
  `,
};
