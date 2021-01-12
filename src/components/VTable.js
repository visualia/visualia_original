import { computed } from "../../src/deps/vue.js";
import { isArray } from "../utils.js";
import { VCompiler } from "../internals.js";

export default {
  docs: `Creates a table`,
  components: { VCompiler },
  props: {
    rows: {
      default: [],
      type: Array,
      docs: "Table rows a array of values or objects",
    },
    cols: {
      default: [],
      type: Array,
      docs: "Column header names as array of strings",
    },
  },
  setup(props) {
    const currentRows = computed(() => {
      if (isArray(props.rows[0])) {
        return props.rows.map((row) =>
          row.reduce((acc, el, index) => {
            acc[`col ${index + 1}`] = el;
            return acc;
          }, {})
        );
      }
      return props.rows;
    });
    return { currentRows };
  },
  template: `
  <table v-if="currentRows.length">
    <thead>
      <th
        v-for="(h,i) in Object.keys(currentRows[0])"
        :key="i"
      >
        <v-compiler :content="cols[i] ? cols[i] : String(h).trim()" />
      </th>
    </thead>
    <tbody>
      <tr v-for="(row,i) in currentRows" :key="i">
        <td
          v-for="(r,j) in Object.values(row)"
          :key="j"
        >
          <v-compiler :content="String(r).trim()" />
        </td>
      </tr>
    </tbody>
  </table>
`,
};
