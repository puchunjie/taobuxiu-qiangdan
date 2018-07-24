<template>
    <div class="main-header">
        <div class="logo-div">
            <div class="inner-container">
                <router-link :to="{name:'index'}"><span class="logo iconfont icon-ziyuan4"></span></router-link>
                <div class="account-group">
                    <router-link :to="{name:'Bbuys',params:{isToday:1}}" class="br" :class="{'active':isBuyer}">买家中心</router-link>
                    <router-link :to="{name:'Sbuys',params:{isToday:1}}" class="bl" :class="{'active':isSeller}">卖家中心</router-link>
                </div>
            </div>
        </div>
        <div class="menu-div">
            <div class="inner-container">
                <ul class="menu">
                    <router-link :class="{'active':$route.name == 'index'}" :to="{name:'index'}" tag="li">首页</router-link>
                    <router-link :class="{'active':$route.name == 'publishIron'}" :to="{name:'publishIron',params:{isCopy: 0}}" tag="li">发布求购</router-link>
                    <router-link :class="{'active':$route.name == 'mIron' || $route.name == 'mPlan' || $route.name == 'mSpecial'}" :to="{name:'market'}" tag="li">资源市场</router-link>
                    <router-link :class="{'active':$route.name == 'logistics'}" :to="{name:'logistics'}" tag="li">找物流</router-link>
                </ul>
            </div>
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
        overflow: hidden;
        z-index: 900;
        background-color: @dark_blue;
        .logo-div {
            width: 100%;
            height: 80px;
            background-color: #fff;
        }
        .logo {
            display: block;
            float: left;
            color: @dark_blue;
            font-size: 65px;
            margin: 5px 0 0 0;
        }
        .menu {
            display: block;
            float: left;
            height: 40px;
            li {
                float: left;
                width: 140px;
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                color: #fff;
                cursor: pointer;
                &.active,
                &:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                    font-weight: 500;
                }
            }
        }
        .account-group {
            float: right;
            width: 200px;
            height: 40px;
            border: 2px solid @dark_blue;
            background-color: #fff;
            margin: 20px 10px 0 0;
            line-height: 36px;
            overflow: hidden;
            font-weight: 500;
            .borderRadius(40px);
            a {
                display: block;
                color: @dark_blue;
                background-color: #fff;
                float: left;
                text-align: center;
                width: 50%;
                height: 100%;
                &.br {
                    border-right: 1px solid @dark_blue;
                }
                &.bl {
                    border-left: 1px solid @dark_blue;
                }
                &.active {
                    background-color: @dark_blue;
                    color: #fff;
                }
            }
        }
    }
</style>


