# Backstory

Visualia is a second iteration of the same idea, the predecessor project [Fachwerk](https://github.com/designstem/fachwerk) was also based on latest Javascript features, ESM, VueJS and Markdown.

It was built to deliver interactive educational materials -- it served that need, but he the actual implementation was somewhat lacking.

Here are the key lessons we learned from Fachwerk:

**It was too early for full-on ESM**

2017-2019 was too early for fully embracing ECMAScript modules. Many of the project dependencies did not yet offer ESM module builds so custom Rollup-based build system was introduced for transpiling CommonJS modules to ESM (similar what [Snowpack](https://www.snowpack.dev/) does).

**ThreeJS was not yet modular**

One of the messiest parts of Fachwerk was 3D code, based on ThreeJS. ESM builds of the library had to be created partially using Rollup, partially manually (`THREE.SVGRenderer`). In addition, the [vue-threejs](https://github.com/fritx/vue-threejs) integration library code Fachwerk used was quite hard to reason about.

**Key ideas arriving too late**

Some key ideas such as a simple global state using `set` and `get` and having a proper routing only appeared in the project in a later stage. This left previous inferior attempts still into the codebase and documentation.

**Do not underestimate the performance issues**

The web performance was not a prioritized goal: CSS live injection approach was inefficient, math rendering needed a explicit update triggering and ThreeJS components were always animating even when the input data was stale.

**Where are the tests?**

Fachwerk had a very modest test coverage and missing integration with CI (Continuous Integration) systems.

**More outreach needed**

Documentation, content creation, content marketing, contributions, and community management were mostly an afterthought.