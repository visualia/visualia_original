<v-slider set="r" step="20" />

r is is {{ get("r") }}

<v-scene mode="pdf">
  <v-square
    r="5"
    :fill="[0,0,255]"
    position="50 50"
  />
</v-scene>
