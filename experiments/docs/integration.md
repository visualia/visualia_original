# Integrations

Visualia provides integration with several popular Javascript-based visualization frameworks.

## p5

[p5](https://p5js.org/), a popular implementation of Processing framework in Javascript can easily integrated with Visualia and they can even share live values and events.

To ease the p5 usage, Visualia maintains a ESM compatible built of p5 at https://github.com/visualia/p5

**index.js**

```js
import {
  visualia,
  get,
} from "http://visualia.github.io/visualia/dist/visualia.js";
import { ref, onMounted } from "http://visualia.github.io/visualia/deps/vue.js";
import { p5 } from "http://visualia.github.io/p5/dist/p5.js";

// p5 sketch

// Note that you need to wrap into the sketch function
// and prefix all commands with s, otherwise it is regular p5 API
// See more at https://github.com/processing/p5.js/wiki/Global-and-instance-mode

// Note that we use get() function to use Visualia live variables

const sketch = (s) => {
  s.setup = () => {
    s.createCanvas(200, 200);
  };
  s.draw = () => {
    s.background(255);
    s.stroke(0);
    s.strokeWeight(2);
    s.circle(100, 100, get("a") || 10);
  };
};

// We are wrapping p5 sketch into a Visualia component

export const PfiveExample = {
  setup() {
    const el = ref(null);
    onMounted(() => {
      new p5(sketch, el.value);
    });
    return { el };
  },
  template: `
    <div ref="el" />
  `,
};

// We initialize Visualia with our p5 component

visualia({
  components: { PfiveExample },
});
```

**index.md**

```live p5
<v-slider set="a" from="10" to="200" />

<pfive-example />
```

## Observable

Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.

### Visualia in Observable

Here is a sample Observable notebook that imports Visualia into Observable notebook and allows to share reactive data between the environments.

https://observablehq.com/@kristjanjansen/visualia-in-observable

### Observable in Visualia

As Observable allows [exporting notebooks as ESM modules](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks), you can also import Observable notebook into Visualia.

Here's the code how to import a sample notebook to Visualia and have a two-way data exchange between two reactive environments:

**index.js**

```js
import { get, set } from "http://visualia.github.io/visualia/dist/visualia.js";
import {
  ref,
  onMounted,
  watch,
} from "http://visualia.github.io/visualia/deps/vue.js";
import {
  Runtime,
  Inspector,
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
      const observable = new Runtime().module(notebook, (name) => {
        if (name == "c") {
          // Getting data from Obsevable to Visualia:
          // we loop over Obsevable notebook cells and if the one of them
          // returns value "a", we set it as Visualia global variable "a"

          return {
            fulfilled(value) {
              set("c", value);
            },
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
  `,
};
```

**index.md**

```live observable
<observable-example />

#### Visualia document

c = {{ get('c') }}

Visualia slider is setting Observable value `d` {{ get('d') }}

<v-slider set="d" to="100" step="1" />
```
