import { get, set } from "../visualia.js";
import { ref, onMounted, watch } from "../src/deps/vue.js";
import {
  Runtime,
  Inspector
} from "https://unpkg.com/@observablehq/runtime/dist/runtime.js";

// We are importing the notebook
// https://observablehq.com/@kristjanjansen/using-observable-in-visualia
// Note the "api" prefix and ".js?v=3" suffx to make the import work

import notebook from "https://api.observablehq.com/@kristjanjansen/using-observable-in-visualia.js?v=3";

// We are creating a wrapper component <observable-example />

export const ObservableExample = {
  setup() {
    const el = ref(null);
    onMounted(() => {
      const observable = new Runtime().module(notebook, name => {
        if (name == "c") {
          // Getting data from Obsevable to Visualia:
          // we loop over Obsevable notebook cells and if the one of them
          // returns value "a", we set it as Visualia global variable "a"

          return {
            fulfilled(value) {
              set("c", value);
            }
          };
        } else {
          // For all other cells we just render the Observable cell in Visualia
          return new Inspector(
            el.value.appendChild(document.createElement("p"))
          );
        }
      });
      // Sending data from Visualia to Observable:
      // We are watching Visualia global value "b"
      // and when it changes, we change the Observable
      // cell value "b"
      watch(
        () => get("d"),
        () => observable.redefine("d", get("d"))
      );
    });
    return { el };
  },
  template: `
    <div ref="el" />
  `
};
