<template>
  <div class="bottom-ad">
    <div class="bottom-ad-close" @click="open" :style="{left: closeLeft + 'px'}"></div>
    <div class="bottom-ad-open" :style="{left: openLeft + '%'}">
      <span class="close" @click="close"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        openLeft: 0,
        show: false,
        closeLeft: -179
      }
    },
    methods: {
      open() {
        this.closeLeft = -179;
        setTimeout(() => {
          this.openLeft = 0;
        }, 1000)
      },
      close() {
        this.openLeft = -179;
        setTimeout(() => {
          this.closeLeft = 0;
        }, 1000)
      }
    }
  }
</script>

<style lang='less' scoped>
  .bottom-ad {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    .bottom-ad-close {
      position: absolute;
      left: -179px;
      bottom: 0;
      height: 90px;
      width: 179px;
      background: url('../../../assets/ad-close.png') no-repeat;
      cursor: pointer;
      transition: left 1s ease-in-out;
    }
    .bottom-ad-open {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 90px;
      width: 100%;
      background: #0f1264 top center url('../../../assets/ad-open.png') no-repeat;
      transition: left 1s ease-in-out;
      .close {
        position: absolute;
        right: 17%;
        top: 10px;
        width: 60px;
        height: 18px;
        background: url('../../../assets/close.gif') no-repeat;
        z-index: 999;
        cursor: pointer;
      }
    }
  }
</style>