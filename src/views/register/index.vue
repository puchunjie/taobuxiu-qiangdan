<template>
    <div class="register-container">
        <div class="register-bg"></div>
        <div class="register-logo">
            <router-link to="/index" class="logo iconfont icon-ziyuan4"></router-link><span class="fnt">用户注册</span>
        </div>
        <div class="register-body">
            <div class="reg-form">
                <div class="reg-form-wrap">
                    <input class="goast-input" ref="mobile" placeholder="请输入手机号码" v-model="apiData.mobile" @blur="check(apiData.mobile,'手机号码')">
                </div>
                <div class="reg-form-wrap">
                    <input class="goast-input" type="password" placeholder="请设置密码" v-model="apiData.passwordOne" @blur="check(apiData.passwordOne,'密码')">
                </div>
                <div class="reg-form-wrap">
                    <input class="goast-input goast-small" ref="picCode" placeholder="输入验证码" v-model="apiData.picCode" @blur="check(apiData.picCode,'验证码')">
                    <img class="img-code" @click="random = Math.random()" :src="picCodeUrl" />
                    <a @click="random = Math.random()" class="refresh"><span class="iconfont icon-msnui-refresh-line"></span></a>
                </div>
                <div class="reg-form-wrap">
                    <input class="goast-input" placeholder="手机验证码" v-model="apiData.smsCode" @blur="check(apiData.smsCode,'手机验证码')">
                    <a class="getsms" :class="{'disabled':!show}" @click="getsms">{{ show?'获取验证码':`重新获取(${count}s)` }}</a>
                </div>
                <div class="reg-form-wrap smallpadding">
                    <p class="agreement"><i class="iconfont" @click="agrHandle" :class="agreement ? 'icon-check-box':'icon-check_box_unselecte'"></i> 阅读并同意 <a @click="protocolHide = true">《淘不锈注册协议》</a></p>
                </div>
                <div class="reg-form-wrap smallpadding">
                    <a class="btn" :class="agreement ? '':'disabled'" @click="registerBtn">注册</a>
                </div>
                <div class="reg-form-wrap smallpadding">
                    <div class="goLogin">已有账号？<router-link to="/login">去登录</router-link></div>
                </div>
                <!-- //  错误提示框 -->
                <div class="err" v-show="isErr">
                    <span class="iconfont icon-ziyuan5"></span> {{ errInfo }}
                </div>
            </div>
        </div>
        <p class="copyright">COPYRIGHT copyright 2017 jiedan8.cn 无锡淘不锈电子商务有限公司 版权所有 苏ICP备16036551号-2</p>
        <Modal v-model="protocolHide" width="800" title="淘不锈注册协议">
            <div class="protocol">
                <div class="cont">
                   <protocol></protocol>
                </div>
            </div>
            <div slot="footer">
                <a class="btns" @click="protocolHide = false,agreement = true">同意</a>
            </div>
        </Modal>
    </div>
</template>

<script>
import protocol from './protocol'
    import * as types from '@/store/types'
    export default {
        components: {
           protocol 
        },
        data() {
            return {
                apiData: {
                    mobile: '',
                    passwordOne: '',
                    passwordTwo: '',
                    smsCode: '',
                    picCode: ''
                },
                random: '11',
                isErr: false,
                errInfo: '',
                time: null,
                count: '',
                show: true,
                protocolHide: false,
                agreement: true
            }
        },
        computed: {
            isMobileOk() {
                return /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.apiData.mobile)
            },
            isPicCode() {
                return this.apiData.picCode != '';
            },
            //  刷新图片
            picCodeUrl() {
                let host = '';
                if (window.location.hostname == 'localhost')
                    host = 'http://192.168.0.251'
                return host + this.$api.reg_pic_code + '?t=' + this.random
            },
    
        },
        methods: {
            check(val, key) {
                if (val == '') {
                    this.isErr = true;
                    this.errInfo = key + '不能为空'
                } else {
                    this.isErr = false;
                    this.errInfo = '';
                }
            },
            //  注册
            registerBtn() {
                this.register();
            },
            register() {
                if(this.agreement){
                if (this.apiData.passwordOne != '' && this.apiData.mobile != '' && this.apiData.smsCode != '' && this.apiData.picCode != '') {
                    this.apiData.passwordTwo = this.apiData.passwordOne;
                    this.$http.post(this.$api.registUser, this.apiData).then(res => {
                        if (res.code === 1000) {
                            this.$http.post(this.$api.login, {
                                mobile: this.apiData.mobile,
                                password: this.apiData.passwordOne
                            }).then(res => {
                                if (res.code === 1000) {
                                    this.$store.commit(types.LOGIN, {
                                        authorization: res.data.authorization,
                                        loginId: res.data.loginId
                                    });
    
                                    this.$Modal.confirm({
                                        title: '注册成功！',
                                        content: '否前往申请认证商家账户?',
                                        onOk: () => {
                                            this.$router.replace({
                                                path: '/Authentication'
                                            })
                                        },
                                        onCancel: () => {
                                            this.$router.replace({
                                                path: '/'
                                            })
                                        }
                                    })
                                }
                            })
                        } else {
                            this.$Message.error(res.message)
                        }
                    })
                } else {
                    this.$Message.error('请完善表单信息')
                }
                }
            },
    
            //  获取验证码
            getsms() {
                if (this.apiData.mobile != '') {
                    if (this.apiData.picCode != '') {
                        this.checkPicCode();
                    } else {
                        this.isErr = true;
                        this.errInfo = '请输入图形验证码';
                    }
                } else {
                    this.isErr = true;
                    this.errInfo = '请输入手机号码';
                }
            },
            checkPicCode() {
                let params = {
                    mobile: this.apiData.mobile,
                    picCode: this.apiData.picCode,
                    passwordOne: this.apiData.passwordOne,
                    passwordTwo: this.apiData.passwordOne
                }
                this.$http.post(this.$api.checkPicCode, params).then(res => {
                    if (res.code === 1000) {
                        this.getmsCode();
                    } else {
                        this.isErr = true;
                        this.errInfo = res.message
                    }
                })
            },
            //  获取短信验证码
            getmsCode() {
                if (this.show) {
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
                        this.isErr = true;
                        this.errInfo = '请输入正确的手机号'
                    }
                }
            },
            getMSCode() {
                return this.$http.post(this.$api.reg_msg_code, {
                    mobile: this.apiData.mobile
                })
            },
            agrHandle(){
                this.agreement = !this.agreement;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/base.less');
    .inner-1200 {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
    }
    
    .register-container {
        width: 100%;
        height: 100%;
        .register-bg{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('../../assets/registerBg.jpg') center center no-repeat;
            background-size: 100% 100%;
            z-index: -1;
        }
        .register-logo {
            padding: 160px 0 100px;
            text-align: center;
            font-size: 36px;
            color: #fff;
            .logo {
                font-size: 60px;
                color: #fff;
            }
            .fnt {
                position: relative;
                top: -14px;
                display: inline-block;
                margin-left: 16px;
                padding-left: 12px;
                vertical-align: middle;
                border-left: 1px solid #fff;
            }
        }
        .register-body {
            width: 360px;
            margin: 0 auto;
            color: #fff;
            .reg-form {
                position: relative;
                .err {
                    position: absolute;
                    top: -25px;
                    left: 0;
                }
            }
            .reg-form-wrap {
                position: relative;
                padding: 15px 0;
                &.smallpadding {
                    padding: 12px 0;
                }
                .goast-input {
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    background-color: #fff;
                    padding: 0 16px;
                    outline: 0;
                    border: 2px solid transparent;
                    transition: all .2s ease-in-out;
                    .borderRadius(4px);
                    &:focus {
                        border-color: #2856B6
                    }
                    &.goast-small {
                        width: 60%;
                    }
                }
                .getsms {
                    position: absolute;
                    right: 16px;
                    top: 30px;
                    color: #2856B6;
                    font-size: 14px;
                    cursor: pointer;
                    z-index: 9;
                    &.disabled {
                        color: #888;
                        cursor: default;
                    }
                }
                .img-code {
                    position: absolute;
                    width: 120px;
                    height: 40px;
                    right: 0;
                    top: 17px;
                }
                .refresh span {
                    position: absolute;
                    right: -33px;
                    top: 26px;
                    font-size: 20px;
                    color: #fff;
                    cursor: pointer;
                }
            }
            .btn {
                display: block;
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                text-align: center;
                color: #fff;
                background-color: @dark_blue;
                .borderRadius(2px);
                &:hover {
                    background-color: @hover_blue;
                }
                &.disabled{
                    background: #888;
                    cursor: not-allowed;
                }
            }
            .agreement {
                .iconfont{
                    position: relative;
                    cursor: pointer;
                    vertical-align: -2px;
                    &.icon-check-box{
                        color: #2856B6;
                        z-index: 9;
                        &:after{
                            content: '';
                            position: absolute;
                            width: 14px;
                            height: 14px;
                            display: inline-block;
                            top: 1px;
                            left: 1px;
                            background-color: #fff;
                            z-index: -1;
                        }
                    }
                    &.icon-check_box_unselecte{
                        color: #fff;
                    }
                }
                a {
                    color: #fff;
                }
            }
        }
    }
    
    .copyright {
        text-align: center;
        font-size: 12px;
        color: #fff;
        margin-top: 180px;
    }
    .goLogin{
        text-align: center;
        a{
            color: #fff;
        }
    }
    .protocol{
        max-height: 600px;
        overflow-y: scroll;
    }
    .protocol::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
    }
    
    .protocol::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }
</style>



