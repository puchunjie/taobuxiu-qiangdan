<template>
    <div>
        <div class="tit">LME镍价格走势</div>
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
        dateformat
    } from '@/filters'
    export default {
        data() {
            return {
                myChart: '',
                list: [],
                isLoad: false
            }
        },
        computed: {
            coordinate() {
                let arr = [];
                this.list.forEach(el => {
                    arr.push({
                        name: dateformat((el.time * 1000),'hh:mm'),
                        value: [el.time * 1000, el.buyPrice * 1]
                    })
                })
                return arr
            }
        },
        methods: {
            chartInit() {
                let data = this.coordinate;
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
                        formatter: function(params) {
                            params = params[0];
                            return params.name + ' : ￥' + params.value[1];
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
                        type: 'time',
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
                        type: 'line',
                        smooth: true,
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#fff'
                            }
                        },
                        label: {
                            normal: {
                                show: false
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
                        },
                        data: data
                    }]
                };
                // 基于准备好的dom，初始化echarts实例
                this.myChart = echarts.init(document.getElementById('myChart'));
                this.myChart.setOption(option);
            },
            draw() {
                // 绘制图表
                this.myChart.setOption({
                    series: [{
                        name: '销量',
                        type: 'line',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },
            getData() {
                this.$http.post(this.$api.lme).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data;
                        this.isLoad = true;
                    }
                })
            }
        },
        created() {
            this.getData();
        },
        watch: {
            isLoad(val) {
                if (val)
                    this.chartInit();
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../assets/base.less';
    .tit {
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        padding: 0 27px;
        font-weight: bold;
        border-bottom: @b_d1;
    }
    
    #myChart {
        width: 100%;
        height: 420px;
    }
</style>

