<template>
  <div class="content">
    <div id="map"></div>
    <el-card class="switch-button"
             :body-style="{padding: '12px'}">
      <el-switch v-model="editting"
                 active-color="#13ce66"
                 active-text="开始编辑"
                 inactive-color="grey">
      </el-switch>
    </el-card>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import mixin from '../mixins/map'
import { polygonConfig, polygonEditorConfig } from '@/config/map'
import cyPolygon from '@/data/cy-polygon'

export default {
  props: {
    polygons: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      map: null,
      mouseTool: null,
      editting: true
    }
  },

  mixins: [mixin],

  watch: {
    editting: {
      handler(val) {
        val
          ? this.mouseTool.polygon(Object.assign({}, polygonEditorConfig))
          : this.mouseTool.close()
      },
      immediate: false
    },
    polygons: {
      handler(list) {
        this.drawPolygons(list)
      },
      immediate: false
    }
  },

  mounted() {
    this.addMouseTool()
    this.drawPolygon()
  },

  methods: {
    addMouseTool() {
      this.mouseTool = new AMap.MouseTool(this.map)
      this.mouseTool.on('draw', event => {
        this._event.$emit('polygon-info', event.obj)
      })
    },

    drawPolygons(list) {
      this.map.clearMap()
      this.addPolygon() // 添加朝阳边界
      this.addPolygons(list)
    },

    drawPolygon() {
      this.mouseTool.polygon(Object.assign({}, polygonEditorConfig))
    },

    addPolygons(path) {
      path.forEach(item => {
        const polygon = new AMap.Polygon(
          Object.assign({}, polygonConfig, {
            path: item,
            fillOpacity: 0.4,
            strokeWeight: 0,
            strokeColor: '#2544a4',
            zIndex: 99
          })
        )
        this.map.add(polygon)
      })
    },

    addPolygon() {
      let path = []
      cyPolygon.split(';').forEach(item => {
        let lng = Number(item.split(',')[0])
        let lat = Number(item.split(',')[1])
        if (!isNaN(lng) && !isNaN(lat)) {
          path.push([lng, lat])
        }
      })
      const polygon = new AMap.Polygon(
        Object.assign({}, polygonConfig, {
          path: path,
          fillOpacity: 0,
          strokeWeight: 1,
          zIndex: 99
        })
      )
      this.map.add(polygon)
    }
  }
}
</script>

<style>
#map {
  height: calc(100vh - 50px);
}
.switch-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  font-size: 12px;
  text-align: center;
}
</style>