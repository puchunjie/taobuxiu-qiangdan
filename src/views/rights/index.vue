<template>
    <div class="rights-contnet">
        <div class="group">
            <h3>权益说明——买家</h3>
            <div class="table">
                <p class="tit">对于买家，买家活跃指数指的是“最近30天以内，买家发布过求购的累计天数”</p>
                <div class="table-contnet">
                    <div class="item-group clearfix">
                        <div class="item blue">活跃等级</div>
                        <div class="item blue"><crown level='1-1'></crown></div>
                        <div class="item blue"><crown level='1-2'></crown></div>
                        <div class="item blue"><crown level='1-3'></crown></div>
                        <div class="item blue"><crown level='2-1'></crown></div>
                        <div class="item blue"><crown level='2-2'></crown></div>
                        <div class="item blue"><crown level='2-3'></crown></div>
                        <div class="item blue"><crown level='3-1'></crown></div>
                        <div class="item blue"><crown level='3-2'></crown></div>
                        <div class="item blue"><crown level='3-3'></crown></div>
                    </div>
                    <div class="item-group clearfix">
                        <div class="item blue">等级名称</div>
                        <div class="item">钻石1级</div>
                        <div class="item">钻石2级</div>
                        <div class="item">钻石3级</div>
                        <div class="item">蓝冠1级</div>
                        <div class="item">蓝冠2级</div>
                        <div class="item">蓝冠3级</div>
                        <div class="item">皇冠1级</div>
                        <div class="item">皇冠2级</div>
                        <div class="item">皇冠3级</div>
                    </div>
                    <div class="item-group clearfix">
                        <div class="item blue">活跃指数(天)</div>
                        <div class="item">0天-2天</div>
                        <div class="item">3天-5天</div>
                        <div class="item">6天-8天</div>
                        <div class="item">9天-11天</div>
                        <div class="item">12天-14天</div>
                        <div class="item">15天-17天</div>
                        <div class="item">18天-20天</div>
                        <div class="item">21天-23天</div>
                        <div class="item">24天以上</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group">
            <h3>权益说明——卖家</h3>
            <div class="table">
                <p class="tit">对于卖家，卖家活跃指数指的是“最近50天以内,卖家对求购的响应次数/卖家接收到推送的求购总次数”</p>
                <div class="table-contnet">
                    <div class="item-group clearfix">
                        <div class="item blue">活跃等级</div>
                        <div class="item blue"><crown level='1-1'></crown></div>
                        <div class="item blue"><crown level='1-2'></crown></div>
                        <div class="item blue"><crown level='1-3'></crown></div>
                        <div class="item blue"><crown level='2-1'></crown></div>
                        <div class="item blue"><crown level='2-2'></crown></div>
                        <div class="item blue"><crown level='2-3'></crown></div>
                        <div class="item blue"><crown level='3-1'></crown></div>
                        <div class="item blue"><crown level='3-2'></crown></div>
                        <div class="item blue"><crown level='3-3'></crown></div>
                    </div>
                    <div class="item-group clearfix">
                        <div class="item blue">等级名称</div>
                        <div class="item">钻石1级</div>
                        <div class="item">钻石2级</div>
                        <div class="item">钻石3级</div>
                        <div class="item">蓝冠1级</div>
                        <div class="item">蓝冠2级</div>
                        <div class="item">蓝冠3级</div>
                        <div class="item">皇冠1级</div>
                        <div class="item">皇冠2级</div>
                        <div class="item">皇冠3级</div>
                    </div>
                    <div class="item-group clearfix">
                        <div class="item blue">活跃指数(%)</div>
                        <div class="item">0-10%</div>
                        <div class="item">11%-20%</div>
                        <div class="item">21%-30%</div>
                        <div class="item">31%-40%</div>
                        <div class="item">41%-50%</div>
                        <div class="item">51%-60%</div>
                        <div class="item">61%-70%</div>
                        <div class="item">71%-80%</div>
                        <div class="item">81%-100%</div>
                    </div>
                </div>
                <h3>诚信商户<span class="iconfont icon-cheng"></span></h3>
                <p>企业信用程度高、经营管理水平优，社会反响、品牌、信誉度高。 依据《无锡市不锈钢行业开展信用评级试点工作实施方案》、《无锡市不锈钢商贸企业信用评价指标体系》、《无锡市不锈钢行业信用评级试行办法》要求，结合不锈钢商贸企业的具体情况制定的《无锡市不锈钢商贸企业信用评价等级表》评选出的商家用户。</p>
                <h3>担保商户<span class="iconfont icon-bao"></span></h3>
                <p>企业资金实力强，需方验收货物后淘不锈与供方结算。依据淘不锈平台担保商户入驻条款评选得出。</p>
            </div>
        </div>
    </div>
</template>

<script>
import crown from '@/components/basics/crown/index.vue'
export default {
    components: {
        crown
    }
}
</script>


<style lang="less" scoped>
    @import '../../assets/base.less';
    .rights-contnet {
        width: 100%;
        padding-bottom: 30px;
        .group {
            margin-top: 20px;
            h3 {
                font-size: 20px;
                color: @f_dark;
                font-weight: 500;
                margin-top:20px;
                .iconfont{
                    font-size: 20px;
                    margin-left: 10px;
                    &.icon-cheng{
                        color:@cheng;
                    }
                    &.icon-bao{
                        color: @bao;
                    }
                }
                
            }
            p{
                margin-top:10px;
                line-height: 26px;
            }
            .table {
                width: 100%;
                padding: 30px;
                margin-top: 10px;
                background-color: #fff;
                .table-contnet {
                    margin-top: 20px;
                    border-right: @b_d1;
                    border-bottom: @b_d1;
                    .item-group {
                        width: 100%;
                    }
                    .item {
                        width: 10%;
                        height: 60px;
                        line-height: 60px;
                        text-align: center;
                        float: left;
                        border-left: @b_d1;
                        border-top: @b_d1;
                        &.blue{
                            background-color: @goast_blue;
                        }
                    }
                }
            }
        }
    }
</style>

