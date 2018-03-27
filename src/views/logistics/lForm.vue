<template>
    <div class="form-box">
        <div class="searh-warp">
            <span class="iconfont icon-search"></span>
        </div>
        <h3>询价找车</h3>
        <div class="form">
            <div class="group-col">
                <div class="group-col-item">
                    <lsCitypicker placeholder="装货地" v-model="beginPlaces"></lsCitypicker>
                </div>
                <div class="group-col-item">
                    <lsCitypicker placeholder="卸货地" v-model="endPlaces"></lsCitypicker>
                </div>
                <lsCheckbox v-model="logisticsExtraDemands" :checks="checkValue"></lsCheckbox>
            </div>
            <div class="group-col">
                <div class="group-col-item" style="width: 264px">
                    <div class="inner-warp" style="width: 160px">
                        <lsTypepicker placeholder="货物" v-model="freGoods1"></lsTypepicker>
                    </div>
                    <div class="inner-warp" style="width: 95px">
                        <input class="goast-input" v-model="weight1" placeholder="重量" type="text">
                        <span class="goast-unit">吨(T)</span>
                    </div>
                </div>
                <div class="group-col-item" style="width: 264px">
                    <div class="inner-warp" style="width: 160px">
                        <lsTypepicker placeholder="货物" v-model="freGoods2"></lsTypepicker>
                    </div>
                    <div class="inner-warp" style="width: 95px">
                        <input class="goast-input" v-model="weight2" placeholder="重量" type="text">
                        <span class="goast-unit">吨(T)</span>
                    </div>
                </div>
                <div class="group-col-item" style="width: 264px">
                    <div class="inner-warp" style="width: 160px">
                        <lsTypepicker placeholder="货物" v-model="freGoods3"></lsTypepicker>
                    </div>
                    <div class="inner-warp" style="width: 95px">
                        <input class="goast-input" v-model="weight3" placeholder="重量" type="text">
                        <span class="goast-unit">吨(T)</span>
                    </div>
                </div>
            </div>
            <div class="group-col">
                <div class="group-col-item" style="width: 206px">
                    <div class="inner-warp">
                        <input class="goast-input" style="width:100%" v-model="tel" placeholder="联系方式" type="text">
                    </div>
                </div>
                <div class="group-col-item" style="width: 514px">
                    <div class="inner-warp">
                        <input class="goast-input" style="width:100%" v-model="remark" placeholder="备注（35字以内）" type="text">
                    </div>
                </div>
            </div>
            <div class="group-col">
                <a class="logs-btn" @click="pbLogs">发布</a>
            </div>
        </div>
    </div>
</template>


<script>
    import lsCitypicker from './components/lsCtiypicker';
    import lsTypepicker from './components/lsTypepicker.vue';
    import lsCheckbox from './components/lsCheckbox';
    export default {
        components: {
            lsCitypicker,
            lsTypepicker,
            lsCheckbox
        },
        data() {
            return {
                checkValue: [],
                beginPlaces: [],
                endPlaces: [],
                logisticsExtraDemands: [],
                extraDemandId: '',
                extraDemandName: '',
                remark: '',
                tel: '',
                freGoods1: [],
                weight1: '',
                freGoods2: [],
                weight2: '',
                freGoods3: [],
                weight3: ''
            }
        },
        computed: {
            isOk() {
                let placeOk = this.beginPlaces.length > 0 && this.endPlaces.length > 0,
                    ironOk = this.freGoods1.length > 0 && this.weight1 != '';
                return placeOk && ironOk && this.isTelephone
            },
            // 检查联系电话是否合法
            isTelephone() {
                let pattern = /^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
                return pattern.test(this.tel)
            }
        },
        methods: {
            //获取物流额外费用参数
            getLogsdemand() {
                this.$http.post(this.$api.findAllLogisticsExtraDemand).then(res => {
                    if (res.code === 1000)
                        this.checkValue = res.data
                })
            },
            // 组合物流货物参数
            getApiParams() {
                return {
                    beginPlaces: JSON.stringify(this.beginPlaces),
                    endPlaces: JSON.stringify(this.endPlaces),
                    logisticsExtraDemands: JSON.stringify(this.logisticsExtraDemands),
                    freightLogisticGoods: this.combination(),
                    tel: this.tel,
                    remark: this.remark
                }
            },
            combination() {
                let arr = [];
                for (let i = 1; i <= 3; i++) {
                    if (this['freGoods' + i].length>0 && this['weight' + i] != '')
                        arr.push({
                            goodId: this['freGoods' + i][0].id + ',' + this['freGoods' + i][1].id,
                            goodName: this['freGoods' + i][0].name + ',' + this['freGoods' + i][1].name,
                            weight: this['weight' + i]
                        })
                }
                return JSON.stringify(arr)
            },
            // 发布物流
            pbLogs(){
                if(this.isOk){
                    let params = this.getApiParams();
                    this.$http.post(this.$api.saveFreightLogisticOrder,params).then(res => {
                        if(res.code === 1000){
                            this.$Message.success("提交成功。");
                            setTimeout(() => {
                                this.$router.go(0)
                            },1000)
                        }else{
                            this.$Message.error(res.message)
                        }
                    })
                }else{
                    this.$Message.error('请将参数填写完整！')
                }
            }
        },
        created() {
            this.getLogsdemand();
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../assets/base.less');
    @import url('./components/lsCommon.less');
    .form-box {
        position: absolute;
        width: 1200px;
        height: 440px;
        bottom: -220px;
        background-color: #fff;
        .borderRadius;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        padding: 50px 160px;
        .searh-warp {
            position: absolute;
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            left: 68px;
            .borderRadius(60px);
            border: 1px solid @bg_color;
            .iconfont {
                font-size: 20px;
                color: @green;
            }
        }
        h3 {
            line-height: 60px;
            font-size: 18px;
            color: #666;
            font-weight: bold;
        }
        .form {
            width: 100%;
            height: 100%;
            .group-col {
                width: 100%;
                height: 50px;
                line-height: 50px;
                margin-top: 20px;
            }
            .group-col-item {
                display: inline-block;
                width: 206px;
                height: 50px;
                border: 2px solid @bg_color;
                .borderRadius;
                cursor: pointer;
                .noselect;
                .transition(all,
                1s);
                font-size: 12px;
                &:hover {
                    border-color: @green;
                }
                &:not(:last-child) {
                    margin-right: 36px;
                }
                .inner-warp {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                    &+.inner-warp {
                        border-left: 2px solid @bg_color;
                    }
                }
                .goast-input {
                    display: inline-block;
                    width: 50px;
                    height: 100%;
                    border: 0;
                    margin: 0;
                    padding: 0;
                    text-indent: 10px;
                    vertical-align: top;
                    .placeholder {
                        color: #999
                    }
                  
                    &:focus {
                        outline: 0
                    }
                }
                .goast-unit {
                    display: inline-block;
                    width: 35px;
                    height: 100%;
                    line-height: 46px;
                    text-align: center;
                    vertical-align: top;
                    color: #999;
                }
            }
            .logs-btn {
                display: inline-block;
                width: 100px;
                height: 50px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                background-color: @green;
                .borderRadius;
                border-bottom: 4px solid @green;
                .transition(all,
                1s);
                &:hover {
                    border-color: #15996F;
                }
            }
        }
    }
</style>
