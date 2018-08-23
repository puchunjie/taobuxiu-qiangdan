<template>
    <div class="recharge-container">
        <step1 v-show="step == 1" @on-pay="onPay"></step1>
        <step2 v-if="step == 2" :data="qrData"></step2>
        <step3 ref="step3" v-show="step == 3" :data="qrData"></step3>
        <div class="footer-tip">
            <h1 class="title">温馨提示</h1>
            <p>1. 充值成功后，余额可能存在延迟现象，一般1到5分钟内到账；<br/> 2. 充值金额输入值必须是不小于0.01且不大于50000的金额；<br/> 3. 线上充值只能使用支付宝、微信两种方式充值；<br/> 4. 充值完成后，您可以进入我的资金账户页面查看余额充值情况。</p>
            <p class="more">更多问题，请联系客服，电话号码：0510-81812186</p>
        </div>
    </div>
</template>


<script>
    import {
        mapGetters
    } from 'vuex'
    import debounce from 'lodash/debounce'
    import step1 from './step1.vue'
    import step2 from './step2.vue'
    import step3 from './step3.vue'
    export default {
        components: {
            step1,
            step2,
            step3
        },
        data() {
            return {
                step: 1,
                qrData: {
                    url: '',
                    id: '',
                    payWay: '',
                    money: ''
                }
            }
        },
        computed: {
            ...mapGetters(['pushData']),
        },
        watch: {
            pushData: debounce(function(val) {
                console.log(val)
                console.log(val.code)
                console.log(this.qrData.id == val.data.id)
                if (val.code == 60 && this.qrData.id == val.data.id) {
                    this.step = 3;
                    this.$refs.step3.isSuccess = true;
                }
            }, 500)
        },
        methods: {
            onPay(data) {
                this.step = 2;
                this.$route.query.step = this.step;
                this.qrData = data;
            }
        },
        created() {
            this.step = this.$route.query.step;
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../../assets/base.less');
    .recharge-container {
        width: 100%;
        padding-bottom: 24px;
        .footer-tip {
            width: 100%;
            height: auto;
            padding: 24px;
            background-color: #fff;
            margin-top: 24px;
            .title {
                font-size: 18px;
                font-weight: bold;
                color: @f_dark;
                margin-bottom: 24px;
            }
            p {
                line-height: 22px;
                color: @f_ligth;
            }
            .more {
                margin-top: 10px;
                text-indent: 20px;
            }
        }
    }
</style>