```live
<v-scene v-for="m in ['svg','canvas','three','webgl','pdf']" :mode="m">
  <v-rect
    width="50"
    height="50"
    position="10 10"
    stroke-width="10"
    fill="yellow"
    stroke="none"
  />
  <v-square
    r="10"
    position="60 60"
    stroke-width="11"
    stroke="blue"
  />
</v-scene>
```
