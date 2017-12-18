<template>
    <div class="main-container">
        <longBar></longBar>
        <div class="main-header">
            <router-link :to="{name:'index'}"><span class="logo iconfont icon-ziyuan4"></span></router-link>
            <ul class="menu">
                <router-link :to="{name:'index'}" tag="li">返回主页</router-link>
            </ul>
        </div>
        <div class="inner-container" style="margin-top:16px">
            <shopInfo :item="itemData">
                <tab></tab>
            </shopInfo>
            <div class="list-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import longBar from '@/components/loginBar'
    import shopInfo from './shopInfo.vue'
    import tab from './tab.vue'
    export default {
        components: {
            longBar,
            shopInfo,
            tab
        },
        data() {
            return {
                itemData: {}
            }
        },
        computed: {
            userId() {
                return this.$route.params.id
            }
        },
        methods: {
            getShopInfo() {
                this.$http.post(this.$api.queryDemandInfo, {
                    userId: this.userId
                }).then(res => {
                    if (res.code === 1000) {
                        this.itemData = res.data;
                    }
                })
            }
        },
        created() {
            this.getShopInfo();
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/base.less';
    .main-header {
        position: relative;
        width: 100%;
        height: 80px;
        overflow: hidden;
        z-index: 900;
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
            }
        }
    }
    
    .list-container {
        margin-top: 16px;
    }
</style>


