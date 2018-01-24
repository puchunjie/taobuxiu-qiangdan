<template>
    <div class="app-container">
        <div class="img-bg-view">
            <div class="header">
                <div class="inner-1200">
                    <a class="warp-logo" href="/qd/index"><span class="logo iconfont icon-ziyuan4"></span></a>
                    
                </div>
            </div>
            <div class="content">
                <div class="inner-1200">
                    <h1>接单吧APP</h1>
                    <h2>不锈钢圈的手机生意助手</h2>
                    <div class="qr">
                        <div class="erweima"></div>
                        <div class="btns">
                            <a class="down-btn">
                                <span class="iconfont icon-ios"></span> iOS端下载
                            </a>
                            <a class="down-btn"><span class="iconfont icon-android"></span>安卓端下载</a>
                        </div>
                    </div>
    
                    <img class="p0" src="../../assets/app/p0.png">
                </div>
            </div>
        </div>
        <div class="other-view">
            <div class="inner-1200 title part1" :class="{ 'active' : part1 }">
                <h3>接单吧APP是无锡淘不锈电子商务有限公司专为不锈钢人打造的手机端生意助手。</h3>
                <p>该应用集合了行情市价查询、采购需求发布、实时竞标报价、质检需求发送等功能，旨在提供不锈钢用户更方便更高效更多元的平台使用体验。</p>
            </div>
            <div class="inner-1200 box fl part2" :class="{ 'active' : part2 }">
                <img class="img" src="../../assets/app/p1.png">
                <div class="text">
                    <h3>行情市价查询</h3>
                    <p>及时查看参考价格，了解最新市场行情</p>
                </div>
            </div>
            <div class="inner-1200 box fr part3" :class="{ 'active' : part3 }">
                <img class="img" src="../../assets/app/p2.png">
                <div class="text">
                    <h3>采购需求发布</h3>
                    <p>轻松发布采购需求，使用简易便捷高效</p>
                </div>
            </div>
            <div class="inner-1200 box fl part4" :class="{ 'active' : part4 }">
                <img class="img" src="../../assets/app/p3.png">
                <div class="text">
                    <h3>实时竞标报价</h3>
                    <p>随时参与采购竞标，获取更多生意机会</p>
                </div>
            </div>
            <div class="inner-1200 box fr part5" :class="{ 'active' : part5 }">
                <img class="img" src="../../assets/app/p4.png">
                <div class="text">
                    <h3>质检需求发送</h3>
                    <p>线上发送质检请求，保障交易货品质量</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="inner-container">
                <publicFooter></publicFooter>
            </div>
        </div>
    </div>
</template>

<script>
    import publicFooter from '@/components/publicFooter.vue'
    export default {
        components: {
            publicFooter
        },
        data() {
            return {
                ON_SCREEN_HEIGHT: 50,
                ON_SCREEN_WIDTH: 50,
                part1: false,
                part2: false,
                part3: false,
                part4: false,
                part5: false
            }
        },
        methods: {
            querySelector(target) {
                return document.querySelector(target)
            },
            isOnScreen(element) {
                const rect = element.getBoundingClientRect();
    
                if (rect.width === 0 || rect.height === 0 || element.style.opacity === '0') return false;
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                const windowWidth = window.innerWidth || document.documentElement.clientWidth;
                const elementHeight = element.offsetHeight;
                const elementWidth = element.offsetWidth;
    
                let onScreenHeight = this.ON_SCREEN_HEIGHT > elementHeight ? elementHeight : this.ON_SCREEN_HEIGHT;
                let onScreenWidth = this.ON_SCREEN_WIDTH > elementWidth ? elementWidth : this.ON_SCREEN_WIDTH;
    
                // 元素在屏幕上方
                let elementBottomToWindowTop = rect.top + elementHeight;
                let bottomBoundingOnScreen = elementBottomToWindowTop >= onScreenHeight;
    
                // 元素在屏幕下方
                let elementTopToWindowBottom = windowHeight - (rect.bottom - elementHeight);
                let topBoundingOnScreen = elementTopToWindowBottom >= onScreenHeight;
    
                // 元素在屏幕左侧
                let elementRightToWindowLeft = rect.left + elementWidth;
                let rightBoundingOnScreen = elementRightToWindowLeft >= onScreenWidth;
    
                // 元素在屏幕右侧
                let elementLeftToWindowRight = windowWidth - (rect.right - elementWidth);
                let leftBoundingOnScreen = elementLeftToWindowRight >= onScreenWidth;
    
                return bottomBoundingOnScreen && topBoundingOnScreen && rightBoundingOnScreen && leftBoundingOnScreen;
            },
            screeningPage() {
                let targets = 5; //有多少个要触发的元素
                for (let i = 1; i <= targets; i++) {
                    this['part' + i] = this.isOnScreen(this.querySelector('.part' + i))
                }
            }
        },
        mounted() {
            this.screeningPage();
            window.onscroll = () => {
                this.screeningPage();
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/base.less';
    .inner-1200 {
        position: relative;
        width: 1200px;
        height: 100%;
        margin: 0 auto;
    }
    
    .app-container {
        width: 100%;
        .img-bg-view {
            width: 100%;
            height: 750px;
            background: url('../../assets/app/appbg.png') no-repeat;
            color: #fff;
        }
        .header {
            width: 100%;
            height: 100px;
            box-shadow: 0px 0px 10px -3px #4c4c4c;
            overflow: hidden;
            .warp-logo {
                display: inline-block;
                margin: 20px 0 0 10px;
                cursor: pointer;
                .logo {
                    font-size: 65px;
                    color: #fff;
                }
            }
        }
        .content {
            width: 100%;
            height: 100%;
            color: #fff;
            .inner-1200 {
                padding: 0 40px;
                overflow: hidden;
            }
            h1 {
                font-size: 64px;
                line-height: 85px;
                margin-top: 118px;
                font-weight: 200;
                -webkit-animation: slideUp 1s ease-in-out both;
                animation: slideUp 1s ease-in-out both;
            }
            h2 {
                font-size: 48px;
                line-height: 64px;
                margin-top: 10px;
                font-weight: 200;
                -webkit-animation: slideUp 1s ease-in-out both;
                animation: slideUp 1s ease-in-out both;
            }
            .qr {
                width: 100%;
                height: 200px;
                margin-top: 60px;
                -webkit-animation: slideUp 1s ease-in-out both;
                animation: slideUp 1s ease-in-out both;
                -webkit-animation-delay: .5s;
                animation-delay: .5s;
            }
            .erweima {
                display: inline-block;
                width: 200px;
                height: 200px;
                background-color: #fff;
                margin-right: 20px;
                vertical-align: top;
            }
            .btns {
                display: inline-block;
                width: 240px;
                height: 200px;
                vertical-align: top;
                -webkit-animation: slideUp 1s ease-in-out both;
                animation: slideUp 1s ease-in-out both;
                -webkit-animation-delay: .5s;
                animation-delay: .5s;
            }
            .down-btn {
                position: relative;
                display: block;
                width: 240px;
                height: 80px;
                padding: 0 34px;
                line-height: 80px;
                text-align: right;
                color: #fff;
                font-size: 26px;
                border: 2px solid #fff;
                .borderRadius(40px);
                &+.down-btn {
                    margin-top: 40px;
                }
                .iconfont {
                    position: absolute;
                    font-size: 36px;
                    color: #fff;
                    left: 34px;
                }
                &:hover {
                    background-color: rgba(255, 255, 255, 0.42);
                }
            }
            .p0 {
                position: absolute;
                display: block;
                width: 486px;
                right: 0;
                top: 0;
                -webkit-animation: float ease-in-out 3s infinite;
                animation: float ease-in-out 3s infinite;
            }
        }
        .other-view {
            width: 100%;
            .title {
                text-align: center;
                padding: 60px 0 120px 0;
                h3 {
                    font-size: 30px;
                    color: #44A8F0;
                }
                p {
                    font-size: 18px;
                    color: #757575;
                    margin-top: 30px;
                }
            }
            .active h3,
            .active p,
            .active img,
            .active div {
                -webkit-animation: slideUp 1s ease-in-out both;
                animation: slideUp 1s ease-in-out both;
            }
            .box {
                height: 640px;
                padding-bottom: 40px;
                .img {
                    display: block;
                    width: 600px;
                    height: 600px;
                }
                .text {
                    width: 600px;
                    height: 600px;
                    overflow: hidden;
                    h3 {
                        margin-top: 190px;
                        color: #348DEB;
                        font-size: 50px
                    }
                    p {
                        margin-top: 14px;
                        color: #888;
                        font-size: 28px;
                    }
                }
                &.fl {
                    .img {
                        float: left;
                    }
                    .text {
                        float: right;
                        text-align: right;
                    }
                }
                &.fr {
                    .img {
                        float: right;
                    }
                    .text {
                        float: left;
                    }
                }
            }
        }
        .bottom {
            width: 100%;
            height: 340px;
            background-color: #3E3C3A;
            padding-bottom: 24px;
        }
    }
    
    @-webkit-keyframes float {
        0% {
            -webkit-transform: translateY(0)
        }
        50% {
            -webkit-transform: translateY(-1em)
        }
        100% {
            -webkit-transform: translateY(0)
        }
    }
    
    @keyframes float {
        0% {
            transform: translateY(0)
        }
        50% {
            transform: translateY(-1em)
        }
        100% {
            transform: translateY(0)
        }
    }
    
    @-webkit-keyframes slideUp {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, 30px, 0)
        }
        100% {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0)
        }
    }
    
    @keyframes slideUp {
        0% {
            opacity: 0;
            transform: translate3d(0, 30px, 0)
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0)
        }
    }
</style>
