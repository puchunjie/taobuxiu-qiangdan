<template>
    <div class="oc-step4">
        <h2 class="oc-title">最终确认签约内容，起草电子合同</h2>
        
        <div class="info-confim">
            <div class="tit">
                <span class="ic-rq">*</span>请确认供应方公司信息(对方信息)，<a>电子合同将送达给供应方等确认签署。</a>
            </div>
            <div class="info">乙方名称：{{ info.partBName }}</div>
        </div>
    
        <div class="info-confim">
            <div class="tit">
                <span class="ic-rq">*</span>请确认您的客户信息，合同中将以此作为甲方信息(我方信息)
            </div>
            <div class="info">甲/乙方名称：{{ info.partAContractName }}</div>
            <div class="info">甲/乙方地址：{{ info.partAContractAddress }}</div>
            <div class="info">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系人：{{ info.partAContractContact }}</div>
            <div class="info">&nbsp;&nbsp;&nbsp;&nbsp;联系方式：{{ info.partAContractTel }}</div>
        </div>
    
        <div class="info-confim">
            <div class="tit">
                <span class="ic-rq">*</span>请确认本次货物内容，合同中将以此作为交易货物明细
                <span class="tip">（计价方式=“重量”，总价=重量*单价 | 计价方式=“数量”，总价=数量*单价）</span>
                <span style="float:right">合计：<font>&yen;{{ totlePrice }}</font></span>
            </div>
            <div class="table">
                <table>
                    <tbody>
                        <tr>
                            <td class="name">货物名称</td>
                            <td>材质</td>
                            <td>规格及型号</td>
                            <td>公差参厚</td>
                            <td>数量</td>
                            <td>重量(吨)</td>
                            <td>计价方式</td>
                            <td>单价(元/单位)</td>
                            <td>备注</td>
                            <td>总价(元)</td>
                        </tr>
                        <tr v-for="(item,i) in info.orderIds" :key="i">
                            <td class="name">{{ item.ironTypeName }}</td>
                            <td>{{ item.materialName }}/{{ item.surfaceName }}</td>
                            <td>{{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length}` }}</td>
                            <td>
                                <tbInput style="width:110px" v-model="item.tolerance"></tbInput>
                            </td>
                            <td>
                                <tbInput style="width:62px" type="number" v-model="item.numbers"></tbInput>
                            </td>
                            <td>
                                <tbInput style="width:62px" type="number" v-model="item.weights"></tbInput>
                            </td>
                            <td>
                                <tbSelect v-model="item.priceMode" :data='[{label:"数量",value:"1"},{label:"重量",value:"2"}]'></tbSelect>
                            </td>
                            <td>
                                <tbInput style="width:80px" v-model="item.price"></tbInput>
                            </td>
                            <td>
                                <tbInput v-model="item.remark"></tbInput>
                            </td>
                            <td class="price">{{ totlePrcieArr[i] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
        <div class="info-confim">
            <div class="tit">
                <span class="ic-rq">*</span>请确认合同交货地点
            </div>
            <div class="info" style="padding-left:20px;">
                <span class="ic-rq">*</span>交货地点：
                <cityPicter v-model="locationId" placeholder="请选择省市信息" style="width:160px"></cityPicter>
            </div>
        </div>
        <div class="oc-step4-bottom">
            <a class="back" @click="$router.go(-1)">返回上一步</a>
            <div class="next-step">
                <a class="btn goast">放弃起草电子合同</a>
                <a class="btn" @click="doAction">确认起草电子合同</a>
            </div>
        </div>
    </div>
</template>

<script>
    import cityPicter from '@/components/business/cityPicker/index'
    import tbInput from '@/components/business/tbInput/index'
    import tbSelect from '@/components/business/tbSelect/index'
    export default {
        components: {
            cityPicter,
            tbInput,
            tbSelect
        },
        data() {
            return {
                info: {
                    orderIds: [],
                    partAContractAddress: "",
                    partAContractContact: "",
                    partAContractId: "",
                    partAContractName: "",
                    partAContractTel: "",
                    partBId: "",
                    partBName: ""
                },
                locationId: {
                    id: '',
                    name: ''
                }
            }
        },
        computed: {
            totlePrcieArr() {
                let arr = [];
                this.info.orderIds.forEach(el => {
                    let number = el.priceMode == 1 ? el.numbers : el.weights;
                    number *= 1;
                    arr.push((el.price * number).toFixed(2));
                })
                return arr
            },
            totlePrice() {
                let price = 0;
                this.totlePrcieArr.forEach(el => {
                    price += Number(el);
                })
                return price.toFixed(2)
            },
            ajaxParams() {
                return {
                    partBId: this.info.partBId,
                    partAContractId: this.info.partAContractId,
                    locationId: this.locationId.id,
                    locationName: this.locationId.name,
                    orderIds: JSON.stringify({orderIds:this.info.orderIds})
                }
            },
            type() {
                return this.$route.params.type
            }
        },
        methods: {
            getContractInfo() {
                let params = this.$ls.get('contractInfo');
                params.orderIds = JSON.stringify(params.orderIds);
                this.$http.post(this.$api.selectStartContractInfo, params).then(res => {
                    if (res.code === 1000) {
                        this.info = res.data;
                        this.info.orderIds.forEach(el => {
                            el.tolerance+= ' '+el.proPlacesName
                        })
                    } else {
                        this.$Message.error(res.message);
                    }
                })
            },
            // 确认起草合同
            doAction() {
                if (this.locationId.id != '') {
                    this.$http.post(this.$api.saveContractInfo,this.ajaxParams).then(res => {
                        if(res.code === 1000){
                            this.$Modal.success({
                                content: '起草完成！',
                                onOk: () => {
                                    this.$router.replace({
                                        name: this.type == 1 ? 'BocManage' : 'SocManage',
                                        params: {
                                            type: this.type
                                        }
                                    })
                                }
                            })
                        }else{
                            this.$Message.error(res.message)
                        }
                    })
                }else{
                    this.$Message.error('请选择交货地址!')
                }
            }
        },
        created() {
            this.getContractInfo();
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .oc-step4 {
        position: relative;
        padding: 0 20px 90px;
        .oc-title {
            font-size: 16px;
            color: @f_dark;
            font-weight: bold;
            margin-top: 20px;
        }
        .info-confim {
            width: 100%;
            border: @b_d1;
            margin-bottom: 20px;
            .tit {
                width: 100%;
                height: 34px;
                line-height: 34px;
                padding: 0 20px;
                background-color: @table_headbg;
                color: #00001d;
                border-bottom: @b_d1;
                font {
                    font-size: 16px;
                    color: @dark_red;
                    font-weight: bold;
                }
            }
            .info {
                width: 100%;
                padding: 16px 30px;
                color: @f_dark;
            }
            .ic-rq {
                color: @dark_red;
                margin-right: 5px;
            }
            .tip {
                color: @dark_red;
            }
            .table {
                width: 100%;
                padding: 16px 30px;
                table {
                    width: 100%;
                    td {
                        height: 46px;
                        text-align: center;
                    }
                    .name {
                        text-align: left;
                    }
                    .price {
                        color: @dark_red;
                        font-weight: bold;
                    }
                }
            }
        }
        .oc-step4-bottom {
            width: 100%;
            height: 34px;
            margin-top: 20px;
            font-size: 14px;
            .noselect;
            .back {
                display: inline-block;
                width: 120px;
                height: 34px;
                line-height: 32px;
                border: 1px solid @dark_blue;
                color: @dark_blue;
                text-align: center;
                background-color: #fff;
            }
            .next-step {
                float: right;
                font-size: 12px;
                span {
                    color: @dark_blue;
                    margin: 0 5px;
                    font-weight: bold;
                }
                .btn {
                    display: inline-block;
                    width: 140px;
                    height: 34px;
                    margin-left: 10px;
                    line-height: 32px;
                    border: 1px solid @dark_blue;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    background-color: @dark_blue;
                    &.goast {
                        background-color: #fff;
                        color: @dark_blue;
                    }
                }
            }
        }
    }
</style>


