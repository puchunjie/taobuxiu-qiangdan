<template>
    <div class="offer-list">
        <div class="tit">报价列表</div>
        <div class="list-row list-head">
            <div class="item date">时间</div>
            <div class="item price">单价</div>
            <div class="item tolerance">公差</div>
            <div class="item proPlaces">产地</div>
            <div class="item totlePrice">总价</div>
            <div class="item remark">备注</div>
            <div class="item action"></div>
        </div>
        <div class="offers-scorll-warp">
            <p v-if="list.length == 0" class="no-data">暂无报价，请耐心等待。</p>
            <div class="offer-group" v-for="(item,index) in list" :key="index">
                <div class="list-row">
                    <div class="item date">15:38</div>
                    <div class="item price">¥14600/吨</div>
                    <div class="item tolerance">1.75-2.15</div>
                    <div class="item proPlaces">哈尔滨</div>
                    <div class="item totlePrice">¥843000</div>
                    <div class="item remark">报价请注明实厚、产地</div>
                    <div class="item action"></div>
                </div>
                <div class="company-info">
                    <div class="item space"></div>
                    <div class="item left name">
                        无锡市世纪瑞隆不锈钢有限公司
                        <span class="iconfont icon-cheng" style="color:#F5A623"></span>
                        <span class="iconfont icon-bao" style="color:#C16BD6"></span>
                        <span class="iconfont icon-pai-one" style="color:#D67829"></span>
                    </div>
                    <div class="item right">
                        <span class="iconfont icon-hui" style="color:#FF5555"></span> 过年大促销，机不可失时不再来
                    </div>
                </div>
                <div class="company-info">
                    <div class="item space"></div>
                    <div class="item left">
                        张兴扬 15251523321 <span class="iconfont icon-qq" style="color:#2E71F0"></span>
                    </div>
                    <div class="item right"><span class="iconfont icon-dingwei" style="color:#FF5555"></span>无锡二仓库</div>
                </div>

                <div class="show-offer-history" @click="showHistory(item)">
                    {{ item.historyShow ? '收起历史报价' : '展开历史报价' }} 
                    <span class="iconfont" 
                    :class=" item.historyShow ? 'icon-iconjiaobiaoxiangshang':'icon-iconjiaobiaoxiangxia'"></span>
                </div>
                <!-- 历史报价 -->
                <div class="offer-history-list" v-show="item.historyShow">
                    <div class="offer-item" v-for="(sub,i) in item.ironSell" :key="i">
                        <div class="item date">{{ sub.createTime | dateformat('MM-dd hh:mm') }}</div>
                        <div class="item time-line">
                            <span class="note"></span>
                            <span class="line top" v-if="i>0"></span>
                            <span class="line bottom" v-if="i < item.ironSell.length - 1"></span>
                        </div>
                        <!-- <div class="item price">1234.00/吨</div>
                        <div class="item tolerance">1.97-3.48</div>
                        <div class="item proPlace">乌鲁木齐</div>
                        <div class="item totlePrice">234345.00</div>
                        <div class="item remark">这里是备注猪猪猪猪猪猪猪猪租住</div> -->
                        <div class="item price">{{ sub.offerPerPrice }}/{{ sub.baseUnit }}</div>
                        <div class="item tolerance">{{ sub.tolerance }}</div>
                        <div class="item proPlace">{{ sub.offerPlaces }}</div>
                        <div class="item totlePrice">{{ sub.offerPrice }}元</div>
                        <div class="item remark">{{ sub.offerRemark }}</div>
                    </div>
                </div>
                <!-- 历史报价 -->
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props:{
            offerList: Array
        },
        data () {
            return {
                list:[]
            }
        },
        methods: {
          init(){
              let list = this.$clearData(this.offerList);
              list.map(el => {
                  el.historyShow = false;
              });
            this.list = list;
          },
          //显示历史报价
          showHistory(item){
              item.historyShow = !item.historyShow;
          }  
        },
        watch: {
            offerList(){
                this.init();
            }
        },
        created() {
            this.init();
        }
    }
</script>



<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .p20() {
        padding: 0 20px;
    }
    
    .offer-list {
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        border: @b_d1;
        .borderRadius;
        .tit {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: @f_dark;
            border-bottom: @b_d1;
            .p20;
        }
        .offers-scorll-warp {
            width: 100%;
            height: 330px;
            overflow-x: hidden;
        }
        .list-head {
            width: 100%;
            height: 42px;
            line-height: 42px;
            background-color: #eee;
            color: @f_goast;
            border-bottom: @b_d1;
        }
        .list-row {
            .item {
                float: left;
                height: 100%;
                text-indent: 20px;
                &.date {
                    min-width: 60px;
                    width: 7.28%;
                }
                &.price {
                    min-width: 100px;
                    width: 12.13%;
                }
                &.tolerance {
                    min-width: 100px;
                    width: 12.13%;
                }
                &.proPlaces {
                    min-width: 100px;
                    width: 12.13%;
                }
                &.totlePrice {
                    min-width: 100px;
                    width: 12.13%;
                }
                &.remark {
                    min-width: 210px;
                    width: 25.5%;
                }
                &.action {
                    min-width: 153px;
                    width: 18%;
                }
            }
        }
        .offer-group {
            position: relative;
            width: 100%;
            padding-bottom: 6px;
            border-bottom: @b_d1;
            .list-row {
                height: 44px;
                line-height: 44px;
                color: @f_dark;
                .price {
                    color: #FF5555;
                }
            }
            .company-info {
                width: 100%;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                margin-bottom: 8px;
                .item {
                    float: left;
                    height: 100%;
                    text-indent: 20px;
                    color: @f_goast;
                    .iconfont {
                        font-size: 16px;
                    }
                    &.space {
                        min-width: 60px;
                        width: 7.28%;
                    }
                    &.left {
                        min-width: 300px;
                        width: 36.39%;
                    }
                    &.right {
                        min-width: 410px;
                        width: 37.63%;
                    }
                    &.name {
                        color: @f_dark;
                    }
                }
            }

            .show-offer-history{
                position: absolute;
                height: 20px;
                line-height: 18px;
                background-color: #eee;
                color: @f_goast;
                font-size:12px;
                padding: 0 5px;
                right: 0;
                top: 82px;
                cursor: pointer;
                .noselect;
            }

            .offer-history-list{
                margin: 14px 0 0 20px;
                padding: 10px 0;
                border-top: 1px dashed #d1d1d1;
                .offer-item{
                    height: 32px;
                    line-height: 32px;
                    color:@f_goast;
                    font-size: 12px;
                    .item{
                        height: 100%;
                        float: left;
                        &.date{
                            text-align: right;
                            min-width:70px;
                            width: 8.5%;
                        }
                        &.time-line{
                            position: relative;
                            min-width: 46px;
                            text-align: center;
                            .note{
                                display: inline-block;
                                width: 9px;
                                height: 9px;
                                .borderRadius(9px);
                                background-color: @light_blue;
                            }
                            .line{
                                position: absolute;
                                left: 22px;
                                display: block;
                                width: 2px;
                                height: 9px;
                                background-color: @goast_blue;
                                &.top{
                                    top: 0;
                                }
                                &.bottom{
                                    bottom: 0;
                                }
                            }
                        }
                        &.price{
                            min-width: 100px;
                            width: 12.12%;
                        }
                        &.tolerance{
                            min-width: 100px;
                            width: 12.12%;
                        }
                        &.proPlace{
                            min-width: 100px;
                            width: 12.12%;
                        }
                        &.totlePrice{
                            min-width: 100px;
                            width: 12.12%;
                        }
                        &.remark{
                            min-width: 70px;
                        }
                    }
                }
            }


            &.no-plan{
                
            }
        }
    }
</style>