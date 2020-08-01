import { computed } from "../../dist/deps/vue.js";
import * as components from "../components.js";

import { kebabcase, typename } from "../utils.js";

export default {
  props: {
    component: {
      required: true,
      type: String,
      docs: "Component name in `PascalCase`",
    },
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
          types:
            details.type === undefined
              ? []
              : [details.type]
                  .flat()
                  .map((t) => typename(t()))
                  .join(", "),
          docs: details.docs || "",
        };
      });
    });
    return { componentProps };
  },
  template: `
  <h5>Props</h5>
  <v-table :rows="componentProps" />
  `,
};
