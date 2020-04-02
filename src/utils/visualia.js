import { createApp, provide } from "../deps/vue.js";

import * as components from "../components.js";

import { useFetch, componentCss, onError, onWarning } from "../utils.js";

export const visualia = (options = {}) => {
  const customOptions = {
    content: "",
    el: "#app",
    file: "./index.md",
    components: {},
    utils: {},
    template: "",
    use: {},
    ...options
  };

  const App = {
    setup() {
      provide("customUtils", customOptions.utils);
      let content = "";
      if (customOptions.content) {
        content = customOptions.content;
      } else {
        const fetch = useFetch(customOptions.file);
        content = fetch.content;
      }
      return { content };
    },
    template:
      customOptions.template ||
      `
      <v-content :content="content" />
    `
  };

  const app = createApp(App);

  Object.entries({
    ...components,
    ...customOptions.components
  }).forEach(([name, component]) => app.component(name, component));

  Object.entries(customOptions.use).forEach(([_, use]) => app.use(use));

  componentCss(components);

  // app.config.errorHandler = onError;
  // app.config.warnHandler = onWarning;
  app.mount(customOptions.el);
};
