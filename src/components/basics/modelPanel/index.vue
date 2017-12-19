<template>
    <div class="model-container" v-show="visable">
        <div class="inner-wrap" :style="{'width':width + 'px'}">
            <div class="header">{{ title }}<span class="close iconfont icon-close" @click="visable = false"></span></div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            value: {
                type: Boolean
            },
            title: {
                type: String,
                default: '标题'
            },
            width: {
                type: [Number, String]
            }
        },
        data() {
            return {
                visable: false
            }
        },
        watch: {
            visible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.visable = val
            }
        },
        mounted() {
            if (this.value)
                this.visable = this.value
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .model-container {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .4);
        z-index: 990;
        font-size: 12px;
        .inner-wrap {
            width: 910px;
            background-color: #fff;
            margin: 200px auto;
            padding-bottom: 20px;
        }
        .header {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;
            font-size: 14px;
            color: #fff;
            background-color: @mask_blue;
            .close {
                position: absolute;
                right: 14px;
                cursor: pointer;
            }
        }
        .content {
            width: 100%;
            padding: 30px;
            table {
                width: 100%;
                td {
                    height: 34px;
                }
            }
        }
    }
</style>
