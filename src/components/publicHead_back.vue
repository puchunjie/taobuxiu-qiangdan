<template>
    <div class="main-header">
        <router-link :to="{name:'index'}"><span class="logo iconfont icon-ziyuan4"></span></router-link>
        <a class="switch-btn" @click="switchBs">切换{{ isBuyer ? '卖家' : '买家' }}</a>
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
        },
        methods: {
            switchBs() {
                this.$router.push({
                    name: this.isBuyer ? 'Sbuys' : 'Bbuys',
                    params:{isToday:1}
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/base.less';
    .main-header {
        position: relative;
        width: 100%;
        height: 64px;
        overflow: hidden;
        z-index: 900;
        background-color: #fff;
        .logo {
            display: block;
            float: left;
            color: @dark_blue;
            font-size: 45px;
            margin: 0 0 0 15px;
        }
        .switch-btn {
            display: block;
            width: 88px;
            height: 32px;
            line-height: 30px;
            border: 1px solid @dark_blue;
            color: @dark_blue;
            font-size: 14px;
            text-align: center;
            float: right;
            .borderRadius(32px);
            margin: 16px 16px 0 0;
            &:hover {
                color: #fff;
                background-color: @dark_blue;
            }
        }
    }
</style>


