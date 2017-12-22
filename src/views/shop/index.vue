<template>
    <div class="main-container">
        <div class="inner-container">
            <longBar></longBar>
        </div>
        <div class="main-header">
            <div class="inner-container" style="position: relative;">
                <router-link :to="{name:'index'}"><span class="logo iconfont icon-ziyuan4"></span></router-link>
                <ul class="menu">
                    <router-link :to="{name:'index'}" tag="li">返回主页</router-link>
                </ul>
                <div class="search">
                    <input type="text" class="search-input" placeholder="输入品类、材质、规格查询" v-model="search">
                    <a class="search-btn" @click="doSearch">店内搜索</a>
                </div>
            </div>
        </div>
        <div class="inner-container" style="margin-top:16px" v-show="itemData.isHaveShop == 1">
            <shopInfo :item="itemData">
                <tab></tab>
            </shopInfo>
            <div class="list-container">
                <router-view></router-view>
            </div>
        </div>
        <div class="inner-container" style="margin-top:16px" v-show="itemData.isHaveShop == 0">
            <img style="display:block;margin: 100px auto 20px;" src="../../assets/shop-none.png">
            <p style="text-align:center;line-height:24px">您还未开通企业店铺哦</p>
            <p style="text-align:center;line-height:24px">联系电话： 0510-12034863</p>
        </div>
        <quickNvigation></quickNvigation>
    </div>
</template>

<script>
    import quickNvigation from '@/components/quickNvigation.vue'
    import longBar from '@/components/loginBar'
    import shopInfo from './shopInfo.vue'
    import tab from './tab.vue'
    import loginInit from '@/utils/loginInit.js'
    import push from '@/utils/push.js'
    export default {
        mixins: [loginInit, push],
        components: {
            quickNvigation,
            longBar,
            shopInfo,
            tab
        },
        data() {
            return {
                itemData: {},
                search: ''
            }
        },
        computed: {
            userId() {
                return this.$route.params.id
            },
            storeType() {
                return this.$route.params.type
            },
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
            },
            doSearch() {
                this.$router.replace({
                    name: this.$route.name,
                    query: {
                        search: this.search
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
    body {
        background-color: @bg_color;
    }
    
    .container {
        width: 100%;
        background-color: #303653;
        .right-content {
            margin: 15px 0 0 160px;
            padding: 0 15px;
            background-color: @bg_color;
        }
    }
    
    .main-container {
        background-color: @bg_color;
    }
    
    .main-header {
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
        .search {
            position: relative;
            float: right;
            right: 20px;
            top: 20px;
            width: 360px;
            height: 34px;
            background-color: #fff;
            .search-input {
                display: inline-block;
                width: 280px;
                height: 34px;
                font-size: 12px;
                color: @f_dark;
                background-color: #fff;
                background-image: none;
                border: 0;
                margin: 0;
                padding: 10px;
                outline: none;
            }
            .search-btn {
                position: absolute;
                display: block;
                width: 80px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                right: 0;
                top: 0;
                color: #fff;
                background-color: @dark_blue;
                border: 1px solid #fff;
                font-size: 12px;
            }
        }
    }
    
    .list-container {
        margin-top: 16px;
    }
</style>


