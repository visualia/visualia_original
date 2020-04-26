import { computed, watch, inject } from "../deps/vue.js";

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
    suggest: "0 0",
    type: [String, Number, Array, Object],
    docs: "Object position in 3D",
  },
  rotation: {
    default: [0, 0, 0],
    suggest: "0 0",
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
    const { position, rotation, scale } = getTwoTransform(props);
    const positionStr = `translate(${position[0]} ${position[1]})`;
    const rotationStr = `rotate(${rotation[0]})`;
    const scaleStr = `scale(${scale[0]} ${scale[1]})`;

    return [positionStr, rotationStr, scaleStr].join(" ");
  });
};

export const test_useSvgTransform_default_props = () => {
  return [
    useSvgTransform(transformTwoProps).value,
    "translate(0 0) rotate(0) scale(1 1)",
  ];
};

export const test_useSvgTransform_custom_props = () => {
  const props = { position: "100 200", rotation: "300", scale: "2" };
  return [
    useSvgTransform(props).value,
    "translate(100 200) rotate(300) scale(2 2)",
  ];
};

// Canvas

export const transformCanvas = (props, ctx, sceneContext = null) => {
  let { position, rotation, scale } = getTwoTransform(props);
  position =
    sceneContext && sceneContext.position
      ? [
          sceneContext.position[0] + position[0],
          sceneContext.position[1] + position[1],
        ]
      : position;
  ctx.translate(position[0], position[1]);
  ctx.rotate(deg2rad(rotation[0]));
  ctx.scale(scale[0], scale[1]);
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
      object.position.x += position[0];
      object.position.y += position[1];
      object.position.z += position[2];
    }
  );

  watch(
    () => props.rotation,
    () => {
      const { rotation } = getThreeTransform(props);
      object.rotation.x += deg2rad(rotation[0]);
      object.rotation.y += deg2rad(rotation[1]);
      object.rotation.z += deg2rad(rotation[2]);
    }
  );

  watch(
    () => props.scale,
    () => {
      const { scale } = getThreeTransform(props);
      object.scale.x *= scale[0];
      object.scale.y *= scale[1];
      object.scale.z *= scale[2];
    }
  );
};
