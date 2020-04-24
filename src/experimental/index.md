```live
<v-scene v-for="m in ['svg','canvas','three','webgl','pdf']" :mode="m">
  <v-regularpolygon
    stroke="red"
    fill="yellow"
    position="50 50"
    r="50"
    count="10"
  />
</v-scene>
```
