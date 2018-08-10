<template>
    <div class="put-forward-container">
        <h3>输入提现金额</h3>
        <div class="from">
            <i-form ref="form1" :model="apiData" :rules="rules" :label-width="90">
                <form-item label="可用余额：" class="group-item"> {{ base != '' ? base.buserAccount.account : '' }} </form-item>
                <form-item label="可提金额：" class="group-item"> {{ base != '' ? base.buserAccount.account : '' }} </form-item>
                <form-item label="提现金额：" class="group-item" prop="amount">
                    <i-input style="width: 224px" placeholder="请输入" v-model="apiData.amount" class="form-input"></i-input>
                </form-item>
            </i-form>
        </div>
        <h3>选择银行卡</h3>
        <div class="from">
            <i-form ref="form2" :model="apiData" :rules="rules1" :label-width="90">
                <form-item label="账户性质：" class="group-item">
                    <i-radioGroup v-model="bankCardType" @on-change="getbankCard">
                        <i-radio :label="1">对公</i-radio>
                        <i-radio :label="2">个人</i-radio>
                    </i-radioGroup>
                </form-item>
                <form-item label="提现账户：" class="group-item" prop="bankCardId">
                    <i-select v-model="apiData.bankCardId" style="width:560px">
                        <i-option v-for="(item,i) in accounts" :value="item.id" :key="i">
                            {{ bankCardType == 1 ? '对公' : '个人' }} | {{ item.bankName }} | {{ item.bankCardNo }}
                        </i-option>
                    </i-select>
                </form-item>
            </i-form>
        </div>
        <h3>其它信息</h3>
        <div class="from">
            <i-form  ref="form3" :label-width="90">
                <form-item label="备注：" class="group-item">
                    <i-input style="width:400px" v-model="apiData.remark" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="请输入"></i-input>
                </form-item>
                <form-item style="margin-top:40px">
                    <Button type="primary" @click="submit">提交</Button>
                    <Button style="margin-left: 8px" @click="reset">重置</Button>
                </form-item>
            </i-form>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                apiData: {
                    amount: '',
                    bankCardId: '',
                    remark: ''
                },
                bankCardType: 1,
                accounts: [],
                rules: {
                    amount: [{
                            required: true,
                            message: '请输入提现金额',
                            trigger: 'blur'
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (isNaN(value)) {
                                    return callback(new Error('请输入数字'));
                                } else if (+value <= 0 || +value > this.base.buserAccount.account) {
                                    return callback(new Error('超出充值范围'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ]
                },
                rules1: {
                    bankCardId: [{
                        required: true,
                        message: '请选择银行账号',
                        trigger: 'change'
                    }]
                }
            }
        },
        computed: {
            ...mapGetters(['base'])
        },
        methods: {
            getbankCard() {
                this.$http.post(this.$api.bankCardPage, {
                    currentPage: 1,
                    pageSize: 100,
                    bankCardType: this.bankCardType
                }).then(res => {
                    if (res.code === 1000) {
                        this.accounts = res.data.data;
                    }
                })
            },
            submit() {
                let ok1 = true,ok2 = true;
                this.$refs.form1.validate((valid) => ok1 = valid);
                this.$refs.form2.validate((valid) => ok2 = valid);
                if(ok1 && ok2){
                    this.$http.post(this.$api.putForward,this.apiData).then(res => {
                        if(res.code == 1000){
                            this.$Modal.confirm({
                                title: '提现申请已提交',
                                content: '提现申请已提交，是否前往提现列表？',
                                okText: '前往',
                                cancelText: '继续提现',
                                onOk: () => {
                                    this.$router.replace({name: 'putForwardList'})
                                },
                                onCancel: ()=> {
                                    this.reset();
                                }
                            });
                            
                        }else{
                            this.$Message.error(re.message)
                        }
                    })
                }else{
                    this.$Message.warning('请填写必填项');
                }
            },
            reset(){
                this.$refs.form1.resetFields();
                this.$refs.form2.resetFields();
                this.apiData.remark = '';
            }
        },
        created() {
            this.getbankCard();
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../../assets/base.less');
    .put-forward-container {
        width: 100%;
        padding: 32px 32px 24px 32px;
        background-color: #fff;
        h3 {
            font-size: 18px;
            color: @f_dark;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .from {
            width: 100%;
            padding-left: 20px;
            font-size: 14px;
            margin-bottom: 60px;
            .group-item {
                margin-bottom: 0!important;
            }
        }
    }
</style>
