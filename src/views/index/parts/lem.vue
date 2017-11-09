<template>
    <div>
        <div class="tit">LME镍价格走势
            <div class="btn-group">
                <a class="btn" :class="{'active': i == active}" v-for="(el,i) in filter" :key="i" @click="switchTab(i)">{{ el }}</a>
            </div>
        </div>
        <div id="myChart"></div>
    </div>
</template>

<script>
    // 引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    import {
        MathRand
    } from '@/utils/tools.js';
    import {
        dateformat
    } from '@/filters'
    export default {
        data() {
            return {
                myChart: '',
                list: [],
                filter: ['今日', '三个月'],
                active: 0
            }
        },
        computed: {
            activeData() {
                let data = {
                    x: [],
                    y: []
                };
                if (this.active == 0) {
                    this.list[this.active].forEach(el => {
                        data.x.push(dateformat(el.time * 1000, 'hh:mm'));
                        data.y.push(el.buyPrice * 1);
                    })
                } else {
                    this.list[this.active].forEach(el => {
                        data.x.push(dateformat(el.logTime));
                        data.y.push({
                            value: el.endPrice * 1,
                            start: el.startPrice * 1,
                            min: el.minPrice * 1,
                            max: el.maxPrice * 1
                        });
                    })
                }
                return data
            }
        },
        methods: {
            chartInit() {
                let option = {
                    backgroundColor: '#609EE9',
                    textStyle: {
                        color: '#fff'
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        },
                        padding: 14,
                        textStyle: {
                            color: '#609EE9'
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    grid: {
                        show: true,
                        borderColor: 'rgba(255,255,255,.2)'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        }
                    },
                    yAxis: {
                        boundaryGap: [0, '50%'],
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        },
                        scale: true
                    },
                    series: [{
                        name: '价格',
                        type: 'line',
                        smooth: true,
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#fff'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255, 255, 255,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255, 255, 255,0)'
                                }])
                            }
                        }
                    }]
                };
                // 基于准备好的dom，初始化echarts实例
                this.myChart = echarts.init(document.getElementById('myChart'));
                this.myChart.setOption(option);
                this.draw();
            },
            // 绘制图标
            draw() {
                let isDay = this.active == 0;
                let data = this.$clearData(this.activeData)
                this.myChart.setOption({
                    xAxis: {
                        data: data.x
                    },
                    tooltip: {
                        formatter: function(params) {
                            params = params[0];
                            let showStr = '';
                            if (isDay) {
                                showStr = [
                                    '时间：' + params.name + '<br/>',
                                    '价格：￥' + params.value + '<br/>'
                                ].join('');
                            } else {
                                showStr = [
                                    params.name + '<br/>',
                                    '当前: ￥' + params.value + '<br/>',
                                    '开盘: ￥' + params.data.start + '<br/>',
                                    '最高: ￥' + params.data.max + '<br/>',
                                    '最低: ￥' + params.data.min + '<br/>',
                                    '收盘: ￥' + params.data.value + '<br/>'
                                ].join('');
                            }
                            return showStr
                        }
                    },
                    series: [{
                        name: '成交',
                        data: data.y
                    }]
                })
            },
            // 获取数据，今日和三个月数据
            getData() {
                this.$http.all([
                    this.$http.get(this.$api.lme),
                    this.$http.get(this.$api.threeMonth)
                ]).then(this.$http.spread((day, mounth) => {
                    if (day.code === 1000 && mounth.code === 1000) {
                        this.list = [day.data, mounth.data];
                        this.chartInit();
                        this.scoketInit();
                    }
                }))
            },
            // scoket初始化
            scoketInit() {
                let _this = this;
                let rand = this.$ls.get('rand');
                if (rand == null) {
                    rand = MathRand();
                    this.$ls.set('rand', rand);
                }
                // // 建立WebSocket链接
                let ws = new WebSocket(this.$api.ws + '/ni?pg' + rand);
    
                ws.onopen = function(evt) {
                    // console.log("lem链接成功 ...");
                };
    
                ws.onmessage = function(evt) {
                    _this.list[0].push(JSON.parse(evt.data));
                    _this.draw();
                };
    
                ws.onclose = function(evt) {
                    // console.log("lem链接关闭！");
                    setTimeout(() => {
                        _this.initScoket();
                    }, 10000)
                };
            },
            // 切换图表
            switchTab(i) {
                this.active = i;
                this.draw();
            }
        },
        created() {
            this.getData();
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../assets/base.less';
    .tit {
        position: relative;
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        padding: 0 27px;
        font-weight: bold;
        border-bottom: @b_d1;
        .btn-group {
            position: absolute;
            right: 20px;
            top: 10px;
            font-weight: normal;
            font-size: 14px;
            border: 1px solid @mask_blue;
            .borderRadius;
            .btn {
                display: block;
                float: left;
                width: 60px;
                height: 32px;
                line-height: 32px;
                color: @mask_blue;
                text-align: center;
                &.active {
                    color: #fff;
                    background-color: @mask_blue;
                }
                &:not(:last-child) {
                    border-right: 1px solid @mask_blue;
                }
            }
        }
    }
    
    #myChart {
        width: 100%;
        height: 420px;
    }
</style>

