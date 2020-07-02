<button @click="toggle('x2')">a</button>

{{ get('x2') }}

`{{ get('x') }}`

`{{ get('y') }}`

<v-animate set="x" duration="100000" smooth />

<v-animate set="y" duration="100000" />

`{{ get('x2') }}`

`{{ get('y2') }}`

<v-slider set="x2" duration="100000" smooth />

<v-slider set="y2" duration="100000" />

---

<v-slider set="a" to="100" />{{ get('a') }}

<v-scene v-for="m in ['svg','canvas','three','webgl','pdf']" :mode="m">
  <v-group position="100 15">
    <v-point />
    <v-circle />
  </v-group>
  <v-circle r="20" :position="[get('a',0), 50]" />
  <v-line points="10 10, 30 40" position="100 100" width="50" height="50" />
  <v-polygon points="10 10, 30 40" position="50 50" width="50" height="50" />
  <v-rect r="50" position="100 100" width="50" height="50" />
  <v-hexagon r="50" position="100 100" width="50" height="50" />
  <v-square r="50" position="100 100" width="50" height="50" />
  <v-circle r="50" position="100 100" width="50" height="50" />
  <v-circle r="10" position="95 100" width="50" height="50" fill="yellow" opacity="0.5" />
  <v-circle r="10" position="105 100" width="50" height="50" fill="blue" opacity="0.5" />
  <v-sphere r="10" position="150 150" width="50" height="50" />
</v-scene>

---

| title: test title

# What

## Two

### Three

-->
