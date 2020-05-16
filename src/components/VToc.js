import { inject, onMounted, onUnmounted } from "../deps/vue.js";
import { parseHash } from "../internals.js";

export const VToc = {
  props: {
    toc: {
      default: [],
      type: Array,
      docs: "Table of contents as a collection",
    },
    routes: {
      default: {},
      type: Object,
      docs: "Routes object",
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

    //const routeLinks = ["index"];

    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting && entry.intersectionRatio === 1) {
    //         router.value[1] = parseHash(entries[0].target.id)[1];
    //       }
    //     });
    //   },
    //   { threshold: 1 }
    // );

    // onMounted(() => {
    //   props.toc.value.forEach(({ anchor }) => {
    //     observer.observe(document.getElementById(anchor));
    //   });
    // });

    // onUnmounted(() => observer.disconnect());

    return { isAnchorActive, router };
  },
  template: `
  <div style="background: white; position: fixed; top: 0; left: 0; bottom: 0; overflow: scroll; padding: 20px; width: 250px;">
    <div>{{ routes }}</div>
    <div v-for="route in Object.entries(routes)">
      <div style="padding-bottom: 20px;">
        <a :href="route[0] == 'index' ? '#' : '#' + route[0]">{{ route[1].file }}</a>
      </div>
      <div
        v-if="(router[0] == '' && route[0] == 'index') || (
        router[0] == route[0])"
        v-for="link in toc"
        :style="{ 
          fontSize: '0.8em',
          marginBottom: '10px', 
          marginLeft: ((link.level - 1) * 12) + 'px',
        }"
      >
        <a :href="'#' + link.anchor">{{ link.text }}</a>
      </div>
    </div>
  </div>   
`,
};
