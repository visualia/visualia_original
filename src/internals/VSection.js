import { computed, provide } from "../../dist/deps/vue.js";

import { slug } from "../utils.js";
import { VSuspense } from "../internals.js";

import {
  VMenu,
  VMenuIcon,
  VCompiler,
  parseContent,
  sectionGridStyle,
  formatHash,
} from "../internals.js";

export default {
  components: { VSuspense, VCompiler },
  props: ["section"],
  setup(props) {
    // TODO: Clean this up
    const title = computed(() => props.section.title || "");
    provide("sectionContext", { title });
    const id = computed(() =>
      props.section.title ? slug(props.section.title) : ""
    );
    return { id, sectionGridStyle };
  },
  template: `
  <div
    :style="{
      padding: 'var(--base4) var(--base4)',
      display: 'grid',
      ...sectionGridStyle(section)
    }"
    :id="id"
  >
    <div v-for="cell in section.content">
      <v-suspense>
        <template #default>
          <v-compiler :content="cell" />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </v-suspense>
    </div>
  </div>
  `,
};
