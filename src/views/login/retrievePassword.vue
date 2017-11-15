<template>
    <div class="r-container">
        <div class="header">
            <div class="inner-1200">
                <a class="warp-logo" href="/qd/index"><span class="logo iconfont icon-ziyuan4"></span></a>
                <h3>找回密码</h3>
            </div>
        </div>
        <div class="content">
            <div class="inner">
                <div class="line">
                    <div class="item-warp" :class="{'active':step == i+1,'done':i+1<step}" v-for="(el,i) in steps" :key="i">
                        <div class="item">
                            <span>{{ i+1 }}</span>
                        </div>
                        <p>{{ el }}</p>
                    </div>
                </div>
                <div class="step-container" v-show="step == 1">
                    <div class="from-group">
                        <i-form ref="forPhone" :model="forPhone" :rules="phoneRule" :label-width="140">
                            <form-item label="手机号码" prop="mobile">
                                <i-input ref="mobile" class="long" v-model="forPhone.mobile" placeholder="请输入手机号"></i-input>
                            </form-item>
                            <form-item label="验证码" prop="picCode">
                                <i-input class="short" v-model="forPhone.picCode" placeholder="请输入验证码"></i-input>
                                <img class="img-code" :src="picCodeUrl" />
                                <a @click="random = Math.random()">看不清楚？点击更换</a>
                            </form-item>
                            <form-item label="校验码" prop="smsCode">
                                <i-input class="short" v-model="forPhone.smsCode" placeholder="请输入验证码"></i-input>
                                <a class="btn" :class="{'disabled':!show}" @click="getmsCode">{{ show?'获取手机验证码':`重新获取(${count}s)` }}</a>
                                <Tooltip placement="right-start" class="tip">
                                    <a>没收到验证码？</a>
                                    <div slot="content">
                                        <p>1.短信通道异常，可重新获取手机验证码或稍后再试</p>
                                        <p>2.请核实手机是否屏蔽了系统短信</p>
                                        <p>3.若手机号已丢失或停用，请联系平台工作人员</p>
                                        <p>4.若有其他疑问，请拨打客服热线：0510-81812186</p>
                                    </div>
                                </Tooltip>
                            </form-item>
                            <form-item class="btn-group">
                                <a class="btn disabled" href="/qd/index">放弃找回</a>
                                <a class="btn" @click="validateFirst('forPhone')">下一步</a>
                            </form-item>
                        </i-form>
                    </div>
    
                </div>
    
                <div class="step-container" v-show="step == 2">
                    <div class="from-group">
                        <i-form ref="pwd" :model="pwd" :rules="pwdRule" :label-width="140">
                            <form-item label="设置新密码" prop="password1">
                                <i-input class="mid" type="password" v-model="pwd.password1" placeholder="请输入新密码"></i-input>
                                <strength v-model="pwd.password1"></strength>
                            </form-item>
                            <form-item label="验证密码" prop="password2">
                                <i-input class="mid" type="password" v-model="pwd.password2" placeholder="请再次输入新密码"></i-input>
                            </form-item>
                            <form-item class="btn-group">
                                <a class="btn" @click="validateSecond('pwd')">下一步</a>
                            </form-item>
                        </i-form>
                    </div>
                </div>
    
                <div class="step-container" v-show="step == 3">
                    <p class="success">
                        <span class="iconfont icon-chenggong"></span> 密码修改成功！
                    </p>
                    <div class="btn-group" style="text-align:center">
                        <a class="btn" href="/qd/login">返回登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import strength from './strength'
    import * as types from '@/store/types'
    // 手机格式验证
    const validatePhone = (rule, value, callback) => {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
            callback(new Error('请输入正确的手机格式'));
        } else {
            callback();
        }
    };
    
    
    
    export default {
        components: {
            strength
        },
        data() {
            return {
                show: true,
                count: '',
                timer: null,
                steps: ['验证手机号', '重置密码', '完成'],
                step: 1, //步骤
                forPhone: {
                    mobile: '',
                    picCode: '',
                    smsCode: ''
                },
                random: '11',
                phoneRule: {
                    mobile: [{
                            required: true,
                            message: '请输入正确手机号',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 11,
                            max: 11,
                            message: '请输入正确的手机号',
                            trigger: 'blur'
                        },
                        {
                            validator: validatePhone,
                            trigger: 'blur'
                        }
                    ],
                    picCode: [{
                            required: true,
                            message: '请输入验证码',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 4,
                            max: 4,
                            message: '请输入4位正确数字',
                            trigger: 'blur'
                        },
                    ],
                    smsCode: [{
                            required: true,
                            message: '请输入验证码',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            max: 6,
                            message: '请输入6位正确数字',
                            trigger: 'blur'
                        },
                    ]
                },
                pwd: {
                    password1: '',
                    password2: ''
                },
                pwdRule: {
                    password1: [{
                            required: true,
                            message: '请输入新密码',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '密码不得少于6位!',
                            trigger: 'blur'
                        }
                    ],
                    password2: [{
                            required: true,
                            message: '请重复密码!',
                            trigger: 'blur'
                        },
                        {
                            validator: this.repwd,
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        computed: {
            isMobileOk() {
                return /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.forPhone.mobile)
            },
            picCodeUrl() {
                let host = '';
                if (window.location.hostname == 'localhost')
                    host = 'http://192.168.0.251/'
                return host + this.$api.pic_code + '?t=' + this.random
            }
        },
        methods: {
            // 密码重复
            repwd(rule, value, callback) {
                if (value != this.pwd.password1) {
                    callback(new Error('密码不一致！'));
                } else {
                    callback();
                }
            },
            // 获取手机验证码
            getmsCode() {
                if (this.isMobileOk) {
                    this.getMSCode();
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.show = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.show = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                } else {
                    this.$Message.error('请输入正确的手机号');
                    this.$refs.mobile.focus();
                }
            },
            getMSCode() {
                return this.$http.post(this.$api.msg_code, {
                    mobile: this.forPhone.mobile
                })
            },
            // 第一步校验
            checkStep1() {
                return this.$http.post(this.$api.validateFirst, this.forPhone)
            },
            validateFirst(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.checkStep1().then(res => {
                            if (res.code === 1000) {
                                this.step = 2;
                            } else {
                                this.$Message.error(res.message);
                            }
                        })
                    } else {
                        this.$Message.error('请检查表单是否正确填写');
                    }
                })
            },
            checkStep2() {
                let params = Object.assign(this.pwd, {
                    mobile: this.forPhone.mobile
                });
                return this.$http.post(this.$api.validateSecond, params)
            },
            validateSecond(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.checkStep2().then(res => {
                            if (res.code === 1000) {
                                this.$store.commit(types.LOGOUT);
                                this.step = 3;
                            } else {
                                this.$Message.error(res.message);
                            }
                        })
                    } else {
                        this.$Message.error('请检查表单是否正确填写');
                    }
                })
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../assets/base.less';
    input:-webkit-autofill {
        box-shadow: 0 0 0 30px #fff inset;
        -webkit-text-fill-color: #555
    }
    
    .r-container{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }

    .inner-1200 {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
    }
    
    .header {
        width: 100%;
        height: 100px;
        border-bottom: 1px solid @b_gray;
        background-color: #fff;
        .warp-logo{
            display: block;
            float: left;
            margin: 20px 30px 0 0;
            cursor: pointer;
        }
        .logo {
            font-size: 65px;
            color: @dark_blue;
        }
        h3 {
            position: relative;
            top: 50px;
            font-size: 28px;
            color: @f_goast;
            font-weight: bold;
        }
    }
    
    .content {
        width: 100%;
        .inner {
            width: 900px;
            margin: 77px auto 0;
        }
        .line {
            width: 100%;
            .item-warp {
                display: inline-block;
                width: 100%/3;
                text-align: center;
                .item {
                    width: 100%;
                    height: 8px;
                    background-color: @back_gray;
                    span {
                        position: relative;
                        display: inline-block;
                        width: 36px;
                        height: 36px;
                        top: -14px;
                        line-height: 36px;
                        border-radius: 18px;
                        background-color: @back_gray;
                        text-align: center;
                        color: #fff;
                        font-size: 18px;
                    }
                }
                p {
                    margin-top: 30px;
                    font-size: 18px;
                    color: @mask_blue;
                    .opacity(0);
                }
                &.active {
                    .item,
                    .item span {
                        background-color: @mask_blue;
                    }
                    p {
                        .opacity(1);
                    }
                }
                &.done {
                    .opacity(.5);
                    .item,
                    .item span {
                        background-color: @mask_blue;
                    }
                    p {
                        .opacity(1);
                    }
                }
            }
        }
        .from-group {
            margin-top: 80px;
            .long {
                width: 300px;
            }
            .mid {
                width: 240px;
            }
            .short {
                width: 160px;
                margin-right: 20px;
            }
            .img-code {
                width: 120px;
                height: 30px;
                vertical-align: middle;
                cursor: pointer;
                margin-right: 10px;
                border: @b_d1;
            }
            .btn {
                display: inline-block;
                width: 120px;
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                background-color: @mask_blue;
                color: #fff;
                text-align: center;
                margin-right: 10px;
                .borderRadius;
                &.disabled {
                    .opacity(.5);
                }
            }

            .tip p{
                padding-right: 10px; 
            }
        }
        .btn-group {
            margin-top: 40px;
            .btn {
                display: inline-block;
                width: 120px;
                height: 40px;
                line-height: 40px;
                padding: 0 10px;
                background-color: @dark_blue;
                color: #fff;
                text-align: center;
                margin-right: 10px;
                .borderRadius;
            }
        }
        .success {
            width: 100%;
            margin-top: 100px;
            font-size: 46px;
            color: @light_green;
            text-align: center;
            .iconfont {
                font-size: 60px;
                color: @light_green;
            }
        }
    }
</style>

