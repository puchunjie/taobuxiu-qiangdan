<template>
  <div class="aside-ad" :class="isLeft ? 'left':'right'" :style="!show ? 'display: none':''">
    <img :src="bg">
    <a class="aside-close" @click="close"></a>
  </div>
</template>

<script>
  export default {
    props: {
      position: String
    },
    data() {
      return {
        show: true
      }
    },
    computed: {
      isLeft() {
        return this.position === 'left'
      },
      bg(){
        return this.isLeft ? 'https://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/recommend/1.png' : 'https://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/recommend/2.png'
      }
    },
    methods: {
      close() {
        this.show = !this.show;
      }
    }
  }
</script>

<style lang='less' scoped>
  .aside-ad {
    position: fixed;
    top: 200px;
    width: 160px;
    height: 240px;
    z-index: 999;
    img{
      max-width: 100%;
    }
    &.right {
      right: 5px;
    }
    &.left {
      left: 5px;
    }
    .aside-close {
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 18px;
      background: url('../../../assets/close.gif') no-repeat;
      z-index: 999;
    }
    &.hidden {
      display: none;
    }
  }
</style>