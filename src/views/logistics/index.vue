<template>
    <div class="logistics-container">
        <div class="banner-container">
            <lForm></lForm>
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
            <div class="inner-warp">
                
            </div>
        </div>
    </div>
</template>

<script>
    import lForm from './lForm.vue'
    export default {
        components: {
            lForm
        },
        data () {
            return {
                
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/base.less');
    .logistics-container {
        width: 100%;
        background-color: @bg_color;

        .inner-warp{
            width: 1200px;
            margin: 0 auto;
        }
        .banner-container {
            width: 100%;
            height: 640px;
            background: url('../../assets/logistics/logistics1.png') no-repeat;
            background-size: cover;
        }

        .icons-container{
            width: 100%;
            height: 1100px;
            padding-top: 300px;
            text-align: center;
            .title{
                color: #333;
                font-size: 30px;
                line-height: 40px;
            }
            .f-title{
                margin-top: 10px;
                color: #666;
                font-size: 18px;
                line-height: 40px;
            }

            .icon-boxs{
                margin-top: 90px;
                .item{
                    float: left;
                    width: 376px;
                    height: 240px;
                    padding: 50px 0;
                    background-color: #fff;
                    margin-right: 36px;
                    margin-bottom: 40px;
                    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
                    &:nth-child(3n){
                        margin-right: 0;
                    }

                    img{
                        display: block;
                        margin: 0 auto 20px;
                        width: 50px;
                        height: 50px;
                    }
                    h3{
                        font-size: 24px;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    p{
                        font-size: 14px;
                        color: #666;
                        line-height: 30px;
                    }
                }
            }
        }

        .aboust{
            width: 100%;
            height: 600px;
            background: url('../../assets/logistics/logistics2.png') no-repeat;
            background-size: cover;
        }

       
    }
</style>

