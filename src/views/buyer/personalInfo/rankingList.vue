<template>
    <div class="ranking-panel">
        <div class="title">合作商排行榜 <span data-msg="对于买家，合作商排行指数即为“近30天以内，平台卖方商户针对此买家发起的求购所提供的有效响应（有效报价+选择放弃报价）的累积次数”" class="iconfont icon-wenhao"></span></div>
        <div class="contnet">
            <div class="item" v-for="(item,i) in list" :key="i">
                <a class="icon" :class="'win'+ i">{{ i + 1 }}</a>
                <h3>{{ item.coopLveve }}</h3>
                <p>{{ item.companyName }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            list: Array
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../assets/base.less';
    .ranking-panel {
        padding-top: 15px;
        background-color: #fff;
        border: @b_d1;
        .borderRadius;
        .title {
            position: relative;
            color: @f_dark;
            padding: 0 15px;
            height: 32px;
            line-height: 32px;
            margin-bottom: 30px;
            font-weight: bold;
            .iconfont {
                position: relative;
                color: @f_ligth;
                cursor: pointer;
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
                    background-color: rgba(70, 76, 91, .9);
                    white-space: nowrap;
                    .borderRadius;
                }
            }
        }
        .contnet {
            width: 100%;
            .item {
                position: relative;
                width: 255px;
                margin: 0 auto 60px;
                padding-left: 70px;
                color: @f_dark;
                h3 {
                    font-size: 24px;
                    margin-bottom: 6px;
                }
                .icon {
                    position: absolute;
                    display: block;
                    left: 0;
                    width: 48px;
                    height: 60px;
                    line-height: 44px;
                    font-size: 36px;
                    text-align: center;
                    color: #fff;
                    &:before {
                        position: absolute;
                        content: ' ';
                        width: 0;
                        height: 0;
                        bottom: 0;
                        left: 0;
                        border-left: 24px solid transparent;
                        border-right: 24px solid transparent;
                        border-bottom: 15px solid #fff;
                    }
                    &.win0 {
                        background-color: @light_red;
                    }
                    &.win1 {
                        background-color: @light_yellow;
                    }
                    &.win2 {
                        background-color: @light_green;
                    }
                }
            }
        }
    }
</style>

