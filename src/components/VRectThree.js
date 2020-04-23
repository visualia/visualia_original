import { inject } from "../deps/vue.js";

import {
  Group,
  PlaneGeometry,
  Mesh,
  EdgesGeometry,
  LineSegments,
} from "../deps/three.js";

import {
  stylingProps,
  useThreeFill,
  useThreeStroke,
  transformThreeProps,
  useThreeTransform,
} from "../internals.js";

export const VRectThree = {
  setup(props) {
    const sceneContext = inject("sceneContext");

    var group = new Group();

    const geometry = new PlaneGeometry(props.width, props.height);

    if (props.fill !== "none") {
      const fill = useThreeFill(props);
      const fillObject = new Mesh(geometry, fill.value);
      fillObject.position.x = 0;
      fillObject.position.y = 0;
      group.add(fillObject);
    }

    if (props.stroke !== "none") {
      const edges = new EdgesGeometry(geometry);
      const stroke = useThreeStroke(props);
      const strokeObject = new LineSegments(edges, stroke.value);
      strokeObject.position.x = 0;
      strokeObject.position.y = 0;
      group.add(strokeObject);
    }
    sceneContext.scene.add(group);

    useThreeTransform(props, group);

    return () => null;
  },
};
