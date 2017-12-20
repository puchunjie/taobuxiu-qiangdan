<template>
    <div class="market-container">
        <div class="router-tab">
            <div class="inner-box">
                <a class="tab-item" :class="{'active':activeTab == i}" @click="routerGo(i)" v-for="(tab,i) in routerTabs" :key="i">{{ tab.name }}</a>
            </div>
        </div>
        <div class="router-page">
            <div class="inner-box">
                <router-view></router-view>
            </div>
        </div>
        <quickNvigation></quickNvigation>
    </div>
</template>

<script>
    import quickNvigation from '@/components/quickNvigation.vue'
    export default {
        components: {
            quickNvigation
        },
        data() {
            return {
                routerTabs: [{
                        name: '现货资源',
                        pathName: 'mIron'
                    },
                    {
                        name: '定开计划',
                        pathName: 'mPlan'
                    },
                    {
                        name: '特价资源',
                        pathName: 'mSpecial'
                    }
                ],
                activeTab: 0
            }
        },
        computed: {
            routerPath() {
                return this.routerTabs[this.activeTab].pathName
            }
        },
        created() {
            switch (this.$route.name) {
                case 'mIron':
                    this.activeTab = 0
                    break;
                case 'mPlan':
                    this.activeTab = 1
                    break;
                case 'mSpecial':
                    this.activeTab = 2
                    break;
                default:
                    break;
            }
        },
        methods: {
            routerGo(i) {
                this.activeTab = i;
                this.$router.push({
                    name: this.routerPath
                })
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url('../../assets/base.less');
    .market-container {
        width: 100%;
        .inner-box {
            width: 1320px;
            margin: 0 auto;
        }
        .router-tab {
            width: 100%;
            height: 50px;
            background-color: #fff;
            border-bottom: @b_d1;
            font-size: 16px;
            .tab-item {
                display: inline-block;
                width: 100px;
                height: 49px;
                line-height: 48px;
                text-align: center;
                margin: 0 10px;
                color: @f_dark;
                border-bottom: 3px solid #fff;
                &.active {
                    color: @dark_blue;
                    font-weight: bold;
                    border-color: @dark_blue;
                }
            }
        }
        .router-page {
            width: 100%;
            margin-top: 10px;
        }
    }
</style>

