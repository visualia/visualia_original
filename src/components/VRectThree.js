import { inject } from "../../src/deps/vue.js";
import { toNumber } from "../utils.js";
import {
  Group,
  PlaneGeometry,
  Mesh,
  EdgesGeometry,
  LineSegments,
} from "../../src/deps/three.js";

import {
  stylingProps,
  sizeProps,
  transformTwoProps,
  useThreeFill,
  useThreeStroke,
  transformThreeProps,
  useThreeTransform,
} from "../internals.js";

export default {
  props: {
    x: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner x coordinate",
    },
    y: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner y coordinate",
    },
    ...sizeProps,
    ...stylingProps,
    ...transformThreeProps,
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    var group = new Group();

    const geometry = new PlaneGeometry(props.width, props.height);

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

    group.position.x = props.x + props.width / 2;
    group.position.y = props.y + props.height / 2;

    const outerGroup = new Group();
    outerGroup.add(group);

    sceneContext.scene.add(outerGroup);
    useThreeTransform(props, outerGroup);

    return () => null;
  },
};
