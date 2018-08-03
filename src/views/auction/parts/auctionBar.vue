<template>
    <div class="auction-bar" :class="{ 'success': (isLogin && isDeposit) || (isLogin && hasMoney) }">
        <!-- 是否登录 -->
        <span v-if="isLogin">
            <!-- 是否已经缴纳保证金 -->
            <template v-if="isDeposit">
                <i class="iconfont icon-check-circle"></i>已缴纳保证金 ({{ bond | toMoney }}) ,快点击出价参与竞拍吧！
            </template>

            <template v-else>
                <!-- 是否有足够的钱 -->
                <template v-if="hasMoney">
                    <i class="iconfont icon-check-circle"></i>余额{{ account | toMoney }}元，可以参加本场拍卖，请收藏并等待开拍。
                    <a class="btn" v-show="state == 1">收藏</a>
                    <a class="btn" v-show="state == 2">去缴纳</a>
                </template>
                <template v-else>
                    <i class="iconfont icon-exclamation-circle"></i>余额{{ account | toMoney }}元，不足以参加本场保证金。
                    <a class="btn">去充值</a>
                    <a class="btn">收藏</a>
                </template>
            </template>
        </span>
        <span v-else>
            <i class="iconfont icon-exclamation-circle"></i>登录后，方可参与竞价。
            <a class="btn">去登录</a>
        </span>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        props:{
            state: {
                type: [Number,String],
                default: 1
            },
            bond: {
                type: Number,
                default: 0
            },
            isDeposit:{
                type:Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters(['isLogin']),
            hasMoney(){
                return this.account >= this.bond
            }
        },
        data () {
            return {
                // 余额是否充足
                account: 0
            }
        },
        watch: {
            isLogin(val){
                console.log(val)
                if(val)
                    this.getAccount();
            }
        },
        methods: {
            // 获取用户余额
            getAccount(){
                this.$http.post(this.$api.myAccount).then(res => {
                    if(res.code === 1000){
                        this.account = res.data.account;
                    }
                })
            }
        },
        created() {
            if(this.isLogin)
                this.getAccount();   
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .auction-bar {
        position: relative;
        width: 480px;
        height: 40px;
        line-height: 38px;
        background-color: #FFF8E1;
        margin-top: 10px;
        .borderRadius(4px);
        border: 1px solid #FFE082;
        font-size: 14px;
        color: @f_ligth;
        padding: 0 16px;
        &.success{
            background-color: #E8F5E9;
            border-color: #A5D6A7;
        }

        .iconfont{
            vertical-align: middle;
            margin-right: 8px;
        }

        .icon-exclamation-circle{
            color: #FFC107;
        }

        .icon-check-circle{
            color: #A5D6A7;
        }

        .btn{
            float: right;
            color: @dark_blue;
            &:not(:first-child){
                margin-left: 16px;
            }
        }
    }
</style>
