# Internals

## Compiler

`<v-compiler>`, the heart of Visualia is based on a very simple idea:

1. Take a Markdown file
2. Add some VueJS components into the document
3. Live-compile the result into Vue component

In VueJS 3.x it can be expressed as:

```js
import {
  compile,
  createApp,
} from "https://unpkg.com/vue@3.0.0-alpha.4/dist/vue.esm.js";

import marked from "https://unpkg.com/marked@0.8.0/lib/marked.esm.js";

const content = `
# Hello

<sample-component />
`;

const App = {
  components: { SampleComponent: { template: "world" } },
  setup() {
    const template = marked(content);
    return () => compile(template)();
  },
};

createApp(App).mount("#app");
```

The actual `<v-compiler>` component [in the codebase](./src/components/VCompiler.js) is a little more sophisticated, including error handling and injecting utility functions, but the basic idea stays the same.

## Content display

`<v-content>` is working on top of `<v-compiler>`. It accepts `content` prop for Markdown content, does some extra formatting, splits the content into pages, separated by `---` and renders the result with `<v-compiler>`.

## Main entrypoint

To ease the the initialization of the framework, `<v-content>` is wrapped into a `visualia()` function that creates `App` component, fetches the content from Markdown file and displays it using `<v-content>` component.

## Graphics implementation

Each graphics scene has to be wrapped into `<v-scene>`.

`mode` prop defines what technology-specific scene component will actually render the scene.

```
<v-scene mode="svg" width="500" height="500">
</v-scene>
```

it will internally be rendered as:

```
<v-scene-svg>
</v-scene-svg>
```

Each child of `<v-scene>` is aware of the scene `mode` prop and passes the actual rendering to a technology-specific subcomponent.

When writing the following code:

```
<v-scene mode="svg">
  <v-square r="100" />
</v-scene>
```

it will internally be rendered as:

```
<v-scene-svg>
  <v-square-svg r="100" />
</v-scene-svg>
```

How `<v-square>` knows to pass the rendering onto the `<v-square-svg>`?

`<v-scene>` passes a set of reactive values as `renderContext` object to all it's children. All the dynamic rendering logic is based on this data.

```
const VSquareSvg = {
  setup() {
    const renderContext = inject("renderContext");
    /*
    renderContext = {
      mode.value: 'svg',
      width.value: 400,
      height.value: 400,
      unit.value: 1
    }
    */
  }
}
```
