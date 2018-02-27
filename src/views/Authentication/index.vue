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
                        <h3>正式使用本平台前，需认证称为企业身份</h3>
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
                            <i-input style="width:100px" placeholder="请输入" v-model="userData.regMoney" class="form-input"></i-input>
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
                            <ajaxSelect class="form-input" style="width:240px" :api="$api.findSalemans" :valueKey="['userId','userName','userMobile']" :labelKey="['userName','userMobile']" @on-select="asyncData"></ajaxSelect>
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
                <div class="step1" v-show="step == 2" style="padding-bottom:40px">
                    <div class="tip red">
                        <h3>审核未通过</h3>
                        <p>原因：文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本</p>
                        <a class="action" @click="reCommit">重新提交</a>
                    </div>
                    <div class="tip blue">
                        <h3>审核中。。。</h3>
                        <p>认证信息提交成功，将在1个工作日内完成审核，请耐心等待</p>
                    </div>
                    <i-form class="form" :label-width="90">
                        <h3 class="f-title" style="margin-top:0">商家基本信息</h3>
                        <form-item label="公司名称">
                            {{ userData.companyName }}
                        </form-item>
                        <form-item label="注册基金">
                            {{ userData.regMoney }}
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
                        <form-item label="绑定专员" v-show="userData.userName != ''">
                            {{ userData.userName }} {{ userData.userMobile }}
                        </form-item>
                        <form-item label="店铺封面" v-show="userData.cover != ''">
                            <uploadPic v-model="userData.cover"></uploadPic>
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
                    It is probably the dream of any amateur astronomer to be able to be the boss of one of the great multi million dollar telescopes even if it was just for one hour or for a few shots. Sure, we can have a lot of fun with our binoculars. And as we improve
                    our personal equipment set, we get better and better at pinpointing what we want to see in the sky. But there is only so far we can go within the constraints of a family budget in building the perfect telescopic operation. Probably the
                    next level then is to work together with others in your astronomy club. By pooling our resources, we can make more progress both in acquiring much more sophisticated equipment and in synchronizing our telescopic operations. All of this
                    is good and its fun to tweak it and play with it always finding improvements. But when we are sitting back and dreaming, it’s those big institutional size telescopes that really grab our interest. Maybe you have had a chance to visit one
                    at Kitt Peak, Arizona, Mauna Kea, Hawaii, Palomar Mountain, California or Mt. Locke, Texas to name just a few and as you walked around jaw dropped to your shoes, you thought, maybe if I could just run it for an hour, how awesome would
                    that be? The good news is that while these huge observatories are not going to let you come in and turn the gears of the mightiest telescopes yourself, many of them will perform specific observations for you and allow you to “see through
                    their eyes” via the internet for that short observation. This is a powerful option for an amateur astronomer and one you want to prepare for carefully. Here is what you do… 1. Begin compiling a list of the great telescopes of the world,
                    their locations and how to contact them. Google will help you with finding lists of these observatories to contact by pointing you to specific directory sites like http://astro.nineplanets.org/bigeyes.html 2. You can start by submitting
                    your request to a specific observatory. Now here is where you have to do your homework. If you have a specific celestial event you wish to observe, there will be particular telescopes around the globe that will be in the best position
                    to get those shots for you. So study up and find just the right telescope and when the perfect moment for that observation would occur. Get out ahead of this homework as you need to submit your request in plenty of time for it to go through
                    approval and for them to get back to you and to interact with you to nail down what you are going to have them look at. 3. There are two ways you can direct the operators of the telescopes. You can give them specific coordinates to focus
                    on and a specific time frame to perform the observation. The other way is to give them a star, a planet or a particular star system to observe and let them figure out the coordinates. That might be easier because you know what you want
                    to see. 4. Now you sit back and wait for the email that the observation is done. You will not be able to watch them do the observation dynamically. That would be nice but it just isn’t possible yet. These are telescopes, not web cams.
                    But they will post the pictures from your observation on a particular web location and email the results to you for study. It’s pretty cool, free and customized to what you requested. And you can brag to your friends as you make color
                    copies of your shots that you had Kitt Peak do these up for you personally. And you would not be lying.
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
    export default {
        components: {
            ajaxSelect,
            citySelect,
            uploadPic,
            tbRadio
        },
        data() {
            return {
                spinShow: false,
                agHide: false,
                cerfType: 1,
                step: 0,
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
                    userId: '',
                    userName: '',
                    userMobile: ''
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
            isOk() {
                let obj = this.$clearData(this.userData),
                    ok = true,
                    picOk = true;
                ['userId', 'userName', 'userMobile', 'cover', 'allCer', 'bussinessLic', 'codeLic', 'financeLic'].forEach(key => delete obj[key]);
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
        methods: {
            // 查询审核状态
            getStep(){
                this.$http.post(this.$api.getBuserInfoByUserId).then(res => {

                })
            },
            //同步地区
            asyncData(data) {
                Object.keys(data).forEach(key => this.userData[key] = data[key]);
            },
            // 提交信息
            commitInFo() {
                // if(this.isOk){
                //     this.spinShow = true;
                //     window.scrollTo(0,0);
                //     this.$http.post(this.$api.registUser,this.userData).then(res => {
                //         if(this.res.code === 1000){ 
    
                //         }else{
                //             this.$Message.error(res.message);
                //         }
                //         this.spinShow = false;
                //     })
                // }else{
                //     this.$Message.error('请将信息填写完整');
                // }
                this.step++;
            },
            reCommit(){
                this.step--;
            }
        },
        created () {
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

                .show-pic{
                    display: inline-block;
                    width:240px;
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



