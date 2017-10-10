<template>
    <div class="seller-index">
        <statusBar @on-filter-status="filterStatus" ref="statusBar" :status="statusData"></statusBar>
        <tabList @on-page-change="pageChange" :total="totalCount" ref="tabList">
            <tabCard v-for="(item,index) in list" @click.native="selectItem(index)" :class="{ 'active':activeIndex == index }" :key="index" :item="item"></tabCard>
        </tabList>
        <div class="info-list">
            <tipBar :item="activeItem"></tipBar>
            <Info :item="activeItem"></Info>
            <offerPanel :item="activeItem" :ironBuyId="activeItemId" @on-ajax="afterOffer"></offerPanel>
        </div>
    </div>
</template>

<script>
    import statusBar from '@/views/buyer/buys/parts/statusBar.vue';
    import tipBar from './parts/tipBar.vue'
    import tabList from '@/views/buyer/buys/parts/tabList.vue';
    import Info from './parts/info.vue';
    import tabCard from './parts/tabCard.vue';
    import offerPanel from './parts/offerPanel.vue'
    export default {
        components: {
            statusBar,
            tabList,
            Info,
            tabCard,
            tipBar,
            offerPanel
        },
        data() {
            return {
                statusData: [{
                        name: '待报价',
                        status: 0,
                        count: 0
                    },
                    {
                        name: '已报价',
                        status: 1,
                        count: 0
                    },
                    {
                        name: '已成交',
                        status: 2,
                        count: 0
                    },
                    {
                        name: '未中标',
                        status: 3,
                        count: 0
                    },
                    {
                        name: '所有',
                        status: "",
                        count: 0
                    }
                ],
                getListApi: {
                    currentPage: 1,
                    pageSize: 5,
                    offerStatus: 0 //待报价
                },
                list: [],
                totalCount: 0,
                activeIndex: 0
            }
        },
        computed: {
            activeItem() {
                return this.list.length > 0 ? this.list[this.activeIndex] : {}
            },
            activeItemId() {
                return this.list.length > 0 ? this.list[this.activeIndex].id : ''
            },
            isToday() {
                return this.$route.params.isToday
            }
        },
        methods: {
            // 切换Item
            selectItem(index) {
                this.activeIndex = index;
            },
            // 切换状态
            filterStatus(status) {
                this.getListApi.offerStatus = status;
                this.getListApi.currentPage = 1;
                this.$refs.tabList.pageInit();
                this.activeIndex = 0;
                this.getironList();
            },
            // 分页点击
            pageChange(current) {
                this.getListApi.currentPage = current;
                // 每次翻页，重置选中为第一个
                this.activeIndex = 0;
                this.getironList();
            },
            getironList() {
                let params = this.$clearData(this.getListApi);
                params.today = this.isToday;
                this.$http.post(this.$api.sellerQueryIrons, params).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.list;
                        this.totalCount = res.data.totalCount;
                        if (res.data.never != undefined) {
                            this.statusData[0].count = res.data.never;
                            this.statusData[1].count = res.data.offer;
                            this.statusData[2].count = res.data.deal;
                            this.statusData[3].count = res.data.miss;
                            this.statusData[4].count = res.data.all;
                        }
                    }
                })
            },
            // 完成报价，完成忽略后
            afterOffer(flag){
                let isOffer = flag == 1;
                if(isOffer){
                    this.$refs.statusBar.activeIndex = 1;
                    this.filterStatus(1);
                }else{
                    this.getironList();
                }
            }
        },
        watch: {
            activeItemId() {
                // this.getOfferList();
            },
            isToday() {
                // 当日和所有切换的时候，初始化所有参数
                this.getListApi.currentPage = 1;
                this.getListApi.offerStatus = 0;
                this.$refs.statusBar.activeIndex = 0;
                this.getironList();
            }
        },
        created() {
            this.getironList();
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/base.less';
    .info-list {
        margin: 16px 0 0 330px;
    }
    
    .buy-index {
        position: relative;
    }
</style>


