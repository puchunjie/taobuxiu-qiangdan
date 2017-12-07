<template>
    <h3 class="page-title">
        <span class="vertical-line"></span> 
        <slot></slot>
    </h3>
</template>

<style lang="less" scoped>
    @import url("../../assets/base.less");
    .page-title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 22px;
        margin-bottom: 15px;
        .vertical-line {
            position: relative;
            display: inline-block;
            width: 6px;
            height: 24px;
            top: -2px;
            background-color: @dark_blue;
            margin-right: 10px;
            vertical-align: middle;
        }
    }
</style>

