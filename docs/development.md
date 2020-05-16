## Development

### Work environment

We recommend to use Visual Studio Code with the following extensions:

https://github.com/axetroy/vscode-deno
https://github.com/faisalhakim47/vscode-vue-inline-template
https://github.com/bashmish/es6-string-css
https://github.com/ritwickdey/vscode-live-server

### Component architecture

#### Compiler

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

#### Content display

`<v-content>` is working on top of `<v-compiler>`. It accepts `content` prop for Markdown content, does some extra formatting, splits the content into pages, separated by `---` and renders the result with `<v-compiler>`.

#### Main entrypoint

To ease the the initialization of the framework, `<v-content>` is wrapped into a `visualia()` function that creates `App` component, fetches the content from Markdown file and displays it using `<v-content>` component.

### Graphics implementation

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

### CSS and styling

Global CSS resides in `/visualia.css` file and relies heavily on CSS variables.

Component CSS can be stored as a `css` attribute on each component:

```js
const VExample = {
  template: `<div class="VExample">Hello</div>`,
  css: `
    .VExample {
      color: var(--red);
    }
  `,
};
```

On framework initialization components CSS will be merged into a single CSS string and be injected into HTML `<style>` tag:

```js
import {
  componentCss,
  components,
} from "https://visualia.github.io/visualia/dist/visualia.js";

componentCss(components);
```

### Code organization

[./dist/visualia.js](./dist/visualia.js)

The main library entrypoint. All public API components and utilities should be are accessible from `./dist/visualia.js`.

[./index.js](./index.js)

Visualia homepage. It imports `./visualia.js` and displays `README.md` file.

[./src/components](./src/components)

VueJS components, all loaded when the framework is initialized and accessible in Markdown documents.

[./src/utils](./src/utils)

Utility functions, accessible in Markdown documents.

[./src/internal](./src/utils)

Internal functions used by components.

[./src/deps](./src/deps)

External dependencies, ESM imports from https://unpkg.com

### Bundling

By default, external dependencies are fetched from https://unpkg.com on each page load. This frees us to have a complicated build step but makes certain use cases harder, such as using the framework offline.

For this reason, we ship also provide a command to create a bundled version of the framework that includes both external dependencies and framework code itself. It is located at `./visualia.bundle.js`.

To generate the bundle, use the following command:

```
deno bundle.js dist/visualia.js > dist/visualia.bundle.js
```

### Testing

Visualia relies on a suite of unit tests that verify that framework's utility and internal functions work right.

#### Writing tests

Tests are simple functions starting with `test_` prefix that return `actual` and `expected` results of the function.

```js
export const add = value => value + 1

export const test_add = {
  // return [actual, expected];
  return [add(1), 2]
}
```

Test functions are picked up by test runner `/test.js` that compares the `actual` and `expected` results. If they equal, the test passes. If they do not equal, the test fails.

#### Run browser tests

Open [/test.html](/test.html) file in local server and open Developer Tools panel.

#### Run command line tests

First, you will need to install [Deno](https://deno.land/std/manual.md) and run the following commands on MacOS:

```js
brew install deno
deno test.js
```

For Windows support, see [these Deno installation instructions](https://deno.land/std/manual.md#download-and-install).

#### Running tests automatically

Command-line tests run on each commit to Github repository, there is a Github action in [/.github/actions/test.yml](./.github/actions/test.yml).
