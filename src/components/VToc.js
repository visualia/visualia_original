import { inject, onMounted, onUnmounted, watch } from "../deps/vue.js";
import { parseHash, formatHash } from "../internals.js";

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
      if (router.value[1]) {
        return parsedHash[1] === router.value[1];
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            // TODO: Move this logic to router
            router.value[1] = parseHash(entries[0].target.id)[1];
            location.hash = formatHash(router.value, true);
          }
        });
      },
      // From https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/
      { threshold: 1, rootMargin: "0px 0px -80% 0px" }
    );

    onMounted(() => {
      watch(() => {
        if (props.toc) {
          // TODO: disconnect prev observers?
          props.toc.forEach(({ anchor }) => {
            const el = document.getElementById(anchor);
            if (el) {
              observer.observe(document.getElementById(anchor));
            }
          });
        }
      });
    });

    onUnmounted(() => observer.disconnect());

    return { isAnchorActive };
  },
  template: `
  <div style="padding: var(--base6) var(--base4);">
      <div
        v-for="link in toc"
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
