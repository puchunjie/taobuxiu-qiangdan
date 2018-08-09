<template>
    <div class="sub-detail-container">
        <div class="top">
            <h3>拍卖保证金</h3>
            <table>
                <tr>
                    <td>交易类型：{{ data.tradeType }}</td>
                    <td>操作时间： {{ data.updateTime | dateformat }}</td>
                    <td>状态</td>
                    <td>冻结金额</td>
                </tr>
                <tr>
                    <td>拍卖场次：{{ data.auctionIndex }}</td>
                    <td>操作人：{{ data.createUser }}</td>
                    <td><span class="bold">{{ data.tradeStatus }}</span></td>
                    <td><span class="bold">&yen;{{ data.lockAccount | toMoney }}</span></td>
                </tr>
            </table>
        </div>
    
        <div class="bottom">
            <h3>历史记录</h3>
    
            <prog>
                <template slot="left">
                    <h2>冻结中</h2>
                    <p>操作人：{{ data.createUser }}</p>
                    <p>拍卖场次：{{ data.auctionIndex }}</p>
                    <p>操作时间：{{ data.updateTime | dateformat }}</p>
                </template>

                <template slot="right">
                    <h2>拍卖成交，抵货款</h2>
                </template>
            </prog>
        </div>
    </div>
</template>

<script>
    import prog from './progress.vue'
    export default {
        props: {
            data: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        components: {
            prog
        },
        methods: {
    
        }
    }
</script>


<style lang="less">
    @import url('../../../../assets/base.less');
    .sub-detail-container {
        width: 100%;
        padding: 0 10px;
        .top {
            width: 100%;
            height: auto;
            h3 {
                font-size: 20px;
                color: @f_dark;
                line-height: 26px;
            }
            table {
                width: 100%;
                margin-top: 10px;
                font-size: 14px;
                color: @f_ligth;
                tr {
                    line-height: 30px;
                }
                .bold {
                    font-weight: bold;
                    font-size: 20px;
                    color: @f_dark;
                }
            }
        }
        .bottom {
            margin-top: 16px;
            h3 {
                font-size: 16px;
                color: @f_dark;
                line-height: 50px;
                border-bottom: @b_d1;
            }
        }
    }
</style>
