<template>
    <div class="asset-detail-container">
        <div class="top-div">
            <div class="tatal">
                <h3>账户总金额</h3>
                <p>&yen;{{ account.totalAccount }}</p>
            </div>
            <div class="detail">
                <p>可用余额：&yen;{{ account.account }}</p>
                <p>冻结金额（提现）：{{ account.withDrawAccount }}</p>
                <p>冻结金额（拍卖）：{{ account.lockAccount }}</p>
            </div>
            <div class="btns">
                <router-link :to="{ name: 'Recharge', query: { step: 1 } }" class="btn">充值</router-link>
                <router-link :to="{ name: 'putForward' }" class="btn goast">提现</router-link>
            </div>
        </div>
    
        <div class="list-container">
            <div class="head">资产明细</div>
            <div class="filter-form">
                <i-form inline :label-width="70">
                    <form-item label="交易类型:" class="group-item">
                        <i-select v-model="apiData.tradeType" style="width:140px">
                            <i-option v-for="(item,i) in tradeTypes" :value="item.name" :key="i">{{ item.name }}</i-option>
                        </i-select>
                    </form-item>
                    <form-item label="关键词:" class="group-item">
                        <i-select v-model="activeKey" style="width:88px" @on-change="setSearchKey">
                            <i-option v-for="(item,i) in keys" :value="item" :key="i">{{ item }}</i-option>
                        </i-select>
                        <i-input style="width: 232px" @input="setSearchKey" placeholder="请输入" v-model="keyStr" class="form-input"></i-input>
                    </form-item>
                    <form-item label="金额范围:" class="group-item">
                        <i-input style="width: 105px" placeholder="请输入" @on-blur="testNumber" v-model="apiData.amountBegin" class="form-input"></i-input> -
                        <i-input style="width: 105px" placeholder="请输入" @on-blur="testNumber" v-model="apiData.amountEnd" class="form-input"></i-input>
                    </form-item>
                    <form-item label="交易状态:" class="group-item">
                        <i-select v-model="apiData.tradeStatus" style="width:140px">
                            <i-option v-for="(item,i) in tradeStatus" :value="item" :key="i">{{ item }}</i-option>
                        </i-select>
                    </form-item>
                    <form-item label="操作时间:" class="group-item">
                        <DatePicker v-model="apiData.createTimeBegin" format="yyyy年MM月dd日" type="date" placeholder="开始时间" style="width: 155px"></DatePicker> -
                        <DatePicker v-model="apiData.createTimeEnd" format="yyyy年MM月dd日" type="date" placement="bottom-end" placeholder="结束时间" style="width: 155px"></DatePicker>
                    </form-item>
                    <form-item label="操作人:" class="group-item">
                        <i-input style="width: 140px" placeholder="请输入" v-model="apiData.createUser" class="form-input"></i-input>
                    </form-item>
                </i-form>
                <div class="btns">
                    <a class="btn goast" @click="reset">取消</a>
                    <a class="btn" @click="search">搜索</a>
                </div>
            </div>
            <div class="table">
                <i-table :columns="columns" :data="list"></i-table>
                <div class="page-count" v-show="list.length != 0">
                    <Page show-total @on-change="getList" :total="totalCount" :current.sync="apiData.currentPage" :page-size="apiData.pageSize" @on-page-size-change="initList" show-elevator show-sizer />
                </div>
            </div>
        </div>
    
        <Modal v-model="detailShow" footer-hide title="明细详情" :width="1200">
            <component :is="detailName" :data="detailData" v-if="detailName != '' && detailShow"></component>
        </Modal>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import {
        dateformat
    } from '@/filters'
    import rechargeDetail from './rechargeDetail.vue'
    import bondDetail from './bondDetail.vue'
    import putfDetail from './putfDetail.vue'
    export default {
        components: {
            rechargeDetail,
            putfDetail,
            bondDetail
        },
        data() {
            return {
                detailShow: false,
                detailData: {},
                detailName: 'rechargeDetail',
                apiData: {
                    currentPage: 1,
                    pageSize: 10,
                    withDrawId: '', //提现单编号
                    auctionIndex: '',//场次编号
                    createUser: '', //操作人
                    createTimeBegin: '', //操作起始时间
                    createTimeEnd: '', //操作时间结束范围
                    amountBegin: '', //金额开始
                    amountEnd: '', //金额结束
                    tradeNo: '', //交易流水号
                    logType: '', //交易类别
                    tradeType: '', //交易类型
                    tradeStatus: '', //交易状态    
                },
                tradeTypes: [{
                    name: '充值',
                    comp: 'rechargeDetail'
                }, {
                    name: '提现',
                    comp: 'putfDetail'
                }, {
                    name: '拍卖保证金',
                    comp: 'bondDetail'
                }],
                tradeStatus: ['交易成功', '处理中', '退回账户', '冻结中'],
                keys: ['流水号', '提现编号', '场次编号'],
                activeKey: '流水号',
                keyStr: '',
                list: [],
                totalCount: 0,
                columns: [{
                        title: '操作时间',
                        key: 'tradeTime',
                        width: 110,
                        render: (h, params) => {
                            return h('span', dateformat(params.row.tradeTime))
                        }
                    },
                    {
                        title: '交易类型',
                        key: 'tradeType'
                    },
                    {
                        title: '交易金额',
                        key: 'amount'
                    },
                    {
                        title: '状态',
                        key: 'tradeStatus'
                    },
                    {
                        title: '冻结金额(提现)',
                        key: 'withDrawAccount'
                    },
                    {
                        title: '冻结金额(拍卖)',
                        key: 'lockAccount'
                    },
                    {
                        title: '可用余额',
                        key: 'account'
                    },
                    {
                        title: '账户总金额',
                        key: 'totalAccount'
                    },
                    {
                        title: '操作人',
                        key: 'createUser'
                    },
                    {
                        title: '详情',
                        render: (h, params) => {
                            return h('a', {
                                style: {
                                    color: '#3366CC'
                                },
                                on: {
                                    click: () => {
                                        console.log(params.row.tradeType)
                                        this.detailName = this.tradeTypes.find(item => item.name == params.row.tradeType).comp;
                                        this.detailData = this.list[params.index];
                                        this.detailShow = true;
                                    }
                                }
                            }, '查看')
                        }
                    }
                ]
            }
        },
        computed: {
            ...mapGetters(['account'])
        },
        methods: {
            ...mapActions(['getAccount']),
            getList() {
                let params = this.$clearData(this.apiData);
                params.createTimeBegin = params.createTimeBegin != '' ? new Date(params.createTimeBegin).getTime() : '';
                params.createTimeEnd = params.createTimeEnd != '' ? new Date(params.createTimeEnd).getTime() : '';
                
                this.$http.post(this.$api.buserAccountLog, params).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.data;
                        this.totalCount = res.data.totalCount;
                    }
                })
            },
            setSearchKey(){
                switch (this.activeKey) {
                    case '流水号':
                        this.apiData.tradeNo = this.keyStr;
                        this.apiData.withDrawId = '';
                        this.apiData.auctionIndex = '';
                        break;
                    case '提现编号':
                        this.apiData.withDrawId = this.keyStr;
                        this.apiData.tradeNo = '';
                        this.apiData.auctionIndex = '';
                        break;
                    case '场次编号':
                        this.apiData.auctionIndex = this.keyStr;
                        this.apiData.tradeNo = '';
                        this.apiData.withDrawId = '';
                        break;
                    default:
                        break;
                }
            },
            initList(data) {
                this.apiData.pageSize = data;
                this.getList();
            },
            reset(){
                for(let key in this.apiData){
                    this.apiData[key] = ''
                }
                this.apiData.currentPage = 1;
                this.apiData.pageSize = 10;
                this.keyStr = '';
                this.getList();
            },
            search(){
                this.apiData.currentPage = 1;
                this.getList();
            },
            testNumber(val){
            }
        },
        created() {
            this.getList();
            this.getAccount();
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../../assets/base.less');
    .asset-detail-container {
        width: 100%;
        height: auto;
        .btn {
            display: inline-block;
            height: 32px;
            padding: 0 22px;
            line-height: 32px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            background-color: @dark_blue;
            &.goast {
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(217, 217, 217, 1);
                color: @f_ligth;
            }
        }
        .top-div {
            .flex-block;
            width: 100%;
            padding: 30px 40px;
            background-color: #fff;
            .tatal {
                width: 250px;
                color: @f_dark;
                h3 {
                    font-size: 16px;
                    line-height: 20px;
                    font-weight: bold;
                }
                p {
                    line-height: 48px;
                    font-size: 40px;
                    font-weight: bold;
                    margin-top: 8px;
                }
            }
            .detail {
                width: 250px;
                font-size: 12px;
                color: @f_ligth;
                line-height: 20px;
                p:not(:first-child) {
                    margin-top: 10px;
                }
            }
            .btns {
                .btn {
                    margin-top: 45px;
                }
            }
        }
        .list-container {
            width: 100%;
            margin-top: 16px;
            padding-bottom: 16px;
            background-color: #fff;
            .head {
                width: 100%;
                height: 55px;
                line-height: 54px;
                border-bottom: @b_d1;
                color: @f_dark;
                padding: 0 16px;
                font-size: 16px;
                font-weight: bold;
            }
            .table {
                width: 100%;
                padding: 0 16px;
            }
            .page-count {
                text-align: right;
                margin-top: 10px;
            }
        }
        .filter-form {
            position: relative;
            width: 100%;
            padding: 16px;
            .group-item {
                margin-bottom: 16px;
                margin-right: 40px;
            }
            .btns {
                position: absolute;
                right: 16px;
                bottom: 30px;
            }
        }
    }
</style>
