<template>
    <div class="recharge-container">
        <div class="mian-content">
            <h1 class="title">输入充值金额</h1>
            <i-form :label-width="90">
                <form-item label="账户名称:" class="group-item">
                    {{ user ? user.companyName : '' }}
                </form-item>
                <form-item label="用户名:" class="group-item">
                    {{ base.mobile }}
                </form-item>
                <form-item label="充值金额:" class="group-item">
                    <i-input style="width: 224px" placeholder="请输入" v-model="params.amount" class="form-input"></i-input>
                    <span class="tip"> <i class="iconfont icon-about"></i> 必须为大于10元，小于50000元的整数金额</span>
                </form-item>
            </i-form>
    
            <h1 class="title" style="margin-top:35px">选择充值方式</h1>
    
            <div class="card dark">
                <span class="tit">平台支付</span>
    
                <i class="iconfont icon-alipay" :class="{ 'active': params.payWay == 2 }" @click="params.payWay = 2"></i>
                <i class="iconfont icon-weixinzhifu" :class="{ 'active': params.payWay == 1 }" @click="params.payWay = 1"></i>
    
    
                <a class="go-pay" @click="pay">去付款</a>
            </div>
    
            <div class="card">
                <span class="tit">对公转账</span>
    
                <div class="detail">
                    <p>开户名称：无锡淘不锈电子商务有限公司</p>
                    <p>银行账号：4646663293453825</p>
                    <p>开户银行：中国工商银行无锡长江北路支行</p>
                </div>
            </div>
    
            <div class="card">
                <span class="tit">面对面转账</span>
    
                <div class="detail">
                    <p>无锡公司地址：江苏省无锡市新吴区纺城大道南方不锈钢市场1-107</p>
                    <p>联系电话：021-45556435</p>
                    <p>工作时间：8:30 - 17:30（周一 - 周六）</p>
                    <p>支持现金、银联卡、信用支付</p>
                </div>
            </div>
        </div>
        <div class="footer-tip">
            <h1 class="title">温馨提示</h1>
            <p>1. 充值成功后，余额可能存在延迟现象，一般1到5分钟内到账；<br/> 2. 充值金额输入值必须是不小于10且不大于50000的正整数；<br/> 3. 线上充值只能使用支付宝、微信两种方式充值；<br/> 4. 充值完成后，您可以进入我的资金账户页面查看余额充值情况。</p>
            <p class="more">更多问题，请联系客服，电话号码：029-76558899</p>
        </div>
    </div>
</template>


<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                params: {
                    amount: '',
                    payWay: 2
                }
            }
        },
        computed: {
            ...mapGetters(['user', 'base'])
        },
        methods: {
            pay() {
                this.$http.post(this.$api.rechargeSave, this.params).then(res => {
    
                })
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../../assets/base.less');
    .recharge-container {
        width: 100%;
        padding-bottom: 24px;
    }
    
    .title {
        font-size: 18px;
        font-weight: bold;
        color: @f_dark;
        margin-bottom: 24px;
    }
    
    .mian-content {
        width: 100%;
        height: auto;
        background-color: #fff;
        padding: 32px;
        .tip {
            font-size: 12px;
            color: @dark_yellow;
            .iconfont {
                font-size: 12px;
                color: @dark_yellow;
            }
        }
        .group-item {
            margin-bottom: 10px!important;
        }
        .card {
            position: relative;
            width: 100%;
            height: auto;
            padding: 24px 32px;
            border: @b_d1;
            margin-top: 24px;
            background: rgba(255, 255, 255, 1);
            &.dark {
                border: 0;
                background: rgba(239, 243, 251, 1);
            }
            .tit {
                font-size: 16px;
                color: @f_dark;
                font-weight: bold;
                margin-right: 72px;
            }
            .iconfont {
                font-size: 30px;
                vertical-align: middle;
                margin-right: 48px;
                cursor: pointer;
                color: @f_ligth;
            }
            .icon-alipay.active {
                color: #25ABEE;
            }
            .icon-weixinzhifu.active {
                color: #12CC0D;
            }
            .go-pay {
                position: absolute;
                display: block;
                width: 96px;
                height: 40px;
                background-color: @dark_blue;
                color: #fff;
                font-size: 16px;
                text-align: center;
                line-height: 40px;
                right: 32px;
                top: 24px;
                cursor: pointer;
            }
            .detail {
                display: inline-block;
                vertical-align: middle;
                p {
                    line-height: 20px;
                    color: @f_ligth;
                    &:not(:first-child) {
                        margin-top: 8px;
                    }
                }
            }
        }
    }
    
    .footer-tip {
        width: 100%;
        height: auto;
        padding: 24px;
        background-color: #fff;
        margin-top: 24px;
        p {
            line-height: 22px;
            color: @f_ligth;
        }

        .more{
            margin-top: 10px;
            text-indent: 20px;
        }
    }
</style>