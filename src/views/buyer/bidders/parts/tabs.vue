<template>
  <div class="tabs-main">
    <span class="tabs-item" v-for="(item,i) in tabData" @click="handleClick(item)" :key="i" :class="item.id === vals ? 'current':''">{{item.name}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      value: String,
      tabData: {
        type: Array
      }
    },
    data() {
      return {
        vals: ''
      }
    },
    watch: {
      value(val) {
        this.vals = val;
      },
      vals(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      handleClick(item){
        this.vals = item.id;
        this.$emit('input', this.vals)
      }
    },
    created() {
      this.vals = this.value;
    }
  }
</script>

<style lang='less'>
  @import url("../../../../assets/base.less");
  .tabs-main {
    border-bottom: 1px solid @back_gray;
    .tabs-item {
      position: relative;
      display: inline-block;
      width: 74px;
      text-align: center;
      line-height: 45px;
      font-size: 14px;
      color: @f_ligth;
      cursor: pointer;
      &.current{
        color: @dark_blue;
        &::after{
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 100%;
          height: 2px;
          background: @dark_blue;
        }
      }
    }
  }
</style>