<template>
    <div class="tabs">
        <router-link class="item" :to="{name:'sIron',params:{type:1}}" active-class="active" tag="div">
            <a>现货资源</a>
        </router-link>
        <router-link class="item" :to="{name:'sPlan',params:{type:2}}" active-class="active" tag="div">
            <a>定开资源</a>
        </router-link>
        <router-link class="item" :to="{name:'sSpecial',params:{type:3}}" active-class="active" tag="div">
            <a>特价资源</a>
        </router-link>
    </div>
</template>


<script>
    export default {
    
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/base.less');
    .tabs {
        width: 100%;
        height: 100%;
        text-align: center;
        .item {
            width: 120px;
            height: 100%;
            float: left;
            border-bottom: 2px solid #fff;
            a {
                display: block;
                width: 100%;
                height: 20px;
                margin-top: 15px;
                line-height: 20px;
                color: @f_dark;
            }
            &:not(:last-child) {
                a {
                    border-right: @b_d1;
                }
            }
            &.active {
                border-color: @dark_blue;
                a {
                    color: @dark_blue;
                    font-weight: bold;
                }
            }
            &:hover a {
                color: @dark_blue;
            }
        }
    }
</style>

