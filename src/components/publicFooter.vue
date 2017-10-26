<template>
    <div class="footer-container">
        <span class="logo iconfont icon-ziyuan4"></span>
        <p class="left-p">无锡淘不锈电子商务有限公司旗下不锈钢淘货软件平台。平台目前聚集了数千家不锈钢商户，为不锈钢买家提供了最新、最及时的海量报价信息；为不锈钢卖家提供了更多、更广的买家采购信息。买卖不锈钢，快来接单吧！</p>
        <p class="left-p" style="margin-top:18px">公司地址：江苏省无锡市新吴区纺城大道289号南方不锈钢市场1-107</p>
        <p class="left-p">联系方式：0510-81812186</p>
        <p class="left-p">工作时间：8:30~17:30（周一至周六）</p>

        <div class="qr">
            <img src="../assets/qr2.png">
            <span>微信公众号</span>
        </div>
        
        <div class="qr er">
            <img src="../assets/qr1.png">
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
            font-size: 12px;
            line-height: 24px;
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
            }
            &.er{
                right:120px;
            }
        }
    }
</style>

