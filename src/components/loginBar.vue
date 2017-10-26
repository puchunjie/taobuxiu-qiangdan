<template>
  <div class="main-bar">
    <a class="back">返回主站</a>
    <a class="link">联系我们：400-800-1234</a>
    <div class="fr group">
      <a class="back">旧版入口</a>
      <a v-if="isLogin" @click="showP">
          {{ user.companyName }}
          <span class="iconfont" :class="panelShow ? 'icon-iconjiaobiaoxiangshang': 'icon-iconjiaobiaoxiangxia'"></span>
        </a>
      <router-link v-else :to="{name:'login',query: { redirect: $router.currentRoute.fullPath }}">您好，请登录</router-link>
      <a class="back">注册</a>
    </div>
    <div class="action-panel" v-if="panelShow" v-clickoutside="togglePShow">
      <div class="item" @click="go('BuserInfo')">个人中心</div>
      <div class="item" @click="go('userInfo')">账号管理</div>
      <div class="item" @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['user']),
      isLogin() {
        return this.user != ''
      }
    },
    data() {
      return {
        panelShow: false,
        count: 0
      }
    },
    methods: {
      togglePShow(){
        this.count++
        if(this.count>1){
          this.panelShow = false
          this.count = 0
        }
      },
      showP(){
        this.panelShow = !this.panelShow;
      },
      go(path){
        this.$router.push({name:path});
        this.panelShow = !this.panelShow;
      },
      loginOut(){
        this.$store.commit(types.LOGOUT);
        // 使用原生跳转，强制页面刷新，断开scoket
        window.location.href = '/qd/index';
        // this.$router.push({name:'index'});
        // this.panelShow = !this.panelShow;
      }
    }
  }
</script>


<style lang="less" scoped>
  @import '../assets/base.less';
  .main-bar {
    position: relative;
    width: 100%;
    height: 29px;
    line-height: 28px;
    padding: 0 10px;
    font-size: 12px;
    background-color: @bg_color;
    z-index: 1001;
    .action-panel {
      position: absolute;
      width: 100px;
      height: 90px;
      right: 70px;
      top:30px;
      text-indent: 10px;
      background-color: #fff;
      border:@b_d1;
      .borderRadius;
      .item{
        width: 100%;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        &:hover{
          background-color: @goast_gray;
        }
      }
    }
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
    .group {
      display: inline-block;
      a {
        margin-right: 12px;
      }
      .iconfont {
        color: @f_ligth;
        font-size: 14px;
      }
    }
  }
</style>

