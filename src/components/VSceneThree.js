import { inject, ref, onMounted, onBeforeUpdate } from "../../dist/deps/vue.js";

import {
  Scene,
  Camera,
  PerspectiveCamera,
  OrthographicCamera,
  Color,
  DirectionalLight,
  WebGLRenderer,
  SVGRenderer,
} from "../../dist/deps/three.js";

import { sizeProps, useSize } from "../internals/size.js";

export default {
  props: {
    ...sizeProps,
    renderer: {
      default: "svg",
      type: String,
    },
    isometric: {
      default: false,
      type: [Boolean, String],
    },
  },
  setup(props) {
    const el = ref(null);
    const { width, height } = useSize(props);

    const scene = new Scene();
    scene.background = new Color("white");

    const directionalLight = new DirectionalLight("white", 1);
    directionalLight.position.set(0, 0, 10);
    scene.add(directionalLight);

    let camera = null;
    if (props.isometric) {
      camera = new OrthographicCamera(
        width.value / -2,
        width.value / 2,
        height.value / 2,
        height.value / -2,
        0,
        1000
      );
    } else {
      camera = new PerspectiveCamera(
        100,
        width.value / height.value,
        0.1,
        1000
      );
      camera.position.z = width.value / 2.38;
    }

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

    const position = [width.value / -2, height.value / 2];
    const scale = [1, -1, 1];

    return { el, position, scale };
  },
  template: `
    <div class="v-scene-three" ref="el">
      <v-group :position="position" :scale="scale">
        <slot />
      </v-group>
    </div>
  `,
  css: /*css*/ `
    .v-scene-three > * {
      display: block;
    }
  `,
};
