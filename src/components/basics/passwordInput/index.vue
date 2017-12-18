<template>
    <div class="password-input">
        <input type="tel" maxlength="6" class="realInput" v-model="realInput" @keyup="getNum()" @keydown="delNum()">
        <div class="item" v-for="(disInput,i) in disInputs" :key="i">
            <input type="tel" maxlength="1" v-model="disInput.value">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            number: {
                type: Number,
                default: 6
            },
            value: {
                type: [Number, String]
            },
            type: {
                type: String,
                default: 'text'
            }
        },
        data() {
            return {
                messagepacket: false,
                disInputs: [],
                realInput: ''
    
            }
        },
        watch: {
            realInput(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.realInput = val;
            }
        },
        methods: {
            getNum() {
                for (let i = 0; i < this.realInput.length; i++) {
                    this.disInputs[i].value = this.realInput.charAt(i)
                    // 表示字符串中某个位置的数字，即字符在字符串中的下标。
                }
            },
            delNum() {
                let oEvent = window.event;
                if (oEvent.keyCode == 8) {
                    if (this.realInput.length > 0) {
                        this.disInputs[this.realInput.length - 1].value = ''
                    }
                }
            },
            init() {
                for (let i = 0; i < this.number; i++) {
                    this.disInputs.push({
                        value: ''
                    })
                }
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .password-input {
        position: relative;
        display: inline-block;
        height: 40px;
        padding: 6px 0;
        border: @b_d1;
        .borderRadius;
        vertical-align: middle;
        .item {
            float: left;
            width: 40px;
            height: 28px;
            &:not(:last-child) {
                border-right: @b_d1;
            }
        }
        input {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 28px;
            border: 0;
            margin: 0;
            padding: 0;
            background-color: #fff;
            font-size: 28px;
            color: @f_dark;
            outline: none;
            text-indent: 11px;
        }
        .realInput {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            outline: none;
            border: 0;
            z-index: 1;
            background: none;
            .opacity(0);
        }
    }
</style>

