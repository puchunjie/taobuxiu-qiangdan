<template>
    <div class="process-container">
        <span class="tit">竞拍流程：</span>

        <div class="item" v-for="(item,i) in arr" :key="i">
            <i class="iconfont" :class="item.icon"></i>
            {{ item.label }}
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                arr:[
                    {
                        label: '登录系统',
                        icon: 'icon-icon-calendar'
                    },
                    {
                        label: '信息核对',
                        icon: 'icon-icon-calendar'
                    },
                    {
                        label: '冻结保证金',
                        icon: 'icon-icon-calendar'
                    },
                    {
                        label: '出价参与竞拍',
                        icon: 'icon-icon-calendar'
                    },
                    {
                        label: '竞拍成交',
                        icon: 'icon-icon-calendar'
                    },
                    {
                        label: '支付货款',
                        icon: 'icon-icon-calendar'
                    },
                    {
                        label: '发货完成',
                        icon: 'icon-icon-calendar'
                    }
                ]
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .process-container {
        position: relative;
        .flex-block;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        margin: 24px 0;
        padding: 0 16px 0 100px;
        .tit {
            position: absolute;
            left: 16px;
            color: @f_ligth;
        }
        .item{
            position: relative;
            color: @f_goast;
            .iconfont{
                font-size: 20px;
                vertical-align: sub;
                margin-right: 8px;
            }

            &:not(:last-child):after{
                // position: absolute;
                display: inline-block;
                content: '';
                width: 38px;
                height: 2px;
                background-color: #E9E9E9;
                vertical-align: middle;
                margin: 0 23px;
            }
        }
    }
</style>

