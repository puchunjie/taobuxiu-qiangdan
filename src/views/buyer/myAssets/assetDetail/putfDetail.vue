<template>
    <div class="sub-detail-container">
        <div class="top">
            <h3>{{ data.logType }}</h3>
            <table>
                <tr>
                    <td>交易类型：{{ data.tradeType }}</td>
                    <td>操作时间： {{ data.updateTime | dateformat }}</td>
                    <td>状态</td>
                    <td>提现金额</td>
                </tr>
                <tr>
                    <td>提现编号：{{ data.withDrawId }}</td>
                    <td>操作人：{{ data.createUser }}</td>
                    <td><span class="bold">{{ data.tradeStatus }}</span></td>
                    <td><span class="bold">&yen;{{ data.lockAccount | toMoney }}</span></td>
                </tr>
                <tr>
                    <td colspan="4">备注：{{ data.remark }}</td>
                </tr>
            </table>

            <div class="account-info">
                <div class="head">账户信息</div>
                <div class="content">
                    <div class="group">
                        账户性质：{{ data.bankCardType == 1 ? '对公' : '个人' }}
                    </div>
                    <div class="group">
                        账户种类：{{ data.accountType | atStr }}
                    </div><br/>
                    <div class="group">
                        公司抬头：{{ data.toAccountName }}
                    </div>
                    <div class="group">
                        开户行：{{ data.toBank }}
                    </div>
                    <div class="group">
                        账号：{{ data.toBankCardNo }}
                    </div>
                </div>
            </div>
        </div>
    
        <div class="bottom">
            <h3>历史记录</h3>
    
            <prog :isDone="data.tradeSt != 0">
                <template slot="left">
                    <h2>申请提现</h2>
                    <p>操作人：{{ data.createUser }}</p>
                    <p>提现编号：{{ data.withDrawId }}</p>
                    <p>操作时间：{{ data.createTime | dateformat }}</p>
                </template>

                <template slot="right">
                    <template v-if="data.tradeSt == 1">
                        <h2>提现成功</h2>
                        <p>操作人：{{ data.createUser }}</p>
                        <p>提现编号：{{ data.withDrawId }}</p>
                        <p>操作时间：{{ data.updateTime | dateformat }}</p>
                    </template>
                    <template v-if="data.tradeSt == 2">
                        <h2>提现失败</h2>
                        <p>操作人：{{ data.createUser }}</p>
                        <p>提现编号：{{ data.withDrawId }}</p>
                        <p>操作时间：{{ data.updateTime | dateformat }}</p>
                    </template>
                    <template v-if="data.tradeSt == 8">
                        <h2>提现撤回</h2>
                        <p>操作人：{{ data.createUser }}</p>
                        <p>提现编号：{{ data.withDrawId }}</p>
                        <p>操作时间：{{ data.updateTime | dateformat }}</p>
                    </template>
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
        filters: {
            atStr(value){
                switch (Number(value)) {
                    case 1:
                        return '基本账户'    
                        break;
                    case 2:
                        return '一般账户'    
                        break;
                    case 3:
                        return '专用账户'    
                        break;
                    case 4:
                        return '临时账户'    
                        break;
                    default:
                        break;
                }
            }
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

            .account-info{
                width: 100%;
                border: @b_d1;
                font-size: 14px;
                color: @f_dark;
                .head{
                    width: 100%;
                    height: 48px;
                    background-color: #F7F7F7;
                    line-height: 47px;
                    border-bottom: @b_d1;
                    padding: 0 24px;
                    font-weight: bold;
                }
                .content{
                    width: 100%;
                    padding: 0 24px 16px;
                    .group{
                        display: inline-block;
                        width: 350px;
                        margin-top: 16px;
                        line-height: 20px;
                    }
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
