<template>
  <!-- 机票订单首页组件 -->
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main"></div>

      <!-- 侧边栏 -->
      <div class="aside"></div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.container{
    width: 1000px;
    margin: 20px auto;
}
.aside{
    width: 350px;
    height: fit-content;
    border:1px solid #ddd;
}    
</style>