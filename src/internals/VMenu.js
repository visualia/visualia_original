import { inject, computed } from "../deps/vue.js";
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
    const currentMenu = computed(() =>
      props.menu.filter((item) => {
        const parsedHash = parseHash(item.anchor);
        return item.level === 1 || parsedHash[0] === router.value[0];
      })
    );
    const isAnchorActive = (hash) => {
      const parsedHash = parseHash(hash);
      if (router.value[1]) {
        return parsedHash[1] === router.value[1];
      }
      return false;
    };

    return { isAnchorActive, currentMenu };
  },
  template: `
  <div style="padding: var(--base6) var(--base4);">
      <div
        v-for="link in currentMenu"
        :style="{ 
          opacity: 0.75,
          fontSize: link.level == 1 ? '1em' : '0.9em',
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
