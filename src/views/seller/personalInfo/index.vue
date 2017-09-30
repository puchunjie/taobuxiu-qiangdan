<template>
    <div>
        <PInfo></PInfo>
        <div class="contnet">
            <dataPanel class="panel" :filter="bgData" title="今日报价量" tit="报价量"></dataPanel>
            <dataPanel class="panel" :filter="qgData" title="求购数据" tit="求购成交率"></dataPanel>
        </div>
    </div>
</template>


<script>
    import PInfo from '@/components/business/userInfo.vue'
    import rankingList from '@/components/business/rankingList.vue'
    import dataPanel from '@/components/business/dataPanel.vue'
    export default {
        components: {
            PInfo,
            dataPanel,
            rankingList
        },
        data () {
            return {
                bgData:[{
                        name: '今日',
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

