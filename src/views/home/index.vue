<template>
  <div class="container">
    <NationMap />
    <Legend />
  </div>
</template>

<script>
import NationMap from './components/NationMap'
import Legend from './components/Legend'

export default {
  components: {
    NationMap,
    Legend
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
