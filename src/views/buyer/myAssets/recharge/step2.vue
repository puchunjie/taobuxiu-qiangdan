<template>
    <div class="main-content">
        <h3 class="tip">待支付<span style="font-size: 18px">&yen;{{ data.money }}</span>,请及时扫码支付，下图二维码将在<span>29分54秒</span>后失效</h3>
        <div class="pay-way"><i class="iconfont" :class="data.payWay == 1 ? 'icon-weixinzhifu' : 'icon-alipay'"></i></div>
        <div id="qrcode" class="qr-code"></div>
        <div class="f-tip">
            <i class="iconfont icon-ziyuan2"></i>
            <p>请使用{{ data.payWay == 1 ? '微信' : '支付宝' }}扫一扫 <br/>扫描二维码支付</p>
        </div>
        <div class="back" @click="back"> <i class="iconfont icon-left"></i> 选择其他支付方式</div>
    </div>
</template>


<script>
    import QRCode from 'qrcodejs2'
    export default {
        props: {
            data: {
                type: Object,
                default: function(){
                    return {}
                }
            }
        },
        methods: {
            qrcode() {
                let qrcode = new QRCode('qrcode', {
                    width: 278,
                    height: 278,
                    text: this.data.url
                })
                console.log(qrcode)
            },
            back(){
                this.$parent.step = 1;
            }
        },
        mounted() {
            this.qrcode();
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../../assets/base.less');
    .main-content {
        width: 100%;
        height: auto;
        padding-bottom: 16px;
        text-align: center;
        background-color: #fff;
        overflow: hidden;
        .qr-code {
            display: inline-block;
        }
        .tip {
            font-size: 16px;
            margin-top: 40px;
            span {
                color: @dark_red;
                font-weight: bold;
            }
        }
        .pay-way {
            margin-top: 65px;
            .iconfont {
                font-size: 30px;
            }
            .icon-alipay {
                color: #25ABEE;
            }
            .icon-weixinzhifu {
                color: #12CC0D;
            }
        }
        .qr-code {
            margin-top: 25px;
            width: 300px;
            height: 300px;
            padding: 11px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(217, 217, 217, 1);
        }
        .f-tip {
            width: 150px;
            margin: 16px auto 82px;
            .iconfont {
                font-size: 32px;
                color: @dark_red;
            }
            p {
                width: 110px;
                display: inline-block;
                font-size: 12px;
                color: @f_ligth;
                text-align: left;
                line-height: 16px;
            }
        }
        .back {
            width: 180px;
            margin: 0 auto;
            cursor: pointer;
            color: @dark_blue;
            font-size: 16px;
        }
    }
</style>

