<template>
    <div class="offer-record">
        <div class="head">
            出价记录（{{ totalCount }}）
            <span>查看更多</span>
        </div>
        <div class="content">
            <table>
                <thead>
                    <th style="width:110px">状态</th>
                    <th style="width:110px">金额</th>
                    <th>出价时间</th>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in list" :key="item.id">
                        <td>
                            <span class="tag" :class="{ 'on': i == 0 }">{{ i == 0 ? '领先' : '出局' }}</span>
                            <span class="my">我的</span>
                        </td>
                        <td>&yen;{{ item.price }}</td>
                        <td>{{ item.createTime | dateformat('hh:mm:ss') }}</td>
                    </tr>
                </tbody>
            </table>
            <template v-if="list.length == 0">
                <img class="empty-img" src="../../../assets/offer-empty.png">
                <p class="empty-text">暂无出价记录</p>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                list: [{
                    id: 1,
                    createTime: '1533188815420',
                    updateTime: '1533188815420',
                    createUserId: '',
                    price: 1200
                }],
                totalCount: 0
            }
        },
        methods: {
            getList() {
                this.$http.post(this.$api.findOfferAuction, {
                    auctionInfoId: this.id,
                    currentPage: 1,
                    currentPage: 8
                }).then(res => {
                    if(res.code === 1000){
                        this.list = res.data.list;
                        this.totalCount = res.data.totalCount;
                    }
                })
            }
        },
        created() {
            // this.getList();   
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .offer-record {
        width: 312px;
        height: 406px;
        background-color: #fff;
        float: right!important;
        margin-top: 16px;
        color: @f_goast;
        font-size: 14px;
        .head {
            position: relative;
            width: 100%;
            height: 48px;
            line-height: 48px;
            border-bottom: @b_d1;
            padding: 0 16px;
            color: @f_ligth;
            span {
                position: absolute;
                right: 20px;
                color: @f_goast;
                font-size: 12px;
                cursor: pointer;
            }
        }
        .content {
            width: 100%;
            padding: 16px;
            table {
                width: 100%;
                th {
                    line-height: 20px;
                }
                td{
                    height: 40px;
                }
            }
            .empty-img {
                display: block;
                width: 100px;
                margin: 80px auto 0;
            }
            .empty-text {
                text-align: center;
                color: #ccc;
                margin-top: 30px;
            }

            .tag{
                display: inline-block;
                width: 40px;
                height: 22px;
                border: @b_d1;
                .borderRadius;
                line-height: 20px;
                text-align: center;
                font-size: 12px;
                background-color: #F5F5F5;
                &.on{
                    border-color: #FFA39E;
                    background-color: #FFF1F0;
                    color: #F5222D;
                } 
            }
            .my{
                color: @dark_blue;
                font-size: 12px;
                margin-left: 5px;
            }
        }
    }
</style>

