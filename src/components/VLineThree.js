import { inject } from "../../src/deps/vue.js";

import {
  Group,
  Vector3,
  LineBasicMaterial,
  BufferGeometry,
  Line,
  Shape,
  ShapeGeometry,
  Vector2,
  Mesh,
} from "../../src/deps/three.js";

import {
  lineProps,
  stylingProps,
  transformTwoProps,
  parseCoords,
  useThreeTransform,
  useThreeFill,
} from "../internals.js";

export default {
  props: {
    ...lineProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    let parsedPoints = parseCoords(props.points);
    if (props.closed) {
      parsedPoints = [...parsedPoints, parsedPoints[0]];
    }

    var group = new Group();

    if (props.fill !== "none") {
      const shape = new Shape(parsedPoints.map((p) => new Vector2(p[0], p[1])));
      const geometry = new ShapeGeometry(shape);
      const fill = useThreeFill(props);
      const fillObject = new Mesh(geometry, fill.value);
      group.add(fillObject);
    }

    if (props.stroke !== "none") {
      const geometry = new BufferGeometry().setFromPoints(
        parsedPoints.map((point) => new Vector3(...point))
      );
      const stroke = new LineBasicMaterial({
        color: props.stroke,
        linewidth: props.strokeWidth,
        opacity: props.opacity,
      });
      const line = new Line(geometry, stroke);
      group.add(line);
    }

    sceneContext.scene.add(group);

    useThreeTransform(props, group);

    sceneContext.update();

    return () => null;
  },
};
