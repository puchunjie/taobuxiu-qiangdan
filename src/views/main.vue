<template>
  <div id="app" class="main-container">
    <longBar></longBar>
    <PublicHead></PublicHead>
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import longBar from '@/components/loginBar'
  import PublicHead from '@/components/publicHead'
  import push from '@/utils/push.js'
  import leftMenu from '@/components/leftMenu.vue'
  import * as types from '@/store/types'
  export default {
    mixins: [push],
    components: {
      PublicHead,
      longBar
    },
    computed: {
      ...mapGetters(['user', 'base'])
    },
    methods: {
      getUserInfo() {
        this.$http.post(this.$api.getUser).then(res => {
          if (res.code === 1000) {
            this.$store.commit(types.SET_USER_INFO, res.data);
            this.MathRand();
            document.addEventListener('visibilitychange', () => {
              let isHidden = document.hidden;
              if (isHidden) {
                this.isFocus = false;
              } else {
                this.isFocus = true;
                document.title = this.titleInit;
                window.clearInterval(this.stl);
                if (!this.isNotice) {
                  this.notify(this.msg)
                }
              }
            });
            this.initScoket();
          }
        })
      }
    },
    created() {
      this.getUserInfo();
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

