import { computed, inject } from "../../dist/deps/vue.js";

import { slug, useSize } from "../utils.js";

import {
  VMenu,
  VMenuIcon,
  VLayout,
  VContent,
  parseContent,
  formatHash,
} from "../internals.js";

export default {
  components: { VLayout, VContent, VMenu },
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

    const setSectionTitle = (section, i) => {
      if (!section.title) {
        section.title =
          section.menu && section.menu[0] ? section.menu[0].text : "";
      }
      return section;
    };

    const parsedContent = computed(() =>
      parseContent(props.content).map(setSectionTitle)
    );

    const visibleContent = computed(() => {
      return parsedContent.value.filter((section, i) => {
        // If there is an active route, we are looking up
        // the section in the content that has the same title

        // If there is no active route (frontpage in initial load)
        // we return the first section in the content
        return router.value[0]
          ? router.value[0] === slug(section.title)
          : i === 0;
      });
    });

    const contentMenu = computed(() =>
      parsedContent.value
        .map((section, i) => {
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
        .flat(Infinity)
    );

    return {
      visibleContent,
      parsedContent,
      contentMenu,
    };
  },
  template: `
  <v-layout :menu="menu">
    <template #menu>
      <v-menu :menu="contentMenu" />
    </template>
    <template #content>
      <template v-for="(content,i) in visibleContent">
        <v-content :key="i" :content="content" />
      </template>
    </template>
  </v-layout>
  `,
};
