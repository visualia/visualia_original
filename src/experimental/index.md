<v-slider set="r" step="20" />

r is is {{ get("r") }}

<v-scene mode="pdf">
  <v-circle
    :r="get('r')"
    :fill="[255,0,0]"
    position="100 100"
  />
  <v-square
    :r="get('r')"
  />
  <v-line points="0 0, 50 50, 0 25" :fill="[255,255,0]" />
</v-scene>
