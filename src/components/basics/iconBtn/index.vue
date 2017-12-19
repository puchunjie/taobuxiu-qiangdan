<template>
    <div class="icon-btn-container">
        <span class="iconfont" :class="icon"></span>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            icon: {
                type: String
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .icon-btn-container{
        display: inline-block;
        padding: 5px 7px;
        background-color: #fff;
        border: 1px solid @mask_blue;
        font-size: 12px;
        color: @mask_blue;
        cursor: pointer;
        .noselect;
        .iconfont{
            font-size: 12px;
            color: @mask_blue;
        }
    }
</style>


