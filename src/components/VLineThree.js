import { inject } from "../deps/vue.js";

import {
  Group,
  Geometry,
  Vector3,
  LineBasicMaterial,
  Color,
  BufferGeometry,
  Line
} from "../deps/three.js";

import {
  stylingProps,
  useThreeFill,
  useThreeStroke,
  transformThreeProps,
  useThreeTransform,
  parseCoords
} from "../internals.js";

export const VLineThree = {
  props: {
    points: {
      default: "0 0, 10 10",
      type: [String, Array, Object],
      docs: "Array of points that the line will follow"
    },
    ...transformThreeProps,
    ...stylingProps
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const parsedPoints = parseCoords(props.points);

    const geometry = new BufferGeometry().setFromPoints(
      parsedPoints.map(point => new Vector3(...point))
    );

    var group = new Group();

    const stroke = new LineBasicMaterial({
      color: props.stroke,
      linewidth: props.strokeWidth,
      opacity: props.opacity
    });

    const line = new Line(geometry, stroke);
    group.add(line);

    // if (props.fill !== "none") {
    //   const fill = useThreeFill(props);
    //   const fillObject = new Mesh(geometry, fill.value);
    //   group.add(fillObject);
    // }

    // if (props.stroke !== "none") {
    //   const edges = new EdgesGeometry(geometry);
    //   const stroke = useThreeStroke(props);
    //   const strokeObject = new LineSegments(edges, stroke.value);
    //   group.add(strokeObject);
    // }

    sceneContext.scene.add(group);

    useThreeTransform(props, group);

    return () => null;
  }
};
