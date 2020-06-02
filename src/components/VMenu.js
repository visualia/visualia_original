import { inject, onMounted, onUnmounted } from "../deps/vue.js";
import { parseHash, formatHash } from "../internals.js";

export const VMenu = {
  props: {
    menu: {
      default: [],
      type: Array,
      docs: "Table of contents as a collection",
    },
  },
  setup(props) {
    const router = inject("router");

    const isAnchorActive = (hash) => {
      const parsedHash = parseHash(hash);
      if (router.value[1]) {
        return parsedHash[1] === router.value[1];
      }
      return false;
    };

    return { isAnchorActive };
  },
  template: `
  <div style="padding: var(--base6) var(--base4);">
      <div
        v-for="link in menu"
        :style="{ 
          opacity: 0.75,
          fontSize: link.level == 1 ? '1em' : '0.8em',
          marginBottom: 'calc(var(--base) * 1.5)', 
          marginLeft: ((link.level - 1) * 6) + 'px'
        }"
      >
        <a :style="{
          border: 'none',
          fontWeight: isAnchorActive(link.anchor) ? 'bold' : 'normal'
        }" :href="'#' + link.anchor">{{ link.text }}</a>
      </div>
  </div>   
`,
};