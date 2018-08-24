<template>
    <div class="mian-content">
        <h1 class="title">输入充值金额</h1>
        <i-form ref="form" :label-width="90" :model="params" :rules="rules">
            <form-item label="账户名称:" class="group-item">
                {{ user ? user.companyName : '' }}
            </form-item>
            <form-item label="用户名:" class="group-item">
                {{ base.mobile }}
            </form-item>
            <form-item label="充值金额:" class="group-item" prop="amount">
                <i-input style="width: 224px" placeholder="请输入" v-model="params.amount" class="form-input"></i-input>
                <span class="tip"> <i class="iconfont icon-about"></i> 必须是不小于0.01元，且50000元以内的金额</span>
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
                <p>银行账号：1103057409000097730</p>
                <p>开户银行：中国工商银行股份有限公司无锡工博园支行</p>
            </div>
        </div>
    
        <div class="card">
            <span class="tit">面对面转账</span>
    
            <div class="detail">
                <p>无锡公司地址：江苏省无锡市新吴区纺城大道南方不锈钢市场1-107</p>
                <p>联系电话：0510-81812186</p>
                <p>工作时间：8:30 - 17:30（周一 - 周六）</p>
                <p>支持现金、微信、支付宝</p>
            </div>
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
                },
                rules: {
                    amount: [{
                            required: true,
                            message: '请输入充值金额',
                            trigger: 'blur'
                        },
                        {
                            validator: function(rule, value, callback) {
                                if (isNaN(value)) {
                                    return callback(new Error('请输入数字'));
                                } else if(+value < 0.01 || +value >50000){
                                    return callback(new Error('超出充值范围'));
                                }else {
                                    callback();
                                }
                            }
                        }
                    ]
                }
            }
        },
        computed: {
            ...mapGetters(['user', 'base'])
        },
        methods: {
            pay() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$http.post(this.$api.rechargeSave, this.params).then(res => {
                            if (res.code == 1000) {
                                this.$emit('on-pay', {
                                    url: res.data.qrcode,
                                    id: res.data.id,
                                    payWay: this.params.payWay,
                                    money: this.params.amount
                                })
                            }
                        })
                    } else {
                        this.$Message.error('请填写真确的金额！');
                    }
                })
    
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../../assets/base.less');
    .mian-content {
        width: 100%;
        height: auto;
        background-color: #fff;
        padding: 32px;
        .title {
            font-size: 18px;
            font-weight: bold;
            color: @f_dark;
            margin-bottom: 24px;
        }
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
</style>
