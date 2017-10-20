<template>
  <div id="app" class="main-container">
    <div class="main-bar">
      <a class="back">返回主站</a>
      <a class="link">联系我们：400-800-1234</a>
      <router-link class="back fr" :to="{name: 'login'}">登录</router-link>
      <a class="back fr">旧版入口</a>
    </div>
    <PublicHead></PublicHead>
    <router-view></router-view>
  </div>
</template>

<script>
  import PublicHead from '@/components/publicHead'
  import push from '@/utils/push.js'
  import leftMenu from '@/components/leftMenu.vue'
  import * as types from '@/store/types'
  export default {
    mixins: [push],
    components: {
      PublicHead
    },
    methods: {
      getUserInfo() {
        this.$http.post(this.$api.getUser).then(res => {
          if (res.code === 1000)
            this.$store.commit(types.SET_USER_INFO, res.data);
        })
      },
      // 获取求购报价统计
      getNumbers(){
        this.$http.get(this.$api.getNums).then(res => {
          if(res.code === 1000){
            this.$store.commit(types.SET_NUMS, res.data);
          }
        })
      }
    },
    created() {
      this.getUserInfo();
      this.getNumbers();
    }
  }
</script>

<style lang="less">
  @import "../assets/base.less";
  body {
    background-color: @bg_color;
  }
  
  
  .main-bar {
    position: relative;
    width: 100%;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    font-size: 12px;
    background-color: @bg_color;
    z-index: 1000;
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
  
  
  .container {
    width: 100%;
    background-color: #303653;
    .right-content {
      margin: 15px 0 0 160px;
      padding: 0 15px;
      background-color: @bg_color;
    }
  }
  
</style>

