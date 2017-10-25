<template>
    <div class="seller-index">
        <statusBar @on-filter-status="filterStatus" ref="statusBar" :status="statusData"></statusBar>
        <template v-if="listEmpty">
                <tabList @on-page-change="pageChange" :total="totalCount" ref="tabList">
                    <p v-show="isWait" class="offer-tips">求购单需按顺序进行操作</p>
                    <tabCard v-for="(item,index) in list" @click.native="selectItem(index)" :class="{ 'active':activeIndex == index }" :key="index" :item="item"></tabCard>
                    <div v-show="isWait" class="page-mask"></div>
                </tabList>
                <div class="info-list">
                    <tipBar :item="activeItem"></tipBar>
                    <Info :item="activeItem"></Info>
                    <offerPanel :item="activeItem" :ironBuyId="activeItemId" @on-ajax="afterOffer"></offerPanel>
                </div>
        </template>
        <img v-else class="no-list" src="../../../assets/no-list.png">
    </div>
</template>

<script>
    import statusBar from '@/views/buyer/buys/parts/statusBar.vue';
    import tipBar from './parts/tipBar.vue'
    import tabList from '@/views/buyer/buys/parts/tabList.vue';
    import Info from './parts/info.vue';
    import tabCard from './parts/tabCard.vue';
    import offerPanel from './parts/offerPanel.vue'
    import pushAsync from '@/utils/pushAsync.js'
    export default {
        mixins: [pushAsync],
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
                    // {
                    //     name: '所有',
                    //     status: "",
                    //     count: 0
                    // }
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
            // 是否没有数据
            listEmpty() {
                return this.list.length > 0
            },
            activeItem() {
                return this.list.length > 0 ? this.list[this.activeIndex] : {}
            },
            activeItemId() {
                return this.list.length > 0 ? this.list[this.activeIndex].id : ''
            },
            isToday() {
                return this.$route.params.isToday
            },
            // 是否为待报价列表
            isWait() {
                return this.getListApi.offerStatus == 0
            }
        },
        methods: {
            // 切换Item
            selectItem(index) {
                // 如果是待报价列表，不能选择tabCard
                if (this.isWait)
                    return false
                this.activeIndex = index;
            },
            // 切换状态
            filterStatus(status) {
                this.getListApi.offerStatus = status;
                this.getListApi.currentPage = 1;
                if (this.$refs.tabList)
                    this.$refs.tabList.pageInit();
                this.activeIndex = 0;
                this.getDataList();
            },
            // 分页点击
            pageChange(current) {
                this.getListApi.currentPage = current;
                // 每次翻页，重置选中为第一个
                this.activeIndex = 0;
                this.getDataList();
            },
            getDataList() {
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
                            // this.statusData[4].count = res.data.all;
                        }
                    }
                })
            },
            // 完成报价，完成忽略后
            afterOffer(isIgon) {
                if (!isIgon) {
                    this.getDataList();
                } else {
                    // 如果删除这条之后分页中海油数据，就直接请求当前页数据
                    if (this.list.length <= 1 && this.getListApi.currentPage > 1)
                        this.getListApi.currentPage--;
                    if (this.$refs.tabList)
                        this.$refs.tabList.pageInit(this.getListApi.currentPage);
                    this.activeIndex = 0;
                    this.getDataList();
                }
            }
        },
        watch: {
            isToday() {
                // 当日和所有切换的时候，初始化所有参数
                this.getListApi.currentPage = 1;
                this.getListApi.offerStatus = 0;
                this.$refs.statusBar.activeIndex = 0;
                this.getDataList();
            }
        },
        created() {
            this.getDataList();
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/base.less';
    .info-list {
        margin: 16px 0 0 330px;
    }
    
    .seller-index {
        .no-list {
            display: block;
            width: 230px;
            margin: 200px auto 0;
        }
        .offer-tips {
            text-indent: 10px;
            margin-bottom: 10px;
            color: @dark_red;
        }
        .page-mask {
            position: absolute;
            width: 320px;
            height: 30px;
            bottom: 0;
            z-index: 10;
            cursor: not-allowed;
        }
    }
</style>


