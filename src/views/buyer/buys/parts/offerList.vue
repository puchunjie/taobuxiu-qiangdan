<template>
    <div class="offer-list">
        <div class="tit">报价列表
            <div class="time"><slot></slot></div>
        </div>
        <div class="list-row list-head">
            <div class="item date">时间</div>
            <div class="item price">单价</div>
            <div class="item tolerance">公差</div>
            <div class="item proPlaces">产地</div>
            <!-- <div class="item totlePrice">总价</div> -->
            <div class="item remark">备注</div>
            <div class="item action"></div>
        </div>
        <div class="offers-scorll-warp">
            <p v-if="list.length == 0" class="no-data">暂无报价，请耐心等待。</p>
            <offerItem :buyStatus="buyStatus" :class="{'show-zhongbiao':buyStatus == 2 && index == 0}" v-for="(item,index) in list" :key="index" :item="item" @on-bidDone="spread"></offerItem>
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
            offerList: Object
        },
        data() {
            return {
                list: []
            }
        },
        methods: {
            init() {
                let clearOffer = this.$clearData(this.offerList);
                let list = [...clearOffer.validSell,...clearOffer.missSell];
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
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: @f_dark;
            border-bottom: @b_d1;
            .p20;

            .time{
                position: absolute;
                right: 15px;
                top: 0;
            }
        }
        .offers-scorll-warp {
            width: 100%;
            height: 520px;
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
                text-indent: 18px;
                &.date {
                    min-width: 56px;
                    width: 7.28%;
                }
                &.price {
                    min-width: 93px;
                    width: 12.13%;
                }
                &.tolerance {
                    min-width: 93px;
                    width: 12.13%;
                }
                &.proPlaces {
                    min-width: 93px;
                    width: 12.13%;
                }
                &.remark {
                    min-width: 287px;
                    width: 37.33%;
                }
                &.action {
                    min-width: 138px;
                    width: 18%;
                }
            }
        }
    }
</style>