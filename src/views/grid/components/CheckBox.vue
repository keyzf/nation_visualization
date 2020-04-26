<template>
  <el-card class="checkbox">
    <div class="list">
      <p>
        <img src="@/assets/img/red.png" />
        <span>&nbsp;&nbsp;写字楼建筑: 648 栋, 客户数量: 162450 个</span>
      </p>
      <p>
        <img src="@/assets/img/yellow.png" />
        <span>&nbsp;&nbsp;园区建筑: 57 个, 客户数量: 12070 个</span>
      </p>
      <p>
        <img src="@/assets/img/blue.png" />
        <span>&nbsp;&nbsp;商业聚类建筑: 100 个, 客户数量: 22304 个</span>
      </p>

      <p>
        <img src="@/assets/img/green.png" />
        <span>&nbsp;&nbsp;专业市场建筑: 49 个, 客户数量: 12365 个</span>
      </p>
      <p>
        <img src="@/assets/img/purple.png" />
        <span>&nbsp;&nbsp;小区建筑: 756 个, 住宅套数: 858526 个</span>
      </p>
    </div>
  </el-card>
</template>

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