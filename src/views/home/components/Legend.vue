<template>
  <div class="legend">
    <div>
      <img src="@/assets/img/red.png">
      <span>&nbsp;客户数量 > 5 万 总量: 6709万 </span>
    </div>
    <div>
      <img src="@/assets/img/yellow.png">
      <span>&nbsp;客户数量 > 2万 总量: 2445万</span>
    </div>
    <div>
      <img src="@/assets/img/green.png">
      <span>&nbsp;客户数量 > 1万 总量: 1360万</span>
    </div>
    <div>
      <img src="@/assets/img/blue.png">
      <span>&nbsp;客户数量 &lt; 1万 总量: 531万</span>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss" scoped>
.legend {
  position: absolute;
  font-size: 12px;
  padding: 12px;
  top: 20px;
  left: 20px;
  z-index: 10;
  border-radius: 4px;
  background-color: #fff;
  div {
    padding: 4px;
    img {
      width: 8px;
      height: 8px;
    }
  }
}
</style>