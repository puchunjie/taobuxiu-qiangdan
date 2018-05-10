<template>
    <div class="offer-group">
        <span v-show="showNew" class="iconfont icon-ziyuan1"></span>
        <div class="list-row" v-if="item.offerStatus != 4">
            <div class="item date">{{ item.createTime | dateformat('hh:mm') }}</div>
            <div class="item price">&yen;{{ item.offerPerPrice }}/{{ item.baseUnit }}</div>
            <div class="item tolerance">{{ item.tolerance | emptyHlod }}</div>
            <div class="item proPlaces">{{ item.offerPlaces }}</div>
            <!-- <div class="item totlePrice">&yen;{{ item.offerPrice }}</div> -->
            <div class="item remark">
                <Poptip placement="bottom" trigger="hover"  style="text-indent:0" :content="item.offerRemark">
                    {{item.offerRemark }}
                </Poptip>
            </div>
        </div>
        <div class="company-info">
            <div class="item space">
                <template v-if="item.offerStatus == 4">
                            {{ item.createTime | dateformat('hh:mm') }}
</template>
            </div>
            <div class="item left name">
                <companyLink :hasShop="item.isHaveShop" :userId="item.user">{{ item.companyName }}</companyLink>
                <merchantLabel :faith="item.isFaithUser == '1'" :guarantee="item.isGuaranteeUser == '1'"></merchantLabel>
                <crown :tip="`总报价：${item.sellAllNum}次,中标：${item.sellGetNum}次`" :level='item.level'></crown>
            </div>
            <div class="item right">
                <span class="iconfont icon-hui" style="color:#FF5555"></span> {{ item.proInfo != '' ? item.proInfo : '暂无优惠信息' }}
            </div>
        </div>
        <div class="company-info">
            <div class="item space"></div>
            <div class="item left">
                <qq :data="{name:item.contact,phone:item.contactNum,qq:item.QQ}"></qq>
            </div>
            <div v-show="item.address != ''" class="item right"><span class="iconfont icon-dingwei" style="color:#FF5555"></span>{{ item.storeHouseName != '' ? `${item.storeHouseName}(${item.storeHousePlace})` : '暂无仓库信息' }}</div>
        </div>
    
        <div class="miss" v-if="item.offerStatus == 4">
            <span class="iconfont icon-cray"></span>没有库存
        </div>
    
<template v-if="isDone">
    <!-- 报价了才会显示按钮 -->
    <a class="get-deal" v-if="item.offerStatus == 1 && buyStatus == 1" @click="bidOffer">选他中标</a>
    
    <a class="has-deal"><span class="iconfont icon-guanggaolanyouhua02"></span>中标</a>
    
    <!-- 报价超过2条才会显示历史 -->
    <div class="show-offer-history" @click="showHistory(item)" v-if="item.offerStatus != 4 && item.ironSell.length > 1">
        {{ item.historyShow ? '收起历史报价' : '展开历史报价' }}
        <span class="iconfont" :class=" item.historyShow ? 'icon-iconjiaobiaoxiangshang':'icon-iconjiaobiaoxiangxia'"></span>
    </div>
    <!-- 历史报价 -->
    <div class="offer-history-list" v-show="item.historyShow">
        <div class="offer-item" v-for="(sub,i) in item.ironSell" :key="i">
            <div class="item date">{{ sub.createTime | dateformat('MM-dd hh:mm') }}</div>
            <div class="item time-line">
                <span class="note"></span>
                <span class="line top" v-if="i>0"></span>
                <span class="line bottom" v-if="i < item.ironSell.length - 1"></span>
            </div>
            <div class="item price">&yen;{{ sub.offerPerPrice }}/{{ sub.baseUnit }}</div>
            <div class="item tolerance">{{ sub.tolerance }}</div>
            <div class="item proPlace">{{ sub.offerPlaces }}</div>
            <!-- <div class="item totlePrice">&yen;{{ sub.offerPrice }}</div> -->
            <div class="item remark">{{ sub.offerRemark }}</div>
        </div>
    </div>
    <!-- 历史报价 -->
</template>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    import merchantLabel from '@/components/business/merchantLabel/index.vue'
    import crown from '@/components/basics/crown/index.vue'
    import companyLink from '@/components/business/companyLink/index.vue'
    import qq from '@/components/business/qqContant/index.vue'
    export default {
        props: {
            buyStatus: String,
            item: Object,
            isDone: {
                type: Boolean,
                default: true
            }
        },
        components: {
            crown,
            companyLink,
            merchantLabel,
            qq
        },
        computed: {
            showNew() {
                return this.item.hasNewOffer ? this.item.hasNewOffer == 0 && this.item.offerStatus == 1 : false
            }
        },
        methods: {
            ...mapActions(['getUserCount']),
            //显示历史报价
            showHistory(item) {
                item.historyShow = !item.historyShow;
            },
            // 点击中标
            bidOffer() {
                this.$Modal.confirm({
                    title: '中标确认！',
                    content: '选择此商家后将完成求购，是否继续？',
                    onOk: () => {
                        // this.$emit('on-del', this.item);
                        this.bidAjax();
                    }
                });
            },
            bidAjax() {
                this.$http.post(this.$api.bidOffer, {
                    ironBuyId: this.item.ironBuyId,
                    ironSellId: this.item.ironSellId
                }).then(res => {
                    if (res.code === 1000) {
                        this.getUserCount();
                        this.$Message.success('恭喜您，已成交！');
                        this.$emit('on-bidDone');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .list-row {
        .item {
            float: left;
            height: 100%;
            text-indent: 18px;
            .ellipsis;
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
                .ellipsis;
            }
        }
    }
    
    .offer-group {
        position: relative;
        width: 100%;
        padding-top: 10px;
        padding-bottom: 6px;
        border-bottom: @b_d1;
        .icon-ziyuan1 {
            position: absolute;
            left: 0;
            top: -2px;
            font-size: 30px;
            color: @dark_red;
        }
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
                text-indent: 18px;
                color: @f_goast;
                .iconfont {
                    font-size: 16px;
                }
                &.space {
                    font-size: 14px;
                    color: @f_dark;
                    min-width: 56px;
                    width: 7.28%;
                }
                &.left {
                    min-width: 274px;
                    width: 36.39%;
                }
                &.right {
                    min-width: 410px;
                    width: 37.63%;
                }
                &.name {
                    color: @f_dark;
                }
            }
        }
        .miss {
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
            text-indent: 18px;
        }
        .get-deal {
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
        .has-deal {
            position: absolute;
            display: none;
            right: 16px;
            top: 35px;
            height: 28px;
            line-height: 24px;
            padding: 0 14px;
            color: @dark_red;
            background-color: #fff;
            border: 2px solid @dark_red;
            .borderRadius(2px);
        }
        &.show-zhongbiao .has-deal {
            display: block;
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
                position: relative;
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
    }
</style>


