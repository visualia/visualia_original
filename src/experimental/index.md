<v-slider set="r" step="20" />

r is is {{ get("r") }}

<v-scene mode="pdf">
  <v-line points="0 0, 50 50, 0 25" :fill="[255,255,0]" />
  <v-square
    :r="get('r')"
    :fill="[0,0,255]"
    position="50 50"
  />
  <v-circle
    :r="get('r')"
    :fill="[255,0,0]"
    position="100 100"
  />
</v-scene>
