<template>
  <div class="content">
    <div id="map"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapConfig } from '@/config/map'
import { markers } from '@/data/nation-makers'
import red_pot from '@/assets/img/red.png'
import yellow_pot from '@/assets/img/yellow.png'
import green_pot from '@/assets/img/green.png'
import blue_pot from '@/assets/img/blue.png'

export default {
  data() {
    return {
      map: null
    }
  },

  mounted() {
    this.initMap()
  },

  methods: {
    initMap() {
      this.map = new AMap.Map('map', Object.assign({}, mapConfig))
      this.addMarkers()
    },

    addMarkers() {
      const style = [
        {
          url: red_pot,
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(4, 4)
        },
        {
          url: yellow_pot,
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(4, 4)
        },
        {
          url: green_pot,
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(4, 4)
        },
        {
          url: blue_pot,
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(4, 4)
        }
      ]
      let massMarkers = []
      let markersTmp = markers.sort((a, b) => {
        return b.count - a.count
      })
      const mlength = markersTmp.length
      markersTmp.forEach((marker, index) => {
        massMarkers.push({
          lnglat: [marker.lng, marker.lat],
          style: this.getStyle(mlength, index, marker)
        })
      })

      const mass = new AMap.MassMarks(massMarkers, {
        opacity: 0.8,
        zIndex: 111,
        cursor: 'pointer',
        style: style
      })
      mass.setMap(this.map)
    },

    getStyle(mlength, index) {
      if (index <= (mlength * 1) / 4) {
        return 0
      }
      if (index <= (mlength * 2) / 4) {
        return 1
      }
      if (index <= (mlength * 3) / 4) {
        return 2
      }
      return 3
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
}
#map {
  height: calc(100vh - 50px);
}
</style>