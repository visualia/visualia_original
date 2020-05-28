import { createApp, provide, computed, h, ref, watch } from "../deps/vue.js";

import * as components from "../components.js";

import { useFetch, componentCss, onError, onWarning } from "../utils.js";

import { useRouter } from "../internals.js";

export const visualia = (options = {}) => {
  const customOptions = {
    content: "",
    el: "#app",
    file: "./index.md",
    files: null,
    components: {},
    utils: {},
    template: "",
    routes: null,
    ...options,
  };

  const App = {
    setup() {
      const router = useRouter();
      provide("router", router);
      provide("customUtils", customOptions.utils);

      const content = ref("");

      Promise.all(
        (customOptions.files || [customOptions.file]).map((file) =>
          fetch(file).then((res) => res.text())
        )
      ).then((files) => {
        content.value = files.join("\n\n---\n\n");
      });

      const routes = customOptions.routes;
      return { content, routes };
    },
    template:
      customOptions.template ||
      `
      <v-content :content="content" :routes="routes" menu />
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
