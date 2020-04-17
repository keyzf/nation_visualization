<template>
  <div class="container">
    <Map />
    <InfoWindow />
    <Checkbox />
  </div>
</template>

<script>
import Map from './components/Map'
import InfoWindow from './components/InfoWindow'
import Checkbox from './components/CheckBox'

export default {
  components: {
    Map,
    InfoWindow,
    Checkbox
  }
}
</script>

<style scoped>
.container {
  position: relative;
}
</style>