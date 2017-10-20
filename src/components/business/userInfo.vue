<template>
    <div class="user-info">
        <h3 class="name">{{ user.companyName }}</h3>
        <p><crown tit="求购活跃度：" :level='level'></crown></p>
        <p>
            <span class="iconfont icon-user"></span>{{ user.contact }}
            <span class="iconfont icon-phone"></span>{{ user.contactNum }}
            <span class="iconfont icon-qq"></span>{{ user.qq }}
        </p>
        <router-link class="btn" :to="{name:'userInfo'}">修改资料</router-link>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import crown from '@/components/basics/crown/index.vue'
    export default {
        props:{
            level:{
                type:String,
                default:'1-1'
            }
        },
        components: {
            crown
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>



<style lang="less" scoped>
    @import '../../assets/base.less';
    .user-info {
        position: relative;
        width: 100%;
        background-color: #fff;
        padding: 20px;
        margin-bottom: 15px;
        border: @b_d1;
        .borderRadius;
        .name {
            font-size: 20px;
            font-weight: bold;
            color: @f_dark;
        }
        p {
            margin-top: 10px;
            line-height: 20px;
            color: @f_goast;
            .iconfont {
                margin-right: 10px;
                &+.iconfont {
                    margin-left: 80px;
                }
            }
        }
        .btn {
            position: absolute;
            right: 20px;
            top: 20px;
            height: 30px;
            line-height: 30px;
            padding: 0 12px;
            text-align: center;
            color: @mask_blue;
            border: 1px solid @mask_blue;
            .borderRadius;
        }
    }
</style>

