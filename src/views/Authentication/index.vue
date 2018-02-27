<template>
    <div class="ac-container">
        <div class="head">
            <div class="inner-1200">
                <span class="iconfont icon-ziyuan4"></span>
                <span class="tit">商户认证</span>
            </div>
        </div>
        <div class="step-bar" v-show="step > 0">
            <div class="inner-1200 steps">
                <div class="step-item" v-for="(st,i) in steps" :key="i" :class="{'active':step >= (i+1)}">
                    <span class="iconfont" :class="st.icon"></span>
                    <p class="go">{{ st.span }}</p>
                    <p>{{ st.p }}</p>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="inner-1200">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <!-- 认证提示 -->
                <div class="step0" v-show="step == 0">
                    <div class="tip red">
                        <h3>正式使用本平台前，需认证为企业身份</h3>
                        <p>如有疑问，请联系平台客服：0510-81812186</p>
                    </div>
                    <p class="text">您暂未认证商家身份信息，<a class="btn" @click="step++,agHide = true">立即认证</a></p>
                </div>
    
                <!-- 第一步 -->
                <div class="step1" v-show="step == 1">
                    <i-form class="form" :model="userData" :rules="userDataRule" :label-width="90" ref="userInfo">
                        <h3 class="f-title" style="margin-top:0">商家基本信息</h3>
                        <form-item label="公司名称" prop="companyName">
                            <i-input style="width:280px" placeholder="请输入" v-model="userData.companyName" class="form-input"></i-input>
                        </form-item>
                        <form-item label="注册基金" prop="regMoney">
                            <i-input style="width:100px;margin-right:10px" type="number" placeholder="请输入" v-model="userData.regMoney" class="form-input"></i-input>万元
                        </form-item>
                        <h3 class="f-title">商家业务信息</h3>
                        <form-item label="联系人" prop="contact">
                            <i-input style="width:150px" placeholder="请输入" v-model="userData.contact" class="form-input"></i-input>
                        </form-item>
                        <form-item label="联系电话" prop="contactNum">
                            <i-input style="width:150px" placeholder="请输入联系电话" v-model="userData.contactNum" class="form-input"></i-input>
                        </form-item>
                        <form-item label="QQ" prop="qq">
                            <i-input style="width:150px" placeholder="请输入QQ" v-model="userData.qq" class="form-input"></i-input>
                        </form-item>
                        <form-item label="传真" prop="fax">
                            <i-input style="width:150px" placeholder="请输入传真" v-model="userData.fax" class="form-input"></i-input>
                        </form-item>
                        <form-item label="办公地址" prop="provinceId" style="float:left">
                            <citySelect style="width:150px" class="form-input" :value="[userData.provinceId,userData.cityId,userData.districtId]" @on-select="asyncData"></citySelect>
                        </form-item>
                        <form-item prop="address" style="float:left;margin-left: -70px;">
                            <i-input placeholder="请输入详细地址" v-model="userData.address" style="width:300px"></i-input>
                        </form-item>
                        <div class="clearfix"></div>
                        <form-item label="绑定专员">
                            <ajaxSelect class="form-input" style="width:240px" :value="JSON.stringify({'saleId':userData.saleId,'saleName':userData.saleName,'saleMobile':userData.saleMobile})" :api="$api.findSalemans" :valueKey="['saleId','saleName','saleMobile']" :labelKey="['saleName','saleMobile']" @on-select="asyncData"></ajaxSelect>
                        </form-item>
                        <form-item label="店铺封面">
                            <uploadPic v-model="userData.cover"></uploadPic>
                        </form-item>
                        <form-item label="店铺简介" prop="sellerProfile">
                            <i-input style="width:560px" v-model="userData.sellerProfile" :rows="5" type="textarea" placeholder="请填写店铺简介"></i-input>
                        </form-item>
                        <h3 class="f-title">上传证件</h3>
    
                        <div class="certificates clearfix">
                            <tbRadio v-model="cerfType" :data="[{id:'1',name:'三证合一'},{id:'2',name:'营业执照+组织机构代码证+税务登记证'}]"></tbRadio><br>
                            <div class="ivu-form-item-required pic-item" v-show="cerfType == 1">
                                <label class="ivu-form-item-label" style="float:inherit">合一证照</label><br>
                                <uploadPic v-model="userData.allCer"></uploadPic>
                            </div>
                            <div class="ivu-form-item-required pic-item" v-show="cerfType == 2">
                                <label class="ivu-form-item-label" style="float:inherit">营业执照</label><br>
                                <uploadPic v-model="userData.bussinessLic"></uploadPic>
                            </div>
                            <div class="ivu-form-item-required pic-item" v-show="cerfType == 2">
                                <label class="ivu-form-item-label" style="float:inherit">组织机构代码证</label><br>
                                <uploadPic v-model="userData.codeLic"></uploadPic>
                            </div>
                            <div class="ivu-form-item-required pic-item" v-show="cerfType == 2">
                                <label class="ivu-form-item-label" style="float:inherit">税务登记证</label><br>
                                <uploadPic v-model="userData.financeLic"></uploadPic>
                            </div>
                        </div>
                    </i-form>
                    <div class="footer">
                        <a class="goast" @click="step = 0,agHide = false">上一步</a>
                        <a @click="commitInFo">下一步</a>
                    </div>
                </div>
    
                <!-- 第二步 -->
                <div class="step1" v-show="step == 2" style="padding-bottom:40px;padding-top:0">
                    <div class="tip red" v-show="pass == 3">
                        <h3>审核未通过</h3>
                        <p>原因：{{ remark }}</p>
                        <a class="action" @click="reCommit">重新提交</a>
                    </div>
                    <div class="tip blue" v-show="pass == 2">
                        <h3>审核中。。。</h3>
                        <p>认证信息提交成功，将在1个工作日内完成审核，请耐心等待</p>
                    </div>
                    <i-form class="form" :label-width="90">
                        <h3 class="f-title" style="margin-top:0">商家基本信息</h3>
                        <form-item label="公司名称">
                            {{ userData.companyName }}
                        </form-item>
                        <form-item label="注册基金">
                            {{ userData.regMoney }} 万元
                        </form-item>
                        <h3 class="f-title">商家业务信息</h3>
                        <form-item label="联系人">
                            {{ userData.contact }}
                        </form-item>
                        <form-item label="联系电话">
                            {{ userData.contactNum }}
                        </form-item>
                        <form-item label="QQ">
                            {{ userData.qq }}
                        </form-item>
                        <form-item label="传真">
                            {{ userData.fax }}
                        </form-item>
                        <form-item label="办公地址">
                            {{ userData.provinceName }}{{ userData.cityName }}{{ userData.districtName }} {{ userData.address }}
                        </form-item>
                        <form-item label="绑定专员" v-show="userData.saleName != ''">
                            {{ userData.saleName }} {{ userData.saleMobile }}
                        </form-item>
                        <form-item label="店铺封面" v-show="userData.cover != ''">
                            <img :src="userData.cover" class="show-pic">
                        </form-item>
                        <form-item label="店铺简介">
                            {{ userData.sellerProfile }}
                        </form-item>
                        <h3 class="f-title" style="margin-bottom:0">上传证件</h3>
    
                        <div class="certificates clearfix">
                            <div class="ivu-form-item-required pic-item" v-show="cerfType == 1">
                                <label class="ivu-form-item-label" style="float:inherit">合一证照</label><br>
                                <img :src="userData.allCer" class="show-pic">
                            </div>
                            <div class="ivu-form-item-required pic-item" v-show="cerfType == 2">
                                <label class="ivu-form-item-label" style="float:inherit">营业执照</label><br>
                                <img :src="userData.bussinessLic" class="show-pic">
                            </div>
                            <div class="ivu-form-item-required pic-item" v-show="cerfType == 2">
                                <label class="ivu-form-item-label" style="float:inherit">组织机构代码证</label><br>
                                <img :src="userData.codeLic" class="show-pic">
                            </div>
                            <div class="ivu-form-item-required pic-item" v-show="cerfType == 2">
                                <label class="ivu-form-item-label" style="float:inherit">税务登记证</label><br>
                                <img :src="userData.financeLic" class="show-pic">
                            </div>
                        </div>
                    </i-form>
                </div>
            </div>
        </div>
    
    
        <!-- 协议 -->
        <div class="agreement" v-show="agHide">
            <div class="panel">
                <div class="header">
                    用户协议标题
                    <span class="iconfont icon-close" @click="step = 0,agHide = false"></span>
                </div>
                <div class="cont">
                    <label class="block">第1条</label>
                    <p>
                        为享有包括采购等更多的服务和平台操作功能，用户可以申请企业账号，首先需具备注册资格，您必须确保系依照中华人民共和国法律法规设立的合法组织，具有在中华人民共和国境内取得工商经营主体资格，并按商户企业账号要求提示上传相应证件。如您没有前述主体资格，本站有权拒绝用户注册或认证，据此造成的损失由您自行承担。
                    </p>
                    <br>

                    <label class="block">第2条</label>
                    <p>
                        在您阅读并同意本协议,按照本站申请成为商家页面提示填写完整企业信息上传符合要求的资料信息并经过本站审核通过后，您即为本站企业账号 。 
                    </p>
                    <br>

                    <label class="block">第3条</label>
                    <p>
                        您在成功完成企业账号申请并审核通过后，即成为企业账号管理员并享有挂货以及售卖行为的权利，您可以通过本站平台在线交易、发布现货库存资源信息、发布求购信息、发布特价资源信息等企业会员服务。 
                    </p>
                    <br>

                    <label class="block">第4条</label>
                    <p>
                        您申请或认证企业账号时，您设置的企业信息不得侵犯或涉嫌侵犯他人合法权益。如您连续12个月未有使用手机号和密码登录本站及信息更新记录或实际使用本站服务的行为，本站保留对您中止或终止提供服务并注销账户的权利。
                    </p>
                    <br>

                    <label class="block">第5条</label>
                    <p>
                        您注册为企业账号后，如注册登记信息发生变更，您须及时、主动联系本站进行更新。因您未及时更新，造成您不能享受相关服务的、或造成账号及密码泄露及一切影响正常交易等所有责任由您自行承担。 
                    </p>
                    <br>


                    <label class="block">第6条</label>
                    <p>
                    您应对您的手机号和密码的安全，以及对通过其手机号和密码实施的行为负责。您在本站注册的手机号和密码仅限于您自己或您所授权的企业内部人员进行使用，不得给予任何第三方使用，否则由此造成的损失由您自行承担，且本站保留暂停或终止服务的权利（参见本协议3.4项条款）。
                    </p>
                    <br>

                    <label class="block">第7条</label>
                    <p>
                    除非有法律规定或司法裁定，且征得本站的同意，否则，手机号和密码不能以任何方式转让、赠与或继承。 
                    </p>
                    <br>

                    <label class="block">第8条</label>
                    <p>
                    您遗忘或丢失在本站注册的密码及无法找回时，可与本站客户服务人员取得联系，在提供相关证明资料并经本站审核确认后，可找回密码。
                    </p>
                    <br>

                    <label class="block">第9条</label>
                    <p>
                    您注册为企业账号后，在本站进行挂货销售活动期间，请按时更新您所售卖产品的最新价格，真实库存等产品信息，如因您的挂货信息不准确，恶意或虚假挂货，一经本站核实，本站保留对您中止或终止提供服务并注销账户的权利，并且一切法律后果由您自行承担。
                    </p>
                    <br>

                    <label class="block">第10条</label>
                    <p>
                    您注册为企业账号后，在本站进行发布求购的行为，需真实可靠，不得进行任何形式的恶意以及虚假发布，一经核实为违反本平台规范或法律条款的行为后，本站保留对您中止或终止提供服务并注销账户的权利，并且一切法律后果由您自行承担 。
                    </p>
                    <br>


                    <label class="block">第11条</label>
                    <p>
                    本站提供的试点地区免费上门质检服务仅在征得买卖双方均同意认可的情况下方可进行。该项服务可以提供现场视频通讯服务，并于质检现场按照买卖双方均协商同意的事项进行现场质检，本站不参与买卖双方关于是否允许质检的协商讨论。在整个质检过程中，买卖双方均表示同意完成后则质检完成，本站不对质检完成后的任何资金交易，物流运输及收货等进一步交易行为进行负责，一切法律后果由买卖双方自行承担。
                    </p>
                </div>
                <div class="bar-btn">
                    <a class="goast" @click="step = 0,agHide = false">不同意</a>
                    <a @click="agHide = false">同意</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ajaxSelect from '@/components/basics/ajaxSelect/index'
    import citySelect from '@/components/basics/citySelect/index'
    import uploadPic from '@/views/contract/authentication/parts/uploadPic.vue'
    import tbRadio from '@/components/business/tbRadio/index.vue'
    import {
        mapGetters
    } from 'vuex'
    export default {
        components: {
            ajaxSelect,
            citySelect,
            uploadPic,
            tbRadio
        },
        data() {
            return {
                isFirst: true,
                pass: '',
                spinShow: false,
                agHide: false,
                cerfType: 1,
                step: 0,
                remark: '',
                steps: [{
                        icon: 'icon-onestep',
                        span: "第一步",
                        p: "填写入驻资料"
                    },
                    {
                        icon: 'icon-secondstep',
                        span: "第二步",
                        p: "平台审核"
                    }, {
                        icon: 'icon-thirdstep',
                        span: "第三步",
                        p: "入驻成功"
                    }
                ],
                userData: {
                    id: '',
                    companyName: '',
                    regMoney: '',
                    contact: '',
                    contactNum: '',
                    qq: '',
                    fax: '',
                    provinceId: '',
                    provinceName: '',
                    cityId: '',
                    cityName: '',
                    districtId: '',
                    districtName: '',
                    address: '',
                    sellerProfile: '',
                    cover: '',
                    allCer: '',
                    bussinessLic: '',
                    codeLic: '',
                    financeLic: '',
                    saleId: '',
                    saleName: '',
                    saleMobile: ''
                },
                userDataRule: {
                    companyName: [{
                        required: true,
                        message: '注册公司名不能为空',
                        trigger: 'blur'
                    }],
                    regMoney: [{
                        required: true,
                        message: '注册资金不能为空',
                        trigger: 'blur'
                    }],
                    contact: [{
                        required: true,
                        message: '联系人不能为空',
                        trigger: 'blur'
                    }],
                    contactNum: [{
                        required: true,
                        message: '联系电话不能为空',
                        trigger: 'blur'
                    }],
                    qq: [{
                        required: true,
                        message: 'QQ不能为空',
                        trigger: 'blur'
                    }],
                    fax: [{
                        required: true,
                        message: '传真不能为空',
                        trigger: 'blur'
                    }],
                    provinceId: [{
                        required: true,
                        message: '请选择办公地址',
                        trigger: 'change'
                    }],
                    address: [{
                        required: true,
                        message: '详细地址不能为空',
                        trigger: 'blur'
                    }],
                    sellerProfile: [{
                        required: true,
                        message: '填写店铺简介',
                        trigger: 'blur'
                    }]
                }
            }
        },
        computed: {
            ...mapGetters(['base']),
            isOk() {
                let obj = this.$clearData(this.userData),
                    ok = true,
                    picOk = true;
                ['id','saleId', 'saleName', 'saleMobile', 'cover', 'allCer', 'bussinessLic', 'codeLic', 'financeLic'].forEach(key => delete obj[key]);
                Object.keys(obj).forEach(key => {
                    if (obj[key] == '') {
                        ok = false;
                        return
                    }
                });
    
                if (this.cerfType == 1) {
                    picOk = this.userData.allCer != ''
                } else {
                    picOk = this.userData.bussinessLic != '' && this.userData.codeLic != '' && this.userData.financeLic != ''
                }
                return ok && picOk
            }
        },
        watch: {
            pass(val) {
                if (val == undefined) {
                    this.step = 0;
                } else if (val == 2 || val == 3) {
                    this.step  = 2;
                } else if (val == 1) {
                    this.step = 3;
                }
            }
        },
        methods: {
            // 查询审核状态
            getStep() {
                this.$http.post(this.$api.getBuserInfoByUserId, {
                    bUserId: this.base.id
                }).then(res => {
                    if (res.code === 1000) {
                        this.pass = res.data.buserInfo ? res.data.buserInfo.pass : undefined;
                        if(res.data.buserInfo){
                            Object.keys(this.userData).forEach(key => this.userData[key] = res.data.buserInfo[key] ? res.data.buserInfo[key] : '');
                            this.remark = res.data.buserInfo.remark;
                        } 
                    }
                })
            },
            //同步地区
            asyncData(data) {
                Object.keys(data).forEach(key => this.userData[key] = data[key]);
            },
            // 提交信息
            commitInFo() {
                if (this.isOk) {
                    this.spinShow = true;
                    window.scrollTo(0, 0);
                    let apiUrl = this.isFirst ? this.$api.AcUser : this.$api.AcUserAgain;
                    this.$http.post(apiUrl, this.userData).then(res => {
                        if (res.code === 1000) {
                            this.pass = res.data.pass;
                            this.step = 2;
                        } else {
                            this.$Message.error(res.message);
                        }
                        this.spinShow = false;
                    })
                } else {
                    this.$Message.error('请将信息填写完整');
                }
            },
            reCommit() {
                this.isFirst = false;
                this.step--;
            }
        },
        created() {
            this.getStep();
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../assets/base.less');
    .inner-1200 {
        position: relative;
        width: 1200px;
        height: 100%;
        margin: 0 auto;
    }
    
    .agreement {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        .panel {
            width: 550px;
            height: 520px;
            background-color: #fff;
            margin: 10% auto 0;
            .header {
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding: 0 16px;
                color: #fff;
                font-size: 14px;
                background-color: @mask_blue;
                .iconfont {
                    float: right;
                    cursor: pointer;
                }
            }
            .cont {
                width: 100%;
                height: 400px;
                padding: 20px;
                overflow-x: hidden;
                border-bottom: @b_d1;
            }
            .bar-btn {
                width: 100%;
                height: 80px;
                line-height: 80px;
                text-align: center;
                a {
                    display: inline-block;
                    width: 100px;
                    height: 40px;
                    color: #fff;
                    line-height: 40px;
                    text-align: center;
                    background-color: @dark_blue;
                    .borderRadius;
                    &.goast {
                        background-color: #fff;
                        color: @f_goast;
                        border: 2px solid @back_gray;
                    }
                }
            }
        }
    }
    
    .ac-container {
        width: 100%;
        min-height: 100%;
        background-color: #edeef2;
        padding-bottom: 30px;
        .head {
            width: 100%;
            height: 100px;
            line-height: 100px;
            background-color: #fff;
            margin-bottom: 40px;
            .iconfont {
                font-size: 60px;
                color: @dark_blue;
            }
            .tit {
                position: relative;
                display: inline-block;
                vertical-align: bottom;
                font-size: 28px;
                color: @f_dark;
                top: -8px;
                left: 30px;
            }
        }
        .step-bar {
            width: 100%;
            height: 150px;
            margin-bottom: 30px;
            .inner-1200 {
                background-color: #fff;
                .borderRadius;
                box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
                padding: 45px 190px;
            }
            .steps {
                .flex-block;
                .justify-content(space-between);
                .step-item {
                    position: relative;
                    width: 180px;
                    height: 60px;
                    .iconfont {
                        position: absolute;
                        font-size: 60px;
                        color: @back_gray;
                        left: 0;
                        top: 0;
                    }
                    p {
                        text-indent: 90px;
                        line-height: 30px;
                        color: @f_dark;
                        font-size: 14px;
                        &.go {
                            font-size: 12px;
                            color: @f_goast;
                        }
                    }
                    &.active .iconfont {
                        color: @dark_blue;
                    }
                }
            }
        }
        .content {
            width: 100%;
            .borderRadius;
            .inner-1200 {
                background-color: #fff;
                min-height: 800px;
                .borderRadius;
                box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
                padding-top: 40px;
            }
            .step0 {
                width: 880px;
                margin: 0 auto;
                .btn {
                    display: inline-block;
                    width: 100px;
                    height: 40px;
                    color: #fff;
                    line-height: 40px;
                    text-align: center;
                    background-color: @dark_blue;
                    .borderRadius;
                }
            }
            .tip {
                position: relative;
                width: 880px;
                padding: 30px 40px;
                margin: 0 auto 40px;
                .borderRadius;
                h3 {
                    font-size: 20px;
                    line-height: 26px;
                }
                p {
                    font-size: 14px;
                    line-height: 19px;
                    margin-top: 10px;
                }
                &.red {
                    background-color: @goast_red;
                    color: @dark_red;
                }
                &.blue {
                    background-color: @goast_blue;
                    color: @dark_blue;
                }
                .action {
                    position: absolute;
                    display: inline-block;
                    width: 100px;
                    height: 50px;
                    line-height: 50px;
                    right: 30px;
                    top: 36px;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    background-color: @light_red;
                    border-bottom: 4px solid @dark_red;
                    .borderRadius;
                }
            }
            .step1 {
                width: 100%;
                padding: 60px 50px 0 158px;
                .f-title {
                    color: @f_dark;
                    font-size: 14px;
                    font-weight: bold;
                    margin: 38px 0;
                }
                .show-pic {
                    display: inline-block;
                    width: 240px;
                    height: 150px;
                    vertical-align: middle;
                }
                .certificates {
                    width: 100%;
                    padding: 0 40px;
                    .pic-item {
                        margin-top: 30px;
                        margin-right: 30px;
                        float: left;
                    }
                }
                .footer {
                    width: 100%;
                    height: 100px;
                    line-height: 100px;
                    text-align: center;
                    a {
                        display: inline-block;
                        width: 100px;
                        height: 40px;
                        color: #fff;
                        line-height: 40px;
                        text-align: center;
                        background-color: @dark_blue;
                        border: 2px solid @dark_blue;
                        margin: 0 20px;
                        .borderRadius;
                        &.goast {
                            background-color: #fff;
                            color: @f_goast;
                            border-color: @back_gray;
                        }
                    }
                }
            }
        }
    }
</style>



