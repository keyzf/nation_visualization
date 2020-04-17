<template>
  <el-card class="checkbox">
    <div class="list"
         v-if="count">
      <p>
        <img src="@/assets/img/blue.png" />
        <span>&nbsp;&nbsp;高端聚类建筑: {{count['商业聚类'].value}} 栋, 客户数量: {{count['商业聚类'].client}} 个</span>
      </p>
      <p>
        <img src="@/assets/img/yellow.png" />
        <span>&nbsp;&nbsp;园区建筑: {{count['园区'].value}} 栋, 客户数量: {{count['园区'].client}} 个</span>
      </p>
      <p>
        <img src="@/assets/img/red.png" />
        <span>&nbsp;&nbsp;写字楼建筑: {{count['写字楼'].value}} 栋, 客户数量: {{count['写字楼'].client}} 个</span>
      </p>
      <p>
        <img src="@/assets/img/green.png" />
        <span>&nbsp;&nbsp;专业市场建筑: {{count['专业市场'].value}} 栋, 客户数量: {{count['专业市场'].client}} 个</span>
      </p>
    </div>
  </el-card>
</template>

<script>
import polygons from '@/data/bj-polygon-values'

export default {
  data() {
    return {
      count: null
    }
  },

  mounted() {
    this.getTotal()
  },

  methods: {
    getTotal() {
      let result = {}
      polygons.forEach(item => {
        if (!result[item[1]]) {
          result[item[1]] = {
            value: item[2],
            client: item[3]
          }
        } else {
          result[item[1]].value += item[2]
          result[item[1]].client += item[3]
        }
      })
      this.count = result
    }
  }
}
</script>

<style scoped>
.checkbox {
  width: 360px;
  position: absolute;
  bottom: 20px;
  left: 20px;
}
.list {
  text-align: left;
}
.list p {
  margin: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.list img {
  width: 14px;
  height: 14px;
  vertical-align: middle;
}
.list span {
  padding-left: 4px;
}
</style>