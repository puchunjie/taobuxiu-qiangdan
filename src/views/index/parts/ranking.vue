<template>
    <div>
        <div class="tit">
            卖家排行
        </div>
        <div class="rank-list">
            <div class="head clearfix">
                <div class="item company" style="margin-left: 56px;">公司</div>
                <div class="item level">资质等级</div>
                <div class="item num">活跃指数</div>
            </div>
            <div class="item-group clearfix" v-for="(item,index) in list" :key="item.userId">
                <div class="item index no-mr"><span class="count" :class="'count'+(index+1)">{{ index + 1 }}</span></div>
                <div class="item company">{{ item.companyName }}</div>
                <div class="item level">
                    <span class="iconfont" :class="pipPai(item.level)"></span>
                </div>
                <div class="item num">{{ item.num }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            getRanking() {
                this.$http.post(this.$api.sellerRanking).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.all;
                    }
                })
            },
            // 奖牌
            pipPai(level){
                let lArr = level.split('-');
                return `icon-pai-${lArr[1]} rank-level${lArr[0]}`
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
    }
    
    .rank-list {
        width: 100%;
        padding: 0 30px;
        .head {
            width: 100%;
            color: @f_goast;
        }
        
        .item-group{
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
            &.index{
                width: 26px;
                .count{
                    display: inline-block;
                    width: 26px;
                    height: 26px;
                    color: #fff;
                    line-height: 26px;
                    font-weight: 500;
                    background-color: #bdbdbd;
                    .borderRadius(13px);
                    &.count1{
                        background-color: @dark_red;
                    }
                    &.count2{
                        background-color: @light_yellow;
                    }
                    &.count3{
                        background-color: @light_green;
                    }
                }
            }
            &.company {
                width: 300px;
                text-align: left;
            }
            &.level{
                width: 80px;
                .iconfont{
                    font-size: 18px;
                    &.rank-level1{
                        color: #EA9884;
                    }
                    &.rank-level2{
                        color: #D3E1EA;
                    }
                    &.rank-level3{
                        color: #F5B417;
                    }
                }
            }
            &.num{
                width: 84px;
            }
        }
    }
</style>
