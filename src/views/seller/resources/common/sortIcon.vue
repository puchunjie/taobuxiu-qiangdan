<template>
    <div class="sort">
        <span class="iconfont icon-iconjiaobiaoxiangshang up" :class="{'active':selfVal == 1}" @click="pickerSort('1')"></span>
        <span class="iconfont icon-iconjiaobiaoxiangxia down" :class="{'active':selfVal == 2}" @click="pickerSort('2')"></span>
    </div>
</template>

<script>
export default {
  props:{
      value:{
          type: String,
          default: ''
      }
  },
  data () {
      return {
          selfVal:''
      }
  },
  watch: {
      value(val){
          this.selfVal = val;
      },
      selfVal(val){
          this.$emit("input",val)
      }
  },
  methods: {
      pickerSort(v){
          this.selfVal = v;
          this.$emit('on-sort',this.objKey)
      }
  },
  mounted () {
      this.selfVal = this.value
  }
}
</script>


<style lang="less" scoped>
    @import url("../../../../assets/base.less");
    .sort {
        position: relative;
        vertical-align: middle;
        float: right;
        top: 7px;
        right:5px;
        .up,
        .down {
            position: absolute;
            right: 0;
            font-size: 20px;
            line-height: 10px;
            color: @back_gray;
            cursor: pointer;
            &:hover,
            &.active {
                color: @f_dark;
            }
        }
        .up {
            top: -9px;
        }
        .down {
            top: -1px;
        }
    }
</style>
