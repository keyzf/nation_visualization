<template>
  <div class="content">
    <div id="map"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
const ZOOMBOUNDARY = 11
import { mapConfig, polygonConfig } from '@/config/map'
import polygons from '@/data/bj-polygons'
import polygons_1 from '@/data/bj-polygons-1'
import bjMarkers from '@/data/bj-markers'
import bjMarkers_1 from '@/data/bj-markers-1'
import xzl from '@/assets/img/red.png'
import yq from '@/assets/img/yellow.png'
import zysc from '@/assets/img/green.png'
import gdjl from '@/assets/img/blue.png'
import xq from '@/assets/img/purple.png'

const markerStyles = {
  写字楼: 0,
  园区: 1,
  专业市场: 2,
  高端聚类: 3,
  小区: 4
}

export default {
  data() {
    return {
      polygons: ''
    }
  },

  mounted() {
    this.initMap()
  },

  methods: {
    initMap() {
      this.map = new AMap.Map(
        'map',
        Object.assign({}, mapConfig, {
          center: [116.47268499961308, 39.9335719999479],
          mapStyle: 'amap://styles/whitesmoke',
          zoom: 11
        })
      )
      this.addPolygons(13), this.addMarkers()
      AMap.plugin(['AMap.ToolBar'], () => {
        this.map.addControl(new AMap.ToolBar())
      })
      this.map.on('zoomchange', () => {
        let zoom = this.map.getZoom()
        this.addPolygons(zoom)
      })
    },

    addPolygons(zoom) {
      if (zoom > ZOOMBOUNDARY && this.polygons === polygons) return
      if (zoom <= ZOOMBOUNDARY && this.polygons === polygons_1) return
      this.map.clearMap()
      this.polygons = zoom > ZOOMBOUNDARY ? polygons : polygons_1
      this.polygons.forEach(item => {
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
        if (zoom > ZOOMBOUNDARY) {
          polygon.on('mouseover', () => {
            let area = (polygon.getArea() / 1000000).toFixed(2)
            polygon.setOptions({ fillOpacity: 1 })
            this._event.$emit('window-info', {
              id: item.id,
              area: area
            })
          })
          polygon.on('mouseout', () => {
            polygon.setOptions({ fillOpacity: 0.4 })
          })
        }
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
    },

    addMarkers() {
      const style = [
        {
          url: xzl,
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(4, 4)
        },
        {
          url: yq,
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(4, 4)
        },
        {
          url: zysc,
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(4, 4)
        },
        {
          url: gdjl,
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(4, 4)
        },
        {
          url: xq,
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(4, 4)
        }
      ]
      let massMarkers = []
      let markers = bjMarkers
      if (this.$route.params.marker_id) {
        markers = bjMarkers_1
      }
      markers.forEach(marker => {
        massMarkers.push({
          lnglat: [marker.lng, marker.lat],
          style: markerStyles[marker.type]
        })
      })

      const mass = new AMap.MassMarks(massMarkers, {
        opacity: 0.8,
        zIndex: 111,
        cursor: 'pointer',
        style: style
      })
      mass.setMap(this.map)
    }
  }
}
</script>

<style>
#map {
  height: calc(100vh - 50px);
}
.amap-info-close {
  display: none;
}
.info {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  color: #303133;
  font-size: 13px;
}
.info p {
  height: 18px;
  line-height: 18px;
  margin: 8px;
}
.fw-600 {
  font-weight: 600;
  color: #000;
}
</style>