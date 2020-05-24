# Visualia

Visualia is a web framework for creating interactive documents. It uses [Markdown](https://guides.github.com/features/mastering-markdown/) text format and [VueJS 3.x](https://github.com/vuejs/vue-next) components for authoring.

Visualia supports a wide range of use cases, starting from interactive learning materials and live notebooks to generative design and data visualization.

https://github.com/visualia/visualia

![](https://github.com/visualia/visualia/workflows/Test/badge.svg)

## Getting started

To get started you will need three files: `index.md` for Markdown, `index.js` for Javascript and `index.html` for HTML.

**index.md**

```live index
# Hello

Welcome to Visualia. Edit me!
```

**index.js.** Yes, two lines.

```js
import { visualia } from "https://visualia.github.io/visualia/dist/visualia.js";
visualia();
```

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
      href="https://visualia.github.io/visualia/dist/visualia.css"
    />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="index.js"></script>
  </body>
</html>
```

## Development

### Work environment

We recommend to use Visual Studio Code with the following extensions:

https://github.com/axetroy/vscode-deno
https://github.com/faisalhakim47/vscode-vue-inline-template
https://github.com/bashmish/es6-string-css
https://github.com/ritwickdey/vscode-live-server

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

#### Run CI tests

Command-line tests run on each commit to Github repository, there is a Github action in [/.github/actions/test.yml](./.github/actions/test.yml).
