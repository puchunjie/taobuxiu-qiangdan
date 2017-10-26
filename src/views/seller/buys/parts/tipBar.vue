<template>
    <div class="tip-bar" :class="'status'+item.offerStatus">
        <div class="tit" v-if="item.offerStatus == 0 || item.offerStatus == 1">
            <template v-if="item.offerStatus == 0">
                已有 <b class="b-red">{{ item.sellNum }}</b> 家公司在和您竞争，快去报价吧
            </template>
            <template v-else>
                已报价，请等待买家回应
            </template>
            <div class="cout-down">
                剩余时间：
                <countDown :endTime="item.createTime + item.timeLimit" :nowTime="item.serveTime"></countDown>
            </div>
        </div>
        <div class="win clearfix" v-if="item.offerStatus == 2">
            <span class="iconfont icon-jiangzhang"></span>
            <h3>恭喜您，本单中标！
                <a class="tencent-qq" v-show="item.QQ != ''" :href="'tencent://message/?uin='+item.QQ+'&Site=&Menu=yes'">
                    <img style="width:20px" src="../../../../assets/icon_qq.png">
                </a>
            </h3>
            <p>
                联系买家：{{ item.companyName }}，{{ item.contact }}，{{ item.contactNum }}。
                <span>中标时间：{{ item.updateTime | dateformat }}</span>
            </p>
        </div>
        <div class="miss clearfix" v-if="item.offerStatus == 3">
            <span class="iconfont icon-cray"></span>
            <h3>很遗憾，未中标</h3>
            <p>
                再接再厉，继续努力吧！
                <span>错过时间：{{ item.updateTime | dateformat }} </span>
            </p>
        </div>
    </div>
</template>

<script>
    import countDown from '@/components/countDown.vue'
    export default {
        props: {
            item: Object
        },
        components: {
            countDown
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .tip-bar {
        width: 100%;
        min-height: 40px;
        margin-bottom: 16px;
        border: 1px solid #fff;
        .borderRadius;
        .tit {
            position: relative;
            padding: 0 20px;
            line-height: 40px;
            .b-red{
                color:@dark_red;
            }
            .cout-down {
                position: absolute;
                top: 0;
                right: 20px;
            }
        }
        &.status0,
        &.status1 {
            background-color: @goast_blue;
            color: @mask_blue;
            border-color: @mask_blue;
        }
        &.status2 {
            background-color: @goast_red;
            color: @light_red;
            border-color: @light_red;
        }
        &.status3 {
            background-color: @goast_gray;
            color: @f_goast;
            border-color: @f_goast;
        }

        .win{
            padding: 27px;
            width: 100%;
            .iconfont{
                display: block;
                font-size: 40px;
                float: left;
                margin-right: 20px;
            }
            h3{
                font-size: 18px;
                line-height: 25px;
                color:@dark_red;
            }
            p{
                line-height: 20px;
                color:@dark_red;
                span{
                    float: right;
                }
            }
        }

        .miss{
            padding: 27px;
            width: 100%;
            .iconfont{
                display: block;
                font-size: 40px;
                float: left;
                margin-right: 20px;
            }
            h3{
                font-size: 18px;
                line-height: 25px;
                color:@f_goast;
            }
            p{
                line-height: 20px;
                color:@f_goast;
                span{
                    float: right;
                }
            }
        }
    }
</style>

