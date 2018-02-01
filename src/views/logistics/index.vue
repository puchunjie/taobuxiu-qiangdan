<template>
    <div class="logistics-container">
        <div class="banner-container">
            <div class="inner-warp">
                <longBar isNew>
                    <span style="font-size:30px;vertical-align: middle;" class="iconfont icon-ziyuandefuben"></span>
                    <span class="shu"></span>
                    <span style="font-size:18px">物流中心</span>
                </longBar>
                <p class="p1">淘不锈物流 让钢材运</p>
                <p class="p2">更简单、更放心、更准时</p>
                <lForm></lForm>
            </div>
    
        </div>
        <div class="icons-container">
            <h2 class="title">淘不锈物</h2>
            <p class="f-title">淘不锈物流，是全国大宗商品领域中首家推出免费上门质检与先行赔付的物流平台。</p>
            <div class="icon-boxs inner-warp">
                <div class="item">
                    <img src="../../assets/logistics/Shape0.png">
                    <h3>快速报价</h3>
                    <p>专业物流团队为您报价快又准</p>
                </div>
                <div class="item">
                    <img src="../../assets/logistics/Shape1.png">
                    <h3>服务免费</h3>
                    <p>服务免费助您找到合适承运商</p>
                </div>
                <div class="item">
                    <img src="../../assets/logistics/Shape2.png">
                    <h3>价格美丽</h3>
                    <p>资源整合，信息透明，降低货运成本</p>
                </div>
                <div class="item">
                    <img src="../../assets/logistics/Shape3.png">
                    <h3>保障安全</h3>
                    <p>签订协议，全程跟踪，保障货物安全</p>
                </div>
                <div class="item">
                    <img src="../../assets/logistics/Shape4.png">
                    <h3>省时省力</h3>
                    <p>筛选优质承运商，轻松委托，讲究实效</p>
                </div>
                <div class="item">
                    <img src="../../assets/logistics/Shape5.png">
                    <h3>资源优势</h3>
                    <p>与签约物流商合作服务有保证</p>
                </div>
            </div>
        </div>
        <div class="aboust">
            <div class="inner-warp" style="padding:0 100px;overflow: hidden;">
                <h3 class="tit">我们致力</h3>
                <p class="desc">通过互联网技术与物流服务的有效结合，<br> 为需求客户与优质承运商提供高效率，<br> 高品质的匹配对接，<br> 成为物流环节中最值得信赖的桥梁</p>
                <vue-seamless-scroll :data="listData" class="seamless-warp">
                    <ul class="item">
                        <li v-for="(item,i) in listData" :key="i">
                            <span class="date">{{ item.createTime | dateformat('hh:mm') }}</span>
                            <span class="tel">{{ item.tell }}</span>
                            <span style="margin-left:60px">委托货物<span style="color:#1BC08B">{{ item.event }}</span>吨(T)</span>
                        </li>
                    </ul>
                </vue-seamless-scroll>
            </div>
        </div>
        <div class="pt">
            <div class="inner-warp">
                <img src="../../assets/logistics/logistics3.png">
                <div class="text">
                    <h3>淘不锈物流APP</h3>
                    <p>客户版&车队版</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="inner-warp">
                <publicFooter></publicFooter>
            </div>
        </div>
    </div>
</template>

<script>
    import lForm from './lForm.vue'
    import publicFooter from '@/components/publicFooter.vue'
    import longBar from '@/components/loginBar'
    import loginInit from '@/utils/loginInit.js'
    import push from '@/utils/push.js'
    export default {
        mixins: [loginInit, push],
        components: {
            lForm,
            publicFooter,
            longBar
        },
        data() {
            return {
                listData: []
            }
        },
        methods: {
            getLogs() {
                this.$http.post(this.$api.findScrollFreightLogisticOrder).then(res => {
                    if (res.code === 1000)
                        this.listData = res.data;
                })
            }
        },
        created() {
            this.getLogs();
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/base.less');
    .logistics-container {
        width: 100%;
        background-color: @bg_color;
        .inner-warp {
            position: relative;
            width: 1200px;
            height: 100%;
            margin: 0 auto;
        }
        .banner-container {
            width: 100%;
            height: 640px;
            background: url('../../assets/logistics/logistics1.png') no-repeat;
            background-size: cover;
            .shu {
                display: inline-block;
                width: 1px;
                height: 30px;
                border-right: 1px solid #fff;
                margin: 0 20px;
                vertical-align: middle;
            }
            .p1 {
                color: #fff;
                font-size: 30px;
                text-align: center;
            }
            .p2 {
                color: #fff;
                font-size: 48px;
                text-align: center;
                margin-top: 10px;
            }
        }
        .icons-container {
            width: 100%;
            height: 1100px;
            padding-top: 300px;
            text-align: center;
            .title {
                color: #333;
                font-size: 30px;
                line-height: 40px;
            }
            .f-title {
                margin-top: 10px;
                color: #666;
                font-size: 18px;
                line-height: 40px;
            }
            .icon-boxs {
                margin-top: 90px;
                .item {
                    float: left;
                    width: 376px;
                    height: 240px;
                    padding: 50px 0;
                    background-color: #fff;
                    margin-right: 36px;
                    margin-bottom: 40px;
                    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    img {
                        display: block;
                        margin: 0 auto 20px;
                        width: 50px;
                        height: 50px;
                    }
                    h3 {
                        font-size: 24px;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    p {
                        font-size: 14px;
                        color: #666;
                        line-height: 30px;
                    }
                }
            }
        }
        .aboust {
            position: relative;
            width: 100%;
            height: 600px;
            background: url('../../assets/logistics/logistics2.png') no-repeat;
            background-size: cover;
            color: #fff;
            .tit {
                font-size: 48px;
                margin-top: 160px;
            }
            .desc {
                font-size: 24px;
                line-height: 50px;
                margin-top: 10px;
                font-weight: 100px;
            }
            .seamless-warp {
                position: absolute;
                width: 420px;
                height: 420px;
                top: 100px;
                right: 16px;
                overflow: hidden;
                .item li {
                    width: 412px;
                    height: 40px;
                    line-height: 40px;
                    background-color: #fff;
                    .opacity(.9);
                    .borderRadius(20px);
                    font-size: 12px;
                    color: #666;
                    text-indent: 50px;
                    margin-bottom: 20px;

                    .tel{
                        margin-left: 60px;
                    }
                }
            }
        }
        .pt {
            width: 100%;
            height: 630px;
            img {
                position: absolute;
                width: 912px;
                height: 550px;
                bottom: 0;
            }
            .text {
                position: absolute;
                width: 350px;
                text-align: right;
                color: #333;
                top: 90px;
                right: 65px;
                h3 {
                    font-size: 48px;
                }
                p {
                    margin-top: 10px;
                    font-size: 30px;
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
</style>

