<v-slider set="b" />

b is {{ get("b") }}

<v-scene mode="pdf">
  <v-circle
    :r="get('b')"
  />
</v-scene>
