<template>
    <div>
        <i-table :columns="columns" :data="list"></i-table>
        <div class="record-load-more" v-show="canLoad" @click="loadMore">
            <i class="iconfont icon-loop"></i> 加载更多
        </div>
    </div>
</template>


<script>
    import {
        mapGetters
    } from 'vuex'
    import {
        dateformat,
        toMoney
    } from '@/filters'
    export default {
        data() {
            return {
                list: [],
                totalCount: 0,
                pageSize: 3,
                currentPage: 1,
                columns: [{
                        title: '状态',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    class: `record-tag ${params.index == 0 ? 'on' : ''}`
                                }, params.index == 0 ? '领先' : '出局'),
                                h('span', {
                                    class: `record-my ${ params.row.isMine ? 'show' : '' }`
                                }, '我的')
                            ])
                        }
                    },
                    {
                        title: '出价金额',
                        key: 'toMoney'
                    },
                    {
                        title: '出价时间',
                        key: 'time'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters(['isLogin', 'user']),
            canLoad() {
                return this.totalCount > this.list.length
            }
        },
        methods: {
            getList() {
                this.$http.post(this.$api.findOfferAuction, {
                    auctionInfoId: this.$route.params.id,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }).then(res => {
                    if (res.code === 1000) {
                        let list = res.data.list.map(item => {
                            item.time = dateformat(item.createTime, 'hh:mm:ss');
                            item.toMoney = `￥${toMoney(item.price)}`;
                            item.isMine = this.isLogin ? item.createUserId == this.user.userId : false;
                            return item
                        });
                        this.list.push(...list);
                        this.totalCount = res.data.totalCount;
                    }
                })
            },
            loadMore() {
                this.currentPage++;
                this.getList();
            },
            updateSinge() {
                console.log(111)
                let list = this.$clearData(this.list);
                this.$http.post(this.$api.findOfferAuction, {
                    auctionInfoId: this.$route.params.id,
                    currentPage: 1,
                    pageSize: 1
                }).then(res => {
                    if (res.code === 1000) {
                        let list1 = res.data.list.map(item => {
                            item.time = dateformat(item.createTime, 'hh:mm:ss');
                            item.toMoney = `￥${toMoney(item.price)}`;
                            item.isMine = this.isLogin ? item.createUserId == this.user.userId : false;
                            return item
                        });
                        // 如果没有满页 则直接插入，否则去除末尾
                        if (this.list.length < this.pageSize * this.currentPage) {
                            this.list.unshift(list1[0]);
                        } else {
                            let list2 = [list1[0], ...list];
                            list2.pop();
                            this.list = [];
                            this.list = list2;
                        }
                        this.totalCount = res.data.totalCount;
                    }
                })
            }
        },
        created() {
            this.getList()
        }
    }
</script>


<style lang="less">
    @import url('../../../assets/base.less');
    .record-tag {
        display: inline-block;
        width: 40px;
        height: 22px;
        border: @b_d1;
        .borderRadius;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        background-color: #F5F5F5;
        &.on {
            border-color: #FFA39E;
            background-color: #FFF1F0;
            color: #F5222D;
        }
    }
    
    .record-my {
        display: none;
        color: @dark_blue;
        font-size: 12px;
        margin-left: 5px;
        &.show {
            display: inline-block;
        }
    }
    
    .record-load-more {
        width: 100px;
        height: 40px;
        margin: 40px auto 0;
        cursor: pointer;
        font-size: 12px;
        color: @f_ligth;
        .iconfont {
            font-size: 14px;
            color: @f_goast;
        }
    }
</style>

