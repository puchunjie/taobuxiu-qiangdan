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
        <!-- 认证部分 -->
        <!-- <div class="oc-panel" v-if="!isRZ">
            <p class="tips">
                <span class="iconfont icon-about"></span> 您还未认证电子合同用户信息，用户认证信息成功后可继续操作
            </p>
            <div class="oc-from">
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 商户名称
                    </div>
                    <p class="input-disable">{{ base.realName }}</p>
                </div>
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 用户类型
                    </div>
                    <p class="input-disable wid200">企业</p>
                </div>
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 认证证件
                    </div>
                    <tbSelect class="wid200" :data='idTypes' v-model="rzApiData.certifyType"></tbSelect>
                </div>
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 证件号码
                    </div>
                    <tbInput validate class="wid200" placeholder="请输入完整证件号" v-model="rzApiData.certifyNumber"></tbInput>
                </div>
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 认证手机
                    </div>
                    <tbInput validate class="wid200" placeholder="请输入手机号" v-model="rzApiData.cellNum"></tbInput>
                    <span class="warn-tip">*该手机号将用作签约前校验与签约信息短信通知使用，请谨慎填写</span>
                </div>
            </div>
            <div class="panel-btns">
                <a class="btn" @click="saveCheckContract">认证信息</a>
                <a class="btn goast" @click="$router.go(-1)">返回上一层</a>
            </div>
        </div> -->
        <!-- 确认部分 -->
        <div class="oc-panel">
            <p class="tips">
                <span class="iconfont icon-about"></span> 请确认您的客户信息，合同中将以此作为甲/已方信息(我方信息)
            </p>
            <div class="oc-from">
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 甲方名称
                    </div>
                    <p class="input-disable">{{ base.realName }}</p>
                </div>
                <div class="from-group">
                    <div class="label">
                        <span class="iconfont icon-bitianxiang"></span> 仓库
                    </div>
                    <tbInput validate style="width:600px" placeholder="请输入仓库地址" v-model="uerInfo.address"></tbInput>
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
                    <tbInput validate class="wid200" placeholder="请输入联系电话" v-model="uerInfo.tel"></tbInput>
                </div>
            </div>
            <div class="panel-btns">
                <a class="btn" @click="useRZinfo">确认使用该信息</a>
                <a class="btn goast" @click="$router.go(-1)">返回上一层</a>
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
            ...mapGetters(['base']),
            type() {
                return this.$route.params.type
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
            // 认证
            saveCheckContract() {
                if (this.rzApiData.certifyNumber != '' && this.rzApiData.cellNum != '') {
                    let params = this.$clearData(this.rzApiData);
                    params.appUserId = this.base.id;
                    params.userName = this.base.realName;
                    this.$http.post(this.$api.saveCheckContract, params).then(res => {
                        if (res.code === 1000) {
                            this.$Message.success('认证通过。');
                        } else {
                            this.$Message.error('认证失败！');
                        }
                    })
                } else {
                    this.$Message.warning('请将信息填写完整!');
                }
            },
            // 使用认证信息
            useRZinfo() {
                if (this.uerInfo.address != '' && this.uerInfo.contacts != '' && this.uerInfo.tel != '') {
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
                    this.$Message.warning('请将信息填写完整!');
                }
            }
        },
        created() {
            this.getRZinfo();
        }
    }
</script>


<style lang="less">
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
        width: 100%;
        padding: 10px;
        border: @b_d1;
        margin-top: 12px;
        font-size: 14px;
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
</style>

