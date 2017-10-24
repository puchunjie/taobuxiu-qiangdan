<template>
    <div class="main-header">
        <span class="logo iconfont icon-ziyuan4"></span>
        <ul class="menu">
            <router-link :class="{'active':$route.name == 'index'}" :to="{name:'index'}" tag="li">首页</router-link>
            <router-link :class="{'active':$route.name == 'publishIron'}" :to="{name:'publishIron',params:{isCopy: 0}}" tag="li">发布求购</router-link>
        </ul>
        <div class="account-group">
            <router-link :to="{name:'BuserInfo'}" class="br" :class="{'active':isBuyer}">买家中心</router-link>
            <router-link :to="{name:'SuserInfo'}" class="bl" :class="{'active':isSeller}">卖家中心</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            isBuyer() {
                return this.$route.fullPath.indexOf('buyer') > -1
            },
            isSeller() {
                return this.$route.fullPath.indexOf('seller') > -1
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/base.less';
    .main-header {
        position: relative;
        width: 100%;
        height: 80px;
        overflow: hidden;
        z-index: 1000;
        background-color: @dark_blue;
        .logo {
            display: block;
            float: left;
            color: #fff;
            font-size: 65px;
            margin: 5px 0 0 15px;
        }
        .menu {
            display: block;
            float: left;
            height: 100%;
            margin-left: 42px;
            li {
                float: left;
                width: 100px;
                line-height: 80px;
                text-align: center;
                font-size: 16px;
                font-weight: 500;
                color: #fff;
                cursor: pointer;
                &.active,
                &:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                }
            }
        }
        .account-group {
            float: right;
            width: 200px;
            height: 40px;
            border: 2px solid #fff;
            background-color: #fff;
            margin: 20px 10px 0 0;
            line-height: 36px;
            overflow: hidden;
            font-weight: 500;
            .borderRadius(40px);
            a {
                display: block;
                color: #fff;
                background-color: @dark_blue;
                float: left;
                text-align: center;
                width: 50%;
                height: 100%;
                &.br {
                    border-right: 1px solid #fff;
                }
                &.bl {
                    border-left: 1px solid #fff;
                }
                &.active {
                    background-color: #fff;
                    color: @dark_blue;
                }
            }
        }
    }
</style>


