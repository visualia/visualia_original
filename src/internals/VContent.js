import { Suspense, computed, provide } from "../../dist/deps/vue.js";

import { slug } from "../utils.js";

import {
  VMenu,
  VMenuIcon,
  VCompiler,
  parseContent,
  contentGridStyle,
  formatHash,
} from "../internals.js";

export default {
  components: { Suspense, VCompiler },
  props: { content: { default: {}, type: Object } },
  setup(props) {
    // TODO: Clean this up
    const title = computed(() => props.content.title || "");
    provide("sectionContext", { title });
    const id = computed(() =>
      props.content.title ? slug(props.content.title) : ""
    );
    return { id, contentGridStyle };
  },
  template: `
  <div
    :style="{
      padding: 'var(--base4) var(--base4)',
      display: 'grid',
      ...contentGridStyle(content)
    }"
    :id="id"
  >
    <div
      v-for="(cell,i) in content.content"
      :style="{
        gridArea: 'a' + (i + 1), 
        border: content.debug ? '1px solid red' : ''
      }"
    >
      <suspense>
        <template #default>
          <v-compiler :content="cell" />
        </template>
        <template #fallback>
          <p>Loading...</p>
        </template>
      </suspense>
    </div>
  </div>
  `,
};
