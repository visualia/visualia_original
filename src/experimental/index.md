```live
<v-scene v-for="m in ['svg','canvas','three','webgl','pdf']" :mode="m">
  <v-line
    points="0 0, 50 50, 50 25"
    fill="yellow"
  />
  <v-line
    points="0 50, 50 100, 50 75"
    stroke="red"
    fill="yellow"
    closed
  />
</v-scene>
```
