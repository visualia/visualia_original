import { inject } from "../deps/vue.js";

import {
  Group,
  Vector3,
  LineBasicMaterial,
  BufferGeometry,
  Line,
} from "../deps/three.js";

import { parseCoords } from "../internals.js";

export const VLineThree = {
  setup(props) {
    const sceneContext = inject("sceneContext");

    const parsedPoints = parseCoords(props.points);

    const geometry = new BufferGeometry().setFromPoints(
      parsedPoints.map((point) => new Vector3(...point))
    );

    var group = new Group();

    const stroke = new LineBasicMaterial({
      color: props.stroke,
      linewidth: props.strokeWidth,
      opacity: props.opacity,
    });

    const line = new Line(geometry, stroke);

    group.add(line);

    sceneContext.scene.add(group);

    return () => null;
  },
};
