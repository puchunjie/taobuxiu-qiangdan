<template>
    <div class="put-forward-list-container">
        <div class="tit">提现记录
            <router-link :to="{ name: 'putForward' }" class="btn">提现</router-link>
        </div>
        <div class="filter-form">
            <i-form inline :label-width="70">
                <form-item label="申请单号:" class="group-item">
                    <i-input style="width: 140px" placeholder="请输入" v-model="apiData.id" class="form-input"></i-input>
                </form-item>
                <form-item label="申请时间:" class="group-item">
                    <DatePicker v-model="apiData.timeBegin" format="yyyy年MM月dd日" type="date" placeholder="开始时间" style="width: 155px"></DatePicker> -
                    <DatePicker v-model="apiData.timeEnd" format="yyyy/MM/dd" type="date" placement="bottom-end" placeholder="结束时间" style="width: 155px"></DatePicker>
                </form-item>
                <form-item label="状态:" class="group-item">
                    <i-select v-model="apiData.tradeType" style="width:140px">
                        <i-option v-for="(item,i) in status" :value="item.value" :key="i">{{ item.label }}</i-option>
                    </i-select>
                </form-item>
                <form-item label="金额范围:" class="group-item">
                    <i-input style="width: 105px" placeholder="请输入" tag="amountBegin" @on-blur="testNumber" v-model="apiData.amountBegin" class="form-input"></i-input> -
                    <i-input style="width: 105px" placeholder="请输入" tag="amountEnd" @on-blur="testNumber" v-model="apiData.amountEnd" class="form-input"></i-input>
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
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import {
        dateformat
    } from '@/filters'
    export default {
        data() {
            return {
                apiData: {
                    currentPage: 1,
                    pageSize: 10,
                    timeBegin: '',
                    timeEnd: '',
                    amountBegin: '',
                    amountEnd: '',
                    id: '',
                    status: '' //提现状态 0待审核处理 1完成 2申请驳回 8撤回申请 9删除
                },
                status: [{
                        label: '正在处理',
                        value: 0
                    }, {
                        label: '提现成功',
                        value: 1
                    }, {
                        label: '提现失败',
                        value: 2
                    }, {
                        label: '撤回申请',
                        value: 8
                    },
                    {
                        label: '删除',
                        value: 9
                    }
                ],
                list: [],
                totalCount: 0,
                columns: [{
                        title: '申请时间',
                        key: 'tradeTime',
                        width: 110,
                        render: (h, params) => {
                            return h('span', dateformat(params.row.createTime))
                        }
                    },
                    {
                        title: '提现账户',
                        render: (h, params) => {
                            return h('div', [
                                h('p', `${ params.row.bankCardType == 1 ? '对公' : '个人' } | ${ params.row.toBank }`),
                                h('p', `${ params.row.toBankCardNo }`)
                            ])
                        }
                    },
                    {
                        title: '提现单号',
                        width: 200,
                        key: 'id'
                    },
                    {
                        title: '金额(元)',
                        key: 'amount'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('div',[
                                h('span',{
                                    class: `tag t${params.row.status}`
                                }),
                                h('span', this.status.find(item => item.value == params.row.status).label)
                            ])
                        }
                    },
                    {
                        title: '更新时间',
                        width: 110,
                        render: (h, params) => {
                            return h('span', dateformat(params.row.updateTime))
                        }
                    },
                    {
                        title: '审核人',
                        key: 'checkUser'
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        color: '#3366CC',
                                        margin: '0 10px 0 0'
                                    },
                                    on: {
                                        click: () => {
    
                                        }
                                    }
                                }, '详情'),
                                h('a', {
                                    style: {
                                        color: '#3366CC',
                                        display: params.row.status == 0 ? 'inline' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '撤回确认',
                                                content: '是否确认撤回提现申请？',
                                                okText: '撤回',
                                                cancelText: '再想想',
                                                onOk: () => {
                                                    this.cancelputForward(params.row.id)
                                                }
                                            });
                                            
                                        }
                                    }
                                }, '撤回')
                            ])
                        }
                    }
                ]
            }
        },
        computed: {
            ...mapGetters(['base'])
        },
        methods: {
            getList() {
                let params = this.$clearData(this.apiData);
                params.timeBegin = params.timeBegin != '' ? new Date(params.timeBegin).getTime() : '';
                params.timeEnd = params.timeEnd != '' ? new Date(params.timeEnd).getTime() : '';
                this.$http.post(this.$api.putForwardList, params).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.data;
                        this.totalCount = res.data.totalCount;
                    }
                })
            },
            cancelputForward(id) {
                console.log(id)
                this.$http.post(this.$api.cancelputForward, {
                    id: id
                }).then(res => {
                    if (res.code === 1000) {
                        this.$Message.success('已撤回');
                        this.getList();
                    } else {
                        this.$Message.error(re.message)
                    }
                })
            },
            initList(data) {
                this.apiData.pageSize = data;
                this.getList();
            },
            reset() {
                for (let key in this.apiData) {
                    this.apiData[key] = ''
                }
                this.apiData.currentPage = 1;
                this.apiData.pageSize = 10;
                this.getList();
            },
            search() {
                this.apiData.currentPage = 1;
                this.getList();
            },
            testNumber(e) {}
        },
        created() {
            this.getList();
        }
    }
</script>


<style lang="less">
    @import url('../../../../assets/base.less');
    .put-forward-list-container {
        width: 100%;
        background-color: #fff;
        padding-bottom: 16px;
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
        .tit {
            position: relative;
            width: 100%;
            border-bottom: @b_d1;
            padding: 0 16px;
            height: 55px;
            line-height: 54px;
            color: @f_dark;
            font-size: 16px;
            font-weight: bold;
            .btn {
                position: absolute;
                right: 16px;
                top: 12px;
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
        .table {
            width: 100%;
            padding: 0 16px;
        }
        .page-count {
            text-align: right;
            margin-top: 10px;
        }
        .tag{
                display: inline-block;
                width: 8px;
                height: 8px;
                .borderRadius(8px);
                margin-right: 5px;
                &.t0{
                    background-color: @dark_blue;
                }
                &.t1{
                    background-color: @dark_green
                }
                 &.t2{
                    background-color: @dark_red
                }
                 &.t8{
                    background-color: @dark_yellow
                }
            }
    }
</style>
