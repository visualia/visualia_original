# Visualia

## About

Visualia is a web framework for creating interactive documents. It uses Markdown text format and [VueJS 3.x](https://github.com/vuejs/vue-next) components for authoring.

Visualia supports a wide range of use cases, starting from learning materials, interactive slides and visual notebooks to generative art and data visualizations.

## Getting started

To get started you will need a single HTML file and a Markdown file:

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
    <script type="module">
      import { visualia } from "https://visualia.github.io/visualia/visualia";
      visualia();
    </script>
  </body>
</html>
```

**index.md**

```md
# Hello world!
```

## Components

All Visualia components are prefixed with `v-` and are loaded automatically when the framework starts.

### Graphics

Visualia offers a set of graphics _primitives_ to draw circles, rectangles, etc. You can choose between using different rendering technologies -- whenever you need a 2d and 3d rendering or vector or bitmap output.

To choose the rendering technology you first set a graphics scene element, `<v-scene>` and set an attribute `type` to pick a suitable rendering type:

| Mode                      | Type      |
| ------------------------- | --------- |
| `<v-scene type="svg">`    | 2D vector |
| `<v-scene type="canvas">` | 2D bitmap |
| `<v-scene type="three">`  | 3D vector |
| `<v-scene type="webgl">`  | 3D bitmap |

<br>

Each graphics component is aware of the current`<v-scene>` type and passes the actual rendering to a technology-specific subcomponent.

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

#### Square

`<v-square>` Displays a 2D square.

```v
<v-scene>
  <v-square position="150 150" r="100" />
</v-scene>
```

#### Circle

`<v-circle>` displays a 2D circle.

```v
<v-scene>
  <v-circle position="150 150" r="100" />
</v-scene>
```

### Live variables

Visualia supports live variables, they can be easily set and used to create dynamic experiences.

#### Slider

The simplest way to create a dynamic variable is to use `<v-slider>` component with `set` prop:

```v
<v-slider set="a" />
```

To get the live value, use the `get()` function to print out the value.

```v
<blockquote>a is {{ get("a") }}</blockquote>
```

It is more useful to use `get()` function inside components, for example:

```v
<v-scene>
  <v-square
    position="150 150"
    r="100"
    :rotation="get('a')"
  />
</v-scene>
```

Most components that generate data accept `set=""` as a prop, but there is also a `set()` function for cases you want to do something custom.

#### Animate

Another way of adjusting live variables is to `<v-animate>` one value to another in certain duration.

```v
<v-animate set="b" />

<blockquote>b is {{ get("b") }}</blockquote>

<v-scene>
  <v-square
    position="150 150"
    r="100"
    :rotation="get('b')"
  />
</v-scene>
```

### Events

In addition to the live variables, Visualia also provides a way to send and receive global events.

#### Sending an event

To send an event, use `send()` function:

```v
<blockquote><button v-on:click="send('click!')">Click me</button></blockquote>
```

#### Receiving an event

To receive an event, use `receive()` function:

```v
{{ receive("click!", () => set("clicked", true)) }}

<blockquote>{{ get('clicked') ? 'Clicked!' : 'Waiting for a click'}}</blockquote>
```

### Math

`<v-math>` allows to write math equations in classic [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) format. It uses a [KaTeX](https://github.com/Khan/KaTeX) library under the hood.

```v
<v-math>b = a^2</v-math>
```

The true power of the framework emerges when math functions are combined with live variables:

```v
<v-slider set="a" />

<v-math>b = {{ get('a',0) }}^2 = {{ get('a',0) ** 2 }}</v-math>
```

## Development

### Markdown compiler

The heart of Visualia lies on a very simple idea:

> Take a Markdown file, add some VueJS components and live compile them into Vue template

In VueJS 3.x code it can be expressed as:

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

### Content display

`<v-content>` is working on top of `<v-compiler>`. It accepts `content` prop for Markdown content, parses it via `parseContent()` into pages separated by `---` divider.

Pages can be optionally divided into grid regions, separated by `-` dividers.

Then each region and page is looped over and rendered by `<v-compiler>`.

### CSS and styling

Global CSS resides in `/visualia.css` file and relies heavily on CSS variables.

Component CSS is stored as a `css` attribute on each component:

```js
const VExample = {
  template: `<div class="VExample">Hello</div>`,
  css: {
    .VExample {
      color: var(--red);
    }
  }
}
```

In `utils/css.js` there is a function `componentCss()` that gets the `css` attribute values from all components, merges them into a single CSS string and injects it to HTML `<style>` tag:

```js
import { components } from "https://visualia.github.io/visualia/visualia.js";

componentCss(components);
```

There are also utility functions for getting and setting CSS variables, `getCssVariable()` and `setCssVariable()` respectively.

### Code organization

[./src/components](./src/components)

Public VueJS components, all loaded when the framework is initialized and accessible in Markdown documents.

[./src/utils](./src/utils)

Public utility functions, accessible in Markdown documents.

[./src/internal](./src/utils)

Internal functions used by components.

[./src/deps](./src/deps)

External dependencies redirected to ESM imports from https://unpkg.com

### Bundling

By default, external dependencies are fetched from https://unpkg.com on each page load. This frees us to have a complicated build step but makes certain use cases harder, such as writing content or developing the framework offline.

For this reason, we ship also provide a command to create a bundled version of the framework that includes both external dependencies and framework code itself. It is located at `./visualia.bundle.js`.

To generate a bundle, use the following command:

```
deno bundle.js visualia.js > visualia.bundle.js
```

### Testing

Visualia relies on a suite of unit tests that verify that utility and internal functions work right.

#### Writing tests

Tests are simple functions starting with `test_` that return `actual` and `expected` results:

```js
export const add = value => value + 1

export const test_add = {
  return [add(1), 2]
}
```

Test functions are picked up by test runner `/test.js` that compare the values returned. If they equal, the test passes. If they are not equal, the test fails.

Tests can be run either from the browser or command line.

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

## FAQ

#### Why not package.json? Why not npm?

Visualia fully embraces the future of Javascript modules and is very much inspired by toolless movement and projects such as [Deno](https://deno.land/std/manual.md), [Pika](https://www.pika.dev/) and [reg](https://github.com/mikeal/reg) for next-generation ESM-based Javascript package management.

#### What about versioning the releases?

During the initial development, the development happens in the latest `master` branch. In the future, a simple versioning system could be introduced.

#### Why not Typescript?

It is a viable option and could provide excellent developer experience for the framework consumers. Visualia still prioritizes minimal tooling and directly accessible source code over the Typescript benefits.

Note that this could be reconsidered in the future, giving Typescript-based Deno is part of the project toolchain already.

#### Tell me the backstory!

Visualia is a second take on the same idea: creating lightweight dynamic documents using latest Javascript features, VueJS and Markdown.

Although the [first version called Fachwerk](https://github.com/designstem/fachwerk) did serve the need of the project it was created for -- to deliver next-gen educational materials -- the actual implementation was somewhat lacking:

- It was too early for fully embracing ESM (ECMAScript modules). Many of the project dependencies did not yet offer ESM module builds so custom Rollup-based build system was introduced for transpiling CommonJS modules to ESM (similar what [Snowpack](https://www.snowpack.dev/) does).

- One of the messiest implementations were ThreeJS-related code, starting from missing ESM support, especially in more experimental code such as `THREE.SVGRenderer` that had to be ported to ES6 manually. Also, the ThreeJS code was parly based on outdated [vue-threejs](https://github.com/fritx/vue-threejs) implementation that was hard to reason about.

- Some key ideas such as a simple global state using `set` and `get` only appeared in the project in a later stage. This left several inferior attempts for state handling via `v-slot` still into the codebase and the documentation.

- The performance was not a prioritized goal: CSS live injection approach was inefficient, math rendering needed a explicit update triggering and ThreeJS components were always animating even when the input data was static.

- Very modest test coverage and missing integration with CI (Continuous Integration) systems.

- Documentation, content creation, content marketing, contributions, and community management were mostly an afterthought.
