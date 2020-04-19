import { mapConfig } from '@/config/map'
import markers from '@/data/cy-markers'
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
  /* eslint-disable no-undef */

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
          zoom: 11,
          defaultCursor: 'crosshair'
        })
      )
      this.addMarkers()
      this.addPolygon()
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
