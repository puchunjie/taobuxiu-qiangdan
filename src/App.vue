<template>
  <div id="app" class="main-container">
    <div class="main-bar">
      <a class="back">返回主站</a>
      <a class="link">联系我们：400-800-1234</a>
      <a class="back fr">登录注册</a>
      <a class="back fr">旧版入口</a>
    </div>
    <div class="main-header">
      <img class="logo" src="./assets/logo.png">
      <ul class="menu">
        <li>首页</li>
        <li>发布求购</li>
      </ul>
      <div class="account-group">
        <a class="br">买家中心</a>
        <a class="bl">卖家后台</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import "./assets/base.less";
  body{
    background-color: @bg_color;
  }

  .main-container {
    width: 100%;
    min-width: 1360px;
    height: 100%;
  }
  
  .main-bar {
    position: relative;
    width: 100%;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    font-size: 12px;
    background-color: @bg_color;
    z-index: 2222;
    .back {
      color: @f_dark;
    }
    .link {
      margin-left: 20px;
      color: @light_blue;
    }
    .fr {
      float: right;
      margin-left: 20px
    }
  }
  
  .main-header {
    position: relative;
    width: 100%;
    height: 80px;
    overflow: hidden;
    z-index: 2222;
    background-color: @dark_blue;
    .logo {
      display: block;
      float: left;
      width: 116px;
      height: 56px;
      margin: 11px 0 0 10px;
    }
    .menu {
      display: block;
      float: left;
      height: 100%;
      margin-left: 42px;
      li {
        float: left;
        width: 100px;
        line-height: 80px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        &.active,
        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
    }
    .account-group {
      float: right;
      width: 200px;
      height: 40px;
      border: 2px solid #fff;
      margin: 20px 10px 0 0;
      line-height: 36px;
      .borderRadius(40px);
      a {
        display: block;
        color: #fff;
        float: left;
        text-align: center;
        width: 50%;
        &.br {
          border-right: 1px solid #fff;
        }
        &.bl {
          border-left: 1px solid #fff;
        }
      }
    }
  }
  
  .inner-container {
    width: 1320px;
    height: 100%;
    margin: 0 auto;
  }
</style>

