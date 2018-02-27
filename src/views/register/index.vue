<template>
    <div class="register-container">
        <div class="register-logo">
            <span class="logo iconfont icon-ziyuan4"></span><span class="fnt">用户注册</span>
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
                    <input class="goast-input" placeholder="手机验证码" v-model="apiData.smsCode" @blur="check(apiData.smsCode,'手机验证码')">
                    <a class="getsms" :class="{'disabled':!show}" @click="getmsCode">{{ show?'获取验证码':`重新获取(${count}s)` }}</a>
                </div>
                <div class="reg-form-wrap">
                    <input class="goast-input goast-small" placeholder="输入验证码" v-model="apiData.picCode" @blur="check(apiData.picCode,'验证码')">
                    <img class="img-code" @click="random = Math.random()" :src="picCodeUrl" />
                    <a @click="random = Math.random()" class="refresh"><span class="iconfont icon-msnui-refresh-line"></span></a>
                </div>
                <div class="reg-form-wrap smallpadding">
                    <p class="agreement"> 阅读并同意 <a href="">《淘不锈注册协议》</a></p>
                </div>
                <div class="reg-form-wrap smallpadding">
                    <a class="btn" @click="registerBtn">注册</a>
                </div>
                <!-- //  错误提示框 -->
                <div class="err" v-show="isErr">
                    <span class="iconfont icon-ziyuan5"></span> {{ errInfo }}
                </div>
            </div>
        </div>
        <p class="copyright">COPYRIGHT copyright 2017 jiedan8.cn 无锡淘不锈电子商务有限公司 版权所有 苏ICP备16036551号-2</p>
        <!-- <Modal v-model="regSuccess" closable okText="申请认证" cancelText="不申请认证" @onOk="regVal" @onCancel="regCancel">
                                <div>注册成功！</div>
                                <div>是否前往申请认证商家账户</div>
                            </Modal> -->
    </div>
</template>

<script>
    import * as types from '@/store/types'
    export default {
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
                show: true
            }
        },
        computed: {
            isMobileOk() {
                return /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.apiData.mobile)
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
                        this.$Message.error('请输入正确的手机号');
                        this.$refs.mobile.focus();
                    }
                }
            },
            getMSCode() {
                return this.$http.post(this.$api.reg_msg_code, {
                    mobile: this.apiData.mobile
                })
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
        background: url('../../assets/registerBg.jpg') center center / cover no-repeat fixed;
        .register-logo {
            padding: 160px 0 100px;
            text-align: center;
            font-size: 36px;
            color: #fff;
            .logo {
                font-size: 60px;
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
            }
            .agreement {
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
</style>



