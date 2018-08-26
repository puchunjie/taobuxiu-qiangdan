<template>
    <div class="inner-container auction-detail">
        <div class="links">
            <router-link tag="span" :to="{ name: 'index' }">首页</router-link>>
            <router-link tag="span" :to="{ name: 'auction' }">拍卖中心</router-link>> 拍卖详情
        </div>
    
        <div class="top-part clearfix">
            <offerRecord ref="offerRecord" :id="id" :isDeposit="isDeposit" :isOffer="isOffer" :status="auction.status"></offerRecord>
            <detailBase :data="auction" :info="auctionInfo"></detailBase>
            <auctioning :systemTime="systemTime" :base="auction" :data="auctionInfo" :isDeposit="isDeposit"></auctioning>
            <div class="collection-share">
                <div class="item" @click="collectAuction" :class="{ 'collected': isStoreUp }">
                    <i class="iconfont " :class="isStoreUp ? 'icon-icon-heart-heart' : 'icon-heart-o'"></i> 收藏拍卖
                </div>
                <div class="item" @click="share = true">
                    <i class="iconfont icon-fenxiang"></i> 分享链接
                </div>
            </div>
        </div>
        <process></process>
    
        <div class="details-container">
            <div class="tabs">
                <div v-show="auction.pack" class="item" :class="{ 'active': tabValue == 'pack' }" @click="tabValue = 'pack'">打包详情</div>
                <div class="item" :class="{ 'active': tabValue == 'introduce' }" @click="tabValue = 'introduce'">标的物介绍</div>
                <div class="item" :class="{ 'active': tabValue == 'notes' }" @click="tabValue = 'notes'">竞买须知</div>
                <div class="item" :class="{ 'active': tabValue == 'record' }" @click="tabValue = 'record'">出价记录（{{ $refs.offerRecord ? $refs.offerRecord.totalCount : 0 }}）</div>
                <div class="item" :class="{ 'active': tabValue == 'bond' }" @click="tabValue = 'bond'">保证金须知</div>
            </div>
            <div class="content">
                <component :is="tabValue" :ref="tabValue"></component>
            </div>
        </div>
    
    
        <!-- 缴纳保证金 -->
        <Modal title="缴纳保证金" :width="520" v-model="payDeposit" class-name="pay-deposit">
            <Spin fix v-show="payLoading">
                <!-- <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon> -->
                <div>Loading</div>
            </Spin>
            <div class="auction-bar" :class="{ 'success': hasMoney }" style="margin-top:0">
                <template v-if="hasMoney">
                    <i class="iconfont icon-check-circle"></i> 
                    恭喜！当前账户余额 {{ account.account | toMoney }}，可以缴纳本场竞拍保证金。
                </template>

                <template v-else>
                    <i class="iconfont icon-exclamation-circle"></i>
                    余额不足！当前账户余额 {{ account.account | toMoney }}，无法缴纳本场保证金。
                </template>
            </div>
            <div class="pay-deposit-content">
                <h3>竞拍保证金</h3>
                <h2>¥{{ auctionInfo.maigin | toMoney }}</h2>
                <p><label>拍卖场次编号：</label>{{ auctionInfo.auctionId }}</p>
                <p><label>起拍价：</label>¥{{ auction.startPrice | toMoney }}</p>
                <p><label>当前价：</label>¥{{  auctionInfo.currentPrice | toMoney }}</p>
                <p><label>保留价：</label>{{ auction.hasReservePrice ? '有' : '无' }}</p>
            </div>
            <div class="pay-deposit-tip">
                <p>保证金缴纳后，将处于冻结状态，无法使用。</p>
                <p style="margin-top:8px;">如果中拍，保证金将自动转为货款；如果未中拍，所冻结的保证金自动退回账户余额。</p>
            </div>
            <div slot="footer">
                <a class="btn" @click="payDeposit = !payDeposit">取消</a>
                <a class="btn primary" v-show="hasMoney" @click="doDeposit">缴纳保证金</a>
                <router-link :to="{name:'Recharge',query: {step: 1}}" class="btn primary" v-show="!hasMoney">去充值</router-link>
            </div>
        </Modal>

        <Modal v-model="share" footer-hide class="share">
            <share :config="shareConfig"></share>
        </Modal>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import pack from './parts/pack.vue'
    import introduce from './parts/introduce.vue'
    import notes from './parts/notes.vue'
    import record from './parts/record.vue'
    import bond from './parts/bond.vue'
    import process from './parts/process.vue'
    import detailBase from './parts/detalBase.vue'
    import auctioning from './parts/auctioning.vue'
    import offerRecord from './parts/offerRecord.vue'
    import pushAsync from '@/utils/pushAsync.js'
    export default {
        mixins: [pushAsync],
        components: {
            process,
            detailBase,
            auctioning,
            offerRecord,
            pack,
            introduce,
            notes,
            record,
            bond
        },
        data() {
            return {
                auction: {
                    auctionLob:{
                        packMessage: "<p>安达市大所大所大多</p>",
                        introduction: "",
                        priceNotice: "",
                        moneyNotice: ""
                    }
                },
                auctionInfo: {},
                isDeposit: false, //是否需要支付保证金
                isOffer: false, //是否出过价
                isStoreUp: false, //是否收藏
                hasPrice: false,//拍卖是否有过报价
                payDeposit: false,
                payLoading: false,
                systemTime: '',
                tabValue: 'pack',
                share: false, //是否显示分享
                shareConfig: {
                    
                }
            }
        },
        computed: {
            ...mapGetters(['account']),
            id() {
                return this.$route.params.id
            },
            hasMoney() {
                return this.account.account >= this.auctionInfo.maigin
    
            }
        },
        methods: {
            ...mapActions(['getAccount']),
            getDetail() {
                this.$http.post(this.$api.findAuction, {
                    auctionInfoId: this.id
                }).then(res => {
                    if (res.code === 1000) {
                        this.auction = res.data.auction;
                        this.auctionInfo = res.data.auctionInfo;
                        this.isDeposit = res.data.isDeposit;
                        this.isOffer = res.data.isOffer;
                        this.hasPrice = res.data.hasPrice;
                        this.isStoreUp = res.data.isStoreUp;
                        this.systemTime = res.data.systemTime;
                        this.tabValue = res.data.auction.pack ? 'pack' : 'introduce';
                    }
                })
            },
            // 缴纳保证金
            doDeposit() {
                this.$Modal.confirm({
                    title: '缴纳确认',
                    content: '是否确认缴纳保证金？',
                    okText: '立即缴纳',
                    cancelText: '我再想想',
                    onOk: () => {
                        this.$Modal.remove();
                        this.payLoading = true;
                        this.$http.post(this.$api.doDeposit, {
                            auctionInfoId: this.id
                        }).then(res => {
                            if (res.code === 1000) {
                                this.payDeposit = false;
                                this.$Message.success('缴纳成功');
                                this.getDetail();
                            } else {
                                this.$Message.error(res.message);
                            }
                            this.payLoading = false;
                        })
                    }
                })
            },
            // 收藏拍卖
            collectAuction() {
                this.$http.post(this.$api.storeUp, {
                    auctionInfoId: this.id
                }).then(res => {
                    if (res.code === 1000) {
                        this.$Message.success(this.isStoreUp ? '取消收藏' : '收藏成功');
                        this.isStoreUp = !this.isStoreUp;
                    } else {
                        this.$Message.error(res.message)
                    }
                })
            },
            init(res) {
                let willDo = res.data ? this.id == res.data.auctionInfoId : res
                // 对比下推送过来的信息是否是当前正在查看的拍卖信息，对比id
                if (willDo) {
                    this.$refs.offerRecord.getList();
                    this.getDetail();

                    //如果正好选在出价列表上，则更新
                    if(this.tabValue == 'record'){
                        this.$refs.record.updateSinge()
                    }
                }
                this.getAccount();
            }
        },
        created() {
            this.getDetail();
            this.getAccount();
        }
    }
</script>

<style lang="less">
    @import url('../../assets/base.less');
    @import url('./parts/auctionBar.less');
    .auction-detail {
        margin-top: 24px;
        font-size: 14px;
        .links {
            color: @f_ligth;
            font-size: 12px;
            span {
                cursor: pointer;
                &:hover {
                    color: @dark_blue;
                }
            }
        }
        .top-part {
            width: 100%;
            &>div {
                float: left;
            }
        }
        .collection-share {
            .flex-block;
            width: 312px;
            height: 56px;
            line-height: 40px;
            background-color: #fff;
            float: right!important;
            margin-top: 16px;
            color: @f_ligth;
            padding: 8px 0;
            font-size: 14px;
            .item {
                width: 50%;
                text-align: center;
                cursor: pointer;
                &:not(:last-child) {
                    border-right: 1px solid #E9E9E9;
                }
                .iconfont {
                    font-size: 20px;
                    color: @f_goast;
                    margin-right: 8px;
                    vertical-align: middle;
                }
                &:hover {
                    color: @dark_blue;
                }
                &.collected {
                    .icon-heart-o {
                        color: @f_goast;
                    }
                    .icon-icon-heart-heart{
                        color: @dark_red;
                    }
                }
            }
        }
        .details-container {
            width: 100%;
            min-height: 660px;
            background-color: #fff;
            .tabs {
                .flex-block;
                width: 100%;
                height: 40px;
                border-bottom: @b_d1;
                color: @f_ligth;
                .item {
                    width: auto;
                    padding: 0 20px;
                    height: 100%;
                    line-height: 40px;
                    border-bottom: 2px solid #fff;
                    cursor: pointer;
                    &:hover,
                    &.active {
                        color: @dark_blue;
                        border-color: @dark_blue;
                    }
                }
            }
            .content {
                width: 100%;
                height: 100%;
                padding: 24px;
                color: @f_ligth;
            }
        }
    }
    
    .pay-deposit-content {
        width: 100%;
        text-align: center;
        padding: 24px 0;
        color: @f_ligth;
        font-size: 14px;
        line-height: 20px;
        h2 {
            color: @dark_red;
            font-weight: bold;
            font-size: 32px;
            margin: 8px 0;
            line-height: 42px;
        }
        p {
            width: 100%;
            margin-top: 16px;
            text-align: left;
            label {
                display: inline-block;
                width: 245px;
                text-align: right;
            }
        }
    }
    
    .pay-deposit-tip {
        width: 100%;
        height: 88px;
        padding: 16px;
        border: @b_d1;
        color: @f_ligth;
        font-size: 12px;
        background-color: #F7F7F7;
    }
    
    .pay-deposit {
        .ivu-modal-footer {
            border-top: 0;
        }
        .btn {
            display: inline-block;
            padding: 0 16px;
            height: 32px;
            border: @b_d1;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
            color: @f_ligth;
            margin-left: 10px;
            &.primary {
                background-color: @dark_blue;
                color: #fff;
                border-color: @dark_blue;
            }
        }
    }

    .share .ivu-modal{
        top: 200px!important;
    }
</style>


