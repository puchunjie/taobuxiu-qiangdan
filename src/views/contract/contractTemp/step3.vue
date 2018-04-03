<template>
    <div class="oc-step3">
        <h2 class="oc-title">以下是您的电子合同认证信息</h2>
        <table class="info-table">
            <thead>
                <tr>
                    <th class="cp-name">公司名称</th>
                    <th style="width:170px">认证合同手机号</th>
                    <th style="width:120px">用户类型</th>
                    <th style="width:165px">认证证件类型</th>
                    <th style="width:200px">认证证件号</th>
                    <th style="width:160px">最近认证时间</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="cp-name">{{ acInfo.sellName }}</td>
                    <td>{{ acInfo.cellNum }}</td>
                    <td>{{ acInfo.userType | userTypeStr }}</td>
                    <td>{{ acInfo.certifyType | certifyTypeStr }}</td>
                    <td>{{ acInfo.certifyNumber }}</td>
                    <td>{{ acInfo.checkTime | dateformat }}</td>
                </tr>
            </tbody>
        </table>
        <!-- 确认部分 -->
        <div class="oc-panel">
            <a class="history" @click="getHistory">历史填写记录</a>
            <p class="tips">
                <span class="iconfont icon-about"></span> 请确认您的客户信息，合同中将以此作为已方信息
            </p>
            <div class="oc-from">
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 公司名称
                    </div>
                    <p class="input-disable">{{ user.companyName }}</p>
                </div>
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 联系地址
                    </div>
                    <tbInput validate style="width:600px" placeholder="请输入联系地址" v-model="uerInfo.address"></tbInput>
                </div>
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 联系人
                    </div>
                    <tbInput validate class="wid200" placeholder="请输入联系人姓名" v-model="uerInfo.contacts"></tbInput>
                </div>
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 电话
                    </div>
                    <tbInput validate class="wid200" ref="mobile" placeholder="请输入联系电话" v-model="uerInfo.tel"></tbInput>
                </div>
            </div>
            <div class="panel-btns">
                <a class="btn" @click="useRZinfo">确认使用该信息</a>
                <a class="btn goast" @click="$router.go(-1)">返回上一层</a>
            </div>
        </div>
    
        <div class="history-list" v-if="historyShow">
            <div class="inner-wrap">
                <div class="header">历史地址(最近5条)<span class="close iconfont icon-close" @click="historyShow = false"></span></div>
                <div class="content">
                    <table>
                        <tr v-for="his in historyList" :key="his.id">
                            <td style="width:400px">{{ his.address }}</td>
                            <td style="width:100px">{{ his.contacts }}</td>
                            <td style="width:280px">{{ his.tel }}</td>
                            <td style="width:80px"><a class="in-btn" @click="fill(his)">选择</a></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import tbSelect from '@/components/business/tbSelect/index'
    import tbInput from '@/components/business/tbInput/index'
    export default {
        components: {
            tbSelect,
            tbInput
        },
        data() {
            return {
                historyShow: false,
                historyList: [],
                acInfo: '',
                idTypes: [{
                    label: "营业执照",
                    value: "4"
                }, {
                    label: "组织机构代码证",
                    value: "5"
                }, {
                    label: "社会统一信用代码",
                    value: "6"
                }],
                rzApiData: {
                    appUserId: "",
                    cellNum: "",
                    userType: "2",
                    userName: "",
                    certifyType: "",
                    certifyNumber: ""
                },
                uerInfo: {
                    address: '',
                    contacts: '',
                    tel: '',
                    companyName: ''
                }
            }
        },
        computed: {
            ...mapGetters(['base','user']),
            type() {
                return this.$route.params.type
            },
            // 验证手机号
            validMobile() {
                let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                return myreg.test(this.uerInfo.tel);
            }
        },
        methods: {
            // 获取认证信息
            getRZinfo() {
                this.$http.post(this.$api.getCheckContractInfoByAppUserId).then(res => {
                    // this.isRZ = res.code == 1000;
                    if (res.code === 1000) {
                        this.acInfo = res.data
                    }
                })
            },
            // 使用认证信息
            useRZinfo() {
                if (this.uerInfo.address != '' && this.uerInfo.contacts != '' && this.uerInfo.tel != '') {
                    if (this.validMobile) {
                        let params = this.$clearData(this.uerInfo);
                        params.companyName = this.base.realName;
                        this.$http.post(this.$api.saveContract, params).then(res => {
                            if (res.code === 1000) {
                                let data = this.$ls.get('contractInfo');
                                data.partAContractId = res.data.id;
                                this.$ls.set('contractInfo', data);
                                this.$router.push({
                                    name: this.type == 1 ? 'Bstep4' : 'Sstep4',
                                    params: {
                                        type: this.type
                                    }
                                })
                            } else {
                                this.$Message.error(res.message);
                            }
                        })
                    } else {
                        this.$Message.warning('请填写正确的手机号!');
                    }
                } else {
                    this.$Message.warning('请将信息填写完整!');
                }
            },
            getHistory() {
                this.$http.post(this.$api.findRecentFiveContract, {
                    pageSize: 5
                }).then(res => {
                    if (res.code === 1000) {
                        this.historyList = res.data;
                        this.historyShow = true;
                    }
                })
            },
            fill(item) {
                this.uerInfo.address = item.address;
                this.uerInfo.contacts = item.contacts;
                this.uerInfo.tel = item.tel;
                this.historyShow = false;
            }
        },
        created() {
            this.getRZinfo();
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .oc-step3 {
        padding: 0 20px;
        .oc-title {
            font-size: 16px;
            color: @f_dark;
            font-weight: bold;
            margin-top: 20px;
        }
        .info-table {
            width: 100%;
            margin-top: 12px;
            border: @b_d1;
            th {
                background-color: @table_headbg;
                height: 34px;
            }
            td {
                height: 68px;
                border-top: @b_d1;
            }
            .cp-name {
                width: 270px;
                text-indent: 30px;
            }
        }
    }
    
    .oc-panel {
        position: relative;
        width: 100%;
        padding: 10px;
        border: @b_d1;
        margin-top: 12px;
        font-size: 14px;
        .history {
            position: absolute;
            right: 20px;
            top: 60px;
        }
        .tips {
            width: 100%;
            height: 36px;
            background-color: @dark_yellow;
            color: #fff;
            line-height: 36px;
            padding: 0 16px;
            .borderRadius;
            .iconfont {
                font-size: 16px;
                color: #fff;
                margin-right: 10px;
            }
        }
        .oc-from {
            width: 100%;
            margin-top: 16px;
            .from-group {
                width: 100%;
                height: 30px;
                margin-bottom: 20px;
                line-height: 30px;
                .label {
                    display: inline-block;
                    width: 80px;
                    height: 100%;
                    color: @f_goast;
                    vertical-align: middle;
                    margin-right: 30px;
                    text-align: right;
                    span {
                        color: @dark_red;
                        font-size: 12px;
                    }
                }
                .input-disable {
                    display: inline-block;
                    vertical-align: middle;
                    width: 600px;
                    height: 30px;
                    border: @b_d1;
                    color: @f_goast;
                    background-color: @goast_gray;
                    padding: 0 12px;
                    .borderRadius(3px)
                }
                .wid200 {
                    width: 200px;
                }
                .warn-tip {
                    display: inline-block;
                    font-size: 12px;
                    color: @dark_red;
                    margin-left: 10px;
                    vertical-align: middle;
                }
            }
        }
        .panel-btns {
            width: 100%;
            padding-left: 113px;
            padding-bottom: 50px;
            .btn {
                display: inline-block;
                width: 140px;
                height: 34px;
                margin-right: 20px;
                line-height: 32px;
                border: 1px solid @dark_blue;
                color: #fff;
                font-size: 14px;
                text-align: center;
                background-color: @dark_blue;
                &.goast {
                    color: @dark_blue;
                    background-color: #fff;
                }
            }
        }
    }
    
    .history-list {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .4);
        z-index: 990;
        font-size: 12px;
        .inner-wrap {
            width: 910px;
            min-height: 270px;
            background-color: #fff;
            margin: 200px auto;
            padding-bottom: 20px;
        }
        .header {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;
            font-size: 14px;
            color: #fff;
            background-color: @mask_blue;
            .close {
                position: absolute;
                right: 14px;
                cursor: pointer;
            }
        }
        .content {
            width: 100%;
            padding: 30px;
            table {
                width: 100%;
                td {
                    height: 34px;
                }
            }
        }
    }
    
    .in-btn {
        display: inline-block;
        vertical-align: middle;
        height: 24px;
        line-height: 24px;
        padding: 0 19px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        background-color: @mask_blue;
        .borderRadius(2px);
    }
</style>

