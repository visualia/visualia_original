<v-slider set="r" step="20" />

r is is {{ get("r") }}

<v-scene mode="pdf">
  <v-circle
    :r="get('r')"
  />
  <v-square
    :r="get('r')"
  />
  <v-line points="0 0, 50 50, 0 25" />
</v-scene>
