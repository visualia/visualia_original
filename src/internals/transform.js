import { computed, watch } from "../../dist/deps/vue.js";
import { toNumber } from "../utils.js";

import {
  parseCoords,
  normalizeScale,
  normalizeThreeRotation,
} from "../internals.js";

import { deg2rad } from "../utils.js";

export const transformTwoProps = {
  position: {
    default: [0, 0],
    suggest: "0 0",
    type: [String, Number, Array, Object],
    docs: "Object position in 2D",
  },
  rotation: {
    default: 0,
    type: [String, Number, Array, Object],
    docs: "Object rotation angle in degrees, in 2D plane",
  },
  scale: {
    default: [1, 1],
    type: [String, Number, Array, Object],
    docs: "Object scale. Negative scale flips the object.",
  },
};

export const transformThreeProps = {
  position: {
    default: [0, 0, 0],
    suggest: "0 0 0",
    type: [String, Number, Array, Object],
    docs: "Object position in 3D",
  },
  rotation: {
    default: [0, 0, 0],
    type: [String, Number, Array, Object],
    docs: "Object rotation angle in degrees, over X, Y and Z axis",
  },
  scale: {
    default: [1, 1, 1],
    type: [String, Number, Array, Object],
    docs:
      "Object scale in X, Y and Z dimensions, Negative scale value flips the object in that dimension",
  },
};

const getTwoTransform = (props) => {
  const position = parseCoords(props.position)[0];
  const rotation = parseCoords(props.rotation)[0];
  const scale = parseCoords(props.scale, normalizeScale)[0];

  return { position, rotation, scale };
};

export const getThreeTransform = (props) => {
  const position = parseCoords(props.position)[0];
  const rotation = parseCoords(props.rotation, normalizeThreeRotation)[0];
  const scale = parseCoords(props.scale, normalizeScale)[0];

  return { position, rotation, scale };
};

// SVG

export const useSvgTransform = (props) => {
  return computed(() => {
    const { position, rotation, scale } = getThreeTransform(props);
    const positionStr = `translate(${position[0]} ${position[1]})`;
    const rotationStr = `rotate(${rotation[2]})`;
    const scaleStr = `scale(${scale[0]} ${scale[1]})`;

    return [positionStr, rotationStr, scaleStr].join(" ");
  });
};

/*

SKIPPED

export const test_useSvgTransform_default_props = () => {
  return [
    useSvgTransform(transformThreeProps).value,
    "translate(0 0) rotate(0) scale(1 1)",
  ];
};

*/

export const test_useSvgTransform_custom_props = () => {
  const props = { position: "100 200", rotation: "300", scale: "2" };
  return [
    useSvgTransform(props).value,
    "translate(100 200) rotate(300) scale(2 2)",
  ];
};

export const combineTransforms = (t1, t2) => {
  let position = [0, 0, 0];
  let rotation = [0, 0, 0];
  let scale = [1, 1, 1];
  if (t1.position) {
    position = t1.position;
  }
  if (t2.position) {
    position = [
      toNumber(position[0]) + toNumber(t2.position[0]),
      toNumber(position[1]) + toNumber(t2.position[1]),
      toNumber(position[2]) + toNumber(t2.position[2]),
    ];
  }
  if (t1.rotation) {
    rotation = t1.rotation;
  }
  if (t2.rotation) {
    rotation = [
      toNumber(rotation[0]) + toNumber(t2.rotation[0]),
      toNumber(rotation[1]) + toNumber(t2.rotation[1]),
      toNumber(rotation[2]) + toNumber(t2.rotation[2]),
    ];
  }
  if (t1.scale) {
    scale = t1.scale;
  }
  if (t2.scale) {
    scale = [
      toNumber(scale[0]) * toNumber(t2.scale[0]),
      toNumber(scale[1]) * toNumber(t2.scale[1]),
      toNumber(scale[2]) * toNumber(t2.scale[2]),
    ];
  }
  return { position, rotation, scale };
};

// Canvas

export const transformCanvas = (props, sceneContext) => {
  const parentTransform = sceneContext.transform;
  const childTransform = getThreeTransform(props);
  const { position, rotation, scale } = combineTransforms(
    parentTransform,
    childTransform
  );
  sceneContext.ctx.value.translate(position[0], position[1]);
  sceneContext.ctx.value.rotate(deg2rad(rotation[2]));
  sceneContext.ctx.value.scale(scale[0], scale[1]);
};

export const transformCanvasReset = (ctx) => {
  ctx.resetTransform();
};

// Three

export const useThreeTransform = (props, object) => {
  watch(
    () => props.position,
    () => {
      const { position } = getThreeTransform(props);
      object.position.x = position[0];
      object.position.y = position[1];
      object.position.z = position[2];
    },
    { immediate: true }
  );

  watch(
    () => props.rotation,
    () => {
      const { rotation } = getThreeTransform(props);
      object.rotation.x = deg2rad(rotation[0]);
      object.rotation.y = deg2rad(rotation[1]);
      object.rotation.z = deg2rad(rotation[2]);
    },
    { immediate: true }
  );

  watch(
    () => props.scale,
    () => {
      const { scale } = getThreeTransform(props);
      object.scale.x = scale[0];
      object.scale.y = scale[1];
      object.scale.z = scale[2];
    },
    { immediate: true }
  );
};
