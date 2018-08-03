<template>
    <div class="auction-info">
        <div class="top">
            <div class="state-tag" :class="`st${base.status}`">{{ base.status | auctionSatateStr }}</div>
            <div class="time">
                {{ base.status | stateLabel }}：
                <countDown v-if="base.status < 3" isDetail :color="base.status == 1 ? '#00A854' : '#F5222D'" 
                @time-end="$parent.init(true)"
                :endTime='base.status == 1 ? base.startTime : base.realEndTime'></countDown>
                <span v-else>{{ base.realEndTime | dateformat }}</span>
            </div>
            <div class="number">场次编号：{{ data.auctionId }}</div>
        </div>
        <div class="bottom">    
            <!-- 等待拍卖 -->
            <template v-if="base.status == 1">
                <div class="group-item">
                    <label>起拍价</label> <span class="price">{{ base.startPrice | toMoney }}</span>
                </div>
                <div class="group-item">
                    <label>保证金</label> <span class="price red">{{ data.maigin | toMoney }}</span>
                </div>
            </template>
            <!-- 正在拍卖 -->
            <template v-if="base.status == 2">
                <div class="group-item">
                    <label>当前价</label> <span class="price red">{{ data.currentPrice | toMoney }}</span>
                </div>
                <div class="group-item">
                    <label>出价</label>
                    <payInput :now="data.currentPrice" :min="base.startPrice" :step="base.priceStep" v-model="payMoney"></payInput>
                    <span class="budget">预计总金额: &yen;{{ totalePayMoney | toMoney }}</span>
                </div>
                <div class="group-item">
                    <label></label>
                    <a class="pay" @click="offer">出价</a>
                </div>
            </template>
            <!-- 拍卖结束 成交 -->
            <template v-if="base.status == 3 && data.status == 2">
                <img class="tip-img" src="../../../assets/deal.png" />
                <div class="tip-text">
                    <h3>本单已成交</h3>
                    <p>成交价 <span class="price">{{ data.money | toMoney }}</span></p>
                </div>
            </template>
            <!-- 拍卖结束 流拍 -->
            <template v-if="base.status == 3 && data.status == 3">
                <img class="tip-img" src="../../../assets/racket.png" />
                <span class="tip-text">本单已流拍，未达保留价</span>
            </template>
            <auctionBar :bond="data.maigin" :isDeposit="isDeposit" :state="base.status" v-if="base.status == 1 || base.status == 2"></auctionBar>
            <div class="info">
                <div class="group" style="width:170px">起拍价(元/吨)：¥{{ base.startPrice }}</div>
                <div class="group" style="width:135px">加价幅度：¥{{ base.priceStep }}</div>
                <div class="group" style="width:107px">保证金：¥{{ data.maigin }}</div>
                <div class="group" style="width:170px">场次类型：{{ base.auctionIndex }}</div>
                <div class="group" style="width:135px">出价方式：{{ data.offerWay }}</div>
                <div class="group" style="width:107px">保留价：{{ base.hasReservePrice ? '有' : '无' }}</div>
                <div class="group" style="width:170px">竞拍时间：{{ base.keepTime | formatDuring }}</div>
                <div class="group" style="width:135px">延时周期：{{ base.timeStep | toMin }}分钟/次</div>

                <p class="sevice">
                    <span>服务支持：</span>
                    <span class="item">
                        <i class="iconfont icon-duigou1"></i>现场质检
                    </span>
                    <span class="item">
                        <i class="iconfont icon-duigou1"></i>担保交易
                    </span>
                    <span class="item">
                        <i class="iconfont icon-duigou1"></i>证书认证
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import countDown from './countDown.vue'
    import auctionBar from './auctionBar.vue'
    import payInput from './payInput.vue'
    
    export default {
        components: {
            countDown,
            auctionBar,
            payInput
        },
        props: {
            base: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            data: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            isDeposit:{
                type:Boolean,
                default: false
            }
        },
        data() {
            return {
                payMoney: ''
            }
        },
        computed: {
            ...mapGetters(['isLogin']),
          totalePayMoney(){
              return +this.payMoney * this.data.weight/1000
          }  
        },
        filters: {
            stateLabel(value) {
                switch (Number(value)) {
                    case 1:
                        return '距离开始'
                        break;
                    case 2:
                        return '距离结束'
                        break;
                    case 3:
                        return '结束时间'
                        break;
                    default:
                        break;
                }
            },
            toMin(val){
                return val/60000
            }
        },
        methods: {
            // 出价
            offer(){
                if(!this.isLogin){
                    this.$Modal.confirm({
                        title:'登录提示',
                        content: '您还未登录，是否前往登录？',
                        okText: '去登录',
                        onOk: () => {
                            this.$router.replace({
                                path: '/login',
                                query: { redirect: this.$route.fullPath }
                            })
                        }
                    })
                    return 
                }

                if(this.payMoney == ''){
                    this.$Message.warning('请填写您的出价！');
                    return 
                }else if(this.payMoney <= this.base.currentPrice){
                    this.$Message.warning('您的出价必须高于当前价！');
                    return 
                }

                if(!this.isDeposit){
                    this.$Modal.confirm({
                        title:'保证金提示',
                        content: '您还未缴纳保证金，是否立即缴纳？',
                        okText: '立即缴纳',
                        onOk: () => {
                            this.$Modal.remove();
                            this.$parent.payDeposit = true;
                        }
                    })
                    return 
                }

                //获取是否设置过跳过提示
                let skipHints = this.$ls.get('skipHints');
                if(skipHints){
                    this.offerAjax();
                }else{
                    this.$Modal.confirm({
                        title: '缴纳确认',
                        content: '是否确认缴纳保证金？',
                        okText: '立即缴纳',
                        cancelText: '我再想想',
                        loading: true,
                        onOk: () => {
                            // this.$Modal.remove();
                            this.offerAjax();
                        }
                    })
                }
            },
            offerAjax(){
                this.$http.post(this.$api.offerAuction,{
                    auctionInfoId: this.$route.params.id,
                    price: this.payMoney
                }).then(res => {
                    this.$Modal.remove();
                    if(res.code === 1000){
                        this.$Message.success('出价成功');
                        this.$parent.auctionInfo.currentPrice = this.payMoney;
                    }else{
                        this.$Message.success(res.message);
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .auction-info {
        width: 984px;
        height: 276px;
        background-color: #fff;
        margin-top: 16px;
        .top {
            position: relative;
            .flex-block;
            width: 100%;
            height: 48px;
            line-height: 48px;
            border-bottom: @b_d1;
            .state-tag {
                width: 88px;
                height: 100%;
                color: #fff;
                text-align: center;
                &.st1 {
                    background-color: #00A854;
                }
                &.st2 {
                    background-color: #F5222D;
                }
                &.st3 {
                    background-color: #CCCCCC;
                }
            }
            .time {
                font-size: 12px;
                color: @f_ligth;
                padding-left: 12px;
            }
            .number {
                position: absolute;
                right: 16px;
                color: @f_goast;
                font-size: 12px;
            }
        }
        .bottom {
            position: relative;
            width: 100%;
            padding: 40px 465px 24px 24px;
            height: 227px;
            .group-item{
                width: 100%;
                // height: 40px;
                color: @f_goast;
                margin-bottom: 8px;
                label{
                    display: inline-block;
                    width: 42px;
                    font-size: 12px;
                    margin-right: 10px;
                }
                .price{
                    display: inline-block;
                    font-size: 24px;
                    font-weight: bold;
                    color: @f_goast;
                    vertical-align: middle;
                    &.red{
                        color: @dark_red;
                    }
                }
                .pay{
                    display: inline-block;
                    width: 88px;
                    height: 40px;
                    line-height: 38px;
                    border: @b_d1;
                    color: #ccc;
                    font-size: 16px;
                    text-align: center;
                    background-color: #F7F7F7;
                    &:hover{
                        color: @dark_red;
                        border-color: @dark_red;
                        background-color: #fff;
                    }
                }
                .budget{
                    display: inline-block;
                    vertical-align: bottom;
                    font-size: 12px;
                    color: @f_goast;
                    margin-left: 10px;
                }
            }

            .tip-img{
                width: 89px;
                margin: 32px 32px 0 44px;
                display: inline-block;
                vertical-align: middle;
            }

            .tip-text{
                display: inline-block;
                margin-top: 32px;
                vertical-align: middle;
                h3{
                    line-height: 24px;
                    color: #404040;
                    font-size: 18px;
                }
                p{
                    margin-top: 10px;
                    line-height: 20px;
                    font-size: 14px;
                    color: @f_goast;
                    .price{
                        color: @dark_red;
                        font-weight: bold;
                        font-size: 24px;
                    }
                }
            }

            .info {
                position: absolute;
                .flex-block;
                .flex-wrap(wrap);
                .align-content(flex-start);
                width: 465px;
                height: 130px;
                right: 0;
                top: 40px;
                border-left: @b_d1;
                padding-left: 30px;
                font-size: 12px;
                color: @f_goast;
                .group {
                    height: 16px;
                    line-height: 16px;
                    margin-top: 8px;
                }
                .sevice{
                    width: 100%;
                    margin-top: 35px;
                    .tit{
                        color: @f_ligth;
                        margin-right: 10px;
                    }
                    .item{
                        color:#FFC107;
                        font-weight: bold;
                        margin-right: 20px;
                    }
                }
            }
        }
    }
</style>


