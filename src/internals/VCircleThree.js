import { inject } from "../../dist/deps/vue.js";
import {
  Group,
  CircleGeometry,
  Mesh,
  EdgesGeometry,
  LineSegments,
} from "../../dist/deps/three.js";

import {
  circleProps,
  stylingProps,
  transformTwoProps,
  useThreeFill,
  useThreeStroke,
  useThreeTransform,
} from "../internals.js";

export default {
  props: {
    ...circleProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    var group = new Group();

    const geometry = new CircleGeometry(props.r, 64);

    if (props.fill !== "none") {
      const fill = useThreeFill(props);
      const fillObject = new Mesh(geometry, fill.value);
      group.add(fillObject);
    }

    if (props.stroke !== "none") {
      const edges = new EdgesGeometry(geometry);
      const stroke = useThreeStroke(props);
      const strokeObject = new LineSegments(edges, stroke.value);
      group.add(strokeObject);
    }

    sceneContext.scene.add(group);

    useThreeTransform(props, group);

    sceneContext.update();

    return () => null;
  },
};
