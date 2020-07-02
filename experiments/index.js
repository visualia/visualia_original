import { visualia } from "../dist/visualia.js";
import VLayout from "../src/internals/VLayout.js";
visualia({
  components: { VLayout },
  template: `
  <v-layout>
    <template #menu>menu</template>
    <template #content>content</template>
  </v-layout>
  `,
});
