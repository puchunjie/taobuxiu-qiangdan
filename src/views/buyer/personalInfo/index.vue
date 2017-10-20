<template>
    <div>
        <PInfo :level="level"></PInfo>
        <div class="contnet">
            <rankingList class="panel" :list="rank"></rankingList>
            <dataPanel class="panel" :filter="bgData" title="今日报价量" tit="报价量"></dataPanel>
            <dataPanel class="panel" :filter="qgData" title="求购数据" tit="求购成交率"></dataPanel>
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
                ]
            }
        },
        methods: {
            getInfo(){
                this.$http.get(this.$api.userBuyInfo).then(res => {
                    if(res.code === 1000){
                        let data = res.data;

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

