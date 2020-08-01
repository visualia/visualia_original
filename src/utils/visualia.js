import { createApp, provide, ref } from "../../dist/deps/vue.js";

import * as components from "../components.js";
import * as internals from "../internals.js";

import { useRouter, VApp } from "../internals.js";
import { componentCss, onError, onWarning, isObject } from "../utils.js";

export const visualia = (options = {}) => {
  const customOptions = {
    el: "#app",
    file: "./index.md",
    files: null,
    content: "",
    template: "",
    components: {},
    utils: {},
    menu: true,
    ...options,
  };

  const App = {
    components: { VApp },
    setup() {
      const router = useRouter();
      provide("router", router);
      provide("customUtils", customOptions.utils);

      const content = ref("");
      const menu = customOptions.menu;

      if (customOptions.content || customOptions.template) {
        content.value = customOptions.content;
        return { content, menu };
      } else if (customOptions.files) {
        Promise.all(
          customOptions.files.map((file) =>
            fetch(file).then((res) => res.text())
          )
        ).then((files) => {
          content.value = files.join("\n\n---\n\n");
        });
        return { content, menu };
      } else {
        fetch(customOptions.file)
          .then((res) => res.text())
          .then((file) => (content.value = file));
        return { content, menu };
      }
    },
    template:
      customOptions.template || `<v-app :content="content" :menu="menu" />`,
  };

  const app = createApp(App);

  // Loading components

  // We get all public and custom components and register them globally
  // so they will be available in Markdown documents

  Object.entries({
    ...components,
    ...customOptions.components,
  }).forEach(([name, component]) => app.component(name, component));

  // Loading CSS

  // Imported internals contain both components and functions
  // We filter out only components

  const internalComponents = Object.fromEntries(
    Object.entries(internals).filter(([key, value]) => isObject(value))
  );

  // We get all public, internal and custom components
  // and pass them to componentCss() function
  // that filters out all components that have { css: `` } property
  // defined, concat all CSS, and inject it to HTML <head>

  componentCss({
    ...components,
    ...internalComponents,
    ...customOptions.components,
  });

  // app.config.errorHandler = onError;
  // app.config.warnHandler = onWarning;

  app.mount(customOptions.el);
};
