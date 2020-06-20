import { h } from "../deps/vue.js";
import { slug } from "../utils.js";

export default {
  props: {
    text: { type: String },
    level: { type: Number },
    raw: { type: String },
  },
  setup(props) {
    const anchor = slug(props.text);
    return () =>
      h(`h${props.level}`, { id: anchor, style: { marginLeft: "-1em" } }, [
        h("a", { href: anchor }, "# "),
        props.text,
      ]);
  },
};
