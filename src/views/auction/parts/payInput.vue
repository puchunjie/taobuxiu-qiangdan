<template>
    <div class="pay-input">
        <input type="text" class="input" placeholder="请输入" v-model="num" @input="checkNum" @blur="isOk"/>
        <i class="iconfont icon-minus-square-o" @click="minus"></i>
        <i class="iconfont icon-plus-square-o" @click="plus"></i>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: [String,Number],
                default: ''
            },
            min: {
                type: Number,
                default: 0
            },
            step:{
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                num: ''
            }
        },
        watch: {
          value(val){
              this.num = val;
          },
          num(val){
              let data = val > 0 ? val : '';
              this.$emit('input',data)
          }  
        },
        methods: {
            checkNum(e){
                if (isNaN(+e.target.value)) {
                    this.num = ''
                }
            },
            isOk(e){
                let num = +e.target.value;
                if(num < (this.min + (+this.num))  || num == 0 )
                    this.num = this.min + this.step
            },
            minus(){
                if(this.num > (this.min + this.step))
                    this.num = (+this.num) - this.step
            },
            plus(){
                this.num = (+this.num )+ this.step
            }
        },
        created() {
            this.num = this.min + this.step;
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .pay-input {
        position: relative;
        display: inline-block;
        width: 185px;
        height: 40px;
        .input {
            display: block;
            width: 160px;
            height: 40px;
            border: @b_d1;
            background-color: #fff;
            padding: 8px 12px;
            font-size: 16px;
            outline: 0;
        }
        .iconfont {
            position: absolute;
            right: 0;
            font-size: 15px;
            color: #ccc;
            cursor: pointer;
            &:hover {
                color: @light_blue;
            }
        }
        .icon-minus-square-o {
            top: 0;
        }
        .icon-plus-square-o {
            bottom: 0;
        }
    }
</style>
