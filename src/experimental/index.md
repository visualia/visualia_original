```live
<v-scene v-for="m in ['svg','canvas','three','webgl','pdf']" :mode="m">
<v-group position="50 50">
  <v-line points="0 0, 25 10" stroke-width="5" stroke="red" />
  <v-line points="0 0, 25 10" position="50 50" />
</v-group>
</v-scene>
```
