<template>
  <div id="app" class="main-container">
    <longBar></longBar>
    <PublicHead></PublicHead>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
  import longBar from '@/components/loginBar_v2'
  import PublicHead from '@/components/publicHead_v2'
  import push from '@/utils/push.js'
  import leftMenu from '@/components/leftMenu.vue'
  import loginInit from '@/utils/loginInit.js'
  export default {
    mixins: [loginInit,push],
    components: {
      PublicHead,
      longBar
    }
  }
</script>

<style lang="less">
  @import "../assets/base.less";
  body {
    background-color: @bg_color;
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

