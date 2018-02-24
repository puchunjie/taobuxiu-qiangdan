<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import './assets/base.less';
  @import "./assets/common.less";
  html,body{
    height: 100%;
  }

  .main-container {
    width: 100%;
    min-width: 1360px;
    height: 100%;
  }
  
  .inner-container {
    width: 1320px;
    height: 100%;
    margin: 0 auto;
    .inner-title {
      width: 100%;
      height: 70px;
      line-height: 70px;
      font-size: 20px;
      font-weight: bold;
      color: @f_dark;
      span {
        font-size: 16px;
        color: #3A3A3A;
        font-weight: normal;
      }
    }
  }
  
  .loading-loop {
    animation: loop 1s linear infinite;
  }
  
  @keyframes loop {
    0% {
      transform: rotate(0)
    }
    50% {
      transform: rotate(180deg)
    }
    to {
      transform: rotate(1turn)
    }
  }
</style>



