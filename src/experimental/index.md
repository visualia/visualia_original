```live
<v-scene v-for="m in ['svg','canvas','three','webgl','pdf']" :mode="m">
<v-group position="50 50">
  <v-circle r="25" stroke-width="5" stroke="red" />
  <v-circle r="25" position="50 50" />
</v-group>
</v-scene>
```
