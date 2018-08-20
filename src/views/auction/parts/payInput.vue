<template>
    <div class="pay-input">
        <input type="text" class="input" placeholder="请输入" v-model="num" @input="checkNum" @blur="isOk" />
        <i class="iconfont icon-plus-square-o" @click="plus"></i>
        <i class="iconfont icon-minus-square-o" @click="minus"></i>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: [String, Number],
                default: ''
            },
            min: {
                type: Number,
                default: 0
            },
            step: {
                type: Number,
                default: 1
            },
            now: {
                type: Number,
                default: 0
            },
            hasPrice: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                num: ''
            }
        },
        watch: {
            value(val) {
                this.num = val;
            },
            num(val) {
                let data = val > 0 ? val : '';
                this.$emit('input', data)
            },
            now() {
                this.initNum();
            },
            hasPrice() {
                this.initNum();
            }
        },
        computed: {
            underPrice() {
                return this.hasPrice ? this.now + this.step : this.min
            }
        },
        methods: {
            checkNum(e) {
                if (isNaN(+e.target.value)) {
                    this.num = ''
                }
            },
            isOk(e) {
                let num = +e.target.value;
                let cantPay = !this.hasPrice ? num < this.underPrice : (num - this.underPrice) < this.step;
                if (cantPay)
                    this.num = this.underPrice
            },
            minus() {
                let canMinus = this.hasPrice ? (+this.num - this.underPrice) >= this.step : (+this.num - this.step) >= this.underPrice;
                if (canMinus)
                    this.num = (+this.num) - this.step
            },
            plus() {
                this.num = (+this.num) + this.step
            },
            initNum() {
                this.num = this.hasPrice ? this.now + this.step : this.min;
            }
        },
        created() {
            this.initNum();
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
            bottom: 0;
        }
        .icon-plus-square-o {
            top: 0;
        }
    }
</style>
