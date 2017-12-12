<template>
    <div class="oc-manage-container">
        <innerTitle>合同列表 </innerTitle>
        <div class="list-data-content">
            <status :data="statusData" v-model="apiData.checkstatus"></status>
            <div class="oc-search">
                <div class="search-input">
                    <input type="text" v-model="apiData.selectname" placeholder="请输入订单号搜索" />
                    <a @click="search">搜索</a>
                </div>
                <div class="time-limit">
                    成交时间：
                    <DatePicker type="daterange" placement="bottom-end" v-model="dateTime" placeholder="选择时间" style="width: 200px"></DatePicker>
                </div>
                <div class="btns">
                    <a class="btn" @click="search">搜索</a>
                    <a class="btn goast" @click="reset">清空条件</a>
                </div>
            </div>
            <div class="oc-table">
                <Spin fix v-show="listLoad"></Spin>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 180px;text-indent:30px">合同编号</th>
                            <th style="width: 300px">合同标题</th>
                            <th style="width: 200px">买/卖方公司名称</th>
                            <th style="width: 160px">更新时间</th>
                            <th style="width: 120px">合同状态</th>
                            <th class="action" style="width: 95px">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,i) in list" :key="item.sellId">
                            <td style="text-indent:30px">{{ item.contractId }}</td>
                            <td>{{ item.contractTitle }}</td>
                            <td>{{ item.secondCompanyName }}</td>
                            <td>{{ item.updateTime | dateformat }}</td>
                            <td><span :class="'state state-'+item.status">{{ item.status | statusStr }}</span></td>
                            <td class="action">
                                <a>查看</a><br>
                                <a>合同信息</a>
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
    </div>
</template>

<script>
    import status from '@/components/orderCommon/status.vue'
    import innerTitle from '@/components/business/innerTitle.vue'
    export default {
        components: {
            status,
            innerTitle
        },
        data() {
            return {
                listLoad: false,
                apiData: {
                    currentPage: 1,
                    pageSize: 10,
                    selectname: '',
                    checkstatus: ''
                },
                dateTime: ['', ''],
                statusData: [{
                    label: '全部合同',
                    value: '',
                    count: 10
                }, {
                    label: '待我方签署',
                    value: 'a',
                    count: 10
                }, {
                    label: '待对方签署',
                    value: 'b',
                    count: 10
                }, {
                    label: '已完成',
                    value: '1',
                    count: 10
                }, {
                    label: '已作废',
                    value: '0',
                    count: 10
                }],
                list: [],
                totalCount: 0
            }
        },
        computed: {
            timeFrame() {
                return {
                    startTime: this.dateTime[0] != '' ? new Date(this.dateTime[0]).getTime() : '',
                    endTime: this.dateTime[1] != '' ? new Date(this.dateTime[1]).getTime() : ''
                }
            },
            type() {
                return this.$route.params.type
            }
        },
        filters: {
            statusStr(value) {
                switch (String(value)) {
                    case 'a':
                        return '待我方签署'
                        break;
                    case 'a':
                        return '待对方签署'
                        break;
                    case '1':
                        return '已完成'
                        break;
                    case '0':
                        return '已作废'
                        break;
                    default:
                        break;
                }
            }
        },
        methods: {
            getList() {
                this.listLoad = true;
                let params = this.$clearData(Object.assign(this.apiData, this.timeFrame));
                this.$http.post(this.$api.queryContractInfoPage, params).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.list;
                        this.totalCount = res.data.totalCount;
                        this.statusData[0].count = res.data.alltotalCount;
                        this.statusData[1].count = res.data.atotalCount;
                        this.statusData[2].count = res.data.btotalCount;
                        this.statusData[3].count = res.data.finishtotalCount;
                        this.statusData[4].count = res.data.overtotalCount;
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
                this.apiData.selectname = '';
                this.search();
            }
        },
        watch: {
            'apiData.checkstatus' () {
                this.search();
            }
        },
        created() {
            this.getList();
        }
    }
</script>

<style lang="less" scroped>
    @import url('../../../assets/base.less');
    .oc-manage-container {
        width: 100%;
        .list-data-content {
            width: 100%;
            background-color: #fff;
            padding: 20px;
            border: @b_d1;
            font-size: 12px;
        }
        .oc-search {
            position: relative;
            width: 100%;
            height: 34px;
            margin: 20px 0;
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
            color: @f_dark;
            table {
                width: 100%;
                border: @b_d1;
            }
            th {
                background-color: @table_headbg;
                height: 34px;
            }
            td {
                height: 60px;
                border-top: @b_d1;
                .state {
                    display: inline-block;
                    height: 22px;
                    line-height: 22px;
                    padding: 0 10px;
                    .borderRadius(11px);
                    &.state-a {
                        background-color: @goast_red;
                        color: @dark_red;
                    }
                    &.state-b {
                        background-color: @goast_yellow;
                        color: @dark_yellow;
                    }
                    &.state-1 {
                        background-color: @goast_green;
                        color: @dark_green;
                    }
                    &.state-0 {
                        background-color: @table_headbg;
                        color: @f_goast;
                    }
                }
            }
            .action {
                text-align: center;
                line-height: 20px;
                a {
                    color: @f_dark;
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
    }
</style>


