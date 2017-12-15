<template>
    <div class="password-input">
        <div class="item" v-for="el in number" :key="el" :ref="'pi'+el">
            <input type="text" @keyup="focusNext(el,$event)">
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
            type:{
                type:String,
                default: 'text'
            }
        },
        data() {
            return {
                resout: ''
            }
        },
        methods: {
            focusNext(el, e) {
                if (this.check(e)) {
                    let num = +e.target.value;
                    if (!isNaN(num))
                        this.resout += String(num);

                    if (this.$refs['pi' + (el + 1)]) {
                        this.$refs['pi' + (el + 1)][0].children[0].focus()
                    } else {
                        e.target.blur();
                    }
                } else {
                    e.target.value = ''
                }
            },
            // 判断是否为数字
            check(obj) {
                if (event.keyCode == 13 || event.keyCode == 46)
                    return true;
                if (event.keyCode < 48 || event.keyCode > 57)
                    return false;
                else
                    return true;
            }
        },
        watch: {
            resout(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.resout = val;
                if (val == '') {
                    for (let i = 0; i < this.number; i++) {
                        this.$refs['pi'+ (i+1)][0].children[0].value = ''
                    }
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .password-input {
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
    }
</style>
