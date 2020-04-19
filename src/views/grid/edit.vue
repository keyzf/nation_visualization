<template>
  <div class="container">
    <Editor :polygons="polygons" />
    <PolygonInfo />
    <div class="export">
      <el-button type="primary"
                 @click="exportPath">导出数据</el-button>
    </div>
  </div>
</template>

<script>
import Editor from './components/Editor'
import PolygonInfo from './components/PolygonInfo'

export default {
  components: {
    Editor,
    PolygonInfo
  },

  data() {
    return {
      polygons: []
    }
  },

  mounted() {
    this._event.$on('add-path', path => {
      this.polygons.push(path)
    })
  },

  methods: {
    exportPath() {
      let paths = []
      this.polygons.forEach(item => {
        let path = ''
        item.forEach(subItem => {
          path += `${subItem.lng},${subItem.lat};`
        })
        paths.push(path)
      })
      let text = JSON.stringify(paths)
      navigator.clipboard.writeText(text).then(
        () => {
          this.$notify({
            title: '成功',
            type: 'success',
            message: '路径已复制到剪切板',
            position: 'top-left'
          })
        },
        function(err) {
          console.error('Async: Could not copy text: ', err)
        }
      )
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
}
.export {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
</style>