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
