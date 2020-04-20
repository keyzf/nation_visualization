<template>
  <div class="container">
    <Map />
    <InfoWindow />
    <Checkbox />
    <PolygonInfo />
  </div>
</template>

<script>
import Map from './components/Map'
import InfoWindow from './components/InfoWindow'
import Checkbox from './components/CheckBox'
import PolygonInfo from './components/PolygonInfo'

export default {
  components: {
    Map,
    InfoWindow,
    Checkbox,
    PolygonInfo
  }
}
</script>

<style scoped>
.container {
  position: relative;
}
</style>