<template>
    <div class="oc-step4">
        <h2 class="oc-title">最终确认签约内容，起草电子合同</h2><br>
    
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
                            <td></td>
                        </tr>
                        <tr v-for="(item,i) in info.orderIds" :key="i">
                            <td class="name">{{ item.ironTypeName }}</td>
                            <td>{{ item.materialName }}/{{ item.surfaceName }}</td>
                            <td>{{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length}` }}</td>
                            <td>
                                <tbInput style="width:110px" v-model="item.tolerance"></tbInput>
                            </td>
                            <td>
                                <tbInput style="width:62px" type="number" v-model="item.numbers" @on-input="validatePrice(item,'numbers')"></tbInput>
                            </td>
                            <td>
                                <tbInput style="width:62px" type="number" v-model="item.weights" @on-input="validatePrice(item,'weights')"></tbInput>
                            </td>
                            <td>
                                <tbSelect v-model="item.priceMode" :data='[{label:"数量",value:"1"},{label:"重量",value:"2"}]'></tbSelect>
                            </td>
                            <td>
                                <tbInput style="width:80px" v-model="item.price" @on-input="validatePrice(item,'price')"></tbInput>
                            </td>
                            <td>
                                <tbInput v-model="item.remark"></tbInput>
                            </td>
                            <td class="price">{{ totlePrcieArr[i] }}</td>
                            <td></td>
                        </tr>
                        <tr v-for="(item,i)  in info.costs" :key="i">
                            <td class="name">
                                <tbInput style="width: 100px" v-model="item.ironTypeName"></tbInput>
                            </td>
                            <td>
                                <tbInput style="width: 100px" v-model="item.materialName"></tbInput>
                            </td>
                            <td>
                                <tbInput style="width: 120px" v-model="item.specifications"></tbInput>
                            </td>
                            <td>
                                <tbInput style="width: 110px" v-model="item.tolerance"></tbInput>
                            </td>
                            <td>
                                <tbInput style="width: 62px" v-model="item.numbers"></tbInput>
                            </td>
                            <td>
                                <tbInput style="width: 62px" v-model="item.weights"></tbInput>
                            </td>
                            <td>
                                <tbSelect v-model="item.priceMode" :data='[{label:"数量",value:"1"},{label:"重量",value:"2"}]'></tbSelect>
                            </td>
                            <td>
                                <tbInput style="width: 80px" v-model="item.price"></tbInput>
                            </td>
                            <td>
                                <tbInput v-model="item.remark"></tbInput>
                            </td>
                            <td class="price">{{ totlePrcieArr2[i] }}</td>
                            <td><span class="iconfont icon-quxiao" @click="delCost(i)"></span></td>
                        </tr>
                    </tbody>
                </table>
    
                <iconBtn icon="icon-jiahao" @click.native="coatTypeShow = true">添加其他费用</iconBtn>
            </div>
        </div>
    
        <div class="info-confim">
            <div class="tit">
                <span class="ic-rq">*</span>请确认采购方验货有效期限
            </div>
            <div class="info pl2">
                <span class="ic-rq">*</span>验货有效期：
                <tbInput style="width: 80px" placeholder="请输入天数" v-model="info.inspectionTime"></tbInput> 天 <span class="tip">（乙方如认为代采购货物不合格，应在提货后验货有效期内与丙方进行沟通并提出书面异议）</span>
            </div>
        </div>
    
        <div class="info-confim">
            <div class="tit">
                <span class="ic-rq">*</span>请确认货物交付细节：
            </div>
            <div class="info pl2">
                <span class="ic-rq">*</span>交货地点：
                <cityPicter v-model="locationId" placeholder="请选择省市信息" style="width:160px"></cityPicter>
            </div>
            <div class="info pl2">
                <span class="ic-rq">*</span>交货期限：
                <DatePicker type="date" v-model="info.deliveryTerm" :options="notToday" placeholder="请选择日期" style="width: 160px"></DatePicker>
                前，特殊情况请提前沟通
            </div>
            <div class="info pl2">
                <span class="ic-rq">*</span>质量标准： 产品符合生产厂家出厂标准，以货品相对应的质量证明书为准
            </div>
            <div class="info pl2">
                <span class="ic-rq">*</span>备注信息：
                <tbTextarea v-model="info.remark" placeholder="请输入交货条款备注，如是否送木架，是否免力费等" style="width:1000px"></tbTextarea>
            </div>
        </div>
    
        <div class="info-confim">
            <div class="tit">
                <span class="ic-rq">*</span>请确认订单结算方式
            </div>
            <div class="info pl2">
                <span class="ic-rq">*</span>三方采用以下认可的付款方式：
                <tbRadio v-model="info.payMent"></tbRadio>
            </div>
        </div>
    
        <div class="info-confim">
            <div class="tit">
                <span class="ic-rq">*</span>请确认本合同有限签署期限
            </div>
            <div class="info pl2">
                <span class="ic-rq">*</span>合同有效期限仅限起草当日：{{ info.systemTime | dateformat('yyyy-MM-dd') }}
            </div>
        </div>
    
        <div class="oc-step4-bottom">
            <a class="back" @click="$router.go(-1)">返回上一步</a>
            <div class="next-step">
                <a class="btn goast" @click="giveUp">放弃起草电子合同</a>
                <a class="btn" @click="codePanelShow">确认起草电子合同</a>
            </div>
        </div>
    
        <modelPanel title="短信验证" v-model="codeShow" width="600">
            <div>
                <p class="code-tip">尊敬的用户，请输入您手机收到的短信验证码，该验证码在30分钟内有效。<br> 已发送验证码至{{ info.partAMobile | hidePhone }}，请输入验证码完成合同起草。
                </p>
                <div class="code-in">
                    <passWordInput v-model="messageCode"></passWordInput>
                    <getCode :apiUrl="$api.contractGetSmsCode" :mobile="info.partAMobile" @on-success="codeSend = true">
                        <a class="get-code">获取短信验证码</a>
                    </getCode>
                </div>
                <div class="inner-btns">
                    <a class="inner-btn goast" @click="messageCode = ''">重置</a>
                    <a class="inner-btn" @click="onCheck">确认</a>
                </div>
            </div>
        </modelPanel>
    
        <modelPanel title="选择费用类型" v-model="coatTypeShow" width="600">
            <div>
                <div style="text-align:center;margin-bottom:20px">
                    <tbRadio v-model="coatType" :data="[{label: '加工费',value: 'machining'},{label: '人力费',value: 'human'},{label: '小车费',value: 'car'},{label: '其他',value: 'default'}]"></tbRadio>
                </div>
                <div class="inner-btns">
                    <a class="inner-btn" @click="addCost">确认</a>
                </div>
            </div>
        </modelPanel>
    </div>
</template>

<script>
    import iconBtn from '@/components/basics/iconBtn/index'
    import cityPicter from '@/components/business/cityPicker/index'
    import tbInput from '@/components/business/tbInput/index'
    import tbTextarea from '@/components/business/tbTextarea/index'
    import tbSelect from '@/components/business/tbSelect/index'
    import modelPanel from '@/components/basics/modelPanel/index.vue'
    import passWordInput from '@/components/basics/passwordInput/index.vue'
    import getCode from '@/components/business/getCode/index'
    import tbRadio from '@/components/business/tbRadio/index.vue'
    import map from 'lodash/map'
    import {
        castData
    } from './other.js'
    
    export default {
        components: {
            iconBtn,
            cityPicter,
            tbInput,
            tbSelect,
            modelPanel,
            passWordInput,
            getCode,
            tbTextarea,
            tbRadio
        },
        data() {
            return {
                coatTypeShow: false,
                coatType: 'default',
                codeShow: false,
                messageCode: '',
                info: {
                    orderIds: [],
                    costs: [],
                    partAContractAddress: "",
                    partAContractContact: "",
                    partAContractId: "",
                    partAContractName: "",
                    partAContractTel: "",
                    partBId: "",
                    partBName: "",
                    inspectionTime: "",
                    deliveryTerm: "",
                    remark: "",
                    payMent: 1,
                    invoiceDate: 25
                },
                locationId: {
                    id: '',
                    name: ''
                },
                notToday: {
                    disabledDate(date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
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
            totlePrcieArr2() {
                let arr = [];
                this.info.costs.forEach(el => {
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
                this.totlePrcieArr2.forEach(el => {
                    price += Number(el);
                })
                return price.toFixed(2)
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
                        // this.info = res.data;
                        map(res.data, (v, k) => {
                            this.info[k] = v;
                        })
                        this.info.orderIds.forEach(el => {
                            el.tolerance += ' ' + el.proPlacesName
                        })
                    } else {
                        this.$Message.error(res.message);
                    }
                })
            },
            ajaxParams() {
                let data = this.$clearData(this.info);
                data.locationId = this.locationId.id;
                data.locationName = this.locationId.name;
                data.orderIds = JSON.stringify({
                    orderIds: this.info.orderIds,
                    costs: this.info.costs
                });
                data.deliveryTerm = new Date(this.info.deliveryTerm).getTime();
                data.startDate = data.systemTime;
                data.endDate = data.systemTime;
                return data
            },
            // 确认起草合同
            doAction() {
                this.$spinToggle(true);
                this.$http.post(this.$api.saveContractInfo, this.ajaxParams()).then(res => {
                    if (res.code === 1000) {
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
                    } else {
                        this.$Message.error(res.message)
                    }
                    this.$spinToggle(false);
                })
            },
            giveUp() {
                this.$router.replace({
                    name: this.type == 1 ? 'Bstep1' : 'Sstep1',
                    params: {
                        type: this.type
                    }
                })
            },
            codePanelShow() {
                if (this.isAllOk()) {
                    this.codeShow = true;
                } else {
                    this.$Message.error('请填写完带星号的选项!')
                }
            },
            onCheck() {
                if (this.messageCode != '' && this.messageCode.length == 6) {
                    return this.$http.post(this.$api.checkContractSmsCode, {
                        smsCode: this.messageCode
                    }).then(res => {
                        if (res.code === 1000) {
                            this.codeShow = false;
                            this.doAction();
                        } else {
                            this.$Message.error(res.message)
                        }
                    })
                } else {
                    this.$Message.error('请输入验证码!')
                }
            },
            validatePrice(item, key) {
                if (isNaN(item[key])) {
                    item[key] = ''
                }
            },
            //添加其他费用
            addCost() {
                let data = this.$clearData(castData[this.coatType]);
                this.info.costs.push(data);
                this.coatTypeShow = false;
            },
            //删除其他费用
            delCost(i) {
                this.info.costs.splice(i, 1);
            },
            // 是否可以提交？
            isAllOk(){
                return this.info.deliveryTerm != '' && this.info.inspectionTime != '' && this.info.remark != '' && this.locationId.id != ''
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
                &.pl2 {
                    padding-left: 20px;
                }
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
                    .icon-quxiao {
                        color: @back_gray;
                        vertical-align: middle;
                        font-size: 20px;
                        cursor: pointer;
                        &:hover {
                            color: @dark_red;
                        }
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
        .code-tip {
            text-align: center;
            font-size: 14px;
            color: #333;
            letter-spacing: 0.2px;
            line-height: 26px;
        }
        .code-in {
            text-align: center;
            margin: 30px 0;
        }
        .get-code {
            display: inline-block;
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            background-color: @mask_blue;
            .borderRadius;
        }
        .inner-btns {
            text-align: center;
            .inner-btn {
                display: inline-block;
                vertical-align: middle;
                width: 90px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                background-color: @mask_blue;
                .borderRadius;
            }
        }
    }
</style>


