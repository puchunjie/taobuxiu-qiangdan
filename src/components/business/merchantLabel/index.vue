<template>
    <div class="merchant-container">
        <span v-show="faith" data-msg="企业信用程度高、经营管理水平优，社会反响、品牌、信誉度高。" class="iconfont icon-cheng"></span>
        <span v-show="guarantee" data-msg="企业资金实力强，需方验收货物后淘不锈与供方结算。依据淘不锈平台担保商户入驻条款评选得出。" class="iconfont icon-bao"></span>
    </div>
</template>

<script>
    export default {
        props: {
            faith: {
                type: Boolean,
                default: false
            },
            guarantee: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .merchant-container {
        display: inline;
        .iconfont {
            position: relative;
        }
        .icon-bao {
            color: #C16BD6
        }
        .icon-cheng {
            color: #F5A623
        }
        .iconfont:hover:after {
            content: attr(data-msg);
            position: absolute;
            top: 20px;
            left: 0;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            text-indent: 0;
            padding: 0 10px;
            background-color: rgba(70, 76, 91, .9);
            white-space: nowrap;
            z-index: 10;
            .borderRadius;
        }
    }
</style>

