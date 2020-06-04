import { createApp, provide, computed, h, ref, watch } from "../deps/vue.js";

import * as components from "../components.js";
import { useFetch, componentCss, onError, onWarning } from "../utils.js";

import { useRouter, VContent, VSave } from "../internals.js";

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
    components: { VContent },
    setup() {
      const router = useRouter();
      provide("router", router);
      provide("customUtils", customOptions.utils);

      const content = ref("");
      const routes = customOptions.routes;

      if (customOptions.content) {
        content.value = customOptions.content;
        return { routes, content };
      } else if (customOptions.files) {
        Promise.all(
          customOptions.files.map((file) =>
            fetch(file).then((res) => res.text())
          )
        ).then((files) => {
          content.value = files.join("\n\n---\n\n");
        });
        return { routes, content };
      } else {
        fetch(customOptions.file)
          .then((res) => res.text())
          .then((file) => (content.value = file));
        return { content, routes };
      }
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

  // TODO: Remove this hack
  componentCss({ ...components, VSave });

  // app.config.errorHandler = onError;
  // app.config.warnHandler = onWarning;

  app.mount(customOptions.el);
};
