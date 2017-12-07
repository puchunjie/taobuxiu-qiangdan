<template>
    <div class="oc-step3">
        <h2>以下是您的电子合同认证信息</h2>
        <table class="info-table" v-if="isRZ">
            <thead>
                <tr>
                    <th class="cp-name">公司名称</th>
                    <th style="width:170px">认证合同手机号</th>
                    <th style="width:120px">用户类型</th>
                    <th style="width:165px">认证证件类型</th>
                    <th style="width:240px">认证证件号</th>
                    <th style="width:120px">最近认证时间</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="cp-name">公司名称</td>
                    <td>公司名称</td>
                    <td>公司名称</td>
                    <td>公司名称</td>
                    <td>公司名称</td>
                    <td>公司名称</td>
                </tr>
            </tbody>
        </table>
        <!-- 认证部分 -->
        <div class="oc-panel">
            <p class="tips">
                <span class="iconfont icon-about"></span> 您还未认证电子合同用户信息，用户认证信息成功后可继续操作
            </p>
            <div class="oc-from">
                <div class="from-group">
                    <label>
                            <span class="iconfont icon-bitianxiang"></span>
                            商户名称
                        </label>
                    <p class="input-disable">{{ user.companyName }}</p>
                </div>
                <div class="from-group">
                    <label>
                            <span class="iconfont icon-bitianxiang"></span>
                            用户类型
                        </label>
                    <p class="input-disable wid200">企业</p>
                </div>
                <div class="from-group">
                    <label>
                            <span class="iconfont icon-bitianxiang"></span>
                            认证证件
                        </label>
                    <tbSelect class="wid200" :data='idTypes' v-model="rzApiData.certifyType"></tbSelect>
                </div>
                <div class="from-group">
                    <label>
                            <span class="iconfont icon-bitianxiang"></span>
                            证件号码
                        </label>
                    <tbInput validate class="wid200" placeholder="请输入完整证件号" v-model="rzApiData.certifyNumber"></tbInput>
                </div>
                <div class="from-group">
                    <label>
                            <span class="iconfont icon-bitianxiang"></span>
                            认证手机
                        </label>
                    <tbInput validate class="wid200" placeholder="请输入手机号" v-model="rzApiData.cellNum"></tbInput>
                    <span class="warn-tip">*该手机号将用作签约前校验与签约信息短信通知使用，请谨慎填写</span>
                </div>
            </div>
            <div class="panel-btns">

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
                isRZ: false,
                acInfo: '',
                idTypes: [{
                    label: "身份证",
                    value: "1"
                }, {
                    label: "护照",
                    value: "2"
                },{
                    label: "军官证",
                    value: "3"
                }, {
                    label: "营业执照",
                    value: "4"
                },{
                    label: "组织机构代码证",
                    value: "5"
                }, {
                    label: "社会统一信用代码",
                    value: "6"
                }],
                rzApiData:{
                    appUserId: "",
                    cellNum: "",
                    userType: "2",
                    userName: "",
                    certifyType: "",
                    certifyNumber: ""
                }
    
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            getRZinfo() {
                this.$http.post(this.$api.getCheckContractInfoByAppUserId).then(res => {
                    this.isRZ = res.code == 1000;
                    if (res.code === -1) {
                        //去认证
    
                    }
                })
            },
            saveCheckContract(){
                let params = this.$clearData(this.rzApiData);
                params.appUserId = this.user.id;
                params.userName = this.user.companyName;
                    if(this.rzApiData.certifyNumber != '' && this.rzApiData.cellNum != ''){
                        this.$http.post(this.$api.saveCheckContract,params).then(res => {

                    })
                }else{
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
    @import url('../../assets/base.less');
    .oc-step3 {
        padding: 0 20px;
        h2 {
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
                label {
                    display: inline-block;
                    width: 100px;
                    height: 100%;
                    color: @f_goast;
                    vertical-align: middle;
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
            .panel-btns{
                width: 100%;
                padding-left: 100px;
                // btn{
                    
                // }
            }
        }
    }
</style>

