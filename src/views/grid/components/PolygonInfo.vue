<template>
  <div class="info"
       v-if="polygon">
    <el-card :body-style="{padding: '12px'}">
      <p>网格面积: {{ (polygon.getArea() / 1000000).toFixed(2) }}平方公里</p>
      <p v-for="(val, index) in info"
         :key="index">
        {{index}}数量: {{val.count}}, 客户数量: {{val.customers}}
      </p>
      <p>
        <el-button size="small"
                   type="primary"
                   @click="addPath">添加</el-button>
        <el-button size="small"
                   type="danger"
                   @click="hidePath">删除</el-button>
      </p>
    </el-card>
  </div>
</template>

<script>
import markers from '@/data/cy-markers'

export default {
  data() {
    return {
      polygon: null,
      info: {}
    }
  },
  mounted() {
    this._event.$on('polygon-info', polygon => {
      this.setPolygonInfo(polygon)
    })
  },

  methods: {
    setPolygonInfo(polygon) {
      this.polygon = polygon
      if (!polygon) return
      this.info = {}
      markers.forEach(item => {
        if (this.polygon.contains([item.lng, item.lat])) {
          if (this.info[item.type]) {
            this.info[item.type].count++
            this.info[item.type].customers += item.count
          } else {
            this.info[item.type] = {
              count: 1,
              customers: item.count
            }
          }
        }
      })
    },

    addPath() {
      this._event.$emit('add-path', this.polygon.getPath())
      this.polygon.hide()
      this.polygon = null
    },

    hidePath() {
      this.polygon.hide()
      this.polygon = null
    }
  }
}
</script>

<style scoped>
.info {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 12px;
}
</style>