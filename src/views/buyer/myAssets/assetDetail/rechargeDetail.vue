<template>
    <div class="top">
        <h3>{{ data.logType }}</h3>
        <table>
            <tr>
                <td>交易类型：{{ data.tradeType }}</td>
                <td>操作时间： {{ data.updateTime | dateformat }}</td>
                <td>状态</td>
                <td>充值金额</td>
            </tr>
            <tr>
                <td>流水号：{{ data.tradeNo }}</td>
                <td>操作人：{{ data.createUser }}</td>
                <td><span class="bold">{{ data.tradeStatus }}</span></td>
                <td><span class="bold">&yen;{{ data.amount | toMoney }}</span></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
        props: {
            data: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../../assets/base.less');
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
</style>
