<template>
  <div class="info-window"
       :style="windowStyle">
    <el-card class="box-card">
      <div ref="echarts"
           class="echarts">表格</div>
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
    this._event.$on('window-info', info => {
      this.setWindowInfo(info)
    })
    this.echarts = echarts.init(this.$refs['echarts'], 'customed')
  },

  methods: {
    setWindowInfo(info) {
      this.windowStyle.right = '20px'
      this.windowStyle.top = '20px'
      this.setEchartsOption(info)
    },

    setEchartsOption(info) {
      let option = pieFormater(info)
      this.echarts.setOption(option)
    }
  }
}
</script>

<style scoped>
.info-window {
  position: absolute;
  z-index: 99;
  height: 280px;
  width: 560px;
  background-color: #fff;
}
.echarts {
  height: 280px;
  width: 560px;
}
</style>