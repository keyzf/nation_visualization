<template>
  <div class="content">
    <div id="map"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
const ZOOMBOUNDARY = 11
import { polygonConfig } from '@/config/map'
import mixin from '../mixins/map'
import polygons from '@/data/bj-polygons'
import { mPolygons, dIDs } from '@/data/bj-polygons-m'
import polygons_1 from '@/data/bj-polygons-1'

export default {
  mixins: [mixin],

  data() {
    return {
      polygons: ''
    }
  },

  mounted() {
    this.initTools()
  },

  methods: {
    addPolygon() {},

    initTools() {
      this.addPolygons(ZOOMBOUNDARY), this.addMarkers()
      // AMap.plugin(['AMap.ToolBar'], () => {
      //   this.map.addControl(new AMap.ToolBar())
      // })
      this.map.on('zoomchange', () => {
        let zoom = this.map.getZoom()
        this.addPolygons(zoom)
      })
    },

    addPolygons(zoom) {
      if (zoom > ZOOMBOUNDARY && this.polygons === polygons) return
      if (zoom <= ZOOMBOUNDARY && this.polygons === polygons_1) return
      this.map.clearMap()
      let minPolygons = polygons.concat(mPolygons)
      this.polygons = zoom > ZOOMBOUNDARY ? minPolygons : polygons_1
      this.polygons.forEach((item, index) => {
        if (this.polygons == minPolygons && dIDs.includes(index)) {
          return
        }
        let path = []
        item.path.split(';').forEach(subItem => {
          let lng = subItem.split(',')[0]
          let lat = subItem.split(',')[1]
          path.push([lng, lat])
        })

        const polygon = new AMap.Polygon(
          Object.assign({}, polygonConfig, {
            path: [...path],
            // eslint-disable-next-line vue/no-parsing-error
            // Polygon 对 path 进行操作，影响后续对 path 的使用, 所以这里用了解析
            zIndex: 99
          })
        )

        this.map.add(polygon)
        polygon.on('mouseover', () => {
          polygon.setOptions({ fillOpacity: 1 })
          this._event.$emit('window-info', {
            id: `cy-${index}`,
            polygon: polygon
          })
        })
        polygon.on('mouseout', () => {
          polygon.setOptions({ fillOpacity: 0.4 })
        })
      })
    },

    getPolygonCenter(path) {
      var x = 0.0
      var y = 0.0
      path.forEach(item => {
        let lng = item[0]
        let lat = item[1]
        x = x + parseFloat(lng)
        y = y + parseFloat(lat)
      })
      x = x / path.length
      y = y / path.length
      return [x, y]
    }
  }
}
</script>

<style>
#map {
  height: calc(100vh - 50px);
}
</style>