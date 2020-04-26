<template>
  <div class="info-window"
       :style="windowStyle">
    <el-card class="box-card">
      <div ref="echarts"
           class="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import pieFormater from '@/utils/echarts/pie'

const echarts = require('echarts/lib/echarts')
require('echarts/theme/customed')
require('echarts/lib/chart/bar')

export default {
  data() {
    return {
      echarts: null,
      windowStyle: {
        right: '-999px',
        top: '-999px'
      }
    }
  },

  mounted() {
    this._event.$on('window-info', obj => {
      this.setWindowInfo(obj)
    })
    this.echarts = echarts.init(this.$refs['echarts'], 'customed')
  },

  methods: {
    setWindowInfo(obj) {
      this.windowStyle.right = '20px'
      this.windowStyle.top = '20px'
      this.setEchartsOption(obj)
    },

    setEchartsOption(obj) {
      let option = pieFormater(obj)
      this.echarts.setOption(option)
    }
  }
}
</script>

<style scoped>
.info-window {
  position: absolute;
  z-index: 99;
  height: 200px;
  width: 500px;
  background-color: #fff;
}
.echarts {
  height: 200px;
  width: 500px;
}
</style>