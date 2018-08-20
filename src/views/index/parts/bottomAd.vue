<template>
  <div class="bottom-ad" v-if="openVal">
    <div class="bottom-ad-close" @click="open" :style="openStyle"></div>
    <div class="bottom-ad-open" :style="closeStyle">
      <a :href="openVal.buserId != '' ? `/qd/shop-${openVal.buserId}/iron-1` : 'javascript:void(0);'" target="_blank">
        <img :src="openVal.src" style="margin: 0 auto;display: block;">
      </a>
      <span class="close" @click="close"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      openVal: Object,
      closeVal: Object
    },
    data() {
      return {
        openLeft: 0,
        show: false,
        closeLeft: -179
      }
    },
    computed: {
      openStyle() {
        return {
          left: this.closeLeft + 'px',
          'background-image': `url('${this.closeVal.src}')`
        }
      },
      closeStyle() {
        return {
          left: this.openLeft + '%',
          'background-color': this.openVal.bgColor
        }
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

<style lang='less'>
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
      cursor: pointer;
      background-repeat: no-repeat;
      transition: left 1s ease-in-out;
    }
    .bottom-ad-open {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 90px;
      width: 100%;
      background-position: top center;
      background-repeat: no-repeat;
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