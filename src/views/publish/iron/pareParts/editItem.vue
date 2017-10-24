<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .item-group {
        width: 100%;
        padding: 30px;
        overflow: hidden;
        &.exception-bg {
            background-color: @goast_blue;
        }
    }
    
    .footer-bar {
        width: 100%;
        height: 30px;
        margin-top: 2px;
        text-align: right;
    }
    
    .btn {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 16px;
        text-align: center;
        color: #fff;
        background-color: @mask_blue;
        margin: 0 10px;
        cursor: pointer;
        .borderRadius;
        .noselect;
        &.goast {
            background: none;
            color: @mask_blue;
        }
    }
</style>

<template>
    <div class="item-group">
        <div class="contnet clearfix">
            <div class="input-item-warp wid-180">
                <label>货源所在地</label>
                <input class="goast-input level1" :ref="item.id+'-city'" :id="item.id+'-city'" type="text" @focus="showFuzzy" v-model="item.locationName" @keyup="setInput">
                <p class="err">{{ item.locationName == '' ? '请选择' : '无效内容' }}</p>
            </div>
            <div class="input-item-warp wid-240">
                <label>品名</label>
                <input class="goast-input level1" :ref="item.id+'-type'" :id="item.id+'-type'" type="text" @focus="showFuzzy" v-model="item.ironTypeName" @keyup="setInput">
                <p class="err">{{ item.ironTypeName == '' ? '请选择' : '无效内容' }}</p>
            </div>
            <div class="input-item-warp wid-200">
                <label>材质</label>
                <input class="goast-input level1" :ref="item.id+'-material'" :id="item.id+'-material'" type="text" @focus="showFuzzy" v-model="item.materialName" @keyup="setInput">
                <p class="err">{{ item.materialName == '' ? '请选择' : '无效内容' }}</p>
            </div>
            <div class="input-item-warp wid-140">
                <label>表面</label>
                <input class="goast-input level1" :ref="item.id+'-surface'" :id="item.id+'-surface'" type="text" @focus="showFuzzy" v-model="item.surfaceName" @keyup="setInput">
                <p class="err">{{ item.surfaceName == '' ? '请选择' : '无效内容' }}</p>
            </div>
            <div class="input-item-warp wid-240">
                <label>规格</label>
                <div class="inline" v-if="isJB">
                    <div class="inside-group">
                        <input class="goast-input" stay="ok" @focus="showRelation(true)" @keyup="showRelation(true)" type="text" v-model="item.height">
                        <span>厚</span>
                    </div>
                    <div class="inside-group">
                        <input class="goast-input" stay="ok" @focus="showRelation(false)" @keyup="showRelation(false)" type="text" v-model="item.width">
                        <span>宽</span>
                    </div>
                    <div class="inside-group">
                        <input class="goast-input" stay="ok" @focus="showRelation(false)" @keyup="showRelation(false)" type="text" v-model="item.length">
                        <span>长</span>
                    </div>
                </div>
                <input v-else class="goast-input level1" type="text" v-model="item.specifications">
    
                <div class="relation-content" v-show="tags.length > 0" v-clickoutside="clearTags">
                    <div class="tag" v-for="(tag,index) in tags" :key="index" @click="autoFillGG(tag)" :class="{'no-b':index === tags.length -1}">
                        {{ tag.height ? tag.height + '*' : '' }}{{ tag.width }}*{{ tag.length }}
                    </div>
                </div>
            </div>
            <div class="input-item-warp wid-112 no-margin disabel">
                <label>时间</label> 24小时
            </div>
            <div class="input-item-warp wid-180" v-if="isJB">
                <label>公差</label>
                <input class="goast-input level1" style="width:110px;text-align:right" type="text" v-model="item.tolerance">
            </div>
            <div class="input-item-warp wid-180 disabel" v-else>
                <label>公差</label>
            </div>
            <div class="input-item-warp wid-240" :class="{'on-err':unitTip}">
                <label>单位</label>
                <div class="inline">
                    <div class="inside-group">
                        <input class="goast-input" @blur="isUnitErr" style="width:75px" type="number" v-model="item.weights">
                        <span>{{ item.weightUnit == '' ? 'x' : item.weightUnit }}</span>
                    </div>
                    <div class="inside-group">
                        <input class="goast-input"  @blur="isUnitErr" style="width:75px" type="number" v-model="item.numbers">
                        <span>{{ item.numberUnit == '' ? 'x' : item.numberUnit }}</span>
                    </div>
                </div>
                <p class="err">至少填写一个单位！</p>
            </div>
            <div class="input-item-warp wid-200">
                <label>生产商</label>
                <input class="goast-input level1" style="width:120px" :ref="item.id+'-proPlace'" :id="item.id+'-proPlace'" type="text" @focus="showFuzzy" v-model="item.proPlacesName" @keyup="setInput">
                <p class="err">{{ item.ironTypeName == '' ? '请选择' : '无效内容' }}</p>
            </div>
            <div class="input-item-warp wid-550 no-margin">
                <label>备注(选填)</label>
                <input class="goast-input level1" maxlength="35" type="text" v-model="item.remark" placeholder="请填写您的交货期等其他要求，最多35字">
            </div>
        </div>
        <div class="footer-bar">
            <a class="btn goast" @click="close">取消</a>
            <a class="btn" @click="save">保存</a>
            <a class="btn" @click="publish">快速发布</a>
        </div>
    
        <fuzzySelector v-if="fuzzy.show" :x="fuzzy.x" :y="fuzzy.y" :oldVal="fuzzy.oldVal" :selectApi="fuzzy.selectApi" :queryStr="fuzzy.queryStr" @on-item-click="fuzzy.show = false" @outside-click="hideFuzzy" :id="activeTargetRef" :isCity="fuzzy.isCity" @on-destroy="validate"></fuzzySelector>
    </div>
</template>


<script>
    import fuzzySelector from '@/components/business/fuzzySelector.vue'
    
    export default {
        props: ['data'],
        components: {
            fuzzySelector
        },
        data() {
            return {
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
                item: JSON.parse(JSON.stringify(this.data)),
                tags: [], //关联数据列表,
                unitTip: false, //  单位选填提示
            }
        },
        computed: {
            pureData() {
                return JSON.parse(JSON.stringify(this.item))
            },
            typeOfSelect() {
                return this.activeTargetRef.split("-")[1]
            },
            api() {
                let selectApi = '';
                switch (this.typeOfSelect) {
                    case 'city':
                        selectApi = this.$api.G_getProvince;
                        break;
                    case 'type':
                        selectApi = this.$api.G_getTypes;
                        break;
                    case 'material':
                        selectApi = this.$api.G_getMaterials;
                        break;
                    case 'surface':
                        selectApi = this.$api.G_getSurFace;
                        break;
                    case 'proPlace':
                        selectApi = this.$api.G_getProPlaces;
                        break;
                    default:
                        break;
                }
                return selectApi
            },
            isOK() {
                // 规格
                let GuigeOK = this.item.height != '' && this.item.width != '' && this.item.length != '' || this.item.specifications != '';
                // 单位
                let unitOk = this.item.numbers != '' || this.item.weights != '';
                // 公差
                let toleranceOk = this.isJB ? this.item.tolerance != '' : true;
                return document.getElementsByClassName('on-err').length == 0 &&
                    GuigeOK && unitOk && toleranceOk &&
                    this.item.ironTypeName != '' &&
                    this.item.locationName != '' &&
                    this.item.materialName != '' &&
                    this.item.surfaceName != '' &&
                    this.item.timeLimit != '';
            },
            // 是卷或板
            isJB() {
                return this.item.ironTypeName == '不锈钢卷' || this.item.ironTypeName == '不锈钢板'
            }
        },
        methods: {
            initItem() {
                this.item = this.$clearData(this.data);
            },
            // 填充数据
            fillItem(id, item) {
                let typeOfSelect = id.split('-')[1];
                switch (typeOfSelect) {
                    case 'city':
                        if (this.item.locationName == item.name || this.item.locationName == item.shortName) return false
                        this.item.locationName = item.shortName;
                        this.item.locationId = item.id;
                        break;
                    case 'type':
                        if (this.item.ironTypeName == item.name) return false
                        this.item.ironTypeName = item.name;
                        this.item.ironTypeId = item.id;
                        break;
                    case 'material':
                        if (this.item.materialName == item.name) return false
                        this.item.materialName = item.name;
                        this.item.materialId = item.id;
                        break;
                    case 'surface':
                        if (this.item.surfaceName == item.name) return false
                        this.item.surfaceName = item.name;
                        this.item.surfaceId = item.id;
                        break;
                    case 'proPlace':
                        if (this.item.proPlacesName == item.name) return false
                        this.item.proPlacesName = item.name;
                        this.item.proPlacesId = item.id;
                        break;
                }
            },
            // 把输入的内容传递到子组件
            setInput(e) {
                this.fuzzy.queryStr = e.target.value;
            },
            // 显示弹框
            showFuzzy(event) {
                let inputId = event.target.getAttribute('id');
                this.activeTargetRef = inputId;
                let elemet = document.getElementById(inputId)
                let actualLeft = elemet.offsetLeft;　　
                let actualTop = elemet.offsetTop;　　
                console.log(actualLeft)
                console.log(actualTop)
                let current = elemet.offsetParent;　
                while (current != null) {　　　　　　
                    actualLeft += current.offsetLeft;
                    actualTop += current.offsetTop;　　　　　　
                    current = current.offsetParent;　
                }　
                this.fuzzy.x = actualLeft + 'px';
                this.fuzzy.y = actualTop + 36 + 'px';
                this.fuzzy.selectApi = this.api;
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
            // 判断单位是否填写至少一个
            isUnitErr() {
                if (this.item.weights == '' && this.item.numbers == '') {
                    this.unitTip = true
                } else {
                    this.unitTip = false
                }
            },
            // 保存求购，暂时不做存入localstage处理
            save() {
                if (this.isOK) {
                    this.$emit('on-save', this.pureData);
                } else {
                    this.$Message.error('请将信息正确填写完整！')
                }
            },
            // 取消求购编辑或者填写
            close() {
                this.$emit('on-close');
            },
            // 单个发布
            publish() {
                if (this.isOK) {
                    this.$http.post(this.$api.publish_one, this.$clearData(this.item)).then(res => {
                        if (res.code === 1000) {
                            this.$emit('on-publish');
                        }
                    })
                } else {
                    this.$Message.error('请将信息正确填写完整！')
                }
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
            // 设置输入错误提示
            setErr(el) {
                let elClassName = el.className;
                if (elClassName.indexOf('on-err') < 0) {
                    el.className = elClassName + ' ' + 'on-err';
                }
            },
            // 取消输入错误提示
            removeErr(el) {
                let elClassName = el.className;
                if (elClassName.indexOf('on-err') > 0) {
                    let reg = new RegExp("on-err", "g");
                    el.className = elClassName.replace(reg, "").replace(/(^\s*)|(\s*$)/g, "")
                }
            },
            // 自动填充单位
            setUnit(val) {
                this.$http.post(this.$api.findUnitById, {
                    ironId: val
                }).then(res => {
                    if (res.code === 1000) {
                        this.item.weightUnitId = res.data.weightUnitId;
                        this.item.weightUnit = res.data.weightUnitCName;
                        this.item.numberUnitId = res.data.numUnitId;
                        this.item.numberUnit = res.data.numUnitCName;
                    }
                })
            },
            //自动填充规格
            autoFillGG(tag) {
                this.item.width = tag.width;
                this.item.length = tag.length;
                if (tag.height)
                    this.item.height = tag.height;
                setTimeout(() => {
                    this.tags = [];
                }, 100);
            },
            // 显示关联提示
            showRelation(isHeight) {
                let params = {
                    surface: this.item.surfaceId,
                    ironType: this.item.ironTypeId,
                    width: this.item.width,
                    height: this.item.height,
                    length: this.item.length
                };
                // 如果是卷或者板，且材质已经正确选择
                if (this.isJB && this.item.surfaceId != '') {
                    // && this.item.height == ''
                    // 如果是厚
                    if (isHeight) {
                        this.getRelationData(params);
                    } else {
                        if (this.item.height == '') {
                            this.getRelationData(params);
                        } else {
                            params = {
                                surface: this.item.surfaceId,
                                ironType: this.item.ironTypeId
                            }
                            this.getWL(params)
                        }
                    }
                }
            },
            // 获取关联数据
            getRelationData(params) {
                this.$http.post(this.$api.G_queryGG, params).then(res => {
                    if (res.code === 1000) {
                        this.tags = res.data;
                    }
                })
            },
            //获取关联宽长
            getWL(params) {
                this.$http.post(this.$api.G_queryWL, params).then(res => {
                    if (res.code === 1000) {
                        this.tags = res.data;
                    }
                })
            },
            //清除数据列表
            clearTags(e) {
                if (e.target.getAttribute("stay") == 'ok') return false
    
                this.tags = [];
            }
        },
        watch: {
            'item.ironTypeId': 'setUnit',
            isJB(a, b) {
                if (a) {
                    this.item.specifications = '';
                } else {
                    this.item.width = '';
                    this.item.height = '';
                    this.item.length = '';
                }
            }
        }
    }
</script>



