# Components

All Visualia components are prefixed with `v-` and are loaded automatically when the framework starts.

## Graphics

Visualia offers a set of _graphics primitives_, a set of components to draw circles, rectangles etc.

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
| `<v-scene mode="svg">`    | 2D vector | `<svg>`                |
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

## Math

`<v-math>` allows to write math equations in classic [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) format. It uses a [KaTeX](https://github.com/Khan/KaTeX) library under the hood.

```live math
<v-math>b = a^2</v-math>
```

The true power of the framework emerges when math functions are combined with live variables:

```live mathget
<v-slider set="a" />

<v-math>b = {{ get('a',0) }}^2 = {{ get('a',0) ** 2 }}</v-math>
```
