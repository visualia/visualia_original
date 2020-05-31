import { inject, onMounted, onUnmounted, watch } from "../deps/vue.js";
import { parseHash, formatHash } from "../internals.js";

export const VMenu = {
  props: {
    menu: {
      default: [],
      type: Array,
      docs: "Table of contents as a collection",
    },
    // TODO inject a isMobile / viewport size
    isMobile: {
      default: false,
      type: [Boolean, String],
      docs: "Is it mobile view?",
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
  <div
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
</div> 
`,
};
