import { inject, watch, computed } from "../deps/vue.js";
import { parseHash } from "../internals.js";

export const VToc = {
  props: {
    toc: {
      default: [],
      type: Array,
      docs: "Table of contents as a collection",
    },
  },
  setup(props) {
    const router = inject("router");
    const isAnchorActive = (hash) => {
      const parsedHash = parseHash(hash);
      if (!!router.value[1]) {
        return parsedHash[1] === router.value[1];
      }
      return false;
    };

    const routeLinks = ["index"];
    const toc = computed(() => props.toc);
    return { toc, isAnchorActive, routeLinks, router };
  },
  template: `
  <div style="position: fixed; top: 0; left: 0; bottom: 0; overflow: scroll; padding: 20px; width: 250px;">
    <div v-for="routeLink in routeLinks">
      <div style="padding-bottom: 20px;">
        <a :href="routeLink == 'index' ? '' : '#' + routeLink">{{ routeLink }}</a>
      </div>
      <div
        v-for="link in toc"
        :style="{ 
          marginBottom: '10px', 
          marginLeft: ((link.level - 1) * 12) + 'px',
          fontWeight: isAnchorActive(link.anchor) ? 'bold' : 'normal'
        }"
      >
        <a :href="'#' + link.anchor">{{ link.text }}</a>
      </div>
    </div>
  </div>   
`,
};
