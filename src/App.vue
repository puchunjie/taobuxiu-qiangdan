<template>
  <div id="app" class="main-container">
    <div class="main-bar"></div>
    <div class="main-header"></div>
    <div class="main-content">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import "./assets/base.less";
  .main-container {
    width: 100%;
  }
  
  .main-bar {
    width: 100%;
    height: 28px;
  }
  
  .main-header {
    width: 100%;
    height: 80px;
    background-color: @dark_blue;
  }
  
  .inner-container {
    width: 1320px;
    height: 100%;
    margin: 0 auto;
  }
</style>

