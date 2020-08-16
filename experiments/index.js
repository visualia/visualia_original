import { visualia } from "../dist/visualia.js";

//visualia();

const content = `
<v-scene v-for="m in ['svg','canvas']" :mode="m">
  <v-point position="0 0" fill="red" r="3" />
  <v-text position="10 10">Helloo</v-text>
  <v-point position="10 10" />
</v-scene>
`;
visualia({ content });
