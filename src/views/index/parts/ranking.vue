<template>
    <div>
        <div class="tit">
            卖家排行
            <div class="btn-group">
                <a class="btn" :class="{'active': i == active}" v-for="(el,i) in filter" :key="i" @click="active=i">{{ el }}</a>
            </div>
        </div>
        <div class="rank-list">
            <img class="no-list" src="../../../assets/no-rank.png" v-show="list[active]&&list[active].length == 0">
            <div class="head clearfix" v-show="list[active]&&list[active].length > 0">
                <div class="item company" style="margin-left: 56px;">公司</div>
                <div class="item level">资质等级</div>
                <div class="item num">活跃指数</div>
            </div>
            <div class="item-group clearfix" v-for="(item,index) in list[active]" :key="item.userId">
                <div class="item index no-mr">
                    <span class="count" :class="'count'+(index+1)">{{ index + 1 }}</span></div>
                <div class="item company">{{ item.companyName }}</div>
                <div class="item level">
                    <crown :level='item.level'></crown>
                </div>
                <div class="item num">{{ item.num }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import crown from '@/components/basics/crown/index.vue'
    export default {
        components: {
            crown
        },
        data() {
            return {
                list: [],
                active: 0,
                filter:['今日','所有']
            }
        },
        methods: {
            getRanking() {
                this.$http.post(this.$api.sellerRanking).then(res => {
                    if (res.code === 1000) {
                        this.list = [res.data.day,res.data.all];
                    }
                })
            }
        },
        created() {
            this.getRanking();
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../assets/base.less';
    .tit {
        position: relative;
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        padding: 0 27px;
        font-weight: bold;
        border-bottom: @b_d1;
        .btn-group {
            position: absolute;
            right: 20px;
            top: 10px;
            font-weight: normal;
            font-size: 14px;
            border: 1px solid @mask_blue;
            .borderRadius;
            .btn {
                display: block;
                float: left;
                width: 60px;
                height: 32px;
                line-height: 32px;
                color: @mask_blue;
                text-align: center;
                &.active {
                    color: #fff;
                    background-color: @mask_blue;
                }
                &:not(:last-child) {
                    border-right: 1px solid @mask_blue;
                }
            }
        }
    }
    
    .rank-list {
        width: 100%;
        padding: 0 30px;
        .head {
            width: 100%;
            color: @f_goast;
        }
        .no-list{
            display: block;
            margin: 60px auto 0;
        }
        .item-group {
            font-size: 20px;
        }
        .item {
            display: block;
            float: left;
            height: 54px;
            line-height: 54px;
            margin-left: 30px;
            text-align: center;
            &.no-mr {
                margin: 0
            }
            &.index {
                width: 26px;
                .count {
                    display: inline-block;
                    width: 26px;
                    height: 26px;
                    color: #fff;
                    line-height: 26px;
                    font-weight: 500;
                    background-color: #bdbdbd;
                    .borderRadius(13px);
                    &.count1 {
                        background-color: @dark_red;
                    }
                    &.count2 {
                        background-color: @light_yellow;
                    }
                    &.count3 {
                        background-color: @light_green;
                    }
                }
            }
            &.company {
                width: 300px;
                text-align: left;
            }
            &.level {
                width: 80px;
                text-align: left;
                .iconfont {
                    font-size: 18px;
                    &.rank-level1 {
                        color: #EA9884;
                    }
                    &.rank-level2 {
                        color: #D3E1EA;
                    }
                    &.rank-level3 {
                        color: #F5B417;
                    }
                }
            }
            &.num {
                width: 84px;
            }
        }
    }
</style>
