<template>
    <div>
        <PInfo :level="level"></PInfo>
        <div class="contnet">
            <dataPanel class="panel" :filter="bgData" title="卖家响应" tit="报价率"></dataPanel>
            <dataPanel class="panel" :filter="qgData"  strokeColor="#FF7A7A" trailColor="#FADBDB" color="red" title="卖家成交" tit="成功率"></dataPanel>
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
        data () {
            return {
                level:'',
                bgData:[{
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
                    }],
                qgData:[{
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
                                name: '未成交',
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
                                name: '未成交',
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
                this.$http.get(this.$api.userSellerInfo).then(res => {
                    if(res.code === 1000){
                        let data = res.data;
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

                        // 卖家成交今日
                        this.qgData[0].data[0].count = data.todayOfferQuote;
                        this.qgData[0].data[1].count = data.todayOfferGet;
                        this.qgData[0].data[2].count = data.todayOfferNever;
                        this.qgData[0].percent = data.todayOfferRate;
                        // 卖家成交当月
                        this.qgData[1].data[0].count = data.monthOfferAll;
                        this.qgData[1].data[1].count = data.monthOfferGet;
                        this.qgData[1].data[2].count = data.monthOfferNot;
                        this.qgData[1].percent = data.monthOfferRate;
                        // 卖家成交所有
                        this.qgData[2].data[0].count = data.offerAll;
                        this.qgData[2].data[1].count = data.offerGet;
                        this.qgData[2].data[2].count = data.offerNot;
                        this.qgData[2].percent = data.offerRate;
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
        .flex-block;
        .panel {
            flex: 1;
            float: left;
            &:not(:last-child){
                margin-right: 16px;
            }
        }
    }
</style>

