<template>
    <div class="footer-container">
        <span class="logo iconfont icon-ziyuan4"></span>
        <p class="left-p">无锡淘不锈电子商务有限公司旗下不锈钢淘货软件平台。平台目前聚集了数千家不锈钢商户，为不锈钢买家提供了最新、最及时的海量报价信息；为不锈钢卖家提供了更多、更广的买家采购信息。买卖不锈钢，快来接单吧！</p>
        <p class="left-p" style="margin-top:18px"><span class="iconfont icon-ziyuan6"></span>江苏省无锡市新吴区纺城大道289号南方不锈钢市场1-107</p>
        <p class="left-p"><span class="iconfont icon-ziyuan7"></span>0510-81812186</p>
        <p class="left-p"><span class="iconfont icon-ziyuan8"></span>8:30~17:30（周一至周六）</p>

        <div class="qr">
            <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/qr2.png">
            <span>微信公众号</span>
        </div>
        
        <div class="qr er">
            <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/qr1.png">
            <span>掌上淘不锈</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
    @import '../assets/base.less';
    .footer-container {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 32px;
        overflow: hidden;
        .logo {
            font-size: 65px;
            color: #fff;
        }
        .left-p {
            width: 550px;
            padding: 0 10px;
            color: #FFFFFF;
            font-size: 14px;
            line-height: 24px;
            .iconfont {
                font-size: 20px;
                margin-right:5px;
            }
        }
        .qr{
            position: absolute;
            display: block;
            width: 120px;
            bottom: 40px;
            right: 300px;
            color: #fff;
            font-size: 12px;
            span{
                display: inline-block;
                margin-top:5px;
            }
            img{
                display: block;
                width: 100%;
                padding: 10px;
                border: @b_d1;
                background-color: #fff;
            }
            &.er{
                right:120px;
            }
        }
    }
</style>

