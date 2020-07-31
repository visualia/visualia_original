# Visualia

## About

Visualia is a web framework for creating interactive documents. It uses [Markdown](https://guides.github.com/features/mastering-markdown/) text format and [Vue 3](https://github.com/vuejs/vue-next) templates for content creation.

Visualia supports a wide range of use cases, from interactive learning materials and live notebooks to generative design and data visualization.

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

---

## Graphics

Visualia offers a number of graphics primitives, a set of components to draw 2D and 3D graphics.

### Scene

`<v-scene></v-scene>`

First you need to add a _scene_ to the document, an area where graphics components are placed.

<!--- <v-props component="VScene" /> --->

`mode` prop allows you to choose different rendering technologies -- whenever you need a 2d and 3d rendering or vector or bitmap output. Here are different render modes and underlying implementation:

| Mode                                 | Type      | Tech                   |
| ------------------------------------ | --------- | ---------------------- |
| `<v-scene mode="svg">`, default mode | 2D vector | `<svg>`                |
| `<v-scene mode="canvas">`            | 2D bitmap | `<canvas>`             |
| `<v-scene mode="three">`             | 3D vector | ThreeJS SVG renderer   |
| `<v-scene mode="webgl">`             | 3D bitmap | ThreeJS WebGL renderer |

<br />

### Point

`<v-point />`

Displays a point.

```live point
<v-scene>
  <v-point position="100 100" />
</v-scene>
```

<!--- <v-props component="VPoint" /> --->

### Line

`<v-line />`

Displays a line.

```live line
<v-scene>
  <v-line points="50 50, 150 150, 150 50" />
</v-scene>
```

<!--- <v-props component="VLine" /> --->

### Polygon

`<v-polygon />`

Displays a polygon.

```live polygon
<v-scene>
  <v-polygon points="50 50, 150 150, 150 50" />
</v-scene>
```

<!--- <v-props component="VPolygon" /> --->

### Regular polygon

`<v-regularpolygon />`

Displays a regular polygon.

```live regularpolygon
<v-scene>
  <v-regularpolygon
    count="5"
    r="50"
    position="100 100"
  />
</v-scene>
```

<!--- <v-props component="VRegularpolygon" /> --->

### Hexagon

`<v-hexagon />`

Displays a hexagon.

```live hexagon
<v-scene>
  <v-hexagon
    r="50"
    position="100 100"
  />
</v-scene>
```

<!--- <v-props component="VHexagon" /> --->

### Rectangle

`<v-rect />`

Displays a 2D rectangle.

```live rect
<v-scene>
  <v-rect position="100 100" width="50" height="50" />
  <v-point position="100 100" fill="red" />
</v-scene>
```

<!--- <v-props component="VRect" /> --->

### Square

`<v-square />`

Displays a 2D square.

```live square
<v-scene>
  <v-square position="100 100" r="25" />
  <v-point position="100 100" fill="red" />
</v-scene>
```

<!--- <v-props component="VSquare" /> --->

### Circle

`<v-circle />`

Displays a 2D circle.

```live circle
<v-scene>
  <v-circle position="100 100" r="50" />
</v-scene>
```

<!--- <v-props component="VCircle" /> --->

### Sphere

`<v-sphere />`

Displays a 3D sphere

```live sphere
<v-scene mode="three" isometric>
  <v-sphere
    r="50"
    position="100 100"
    rotation="60 0 0"
    segments="32"
  />
</v-scene>
```

<!--- <v-props component="VSphere" /> --->

---

## Live variables

Visualia supports live variables to create dynamic experiences, you can `set` and `get` the variables anywhere inside the content.

### Slider

`<v-slider>`

The simplest way to create a dynamic variable is to use `<v-slider>` component with `set` prop:

```live set
<v-slider set="a" />

a is {{ get("a") }}

```

To display the live value, use the `get()` function. You can use `get()` anywhere in the document.

<!--- <v-props component="VSlider" /> --->

### Animate

`<v-animate />`

Another way of generating live variables is to use `<v-animate />` component that interpolates the value between `start` and `end` values given the during the certain `duration`.

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

To send an event, use `send()` function:

```live send
<button @click="send('click!')">Click me</button>
```

To receive an event, use `receive()` function:

```live receive
{{ receive("click!", () => set("clicked", true)) }}

{{ get('clicked') ? 'Clicked!' : 'Waiting for a click'}}
```

---

## Math

`<v-math>` allows to write math equations in classic [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) format. It uses a [KaTeX](https://github.com/Khan/KaTeX) library under the hood.

```live math
<v-math>b = a^2</v-math>
```

The true power of the framework emerges when math is combined with live variables and graphics components:

```live mathget
<v-slider set="a" />

<v-math>b = {{ get('a',0) }}^2 = {{ get('a',0) ** 2 }}</v-math>

<v-scene>
  <v-square
    position="100 100"
    r="50"
    :rotation="get('a')"
  />
</v-scene>
```

---

## Integrations

Visualia provides integration with several popular Javascript-based visualization frameworks.

### Figma

You can use Visualia to generate graphics in Figma.

Due to the architecture of Figma plugins, you can not use Visualia `<v-...>` tags to generate graphics, but you can use Visualia functions to calculate the neccessary coordinates for the graphics and then use Figma drawing APIs to do the actual rendering.

Here's the general workflow and neccessary files you will need to set up:

**ui.html**

```html
<script type="module">
  import { circlepoints } from "https://visualia.github.io/visualia/dist/visualia.js";
  parent.postMessage(
    {
      pluginMessage: { message: "createCircles", points: circlepoints(6, 100) },
    },
    "*"
  );
</script>
```

**code.js**

```js
figma.showUI(__html__);
figma.ui.hide();
figma.ui.onmessage = ({ message, points }) => {
  if (message === "createCircles") {
    const nodes = [];
    points.forEach(([x, y]) => {
      const circle = figma.createEllipse();
      circle.x = x;
      circle.y = y;
      circle.resize(200, 200);
      circle.fills = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];
      circle.opacity = 0.25;
      figma.currentPage.appendChild(circle);
      nodes.push(circle);
    });
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};
```

**manifest.json**

```
{
  "main": "code.js",
  "ui": "ui.html",
  "id": "any-random-number-here",
  "name": "visualia-in-figma",
  "api": "0.0.1"
}
```

### p5

[p5](https://p5js.org/), a popular implementation of Processing framework in Javascript can easily integrated with Visualia and they can even share live values and events.

**index.js**

```js
import {
  visualia,
  get,
} from "http://visualia.github.io/visualia/dist/visualia.js";
import {
  ref,
  onMounted,
} from "http://visualia.github.io/visualia/dist/deps/vue.js";
import p5 from "https://cdn.skypack.dev/p5";

// p5 sketch

// Note that we are using need to wrap into the sketch function
// and prefix all commands with s, otherwise it is regular p5 API
// See https://github.com/processing/p5.js/wiki/Global-and-instance-mode

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

### Observable

Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.

#### Visualia in Observable

Here is a sample Observable notebook that imports Visualia into Observable notebook and allows to share reactive data between the environments.

https://observablehq.com/@kristjanjansen/visualia-in-observable

#### Observable in Visualia

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

```md
<observable-example />

#### Visualia document

c = {{ get('c') }}

Visualia slider is setting Observable value `d` {{ get('d') }}

<v-slider set="d" to="100" step="1" />
```

---

## Development

### Development environment

We recommend to use Visual Studio Code with [vscode-live-server](https://github.com/ritwickdey/vscode-live-server) plugin.

For code formatting we use standard Prettier rules. It is recommended to run `npm install` on project directory (to install local Prettier instance), install [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) plugin and enable "Format on save" setting in VS Code.

### Component authoring

#### Templates

For templating, Visualia uses ES6 string literals (not `.vue` files) to make the framework run in the browser without compilation step.

```js
export default { template: `<div>Hello world</div>` };
```

It's recomended to install [vscode-vue-inline-template](https://github.com/faisalhakim47/vscode-vue-inline-template) plugin to VS Code to highlight the template section in the Vue component.

#### CSS and styling

Global CSS resides in `/dist/visualia.css` file and relies heavily on CSS variables.

Component CSS can be stored as a `css` property on each component. On framework initialization all components CSS will be merged into a single CSS string and injected into HTML `<style>` tag.

```js
const VExample = {
  template: `<div class="v-example">Hello world</div>`,
  css: /* css */ `
    .v-example {
      color: red;
    }
  `,
};
```

To highlight the CSS in components, it's recommended to install [es6-string-css](https://github.com/bashmish/es6-string-css) plugin.

### Code organization

**/.github**

GitHub actions for testing and deployment

**/dist**

Framework distribution files, generated by build scripts.

At the time of writing, these are committed into the project's GitHub repository, we are looking into NPM publishing in the future.

**/dist/deps**

External dependencies bundled into ES6 modules. These modules are used both in development and production.

**/dist/visualia.css**

CSS file to import into your custom Visualia application.

**/dist/visualia.js**

Javascript file to import into your custom Visualia application.

<!--

#### Documentation

[/docs](/dist/deps)

Documentation as Visualia-flavoured Markdown files. Project homepage fetches and renders these pages in the browser, without build step.

-->

**/editor**

Experimental live editor based on Monaco / VS Code editor .

**/experiments**

Various coding experiments.

**/src**

Project source code

**/src/components**

Project public components.

**/src/deps**

External dependencies, imported as CommonJS modules. This directory is needed for the `npm run build:deps` build script that packages dependencies to `/dist/deps` as ES6 modules.

**/src/internalss**

Internal components and utility functions.

**/src/utils**

Public utility functions.

**/test**

See the testing section below.

**/index.html**

Visualia homepage. It imports `./dist/visualia.js` and fetches and renders documentation.

**/rollup.\*.config.js**

Rollup config files for building external dependencies, used by the build scripts.

### Testing

Visualia relies on a suite of unit tests what verify framework functions work correctly.

#### Writing tests

Tests are simple functions starting with `test_` prefix that return `actual` and `expected` results of the function.

```js
export const add = value => value + 1

export const test_add = {
  // return [actual, expected];
  return [add(1), 2]
}
```

Test functions are invoked by test runner `/test.js` that compares the `actual` and `expected` results. If they equal, the test passes, otherwise the test fails.

#### Run browser tests

Open `/test` path in local server and open Developer Tools panel.

#### Run command line tests

It is assumed you have NodeJS installed. The run:

```js
node test
```

#### Run CI tests

Command-line tests run on each commit to Github repository, there is a Github action in [/.github/actions](./.github/actions).
