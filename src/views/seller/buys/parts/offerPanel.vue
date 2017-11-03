<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .offer-container {
        width: 100%;
        min-height: 360px;
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
            .p20;
        }
        .offer-from {
            width: 100%;
            .p20;
            .input-item-warp {
                .unit-content {
                    position: absolute;
                    width: 70px;
                    height: 100%;
                    right: 0;
                    top: 0;
                    text-align: center;
                    cursor: pointer;
                    border-left: @b_d1;
                    .units {
                        a {
                            display: block;
                            width: 100%;
                            height: 20px;
                            color: @f_dark;
                            &.active {
                                color: @dark_blue;
                            }
                        }
                    }
                }
            }
        }
        .offer-table {
            width: 100%;
            border-top: @b_d1;
            margin-bottom: 20px;
            .tr {
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-indent: 10px;
                border-bottom: @b_d1;
                &.head,
                label {
                    color: @f_goast;
                }
                div {
                    width: 25%;
                    height: 100%;
                    float: left;
                    border-right: @b_d1;
                    &:last-child {
                        border-right: 0;
                    }
                }
            }
        }
        .action-btns {
            width: 100%;
            text-align: right;
            .btn {
                display: inline-block;
                width: 100px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                background-color: @dark_blue;
                color: #fff;
                border: 1px solid @dark_blue;
                margin-right: 20px;
                .borderRadius;
                &.goast {
                    color: @dark_blue;
                    border-color: @dark_blue;
                    background-color: #fff;
                }
            }
        }
        .offers-warp {
            width: 100%;
            padding: 0 20px 10px;
            .offer-group {
                position: relative;
                color: @f_goast;
                height: 30px;
                line-height: 30px;
                div {
                    float: left;
                    &.index {
                        width: 3.5%;
                        min-width: 30px;
                        text-indent: 20px;
                    }
                    &.date {
                        width: 11%;
                        min-width: 95px;
                    }
                    &.price {
                        width: 11%;
                        min-width: 95px;
                    }
                    &.tolerance {
                        width: 11%;
                        min-width: 95px;
                    }
                    &.place {
                        width: 9.8%;
                        min-width: 85px;
                    }
                    &.totleprcie {
                        width: 10.6%;
                        min-width: 90px;
                    }
                    &.remark {
                        width: 30%;
                        min-width: 300px;
                    }
                }
                &.first {
                    color: @light_blue;
                }
                .icon-circularframeshijian {
                    position: absolute;
                    left: 0;
                    top: 0;
                    color: @light_blue;
                }
            }
        }
    }
</style>

<template>
    <div class="offer-container">
        <p class="tit">{{ offerDone ? '我的报价' : item.offerStatus == 2 ? '我的成交价' : '我的最终报价' }}</p>
        <div class="offer-from clearfix" v-if="offerDone">
            <div class="input-item-warp wid-200" ref="offerPerPrice">
                <label for="offerPerPrice">单价</label>
                <input id="offerPerPrice" class="goast-input level1 textRight" style="width:73px" min="0" type="number" @blur="validItem('offerPerPrice')" @keyup="validItem('offerPerPrice')" v-model="offerApi.offerPerPrice">
                <Poptip v-if="units.length > 1" trigger="hover" class="unit-content" placement="bottom">
                    元/{{ unit.name }}<span v-show="units.length > 1" class="iconfont icon-iconjiaobiaoxiangxia"></span>
                    <div class="units" slot="content">
                        <a v-for="(u,i) in units" :key="u.id" @click="selectUnit(i)" :class="{'active': i == activeUnit }">单位：{{ u.name }}</a>
                    </div>
                </Poptip>
                <div class="unit-content" v-else>元/{{ unit.name }}</div>
                <p class="err">{{ offerApi.offerPerPrice == '' ? '请填写单价' : '无效内容' }}</p>
            </div>
            <div class="input-item-warp wid-180" ref="tolerance" v-show="needTo">
                <label for="tolerance">公差</label>
                <input id="tolerance" class="goast-input level1 textRight" @blur="validItem('tolerance')" @keyup="validItem('tolerance')" v-model="offerApi.tolerance" style="width:110px;" type="text">
                <p class="err">{{ offerApi.tolerance == '' ? '请填写公差' : '无效内容' }}</p>
            </div>
            <div class="input-item-warp wid-200" ref="place">
                <label for="-proPlace">产地</label>
                <input class="goast-input level1" style="width:120px" type="text" ref="-proPlace" id="-proPlace" v-model="offerApi.offerPlaces" @focus="showFuzzy" @keyup="setInput">
                <p class="err">{{ offerApi.offerPlaces == '' ? '请选择产地' : '无效内容' }}</p>
            </div>
            <div class="input-item-warp wid-180 disabel">
                <label>总价</label>
                <span style="float:right">{{ totlePrice }}元</span>
            </div>
            <div class="input-item-warp wid-550 no-margin">
                <label for="offerRemark">备注(选填)</label>
                <input id="offerRemark" class="goast-input level1" maxlength="35" type="text" v-model="offerApi.offerRemark" placeholder="请填写您的交货期等其他要求，最多35字">
            </div>
        </div>
        <div class="offer-table clearfix" v-else>
            <div class="tr head">
                <div class="price">单价</div>
                <div class="tolerance">公差</div>
                <div class="place">产地</div>
                <div class="totleprice">总价</div>
            </div>
            <div class="tr">
                <div class="price">{{ finalOffer.offerPerPrice }}元/{{ finalOffer.baseUnit }}</div>
                <div class="tolerance">{{ finalOffer.tolerance }}</div>
                <div class="place">{{ finalOffer.offerPlaces }}</div>
                <div class="totleprice">{{ finalOffer.offerPrice }}元</div>
            </div>
            <div class="tr">
                <label>备注：</label>{{ finalOffer.offerRemark }}
            </div>
        </div>
        <div class="action-btns">
            <template v-if="item.offerStatus == 0">
                    <a class="btn goast" @click="ignore">无计划或无货</a>
                    <a class="btn" @click="offer">立即报价</a>
</template>

<template v-else-if="item.offerStatus == 1">
    <a v-if="item.ironSell.length < 6" class="btn" @click="offer">修改报价</a>
</template>
        </div>
        <div class="offers-warp" v-show="offerHistory">
            <p style="margin-bottom:10px">报价历史</p>
            <div class="offer-group clearfix" v-for="(offer,index) in item.ironSell" :key="index" :class="{'first':index == 0}">
                <span class="iconfont icon-circularframeshijian" v-if="index == 0"></span>
                <div class="index">{{ index + 1 }}.</div>
                <div class="date">{{ offer.createTime | dateformat('MM.dd hh:mm') }}</div>
                <div class="price">{{ offer.offerPerPrice }}/{{ offer.baseUnit }}</div>
                <div class="tolerance">{{ offer.tolerance }}</div>
                <div class="place">{{ offer.offerPlaces }}</div>
                <div class="totleprcie">{{ offer.offerPrice }}元</div>
                <div class="remark">{{ offer.offerRemark }}</div>
            </div>
        </div>
    
    
        <fuzzySelector v-if="fuzzy.show" :x="fuzzy.x" :y="fuzzy.y" :oldVal="fuzzy.oldVal" :selectApi="fuzzy.selectApi" :queryStr="fuzzy.queryStr" @on-item-click="fuzzy.show = false" @outside-click="hideFuzzy" :id="activeTargetRef" :isCity="fuzzy.isCity" @on-destroy="validate"></fuzzySelector>
    </div>
</template>

<script>
    import fuzzySelector from '@/components/business/fuzzySelector.vue'
    export default {
        props: {
            item: Object,
            ironBuyId: String
        },
        components: {
            fuzzySelector
        },
        data() {
            return {
                activeUnit: 0,
                offerApi: {
                    ironBuyId: '',
                    flag: 1, //1报价，0是错过
                    offerPerPrice: '', //单价
                    offerPrice: '', //总价
                    tolerance: '',
                    offerPlacesId: '',
                    offerPlaces: '',
                    offerRemark: '',
                    baseUnitId: '',
                    baseUnit: ''
                },
                fuzzy: {
                    show: false,
                    x: '',
                    y: '',
                    queryStr: '',
                    selectApi: '',
                    isCity: false,
                    oldVal: ''
                },
                activeTargetRef: "", //当前选中的输入框
            }
        },
        computed: {
            // 是否需要填写公差
            needTo() {
                return this.item.ironTypeName == '不锈钢卷' || this.item.ironTypeName == '不锈钢板'
            },
            units() {
                let arr = [];
                if (this.item.numbers != '')
                    arr.push({
                        name: this.item.numberUnit,
                        id: this.item.numberUnitId,
                        key: 'numbers'
                    })
                if (this.item.weights != '')
                    arr.push({
                        name: this.item.weightUnit,
                        id: this.item.weightUnitId,
                        key: 'weights'
                    })
                return arr
            },
            unit() {
                return this.units[this.activeUnit]
            },
            // 总价
            totlePrice() {
                if (this.offerApi.offerPerPrice != '') {
                    let singlePrice = this.offerApi.offerPerPrice * 1;
                    if (isNaN(singlePrice)) {
                        return ''
                    } else {
                        return (singlePrice * (this.item[this.unit.key] * 1)).toFixed(2)
                    }
                } else {
                    return ''
                }
            },
            // 是否完成，已成交或者错过
            offerDone() {
                return this.item.offerStatus == 0 || this.item.offerStatus == 1
            },
            // 是否有报价历史
            offerHistory() {
                return this.item.ironSell ? this.item.ironSell.length > 0 : false;
            },
            // 最终报价
            finalOffer() {
                return this.item.ironSell && this.item.ironSell[0] ? this.item.ironSell[0] : {};
            },
            //单价验证
            offerPerPriceOk() {
                return this.offerApi.offerPerPrice != '' && !isNaN(this.offerApi.offerPerPrice * 1) && this.offerApi.offerPerPrice * 1 > 0
            },
            toleranceOk() {
                return this.needTo ? this.offerApi.tolerance != '' : true
            },
            offerPlacesOk() {
                return this.offerApi.offerPlaces != ''
            }
        },
        methods: {
            // 配置ID
            clectionData() {
                this.offerApi.ironBuyId = this.ironBuyId;
                this.offerApi.baseUnitId = this.unit.id;
                this.offerApi.baseUnit = this.unit.name;
            },
            // 显示弹框
            showFuzzy(event) {
                let inputId = event.target.getAttribute('id');
                this.activeTargetRef = inputId;
                let elemet = document.getElementById(inputId)
                let actualLeft = elemet.offsetLeft;　　
                let actualTop = elemet.offsetTop;　　
                let current = elemet.offsetParent;　
                while (current !== null) {　　　　　　
                    actualLeft += current.offsetLeft;
                    actualTop += current.offsetTop;　　　　　　
                    current = current.offsetParent;　　　　
                }　
                this.fuzzy.x = actualLeft - 20 + 'px';
                this.fuzzy.y = actualTop + 36 + 'px';
                this.fuzzy.selectApi = this.$api.G_getProPlaces;
                this.fuzzy.oldVal = event.target.value;
                this.fuzzy.isCity = inputId.indexOf('city') >= 0;
    
                this.fuzzy.show = false;
                setTimeout(() => {
                    this.fuzzy.show = true
                }, 100);
            },
            // 隐藏弹框
            hideFuzzy(e) {
                let input = this.$refs[this.activeTargetRef];
                let hasFocus = document.hasFocus() && document.activeElement === input;
                if (hasFocus) return
                this.fuzzy.show = false;
            },
            // 把输入的内容传递到子组件
            setInput(e) {
                this.fuzzy.queryStr = e.target.value;
            },
            // 输入框选择完毕后的验证
            validate(data) {
                let inputKey = data.id.split('-')[1];
                // 通过验证
                if (data.valide) {
                    this.fillItem(data.id, data.item);
                    this.removeErr(this.$refs[data.id].parentElement)
                } else {
                    this.setErr(this.$refs[data.id].parentElement)
                }
            },
            // 填充数据
            fillItem(id, item) {
                if (this.offerApi.offerPlaces == item.name) return false
                this.offerApi.offerPlaces = item.name;
                this.offerApi.offerPlacesId = item.id;
            },
            // 取消输入错误提示
            removeErr(el) {
                let elClassName = el.className;
                if (elClassName.indexOf('on-err') > 0) {
                    let reg = new RegExp("on-err", "g");
                    el.className = elClassName.replace(reg, "").replace(/(^\s*)|(\s*$)/g, "")
                }
            },
            // 设置输入错误提示
            setErr(el) {
                let elClassName = el.className;
                if (elClassName.indexOf('on-err') < 0) {
                    el.className = elClassName + ' ' + 'on-err';
                }
            },
            // 检查单价
            validItem(ref) {
                let isOk = this[ref + 'Ok'];
                if (isOk) {
                    this.removeErr(this.$refs[ref]);
                } else {
                    this.setErr(this.$refs[ref]);
                }
            },
            offerAjax(params, isIgon = false) {
                this.$spinToggle(true);
                this.$http.post(this.$api.doOffer, params).then(res => {
                    this.$spinToggle(false);
                    if (res.code === 1000) {
                        this.$Message.success(isIgon ? '已忽略' : '报价成功');
                        this.$emit('on-ajax', isIgon);
                        this.clearApi();
                    } else {
                        this.$Message.error(res.message)
                    }
                })
            },
            // 报价
            offer() {
                if (this.offerPerPriceOk && this.toleranceOk && this.offerPlacesOk) {
                    this.clectionData();
                    this.offerApi.flag = 1;
                    this.offerApi.offerPrice = this.totlePrice;
                    this.offerAjax(this.$clearData(this.offerApi));
                } else {
                    this.$Message.error('请将信息正确填写完整！')
                }
            },
            // 忽略
            ignore() {
                this.$Modal.confirm({
                    title: '是否要放弃报价？',
                    content: '放弃报价后将无法再次进行报价，是否继续？',
                    onOk: () => {
                        this.offerAjax({
                            ironBuyId: this.ironBuyId,
                            flag: 0
                        }, true);
                    }
                });
            },
            // 清除参数
            clearApi() {
                _.forEach(this.offerApi, (n, key) => {
                    this.offerApi[key] = ''
                })
            },
            // 自动填充报价信息
            fillOffer(flag) {
                this.offerApi = {
                    ironBuyId: this.ironBuyId,
                    flag: 1, //1报价，0是错过
                    offerPerPrice: '', //单价
                    offerPrice: '', //总价
                    tolerance: '',
                    offerPlacesId: '',
                    offerPlaces: '',
                    offerRemark: '',
                    baseUnitId: '',
                    baseUnit: ''
                }
            },
            // 选择单位
            selectUnit(i) {
                this.activeUnit = i;
            },
            init() {
                this.activeUnit = 0;
                this.clearApi();
                if (this.$refs.offerPerPrice) {
                    this.removeErr(this.$refs.offerPerPrice);
                    this.removeErr(this.$refs.tolerance);
                    this.removeErr(this.$refs.place);
                }
            }
        },
        watch: {
            ironBuyId() {
                this.init();
            }
        }
    }
</script>



