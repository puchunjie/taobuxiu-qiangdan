<template>
    <div class="result-contnet">
        <i class="resicon iconfont" :class="isSuccess ? 'icon-check-circle' : 'icon-close-circle'"></i>
        <h3>充值{{ isSuccess ? '成功' : '失败' }}</h3>
        <p v-if="isSuccess" class="tip">本页面将在 <span>3</span>秒钟后自动关闭，请前往<a>资产明细</a>进行查看</p>
        <p v-else class="tip">本页面将在 <span>3</span>秒钟后自动关闭，请联系客服进行充值。</p>
        <div class="account">
            <p><label>账户名称：</label>{{ user ? user.companyName : '' }}</p>
            <p><label>用户名：</label>{{ base.mobile }}</p>
            <p><label>流水号：</label>{{ data.id }}</p>
            <p><label>充值金额：</label><span>&yen;{{ data.money }}</span></p>
        </div>

        <router-link tag="div" class="show-history" :to="{}">查看充值记录</router-link>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        props: {
            data: {
                type: Object,
                default: function(){
                    return {}
                }
            }
        },
        data() {
            return {
                isSuccess: false
            }
        },
        computed: {
            ...mapGetters(['user', 'base'])
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../../assets/base.less');
    .result-contnet {
        width: 100%;
        height: auto;
        padding-bottom: 16px;
        text-align: center;
        background-color: #fff;
        overflow: hidden;
        .resicon {
            display: inline-block;
            font-size: 72px;
            margin: 80px 0 16px;
            &.icon-close-circle{
                color: @dark_red;
            }
            &.icon-check-circle{
                color: @dark_green;
            }
        }
        h3 {
            font-size: 24px;
            color: @f_dark;
            line-height: 31px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .tip{
            font-size: 14px;
            color: @f_ligth;
            span{
                color: @dark_red;
            }
        }
        .account {
            width: 440px;
            background: rgba(247, 247, 247, 1);
            padding: 40px;
            margin: 50px auto 16px;
            text-align: left;
            font-size: 14px;
            color: @f_ligth;
            p {
                line-height: 20px;
                &:not(:first-child) {
                    margin-top: 16px;
                }
                label {
                    display: inline-block;
                    width: 70px;
                    text-align: right;
                }
                span {
                    font-weight: bold;
                    font-size: 20px;
                }
            }
        }

        .show-history{
            width: 100px;
            text-align: center;
            color: @dark_blue;
            cursor: pointer;
            margin: 16px auto 40px;
        }
    }
</style>
