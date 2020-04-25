```live
<v-scene v-for="m in ['svg','canvas','three','webgl']" :mode="m">
  <v-pointgrid step="5" />
  <v-regularpolygon
    stroke="red"
    fill="yellow"
    position="50 50"
    r="50"
    count="10"
    opacity="0.5"
  />
</v-scene>
```
