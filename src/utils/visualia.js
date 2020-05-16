import {
  createApp,
  provide,
  computed,
  h,
  ref,
  watch,
  Suspense,
} from "../deps/vue.js";

import * as components from "../components.js";

import { useFetch, componentCss, onError, onWarning } from "../utils.js";

import { useRouter } from "../internals.js";

export const visualia = (options = {}) => {
  const customOptions = {
    content: "",
    el: "#app",
    file: "./index.md",
    components: {},
    utils: {},
    template: "",
    routes: {
      index: {
        file: "./README.md",
        title: "Getting started",
      },
      components: {
        file: "./docs/components.md",
        title: "Components",
      },
      integration: {
        file: "./docs/integration.md",
        title: "Integrations",
      },
      development: {
        file: "./docs/development.md",
        title: "Development",
      },
      releases: {
        file: "./RELEASES.md",
        title: "Releases",
      },
      backstory: {
        file: "./docs/backstory.md",
        title: "Backstory",
      },
      faq: {
        file: "./docs/faq.md",
        title: "FAQ",
      },
    },
    ...options,
  };

  const App = {
    components: { Suspense },
    setup() {
      const router = useRouter();
      provide("router", router);
      provide("customUtils", customOptions.utils);
      // let content = ref("");
      // if (customOptions.content) {
      //   content.value = customOptions.content;
      // }
      // if (customOptions.routes) {
      //   content = computed(() => {
      //     const file = customOptions.routes[router.value[0] || "index"].file;
      //     const fetch = useFetch(file);
      //     console.log(fetch.content.value);
      //     // const fetch = useFetch(

      //     // );
      //     return "a";
      //   });
      // } else {
      //   const fetch = useFetch(customOptions.file);
      //   content.value = fetch.content;
      // }
      const content = ref("");
      watch(async (r) => {
        const file = customOptions.routes[router.value[0] || "index"].file;
        const res = await fetch(file);
        content.value = await res.text();
      });
      const routes = customOptions.routes;
      return { content, routes };
    },
    template: `
      <v-content :content="content" :routes="routes" toc />
    `,
  };

  const Wrapper = {
    components: { App },
    template: `
    <suspense>
      <template #default>
        <app />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </suspense>
    `,
  };

  const app = createApp(App);

  Object.entries({
    ...components,
    ...customOptions.components,
  }).forEach(([name, component]) => app.component(name, component));

  componentCss(components);

  // app.config.errorHandler = onError;
  // app.config.warnHandler = onWarning;

  app.mount(customOptions.el);
};
