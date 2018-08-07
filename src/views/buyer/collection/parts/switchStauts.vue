<template>
  <div class="status-label">
    <label class="label-item" v-for="(item,index) in status" :class="val === item.id ? 'label-item-selected':''" @click="handleClick(item)">{{item.lable}}</label>
  </div>
</template>

<script>
  export default {
    props: {
      value: String,
      status: {
        type: Array
      }
    },
    data() {
      return {
        val: ''
      };
    },
    watch: {
      value(val) {
        this.val = val
      },
      val(vals) {
        this.$emit('input', vals)
      }
    },
    methods: {
      handleClick(item) {
        this.val = item.id;
        this.$emit('input', this.val)
      }
    },
    created() {
      this.val = this.value;
    }
  };
</script>

<style lang='less'>
  @import url('../../../../assets/base.less');
  .status-label {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
    .label-item {
      display: inline-block;
      height: 32px;
      line-height: 30px;
      margin: 0;
      padding: 0 15px;
      font-size: 14px;
      color: #495060;
      transition: all .2s ease-in-out;
      cursor: pointer;
      border: 1px solid #dddee1;
      background: #fff;
      position: relative;
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
      &:first-child {
        border-radius: 4px 0 0 4px;
        border-left: 1px solid #dddee1;
      }
      &.label-item-selected {
        color: @dark_blue;
        border-color: @dark_blue;
        background: #fff;
        z-index: 1;
      }
    }
  }
</style>