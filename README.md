# Visualia

Visualia is a web framework for creating interactive documents. It uses [Markdown](https://guides.github.com/features/mastering-markdown/) text format and [Vue 3](https://github.com/vuejs/vue-next) templates for content creation.

Visualia supports a wide range of use cases, from interactive learning materials and live notebooks to generative design and data visualization.

https://github.com/visualia/visualia

![](https://github.com/visualia/visualia/workflows/Test/badge.svg)

---

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

Visualia offers a set of _graphics primitives_, a set of components to draw circles, rectangles etc.

### Scene

`<v-scene>`

First you need to add a _scene_ to the document, an area where graphics components are placed.

```
<v-scene>

</v-scene>
```

<!--- <v-props component="VScene" /> --->

`mode` prop allows you to choose different rendering technologies -- whenever you need a 2d and 3d rendering or vector or bitmap output. Here are different render modes, their dimensions, and underlying implementation:

| Mode                      | Type      | Tech                   |
| ------------------------- | --------- | ---------------------- |
| `<v-scene mode="svg">`    | 2D vector | `<svg>`, default mode  |
| `<v-scene mode="canvas">` | 2D bitmap | `<canvas>`             |
| `<v-scene mode="three">`  | 3D vector | ThreeJS SVG renderer   |
| `<v-scene mode="webgl">`  | 3D bitmap | ThreeJS WebGL renderer |

<br />

### Point

`<v-point>`

Displays a point.

```live point
<v-scene>
  <v-point position="100 100" />
</v-scene>
```

<!--- <v-props component="VPoint" /> --->

### Line

`<v-line>`

Displays a line.

```live line
<v-scene>
  <v-line points="50 50, 150 150, 150 50" />
</v-scene>
```

<!--- <v-props component="VLine" /> --->

### Polygon

`<v-polygon>`

Displays a polygon.

```live polygon
<v-scene>
  <v-polygon points="50 50, 150 150, 150 50" />
</v-scene>
```

<!--- <v-props component="VPolygon" /> --->

### Regular polygon

`<v-regularpolygon>`

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

`<v-hexagon>`

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

`<v-rect>`

Displays a 2D rectangle.

```live rect
<v-scene>
  <v-rect position="100 100" width="50" height="50" />
  <v-point position="100 100" fill="red" />
</v-scene>
```

<!--- <v-props component="VRect" /> --->

### Square

`<v-square>`

Displays a 2D square.

```live square
<v-scene>
  <v-square position="100 100" r="25" />
  <v-point position="100 100" fill="red" />
</v-scene>
```

<!--- <v-props component="VSquare" /> --->

### Circle

`<v-circle>`

Displays a 2D circle.

```live circle
<v-scene>
  <v-circle position="100 100" r="50" />
</v-scene>
```

<!--- <v-props component="VCircle" /> --->

### Sphere

Displays a 3D sphere. In 2D mode it will be displayed as a circle.

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

# Math

`<v-math>` allows to write math equations in classic [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) format. It uses a [KaTeX](https://github.com/Khan/KaTeX) library under the hood.

```live math
<v-math>b = a^2</v-math>
```

The true power of the framework emerges when math functions are combined with live variables:

```live mathget
<v-slider set="a" />

<v-math>b = {{ get('a',0) }}^2 = {{ get('a',0) ** 2 }}</v-math>
```

---

## Live variables

Visualia supports live variables to create dynamic experiences, you can `set` and `get` the variables anywhere inside the content.

### Slider

`<v-slider>`

The simplest way to create a dynamic variable is to use `<v-slider>` component with `set` prop:

```live set
<v-slider set="a" />
```

To display the live value, use the `get()` function. You can use `get()` anywhere in the document, including _inside components_:

```live get
a is {{ get("a") }}

<v-scene>
  <v-square
    position="100 100"
    r="50"
    :rotation="get('a')"
  />
</v-scene>
```

<!--- <v-props component="VSlider" /> --->

### Animate

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

---

## Events

In addition to the live variables, Visualia also provides a way to send and receive global events.

### Sending an event

To send an event, use `send()` function:

```live send
<button v-on:click="send('click!')">Click me</button>
```

### Receiving an event

To receive an event, use `receive()` function:

```live receive
{{ receive("click!", () => set("clicked", true)) }}

{{ get('clicked') ? 'Clicked!' : 'Waiting for a click'}}
```

---

## Development

### Development environment

We recommend to use Visual Studio Code with [vscode-live-server](https://github.com/ritwickdey/vscode-live-server) plugin

### Component authoring

#### Templates

Visualia uses ES6 string literals (not `.vue` files) for templating to make the framework work in the browser without bundling.

````js
export default { template: `<div>Hello world</div>` };

It's recomended to install [vscode-vue-inline-template](https://github.com/faisalhakim47/vscode-vue-inline-template) plugin to VS Code to highlight the `template:` section in the Vue component.

#### CSS and styling

Global CSS resides in `/dist/visualia.css` file and relies heavily on CSS variables.

Component CSS can be stored as a `css` property on each component. On framework initialization all components CSS will be merged into a single CSS string and injected into HTML `<style>` tag.

```js
const VExample = {
  template: `<div class="VExample">Hello world</div>`,
  css: /* css */ `
    .VExample {
      color: red;
    }
  `,
};
````

To highlight the CSS in components, it's recommended to install [es6-string-css](https://github.com/bashmish/es6-string-css) plugin.

### Code organization

#### Github configuration

[/.github](/.githb)

GitHub actions for testing and deployment

#### Distribution files

[/dist](/dist)

Framework distribution files, generated by build scripts.

At the time of writing, these are committed into the project's GitHub repository, we are looking for NPM publishing in the future.

[/dist/deps](/dist/deps)

External dependencies as bundled ES6 bundled modules, generated by the build script. These bundled dependencies used both in development and production.

[/dist/visualia.css](/dist/visualia.css)

The main CSS file, this is _the_ file to import into your custom Visualia application.

[/dist/visualia.js](/dist/visualia.js)

The main library entrypoint as ES6 module, this is _the_ file to import into your custom Visualia application.

<!--

#### Documentation

[/docs](/dist/deps)

Documentation as Visualia-flavoured Markdown files. Project homepage fetches and renders these pages in the browser, without build step.

-->

#### Experiments

[/editor](/editor)

Experimental live editor based on Monaco editor (that also powers VS Code).

[/experiments](/experiments)

Various coding experiments.

#### Source code

[/src](/src)

Project source code

[/src/components](/src/components)

Project public components, available in the Markdown templates.

[/src/components.js](/src/components)

Index file for public components.

[/src/deps](/deps)

External dependencies, imported as CommonJS modules. This directory is needed `npm run build:deps` build script that packages dependencies to `/dist/deps` as ES6 modules.

[/src/internals](/src/internals)

Internal components and utility functions.

[/src/internals.js](/src/internals.js)

Index file for internal components and utility functions.

[/src/utils](/src/utils)

Public utility functions that are available in the Markdown templates.

[/src/utils.js](/src/utils.js)

Index file for public utility functions.

#### Other files

[/index.html](/index.html) and [/index.js](/index.js)

Visualia homepage. It imports `./dist/visualia.js` and fetches and renders documentation in `/docs` and `/README.md`

[/rollup.deps.config.js](/rollup.deps.config.js)

Rollup config for building external dependencies. It used in `npm run build:deps` build script.

[/rollup.lib.config.js](/rollup.lib.config.js)

Rollup config for building a bundled version of the framework. It used in `npm run build:lib` build script.

### Testing

Visualia relies on a suite of unit tests what verify framework's utility and internal functions work right.

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

Open [/test.html](/test.html) file in local server and open Developer Tools panel.

#### Run command line tests

It is assumed you have NodeJS installed. The run

```js
node test.js
```

#### Run CI tests

Command-line tests run on each commit to Github repository, there is a Github action in [/.github/actions](./.github/actions).
