<template>
    <div>
        <PInfo :level="level"></PInfo>
        <div class="contnet">
            <rankingList class="panel" :list="rank"></rankingList>
            <dataPanel class="panel" :filter="bgData" title="今日报价量" tit="报价量"></dataPanel>
            <dataPanel class="panel" :filter="qgData" title="求购数据" tit="求购成交率"></dataPanel>
        </div>
        <div class="contnet">
            <dataPanel class="panel" :filter="ironOrder" title="现货订单数量" tit="订单成交率"></dataPanel>
            <dataPanel class="panel" :filter="dkOrder" title="定开订单数量" tit="订单成交率"></dataPanel>
            <dataPanel class="panel" :filter="spOrder" title="特价订单数量" tit="订单成交率"></dataPanel>
        </div>
    </div>
</template>


<script>
    import PInfo from '@/components/business/userInfo.vue'
    import rankingList from './rankingList.vue'
    import dataPanel from '@/components/business/dataPanel.vue'
    export default {
        components: {
            PInfo,
            dataPanel,
            rankingList
        },
        data () {
            return {
                level:'',
                rank:[],
                bgData:[{
                        name: '今日',
                        percent: 75,
                        data: [{
                                name: '总数',
                                count: 100
                            }, {
                                name: '有效报价',
                                count: 75
                            },
                            {
                                name: '错过',
                                count: 25
                            }
                        ]
                    }],
                qgData:[{
                        name: '今日',
                        percent: 75,
                        data: [{
                                name: '总数',
                                count: 100
                            }, {
                                name: '成交',
                                count: 75
                            },
                            {
                                name: '未成交',
                                count: 25
                            }
                        ]
                    },
                    {
                        name: '当月',
                        percent: 60,
                        data: [{
                                name: '总数',
                                count: 100
                            }, {
                                name: '成交',
                                count: 60
                            },
                            {
                                name: '未成交',
                                count: 40
                            }
                        ]
                    },
                    {
                        name: '所有',
                        percent: 80,
                        data: [{
                                name: '总数',
                                count: 100
                            }, {
                                name: '成交',
                                count: 80
                            },
                            {
                                name: '未成交',
                                count: 20
                            }
                        ]
                    }
                ],
                ironOrder:[{
                        name: '今日',
                        percent: 75,
                        data: [{
                                name: '有效下单量',
                                count: 100
                            }, {
                                name: '成交',
                                count: 75
                            },
                            {
                                name: '未成交',
                                count: 25
                            }
                        ]
                    },
                    {
                        name: '当月',
                        percent: 60,
                        data: [{
                                name: '有效下单量',
                                count: 100
                            }, {
                                name: '成交',
                                count: 60
                            },
                            {
                                name: '未成交',
                                count: 40
                            }
                        ]
                    },
                    {
                        name: '所有',
                        percent: 80,
                        data: [{
                                name: '有效下单量',
                                count: 100
                            }, {
                                name: '成交',
                                count: 80
                            },
                            {
                                name: '未成交',
                                count: 20
                            }
                        ]
                    }
                ],
                dkOrder:[{
                        name: '今日',
                        percent: 75,
                        data: [{
                                name: '有效下单量',
                                count: 100
                            }, {
                                name: '成交',
                                count: 75
                            },
                            {
                                name: '未成交',
                                count: 25
                            }
                        ]
                    },
                    {
                        name: '当月',
                        percent: 60,
                        data: [{
                                name: '有效下单量',
                                count: 100
                            }, {
                                name: '成交',
                                count: 60
                            },
                            {
                                name: '未成交',
                                count: 40
                            }
                        ]
                    },
                    {
                        name: '所有',
                        percent: 80,
                        data: [{
                                name: '有效下单量',
                                count: 100
                            }, {
                                name: '成交',
                                count: 80
                            },
                            {
                                name: '未成交',
                                count: 20
                            }
                        ]
                    }
                ],
                spOrder:[{
                        name: '今日',
                        percent: 75,
                        data: [{
                                name: '有效下单量',
                                count: 100
                            }, {
                                name: '成交',
                                count: 75
                            },
                            {
                                name: '未成交',
                                count: 25
                            }
                        ]
                    },
                    {
                        name: '当月',
                        percent: 60,
                        data: [{
                                name: '有效下单量',
                                count: 100
                            }, {
                                name: '成交',
                                count: 60
                            },
                            {
                                name: '未成交',
                                count: 40
                            }
                        ]
                    },
                    {
                        name: '所有',
                        percent: 80,
                        data: [{
                                name: '有效下单量',
                                count: 100
                            }, {
                                name: '成交',
                                count: 80
                            },
                            {
                                name: '未成交',
                                count: 20
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            getInfo(){
                this.$http.get(this.$api.userBuyInfo).then(res => {
                    if(res.code === 1000){
                        let data = res.data;
                        let order = res.data.orderCount;
                        this.rank = data.cooperation;
                        this.level = data.day;
                        // 今日报价
                        this.bgData[0].data[0].count = data.todayBuyTotal;
                        this.bgData[0].data[1].count = data.todayBuyValid;
                        this.bgData[0].data[2].count = data.todayBuyMiss;
                        this.bgData[0].percent = data.todayBuyRate;

                        // 今日求购
                        this.qgData[0].data[0].count = data.todaySellTotal;
                        this.qgData[0].data[1].count = data.todaySellGet;
                        this.qgData[0].data[2].count = data.todaySellMiss;
                        this.qgData[0].percent = data.todaySellRate;
                        // 当月求购
                        this.qgData[1].data[0].count = data.monthSellTotal;
                        this.qgData[1].data[1].count = data.monthSellGet;
                        this.qgData[1].data[2].count = data.monthSellMiss;
                        this.qgData[1].percent = data.monthSellRate;
                        // 所有求购
                        this.qgData[2].data[0].count = data.allSellTotal;
                        this.qgData[2].data[1].count = data.allSellGet;
                        this.qgData[2].data[2].count = data.allSellMiss;
                        this.qgData[2].percent = data.allSellRate;

                        // 现货订单量-今日，当月，所有
                        this.ironOrder[0].data[0].count = order.todayBuyOrderX;
                        this.ironOrder[0].data[1].count = order.todayBuyConfirmX;
                        this.ironOrder[0].data[2].count = order.todayBuyMissX;
                        this.ironOrder[0].percent = order.todayBuyRateX;

                        this.ironOrder[1].data[0].count = order.monthBuyOrderX;
                        this.ironOrder[1].data[1].count = order.monthBuyConfirmX;
                        this.ironOrder[1].data[2].count = order.monthBuyMissX;
                        this.ironOrder[1].percent = order.monthBuyRateX;

                        this.ironOrder[2].data[0].count = order.allBuyOrderX;
                        this.ironOrder[2].data[1].count = order.allBuyConfirmX;
                        this.ironOrder[2].data[2].count = order.allBuyMissX;
                        this.ironOrder[2].percent = order.allBuyRateX;

                        // 定开订单量-今日，当月，所有
                        this.dkOrder[0].data[0].count = order.todayBuyOrderD;
                        this.dkOrder[0].data[1].count = order.todayBuyConfirmD;
                        this.dkOrder[0].data[2].count = order.todayBuyMissD;
                        this.dkOrder[0].percent = order.todayBuyRateD;

                        this.dkOrder[1].data[0].count = order.monthBuyOrderD;
                        this.dkOrder[1].data[1].count = order.monthBuyConfirmD;
                        this.dkOrder[1].data[2].count = order.monthBuyMissD;
                        this.dkOrder[1].percent = order.monthBuyRateD;

                        this.dkOrder[2].data[0].count = order.allBuyOrderD;
                        this.dkOrder[2].data[1].count = order.allBuyConfirmD;
                        this.dkOrder[2].data[2].count = order.allBuyMissD;
                        this.dkOrder[2].percent = order.allBuyRateD;
                        
                        // 特价订单量-今日，当月，所有
                        this.spOrder[0].data[0].count = order.todayBuyOrderT;
                        this.spOrder[0].data[1].count = order.todayBuyConfirmT;
                        this.spOrder[0].data[2].count = order.todayBuyMissT;
                        this.spOrder[0].percent = order.todayBuyRateT;

                        this.spOrder[1].data[0].count = order.monthBuyOrderT;
                        this.spOrder[1].data[1].count = order.monthBuyConfirmT;
                        this.spOrder[1].data[2].count = order.monthBuyMissT;
                        this.spOrder[1].percent = order.monthBuyRateT;

                        this.spOrder[2].data[0].count = order.allBuyOrderT;
                        this.spOrder[2].data[1].count = order.allBuyConfirmT;
                        this.spOrder[2].data[2].count = order.allBuyMissT;
                        this.spOrder[2].percent = order.allBuyRateT;
                    }
                })
            }
        },
        created () {
            this.getInfo();
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/base.less';
    .contnet {
        padding-bottom: 16px;
        .flex-block;
        .panel {
            flex: 1;
            &:not(:last-child){
                margin-right: 16px;
            }
        }
    }
</style>

