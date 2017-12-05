<template>
    <div>
        <PInfo :level="level"></PInfo>
        <div class="contnet">
            <dataPanel class="panel" :filter="bgData" title="卖家响应" tit="报价率"></dataPanel>
            <dataPanel class="panel" :filter="qgData" strokeColor="#FF7A7A" trailColor="#FADBDB" color="red" title="卖家已确认" tit="成功率"></dataPanel>
        </div>
        <div class="contnet">
            <dataPanel class="panel" :filter="ironOrder" title="现货订单数据" tit="订单已确认率"></dataPanel>
            <dataPanel class="panel" :filter="dkOrder" title="定开订单数据" tit="订单已确认率"></dataPanel>
            <dataPanel class="panel" :filter="spOrder" title="特价订单数据" tit="订单已确认率"></dataPanel>
        </div>
    </div>
</template>


<script>
    import PInfo from '@/components/business/userInfo.vue'
    import dataPanel from '@/components/business/dataPanel.vue'
    export default {
        components: {
            PInfo,
            dataPanel
        },
        data() {
            return {
                level: '',
                bgData: [{
                        name: '今日',
                        percent: 25,
                        data: [{
                                name: '总响应次数',
                                count: 100
                            }, {
                                name: '有效报价',
                                count: 25
                            },
                            {
                                name: '错过报价',
                                count: 75
                            }
                        ]
                    },
                    {
                        name: '当月',
                        percent: 25,
                        data: [{
                                name: '总求购数',
                                count: 100
                            }, {
                                name: '有效报价',
                                count: 25
                            },
                            {
                                name: '错过报价',
                                count: 75
                            }
                        ]
                    },
                    {
                        name: '所有',
                        percent: 25,
                        data: [{
                                name: '总求购数',
                                count: 100
                            }, {
                                name: '有效报价',
                                count: 25
                            },
                            {
                                name: '错过报价',
                                count: 75
                            }
                        ]
                    }
                ],
                qgData: [{
                        name: '今日',
                        percent: 75,
                        data: [{
                                name: '有效报价',
                                count: 100
                            }, {
                                name: '中标',
                                count: 75
                            },
                            {
                                name: '未接单',
                                count: 25
                            }
                        ]
                    },
                    {
                        name: '当月',
                        percent: 60,
                        data: [{
                                name: '有效报价',
                                count: 100
                            }, {
                                name: '中标',
                                count: 60
                            },
                            {
                                name: '未接单',
                                count: 40
                            }
                        ]
                    },
                    {
                        name: '所有',
                        percent: 80,
                        data: [{
                                name: '有效报价',
                                count: 100
                            }, {
                                name: '中标',
                                count: 80
                            },
                            {
                                name: '未接单',
                                count: 20
                            }
                        ]
                    }
                ],
                ironOrder: [{
                        name: '今日',
                        percent: 75,
                        data: [{
                                name: '买方下单量',
                                count: 100
                            }, {
                                name: '已确认',
                                count: 75
                            },
                            {
                                name: '未接单',
                                count: 25
                            }
                        ]
                    },
                    {
                        name: '当月',
                        percent: 60,
                        data: [{
                                name: '买方下单量',
                                count: 100
                            }, {
                                name: '已确认',
                                count: 60
                            },
                            {
                                name: '未接单',
                                count: 40
                            }
                        ]
                    },
                    {
                        name: '所有',
                        percent: 80,
                        data: [{
                                name: '买方下单量',
                                count: 100
                            }, {
                                name: '已确认',
                                count: 80
                            },
                            {
                                name: '未接单',
                                count: 20
                            }
                        ]
                    }
                ],
                dkOrder: [{
                        name: '今日',
                        percent: 75,
                        data: [{
                                name: '买方下单量',
                                count: 100
                            }, {
                                name: '已确认',
                                count: 75
                            },
                            {
                                name: '未接单',
                                count: 25
                            }
                        ]
                    },
                    {
                        name: '当月',
                        percent: 60,
                        data: [{
                                name: '买方下单量',
                                count: 100
                            }, {
                                name: '已确认',
                                count: 60
                            },
                            {
                                name: '未接单',
                                count: 40
                            }
                        ]
                    },
                    {
                        name: '所有',
                        percent: 80,
                        data: [{
                                name: '买方下单量',
                                count: 100
                            }, {
                                name: '已确认',
                                count: 80
                            },
                            {
                                name: '未接单',
                                count: 20
                            }
                        ]
                    }
                ],
                spOrder: [{
                        name: '今日',
                        percent: 75,
                        data: [{
                                name: '买方下单量',
                                count: 100
                            }, {
                                name: '已确认',
                                count: 75
                            },
                            {
                                name: '未接单',
                                count: 25
                            }
                        ]
                    },
                    {
                        name: '当月',
                        percent: 60,
                        data: [{
                                name: '买方下单量',
                                count: 100
                            }, {
                                name: '已确认',
                                count: 60
                            },
                            {
                                name: '未接单',
                                count: 40
                            }
                        ]
                    },
                    {
                        name: '所有',
                        percent: 80,
                        data: [{
                                name: '买方下单量',
                                count: 100
                            }, {
                                name: '已确认',
                                count: 80
                            },
                            {
                                name: '未接单',
                                count: 20
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            getInfo() {
                this.$http.get(this.$api.userSellerInfo).then(res => {
                    if (res.code === 1000) {
                        let data = res.data;
                        let order = res.data.orderCount;
                        this.level = data.level;
                        //买家响应今日
                        this.bgData[0].data[0].count = data.todaySellQuote;
                        this.bgData[0].data[1].count = data.todaySellValid;
                        this.bgData[0].data[2].count = data.todaySellMiss;
                        this.bgData[0].percent = data.todaySellRate;
                        //买家响应当月
                        this.bgData[1].data[0].count = data.monthSellQuote;
                        this.bgData[1].data[1].count = data.monthSellValid;
                        this.bgData[1].data[2].count = data.mothSellMiss;
                        this.bgData[1].percent = data.monthSellRate;
                        //买家响应所有
                        this.bgData[2].data[0].count = data.sellQuote;
                        this.bgData[2].data[1].count = data.sellValid;
                        this.bgData[2].data[2].count = data.sellMiss;
                        this.bgData[2].percent = data.sellRate;
    
                        // 卖家已确认今日
                        this.qgData[0].data[0].count = data.todayOfferQuote;
                        this.qgData[0].data[1].count = data.todayOfferGet;
                        this.qgData[0].data[2].count = data.todayOfferNever;
                        this.qgData[0].percent = data.todayOfferRate;
                        // 卖家已确认当月
                        this.qgData[1].data[0].count = data.monthOfferAll;
                        this.qgData[1].data[1].count = data.monthOfferGet;
                        this.qgData[1].data[2].count = data.monthOfferNot;
                        this.qgData[1].percent = data.monthOfferRate;
                        // 卖家已确认所有
                        this.qgData[2].data[0].count = data.offerAll;
                        this.qgData[2].data[1].count = data.offerGet;
                        this.qgData[2].data[2].count = data.offerNot;
                        this.qgData[2].percent = data.offerRate;

                        // 现货订单量-今日，当月，所有
                        this.ironOrder[0].data[0].count = order.todaySellOrderX;
                        this.ironOrder[0].data[1].count = order.todaySellConfirmX;
                        this.ironOrder[0].data[2].count = order.todaySellMissX;
                        this.ironOrder[0].percent = order.todaySellRateX;

                        this.ironOrder[1].data[0].count = order.monthSellOrderX;
                        this.ironOrder[1].data[1].count = order.monthSellConfirmX;
                        this.ironOrder[1].data[2].count = order.monthSellMissX;
                        this.ironOrder[1].percent = order.monthSellRateX;

                        this.ironOrder[2].data[0].count = order.allSellOrderX;
                        this.ironOrder[2].data[1].count = order.allSellConfirmX;
                        this.ironOrder[2].data[2].count = order.allSellMissX;
                        this.ironOrder[2].percent = order.allSellRateX;

                        // 定开订单量-今日，当月，所有
                        this.dkOrder[0].data[0].count = order.todaySellOrderD;
                        this.dkOrder[0].data[1].count = order.todaySellConfirmD;
                        this.dkOrder[0].data[2].count = order.todaySellMissD;
                        this.dkOrder[0].percent = order.todaySellRateD;

                        this.dkOrder[1].data[0].count = order.monthSellOrderD;
                        this.dkOrder[1].data[1].count = order.monthSellConfirmD;
                        this.dkOrder[1].data[2].count = order.monthSellMissD;
                        this.dkOrder[1].percent = order.monthSellRateD;

                        this.dkOrder[2].data[0].count = order.allSellOrderD;
                        this.dkOrder[2].data[1].count = order.allSellConfirmD;
                        this.dkOrder[2].data[2].count = order.allSellMissD;
                        this.dkOrder[2].percent = order.allSellRateD;
                        
                        // 特价订单量-今日，当月，所有
                        this.spOrder[0].data[0].count = order.todaySellOrderT;
                        this.spOrder[0].data[1].count = order.todaySellConfirmT;
                        this.spOrder[0].data[2].count = order.todaySellMissT;
                        this.spOrder[0].percent = order.todaySellRateT;

                        this.spOrder[1].data[0].count = order.monthSellOrderT;
                        this.spOrder[1].data[1].count = order.monthSellConfirmT;
                        this.spOrder[1].data[2].count = order.monthSellMissT;
                        this.spOrder[1].percent = order.monthSellRateT;

                        this.spOrder[2].data[0].count = order.allSellOrderT;
                        this.spOrder[2].data[1].count = order.allSellConfirmT;
                        this.spOrder[2].data[2].count = order.allSellMissT;
                        this.spOrder[2].percent = order.allSellRateT;
                    }
                })
            }
        },
        created() {
            this.getInfo();
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/base.less';
    .contnet {
        .flex-block;
        padding-bottom: 16px;
        .panel {
            flex: 1;
            &:not(:last-child) {
                margin-right: 16px;
            }
        }
    }
</style>

