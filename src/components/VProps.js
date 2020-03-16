import { computed, camelize, capitalize } from "../deps/vue.js";
import * as components from "../components.js";

import { flatten, kebabcase, typename } from "../utils.js";

export const VProps = {
  props: {
    component: {
      required: true,
      type: String,
      docs: "Component name in `PascalCase`"
    }
  },
  setup(props) {
    const componentProps = computed(() => {
      if (!components[props.component].hasOwnProperty("props")) {
        return [];
      }
      const p = Object.entries(components[props.component].props);
      return p.map(([name, details]) => {
        return {
          name: `\`${kebabcase(name)}\``,
          default:
            details.default === undefined || details.default === ""
              ? ""
              : `\`${details.default}\``,
          types: flatten(details.type === undefined ? [] : [details.type])
            .map(t => typename(t()))
            .join(", "),
          docs: details.docs || ""
        };
      });
    });
    return { componentProps };
  },
  template: `
  <v-table :rows="componentProps" />
  `
};
