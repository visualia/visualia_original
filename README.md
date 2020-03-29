# Visu&#8203;alia

## About

Visualia is a web framework for creating interactive documents. It uses [Markdown](https://guides.github.com/features/mastering-markdown/) text format and [VueJS 3.x](https://github.com/vuejs/vue-next) components for authoring.

Visualia supports a wide range of use cases, starting from interactive learning materials and live notebooks to generative design and data visualization.

https://github.com/visualia/visualia

![](https://github.com/visualia/visualia/workflows/Test/badge.svg)

## Getting started

To get started you will need three files: `index.html` for HTML, `index.js` for Javascript and `index.md` for Markdown.

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Visualia</title>
    <link
      rel="stylesheet"
      href="https://visualia.github.io/visualia/visualia.css"
    />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="index.js"></script>
  </body>
</html>
```

**index.js**

```js
import { visualia } from "https://visualia.github.io/visualia/visualia.js";
visualia();
```

**index.md**

```live index
## Hello

Welcome to Visualia. Edit me!
```

## Components

All Visualia components are prefixed with `v-` and are loaded automatically when the framework starts.

### Graphics

Visualia offers a set of _graphics primitives_, a set of components to draw circles, rectangles etc.

`<v-scene>`

First you need to add a _scene_ to the document, an area where graphics components are placed.

```
<v-scene>
</v-scene>
```

<!--- <v-props component="VSceneThree" /> --->

`type` prop allows you to choose different rendering technologies -- whenever you need a 2d and 3d rendering or vector or bitmap output. Here are different types, their dimensions, and underlying technology:

| Mode                      | Type      | Tech                   |
| ------------------------- | --------- | ---------------------- |
| `<v-scene type="svg">`    | 2D vector | `<svg>`                |
| `<v-scene type="canvas">` | 2D bitmap | `<canvas>`             |
| `<v-scene type="three">`  | 3D vector | ThreeJS SVG renderer   |
| `<v-scene type="webgl">`  | 3D bitmap | ThreeJS WebGL renderer |

<br />

#### Point

`<v-point>`

Displays a point.

```live point
<v-scene>
  <v-point position="100 100" />
</v-scene>
```

<!--- <v-props component="VPoint" /> --->

#### Line

`<v-line>`

Displays a line.

```live line
<v-scene>
  <v-line points="50 50, 150 150" />
</v-scene>
```

<!--- <v-props component="VLineSvg" /> --->

#### Square

`<v-square>`

Displays a 2D or 3D square.

```live square
<v-scene>
  <v-square position="100 100" r="50" />
</v-scene>
```

<!--- <v-props component="VSquareSvg" /> --->

#### Circle

`<v-circle>`

Displays a 2D circle.

```live circle
<v-scene>
  <v-circle position="100 100" r="50" />
</v-scene>
```

<!--- <v-props component="VCircleSvg" /> --->

#### Sphere

Displays a 3D sphere. In 2D mode it will be displayed as a circle.

```live sphere
<v-scene type="three" isometric>
  <v-sphere
    r="50"
    position="100 100"
    rotation="60 0 0"
    segments="32"
  />
</v-scene>
```

<!--- <v-props component="VSphereThree" /> --->

<!--

 #### Group

Allows to apply transformations to group of graphics elements.

```live group
<v-scene>
  <v-group rotation="-10">
    <v-square r="25" position="50 100" />
    <v-square r="25" position="150 100" />
  </v-group>
</v-scene>
```

-->

<!--- <v-props component="VGroupSvg" /> --->

### Live variables

Visualia supports live variables to create dynamic experiences, you can `set` and `get` the variables anywhere inside the content.

#### Slider

`<v-slider>`

The simplest way to create a dynamic variable is to use `<v-slider>` component with `set` prop:

```live set
<v-slider set="a" />
```

To display the live value, use the `get()` function:

```live get
a is {{ get("a") }}
```

You can use `get()` function anywhere in the document, including inside components:

```live getscene
<v-scene>
  <v-square
    position="100 100"
    r="50"
    :rotation="get('a')"
  />
</v-scene>
```

<!--- <v-props component="VSlider" /> --->

#### Animate

`<v-animate>`

Another way of generating live variables is to use `<v-animate>` component that interpolates the value between `start` and `end` values given the during the certain `duration`.

```live animate
<v-animate set="b" />

b is {{ get("b") }}

<v-scene>
  <v-square
    position="100 100"
    r="50"
    :rotation="get('b')"
  />
</v-scene>
```

<!--- <v-props component="VAnimate" /> --->

### Events

In addition to the live variables, Visualia also provides a way to send and receive global events.

#### Sending an event

To send an event, use `send()` function:

```live send
<button v-on:click="send('click!')">Click me</button>
```

#### Receiving an event

To receive an event, use `receive()` function:

```live receive
{{ receive("click!", () => set("clicked", true)) }}

{{ get('clicked') ? 'Clicked!' : 'Waiting for a click'}}
```

### Math

`<v-math>` allows to write math equations in classic [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) format. It uses a [KaTeX](https://github.com/Khan/KaTeX) library under the hood.

```live math
<v-math>b = a^2</v-math>
```

The true power of the framework emerges when math functions are combined with live variables:

```live mathget
<v-slider set="a" />

<v-math>b = {{ get('a',0) }}^2 = {{ get('a',0) ** 2 }}</v-math>
```

## Development

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
  createApp
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
  }
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

`type` prop defines what technology-specific scene component will actually render the scene.

```
<v-scene type="svg" width="500" height="500">
</v-scene>
```

it will internally be rendered as:

```
<v-scene-svg>
</v-scene-svg>
```

Each child of `<v-scene>` is aware of the scene `type` prop and passes the actual rendering to a technology-specific subcomponent.

When writing the following code:

```
<v-scene type="svg">
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
      type.value: 'svg',
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
  `
};
```

On framework initialization components CSS will be merged into a single CSS string and be injected into HTML `<style>` tag:

```js
import { components } from "https://visualia.github.io/visualia/visualia.js";

componentCss(components);
```

### Code organization

[./visualia.js](./visualia.js)

The main library entrypoint. All public API components and utilities should be imported from `./visualia.js`, not from the actual component files.

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
deno bundle.js visualia.js > visualia.bundle.js
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

## Integrating with other frameworks

### p5

[p5](https://p5js.org/), a popular re-imagination of Processing framework can easily integrated with Visualia and they can even share live values and events.

To ease the p5 usage, Visualia maintains a ESM compatible built of p5 at https://github.com/visualia/p5

##### index.js

```js
import { visualia, get } from "http://visualia.github.io/visualia/visualia.js";
import { ref, onMounted } from "http://visualia.github.io/visualia/deps/vue.js";
import { p5 } from "http://visualia.github.io/p5/p5.js";

// p5 sketch

// Note that you need to wrap into the sketch function
// and prefix all commands with s, otherwise it is regular p5 API

// Note that we use get() function to use Visualia live variables

const sketch = s => {
  s.setup = () => {
    s.createCanvas(200, 200);
  };
  s.draw = () => {
    s.background(0);
    s.fill(100);
    s.rect(get("a", 0), 100, 50, 50);
  };
};

// We are wrapping p5 sketch into a Vue / Visualia component

const P5Example = {
  setup() {
    const el = ref(null);
    onMounted(() => {
      new p5(sketch, el.value);
    });
    return { el };
  },
  template: `
    <div ref="el" />
  `
};

// We initialize Visualia with our p5 component

visualia({
  components: { P5Example }
});
```

##### index.md

```md
<v-slider set="a" />

<p5-example />
```

### Observable

Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As is is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.

#### Using Visualia in Observable

Here is a sample Observable notebook that imports Visualia into Observable notebook and allows to share reactive data between the environments.

https://observablehq.com/@kristjanjansen/visualia-in-observable

#### Using Observable in Visualia

As Observable allows [exporting notebooks as ESM modules](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks), you can also import Observable notebook into Visualia.

Here's the code how to import a sample notebook to Visualia and have a two-way data exchange between two reacive environments:

**index.js**

```js
import { visualia, set } from "../../visualia.js";
import { ref, onMounted } from "../deps/vue.js";
import {
  Runtime,
  Inspector
} from "https://unpkg.com/@observablehq/runtime/dist/runtime.js";

// We are importing the notebook
// https://observablehq.com/@kristjanjansen/using-observable-in-visualia
// Note the "api" prefix and ".js?v=3" suffx to make the import work

import notebook from "https://api.observablehq.com/@kristjanjansen/using-observable-in-visualia.js?v=3";

// We are creating a wrapper component <observable-example />

const ObservableExample = {
  setup() {
    const el = ref(null);
    onMounted(() => {
      const observable = new Runtime().module(notebook, name => {
        if (name == "a") {
          // Getting data from Obsevable to Visualia:
          // we loop over Obsevable notebook cells and if the one of them
          // returns value "a", we set it as Visualia global variable "a"

          return {
            fulfilled(value) {
              set("a", value);
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
        () => get("b"),
        () => observable.redefine("b", get("b"))
      );
    });
    return { el };
  },
  template: `
    <div ref="el" />
  `
};

visualia({ components: { ObservableExample } });
```

**index.md**

```md
<observable-example />

#### Visualia document

a = {{ get('a') }}

Visualia slider is setting Observable value `b` {{ get('b') }}

<v-slider set="b" to="100" step="1" />
```

## FAQ

#### Why not package.json? Why not npm?

Visualia embraces the future of Javascript modules and is very much inspired by projects such as [Deno](https://deno.land/std/manual.md), [Pika](https://www.pika.dev/) and [reg](https://github.com/mikeal/reg) for next-generation ESM-based Javascript package management.

#### What about versioning the releases?

During the initial development, the development happens in the latest `master` branch. In the future, a simple versioning system could be introduced.

#### Why not Typescript?

It is a viable option and could provide excellent developer experience for the framework consumers. Visualia still prioritizes minimal tooling and directly accessible source code over the Typescript benefits.

Note that this could be reconsidered in the future, giving Typescript-based Deno is part of the project toolchain already.

## Backstory

Visualia is a second take on the initial idea: creating lightweight dynamic documents using the latest Javascript features, VueJS and Markdown.

Although the first version called [Fachwerk](https://github.com/designstem/fachwerk) did serve the need of the project it was created for -- to deliver next-gen educational materials -- the actual implementation was somewhat lacking:

- It was too early for fully embracing ESM (ECMAScript modules). Many of the project dependencies did not yet offer ESM module builds so custom Rollup-based build system was introduced for transpiling CommonJS modules to ESM (similar what [Snowpack](https://www.snowpack.dev/) does).

- One of the messiest implementations were ThreeJS-related code, starting from missing ESM support, especially in more experimental code such as `THREE.SVGRenderer` that had to be ported to ES6 manually. Also, the ThreeJS code was parly based on outdated [vue-threejs](https://github.com/fritx/vue-threejs) implementation that was hard to reason about.

- Some key ideas such as a simple global state using `set` and `get` only appeared in the project in a later stage. This left several inferior attempts for state handling via `v-slot` still into the codebase and the documentation.

- The performance was not a prioritized goal: CSS live injection approach was inefficient, math rendering needed a explicit update triggering and ThreeJS components were always animating even when the input data was static.

- Very modest test coverage and missing integration with CI (Continuous Integration) systems.

- Documentation, content creation, content marketing, contributions, and community management were mostly an afterthought.
