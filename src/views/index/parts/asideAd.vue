<template>
  <div class="aside-ad" :class="position" :style="!show ? 'display: none':''" v-if="vals">
    <a :href="vals.buserId != '' ? `/qd/shop-${vals.buserId}/iron-1` : 'javascript:void(0);'" target="_blank">
      <img :src="vals.src">
    </a>
    <a class="aside-close" @click="close"></a>
  </div>
</template>

<script>
  export default {
    props: {
      position: String,
      vals: Object
    },
    data() {
      return {
        show: true
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
    img {
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