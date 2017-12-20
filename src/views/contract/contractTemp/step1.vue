<template>
    <div>
        <div class="oc-search">
            <div class="search-input">
                <input type="text" v-model="apiData.sellName" placeholder="请输入公司名称搜索" />
                <a @click="search">搜索</a>
            </div>
            <div class="time-limit">
                成交时间：
                <DatePicker type="daterange" placement="bottom-end" v-model="dateTime" placeholder="选择时间" style="width: 200px"></DatePicker>
            </div>
            <div class="btns">
                <a class="btn" @click="search">搜索</a>
                <a class="btn goast" @click="reset">清空</a>
            </div>
        </div>
        <div class="oc-table">
            <Spin fix v-show="listLoad"></Spin>
            <table>
                <thead>
                    <tr>
                        <th class="company-name">签约公司</th>
                        <th>联系方式</th>
                        <th>可签约订单总数</th>
                        <th>最近订单成交时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in list" :key="item.sellId">
                        <td class="company-name">{{ item.sellName }}</td>
                        <td>
                            <qq :data="{name:item.contact,phone:item.contactNum,qq:item.qq}"></qq>
                        </td>
                        <td>{{ item.orderNum }}</td>
                        <td>{{ item.updateTime }}</td>
                        <td>
                            <a class="pick" @click="pickItem(item.sellId)">选择</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="empty" v-show="totalCount <= 0">
                <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/no-list.png">
            </div>
        </div>
        <div class="oc-bottom">
            <Page show-elevator @on-change="getList" :total="totalCount" :current.sync="apiData.currentPage" :page-size="apiData.pageSize"></Page>
        </div>
    </div>
</template>

<script>
    import qq from '@/components/business/qqContant/index.vue'
    export default {
        components: {
            qq
        },
        data() {
            return {
                listLoad: false,
                list: [],
                totalCount: 0,
                apiData: {
                    currentPage: 1,
                    pageSize: 10,
                    type: '',
                    sellName: ''
                },
                dateTime: [null, null]
            }
        },
        computed: {
            timeFrame() {
                return {
                    startTime: this.dateTime[0] != null ? new Date(this.dateTime[0]).getTime() : '',
                    endTime: this.dateTime[1] != null ? new Date(this.dateTime[1]).getTime() : ''
                }
            },
            type() {
                return this.$route.params.type
            }
        },
        methods: {
            // 获取合同签约方列表
            getList() {
                this.listLoad = true;
                this.apiData.type = this.type;
                let params = this.$clearData(Object.assign(this.apiData, this.timeFrame));
                this.$http.post(this.$api.queryContractMangerPage, params).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.list;
                        this.totalCount = res.data.totalCount;
                    }
                    this.listLoad = false;
                })
            },
            search() {
                this.apiData.currentPage = 1;
                this.getList();
            },
            reset() {
                this.dateTime = ['', ''];
                this.apiData.sellName = '';
                this.search();
            },
            pickItem(sellId) {
                this.$http.post(this.$api.getContractAuthenticationByUserId, {
                    userId: sellId
                }).then(res => {
                    if (res.code === 1000) {
                        this.$router.push({
                            name: this.type == 1 ? 'Bstep2' : 'Sstep2',
                            params: {
                                sellId: sellId,
                                type: this.type
                            }
                        })
                    } else {
                        this.$Message.error(res.message)
                    }
                })
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .oc-search {
        position: relative;
        width: 100%;
        height: 34px;
        margin: 20px 0;
        padding: 0 20px;
        .search-input {
            display: inline-block;
            width: 360px;
            height: 34px;
            border: @b_d1;
            background-color: @goast_gray;
            margin-right: 30px;
            input {
                display: inline-block;
                width: 280px;
                height: 100%;
                border: 0;
                margin: 0;
                outline: none;
                padding: 0 12px;
                border-right: @b_d1;
                background-color: #fff;
            }
            a {
                display: inline-block;
                width: 70px;
                height: 100%;
                text-align: center;
                color: @f_goast;
            }
        }
        .time-limit {
            display: inline-block;
            width: 280px;
            margin-right: 30px;
            .select {
                width: 150px;
            }
        }
        .btns {
            float: right;
            .btn {
                display: inline-block;
                width: 90px;
                height: 32px;
                line-height: 28px;
                border: 2px solid @dark_blue;
                color: #fff;
                text-align: center;
                background-color: @dark_blue;
            }
            .goast {
                background-color: #fff;
                color: @dark_blue;
                margin-left: 20px;
            }
        }
    }
    
    .oc-table {
        position: relative;
        width: 100%;
        padding: 0 20px;
        color: @f_dark;
        table {
            width: 100%;
            border: @b_d1;
        }
        th {
            background-color: @table_headbg;
            height: 34px;
            text-align: center;
            &.company-name {
                width: 340px;
                text-indent: 80px;
                text-align: left;
            }
        }
        td {
            height: 48px;
            border-top: @b_d1;
            text-align: center;
            &.company-name {
                text-align: left;
                text-indent: 40px;
            }
            & .pick {
                display: inline-block;
                width: 58px;
                height: 24px;
                line-height: 22px;
                border: 1px solid @mask_blue;
                color: @mask_blue;
                .noselect;
            }
        }
    }
    
    .oc-bottom {
        width: 100%;
        text-align: right;
        margin: 20px 0;
        padding: 0 20px;
    }
    
    .empty {
        width: 100%;
        min-height: 270px;
        text-align: center;
        background-color: #fff;
        img {
            display: inline-block;
            width: 230px;
            margin-top: 20px;
        }
    }
</style>
