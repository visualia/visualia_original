## Test

<v-slider set="a" to="100" />{{ get('a') }}

<v-math>
  k_{n+1} = n^2 + k_n^2 - k_{n-1}
</v-math>

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

## More tests

<v-scene mode="svg" width="200" height="200" position="20 20" rotation="0 0">
  <v-square 
    r="30"
    stroke="green"
    strokeWidth="2"
    fill="none"
    opacity="1"
    position="0 0"
  />
  <v-regularpolygon 
    count="6"
    r="100"
    stroke="black"
    strokeWidth="2"
    fill="none"
    opacity="1"
    position="100 100"
  />
  <v-pointgrid count="20" step="10"/>
  <v-point fill="black" position="150 150"/>
  <v-group position="0 100" rotation="0 0">
    <v-line 
      points="0 0, 100 0"
      stroke="black"
      strokeWidth="2"
      fill="black"
      opacity="1"
      position="0 0"
    />
  </v-group>
  <v-polygon 
    points="0 0, 100 0, 0 100"
    stroke="black"
    strokeWidth="2"
    fill="blue"
    opacity="0.5"
    position="0 0"
  />
  <v-line 
    points="0 0, 100 100"
    stroke="black"
    strokeWidth="2"
    fill="black"
    opacity="1"
    position="0 0"
  />
  <v-circle 
    r="10"
    stroke="black"
    strokeWidth="2"
    fill="none"
    opacity="1"
    position="100 100"
  />
</v-scene>

---

# Test2

## Two

### Three
