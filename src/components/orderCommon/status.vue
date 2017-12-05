<template>
    <div class="status-select">
        <div class="item" v-for="(item,i) in data" :key="i" @click="pickerStatus(i)" :class="{'active':activeStatus == i}">
            {{ item.label }}{{ item.count > 0 ? `(${item.count})` : '' }}
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            value: {
                type:[String, Number]
            },
            data: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        data() {
            return {
                activeStatus: 0
            }
        },
        watch: {
          value(val){
              this.itemValue = val;
          },
          activeStatus(val){
              this.$emit('input',this.data[val].value)
          }  
        },
        methods: {
            pickerStatus(i) {
                if(i != this.activeStatus && this.data[i].count>0){
                    this.activeStatus = i;
                }
                
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../assets/base.less');
    .status-select {
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: @f_dark;
        border-bottom: 2px solid @back_gray;
        .item {
            width: 140px;
            height: 50px;
            line-height: 50px;
            float: left;
            cursor: pointer;
            &.active {
                color: @dark_blue;
                border-bottom: 4px solid @dark_blue;
            }
        }
    }
</style>
