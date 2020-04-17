<v-slider set="b" />

b is {{ get("b") }}

<v-scene mode="pdf">
  <v-square
    position="100 100"
    :r="get('b')"
  />
</v-scene>
