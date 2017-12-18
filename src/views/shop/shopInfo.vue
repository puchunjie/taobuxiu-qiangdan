<template>
    <div class="shop-info">
        <div class="base-info">
            <h1>{{ item.companyName }}</h1>
            <p>
                <qq :data="{name:item.contact,phone:item.contactNum,qq:item.QQ}"></qq>
            </p>
            <p>{{ item.address }}</p>
            <ul class="info-right">
                <li>
                    <p class="tit">认证信息</p>
                    <div class="content"><merchantLabel :showTip="false" :faith="item.isFaithUser == '1'" :guarantee="item.isGuaranteeUser == '1'"></merchantLabel></div>
                </li>
                <li>
                    <p class="tit">等级</p>
                    <div class="content"><crown :level='item.sellLevel'></crown></div>
                </li>
                <li>
                    <p class="tit">服务指数</p>
                    <div class="content">{{ item.servicePoint }}</div>
                </li>
                <li>
                    <p class="tit">仓库</p>
                    <div class="content">{{ item.servicePoint }}</div>
                </li>
            </ul>
        </div>
        <div class="bottom-div">
            <slot></slot>
            <p class="offer-info">
                <span class="iconfont icon-hui"></span>
                {{ item.proInfo }}
            </p>
        </div>
    </div>
</template>

<script>
    import crown from '@/components/basics/crown/index.vue'
    import qq from '@/components/business/qqContant/index.vue'
    import merchantLabel from '@/components/business/merchantLabel/index.vue'
    export default {
        components: {
            crown,
            qq,
            merchantLabel
        },
        props: {
            item: {
                type: Object
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../assets/base.less');
    .shop-info {
        width: 100%;
        background-color: #fff;
        border: @b_d1;
        font-size: 14px;
        .base-info {
            position: relative;
            width: 100%;
            padding: 30px;
            border-bottom: @b_d1;
            h1 {
                font-size: 20px;
                color: @f_dark;
                font-weight: bold;
            }
            p {
                color: #777;
                margin-top: 12px;
            }
            .info-right {
                position: absolute;
                right: 30px;
                top: 40px;
                li {
                    width: 160px;
                    text-align: center;
                    float: left;
                }
                .tit{
                    font-size: 12px;
                    color: #888;
                    margin-bottom: 15px;
                }
                .content{
                    .scale(1.3);
                }
            }
        }
        .bottom-div {
            position: relative;
            width: 100%;
            height: 50px;
            .offer-info{
                position: absolute;
                right: 20px;
                top: 0;
                line-height: 50px;
                color: @f_dark;    
                .iconfont{
                    color: @dark_red;
                    font-size: 20px;
                    vertical-align: middle;
                    margin-right: 10px;
                }
            }
        }
    }
</style>

