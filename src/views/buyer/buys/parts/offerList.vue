<template>
    <div class="offer-list">
        <div class="tit">报价列表</div>
        <div class="list-row list-head">
            <div class="item date">时间</div>
            <div class="item price">单价</div>
            <div class="item tolerance">公差</div>
            <div class="item proPlaces">产地</div>
            <div class="item totlePrice">总价</div>
            <div class="item remark">备注</div>
            <div class="item action"></div>
        </div>
        <div class="offers-scorll-warp">
            <p v-if="list.length == 0" class="no-data">暂无报价，请耐心等待。</p>
            <offerItem :buyStatus="buyStatus" v-for="(item,index) in list" :key="index" :item="item" @on-bidDone="spread"></offerItem>
        </div>
    </div>
</template>


<script>
    import offerItem from './offerItem.vue'
    export default {
        components: {
            offerItem
        },
        props: {
            buyStatus: String,
            offerList: Array
        },
        data() {
            return {
                list: []
            }
        },
        methods: {
            init() {
                let list = this.$clearData(this.offerList);
                list.map(el => {
                    el.historyShow = false;
                });
                this.list = list;
            },
            spread(){
                this.$emit('on-bidDone')
            }
        },
        watch: {
            offerList() {
                this.init();
            }
        },
        created() {
            this.init();
        }
    }
</script>



<style lang="less" scoped>
    @import '../../../../assets/base.less';
    
    .offer-list {
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        border: @b_d1;
        .borderRadius;
        .tit {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: @f_dark;
            border-bottom: @b_d1;
            .p20;
        }
        .offers-scorll-warp {
            width: 100%;
            height: 330px;
            overflow-x: hidden;
        }
        .list-head {
            width: 100%;
            height: 42px;
            line-height: 42px;
            background-color: #eee;
            color: @f_goast;
            border-bottom: @b_d1;
        }
        .list-row {
            .item {
                float: left;
                height: 100%;
                text-indent: 20px;
                &.date {
                    min-width: 60px;
                    width: 7.28%;
                }
                &.price {
                    min-width: 100px;
                    width: 12.13%;
                }
                &.tolerance {
                    min-width: 100px;
                    width: 12.13%;
                }
                &.proPlaces {
                    min-width: 100px;
                    width: 12.13%;
                }
                &.totlePrice {
                    min-width: 100px;
                    width: 12.13%;
                }
                &.remark {
                    min-width: 210px;
                    width: 25.5%;
                }
                &.action {
                    min-width: 153px;
                    width: 18%;
                }
            }
        }
        .offer-group {
            position: relative;
            width: 100%;
            padding-top:10px;
            padding-bottom: 6px;
            border-bottom: @b_d1;
            .list-row {
                height: 30px;
                color: @f_dark;
                .price {
                    color: @dark_red;
                }
            }
            .company-info {
                width: 100%;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                margin-bottom: 8px;
                .item {
                    float: left;
                    height: 100%;
                    text-indent: 20px;
                    color: @f_goast;
                    .iconfont {
                        font-size: 16px;
                    }
                    &.space {
                        font-size: 14px;
                        color: @f_dark;
                        min-width: 60px;
                        width: 7.28%;
                    }
                    &.left {
                        min-width: 300px;
                        width: 36.39%;
                    }
                    &.right {
                        min-width: 410px;
                        width: 37.63%;
                    }
                    &.name {
                        color: @f_dark;
                        .iconfont {
                            position: relative;
                            &:hover:after {
                                content: attr(data-msg);
                                position: absolute;
                                font-size: 12px;
                                line-height: 30px;
                                text-align: center;
                                top: -32px;
                                left: -10px;
                                color: #fff;
                                text-indent: 0;
                                padding: 0 10px;
                                background-color: rgba(70,76,91,.9);
                                white-space:nowrap;
                                .borderRadius;
                            }
                        }
                    }
                }
            }

            .miss{
                position: absolute;
                min-width: 465px;
                width: 50%;
                height: 100%;
                line-height: 68px;
                bottom: 0;
                left: 43.67%;
                background-color: #fff;
                color: #FE5252;
                font-weight: bold;
                text-indent: 20px;
            }

            .get-deal{
                position: absolute;
                display: block;
                right: 16px;
                top: 35px;
                height: 28px;
                line-height: 28px;
                padding: 0 14px;
                color: #fff;
                background-color: @dark_blue;
                .borderRadius(2px);
            }

            .show-offer-history {
                position: absolute;
                height: 20px;
                line-height: 18px;
                background-color: #eee;
                color: @f_goast;
                font-size: 12px;
                padding: 0 5px;
                right: 0;
                top: 78px;
                cursor: pointer;
                .noselect;
            }
            .offer-history-list {
                margin: 14px 0 0 20px;
                padding: 10px 0;
                border-top: 1px dashed #d1d1d1;
                .offer-item {
                    height: 32px;
                    line-height: 32px;
                    color: @f_goast;
                    font-size: 12px;
                    .item {
                        height: 100%;
                        float: left;
                        &.date {
                            text-align: right;
                            min-width: 70px;
                            width: 8.5%;
                        }
                        &.time-line {
                            position: relative;
                            min-width: 46px;
                            text-align: center;
                            .note {
                                display: inline-block;
                                width: 9px;
                                height: 9px;
                                .borderRadius(9px);
                                background-color: @light_blue;
                            }
                            .line {
                                position: absolute;
                                left: 22px;
                                display: block;
                                width: 2px;
                                height: 9px;
                                background-color: @goast_blue;
                                &.top {
                                    top: 0;
                                }
                                &.bottom {
                                    bottom: 0;
                                }
                            }
                        }
                        &.price {
                            min-width: 100px;
                            width: 12.12%;
                        }
                        &.tolerance {
                            min-width: 100px;
                            width: 12.12%;
                        }
                        &.proPlace {
                            min-width: 100px;
                            width: 12.12%;
                        }
                        &.totlePrice {
                            min-width: 100px;
                            width: 12.12%;
                        }
                        &.remark {
                            min-width: 70px;
                        }
                    }
                }
            }
            &.no-plan {}
        }
    }
</style>