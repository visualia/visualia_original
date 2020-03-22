import { inject, ref, onMounted, onBeforeUpdate } from "../deps/vue.js";

import {
  Scene,
  PerspectiveCamera,
  Color,
  DirectionalLight,
  WebGLRenderer
} from "../deps/three.js";

import { SVGRenderer } from "../deps/svgrenderer.js";

import { sizeProps, useSize } from "../internals/size.js";

import { receive } from "../utils.js";

export const VSceneThree = {
  props: {
    ...sizeProps,
    renderer: {
      default: "svg",
      type: String
    }
  },
  setup(props) {
    const el = ref(null);
    const { width, height } = useSize(props);

    const scene = new Scene();
    scene.background = new Color("white");

    const directionalLight = new DirectionalLight("white", 1);
    directionalLight.position.set(0, 0, 10);
    scene.add(directionalLight);

    const camera = new PerspectiveCamera(
      100,
      width.value / height.value,
      0.1,
      1000
    );
    camera.position.z = width.value / 2.5;

    const renderer =
      props.renderer == "webgl" ? new WebGLRenderer() : new SVGRenderer();
    renderer.setSize(width.value, height.value);
    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );

    const sceneContext = inject("sceneContext");

    sceneContext.width = width;
    sceneContext.height = height;
    sceneContext.scene = scene;
    sceneContext.update = () => renderer.render(scene, camera);

    onMounted(() => {
      el.value.append(renderer.domElement);
      renderer.render(scene, camera);
    });

    onBeforeUpdate(() => {
      renderer.render(scene, camera);
    });

    return { el };
  },
  template: `
    <div class="f-scene-three" ref="el">
      <slot />
    </div>
  `,
  css: /*css*/ `
    .f-scene-three > * {
      display: block;
      border: 1px solid red;
    }
  `
};
