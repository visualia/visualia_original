```live

<v-slider set="r" step="20" />

r is is {{ get("r") }}

<v-scene mode="pdf">
  <v-circle
    :r="get('r')"
  />
</v-scene>

```
