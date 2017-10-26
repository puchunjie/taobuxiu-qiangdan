<style lang="less" scoped>
    @import '../../assets/base.less';
    input:-webkit-autofill {
        box-shadow: 0 0 0 30px #fff inset;
        -webkit-text-fill-color: #555
    }
    
    .inner-1200 {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
    }
    
    .pr {
        position: relative;
    }
    
    .err {
        position: absolute;
        width: 300px;
        height: 30px;
        line-height: 30px;
        top: 60px;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        background-color: @dark_red;
        .borderRadius(2px);
        .iconfont {
            margin: 0 10px 0 12px;
            font-size: 16px;
        }
    }
    
    .login-container {
        width: 100%;
        min-width: 1200px;
        height: 100%;
        .header {
            width: 100%;
            height: 100px;
            .logo {
                display: block;
                float: left;
                font-size: 65px;
                color: @dark_blue;
                margin: 20px 30px 0 0;
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
            height: 600px;
            background-image: url('../../assets/longin-banner.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            .login-panel {
                position: absolute;
                width: 350px;
                height: 350px;
                background-color: #fff;
                top: 125px;
                right: 80px;
                background-color: rgba(255, 255, 255, .9);
                .head {
                    width: 100%;
                    height: 55px;
                    line-height: 55px;
                    text-align: center;
                    font-size: 18px;
                    color: @f_dark;
                    letter-spacing: 4px;
                    border-bottom: @b_d1;
                }
                .form {
                    height: 106px;
                    overflow: hidden;
                }
                .body {
                    width: 100%;
                    padding: 40px 25px 0;
                    .input-item-warp {
                        height: 40px;
                        line-height: 40px;
                        margin: 0 0 20px 0;
                        label {
                            .iconfont {
                                font-size: 20px;
                                color: #d1d1d1;
                            }
                        }
                    }
                    .wid100 {
                        width: 100%;
                        .level1 {
                            position: relative;
                            width: 230px;
                            height: 30px;
                            top: -4px;
                        }
                    }
                }
                .bar {
                    width: 100%;
                    height: 18px;
                    font-size: 12px;
                    color: @f_goast;
                    line-height: 18px;
                    .iconfont {
                        float: left;
                        font-size: 18px;
                        color: @dark_blue;
                        cursor: pointer;
                        margin-right: 3px;
                    }
                    a.l {
                        float: left;
                        font-size: 12px;
                        color: @f_goast;
                    }
                    a.r {
                        float: right;
                        font-size: 12px;
                        color: @f_goast;
                    }
                }
                .btn {
                    display: block;
                    width: 100%;
                    height: 40px;
                    margin-top: 24px;
                    line-height: 40px;
                    font-size: 18px;
                    text-align: center;
                    color: #fff;
                    background-color: @dark_blue;
                    .borderRadius(2px);
                    &:hover {
                        background-color: @hover_blue;
                    }
                    .iconfont {
                        color: #fff;
                        font-size: 20px;
                    }
                }
                .link {
                    display: inline-block;
                    font-size: 12px;
                    margin-top: 8px;
                    color: @light_blue;
                }
                .go {
                    position: absolute;
                    right: 25px;
                    bottom: 10px;
                }
            }
        }
        .footer {
            width: 100%;
            height: 80px;
        }
    }
</style>

<template>
    <div class="login-container">
        <input type="password" style="position:absolute;top:-999px" />
        <div class="header">
            <div class="inner-1200">
                <router-link :to="{name:'index'}"><span class="logo iconfont icon-ziyuan4"></span></router-link>
                <h3>欢迎登陆</h3>
            </div>
        </div>
        <div class="content">
            <div class="inner-1200 pr">
                <div class="login-panel">
                    <div class="head">用户登录</div>
                    <div class="body">
                        <div class="form">
                            <div class="input-item-warp wid100">
                                <label><span class="iconfont icon-yonghuming"></span></label>
                                <input class="goast-input level1" placeholder="用户名" v-model="api.mobile" @blur="check(api.mobile,'用户名')">
                            </div>
                            <input type="hidden">
                            <div class="input-item-warp wid100">
                                <label><span class="iconfont icon-mima"></span></label>
                                <input class="goast-input level1" placeholder="密码" type="password" v-model="api.password" @blur="check(api.password,'密码')">
                            </div>
                        </div>
                        <div class="bar">
                            <span class="iconfont" :class="savePSD?'icon-check-box':'icon-check_box_unselecte'" @click="savePSD = !savePSD"></span>
                            <a class="l" @click="savePSD = !savePSD">记住密码</a>
                            <a class="r">忘记密码</a>
                        </div>
                        <a class="btn" @click="login">登录</a>
                        <a class="link">没有账户？去注册</a>
                        <a class="link go" target="_blank" href="http://www.itaobuxiu.com">前往淘不锈&gt;&gt;</a>
    
                        <!-- 错误提示框 -->
                        <div class="err" v-show="isErr">
                            <span class="iconfont icon-ziyuan5"></span> {{ errInfo }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    import * as types from '@/store/types'
    export default {
        data() {
            return {
                savePSD: true,
                isErr: false,
                errInfo: '',
                loading: false,
                api: {
                    mobile: '',
                    password: '',
                }
            }
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
            setUser(data) {
                this.$store.commit(types.LOGIN, data);
                let redirect = decodeURIComponent(this.$route.query.redirect || '/buyer/BuserInfo');
                this.$router.push({
                    path: redirect
                })
            },
            login() {
                this.$http.post(this.$api.login, this.api).then(res => {
                    if (res.code === 1000) {
                        this.setUser({
                            authorization: res.data.authorization,
                            loginId: res.data.loginId
                        });
                        this.$Notice.success({
                            title: '登录成功！',
                            desc: '恭喜您已经成功通过验证，天选之人，尽情发挥你的宇宙之力吧！'
                        })
                    } else {
                        this.$Notice.error({
                            title: '登录错误！',
                            desc: '请输入正确的账号密码！'
                        })
                    }
                })
            }
        }
    }
</script>



