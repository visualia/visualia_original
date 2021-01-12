import { h, inject } from "../../src/deps/vue.js";
import { slug } from "../utils.js";
import { formatHash } from "../internals.js";

export default {
  props: {
    text: { type: String },
    level: { type: Number },
    raw: { type: String },
  },
  setup(props) {
    const sectionContext = inject("sectionContext");
    const anchor = formatHash([
      slug(sectionContext.title.value),
      slug(props.text),
    ]);
    return () =>
      h(`h${props.level}`, { id: anchor, class: "v-heading" }, [
        h("a", { href: `#${anchor}` }, props.text, " #"),
      ]);
  },
  css: /*css*/ `
  .v-heading a {
    border-bottom: none;
    font-weight: bold;
  }
  .v-heading a:hover {
    border-bottom: 0.1em solid var(--lightpaleblue);
  }
  `,
};
