<template>
    <div class="tb-picker spec-picker" v-clickoutside="ousideClick" ref="specContainer">
        <div class="tb-picker-rel" v-show="!isPr">
            <input ref="input" class="tb-input" type="text" v-model="chech.specifications" />
        </div>
        <div class="tb-picker-rel spce" v-show="isPr">
            <div class="spec-item">
                <input class="spec-input" @focus="showPanel(true)" type="text" v-model="chech.height">
                <span class="spec-label">厚</span>
            </div>
            <div class="spec-item">
                <input class="spec-input" @focus="showPanel(false)" type="text" v-model="chech.width">
                <span class="spec-label">宽</span>
            </div>
            <div class="spec-item">
                <input class="spec-input" @focus="showPanel(false)" type="text" v-model="chech.length">
                <span class="spec-label">长</span>
            </div>
        </div>
        <ajaxPanel ref="panel" :search="searchObj" v-if="isPr && panelShow" @on-picker="fillerData"></ajaxPanel>
    </div>
</template>


<script>
    import ajaxPanel from './ajaxPanel.vue'
    export default {
        components: {
            ajaxPanel
        },
        props: {
            value: {
                type: Object,
                default: function() {
                    return {
                        specifications: "",
                        height: "",
                        width: "",
                        length: ""
                    }
                }
            },
            ironType: {
                type: Object,
                default: function() {
                    return {
                        id: "",
                        name: ""
                    }
                }
            },
            surface: {
                type: Object,
                default: function() {
                    return {
                        id: "",
                        name: ""
                    }
                }
            },
        },
        data() {
            return {
                chech: {
                    specifications: "",
                    height: "",
                    width: "",
                    length: ""
                },
                isFocused:false,
                searchType: true, //搜索类型 是厚宽长 还是宽长
                panelShow: false //联想面板显示
            }
        },
        computed: {
            // 是否为板卷？
            isPr() {
                return this.ironType.name == '不锈钢板' || this.ironType.name == '不锈钢卷'
            },
            // 板卷，表面组合
            combination() {
                return {
                    ironType: this.ironType.id,
                    surface: this.ironType.id
                }
            },
            searchObj() {
                return {
                    type: this.searchType,
                    surface: this.surface.id,
                    ironType: this.ironType.id,
                    specifications: this.chech.specifications,
                    height: this.chech.height,
                    width: this.chech.width,
                    length: this.chech.length
                }
            },
            // 检查是否正确输入
            checkVal() {
                if (this.isPr) {
                    return this.chech.height != '' && this.chech.width != '' && this.chech.length != ''
                } else {
                    return this.chech.specifications != ''
                }
            }
        },
        watch: {
            'chech': {
                handler: function(val, oldVal) {
                    let data = {
                        specifications: this.isPr ? '' : val.specifications,
                        height: this.isPr ? val.height : '',
                        width: this.isPr ? val.width : '',
                        length: this.isPr ? val.length : ''
                    }
    
                    this.$emit('input', data);
                },
                deep: true
            },
            isPr(val) {
                if (val) {
                    this.chech.specifications = ''
                } else {
                    this.chech.height = ''
                    this.chech.width = '';
                    this.chech.length = '';
                }
            }
        },
        methods: {
            showPanel(isHeight) {
                this.panelShow = true;
                this.searchType = isHeight ? isHeight : this.chech.height != '' ? isHeight : !isHeight;
                this.isFocused = true;
            },
            // 选择回调，填充数据
            fillerData(data) {
                if (this.searchType) {
                    this.chech.height = data.height;
                    this.chech.width = data.width;
                    this.chech.length = data.length;
                } else {
                    this.chech.width = data.width;
                    this.chech.length = data.length;
                }
                this.panelShow = false;
            },
            // 点击外部
            ousideClick() {
                if(!this.isFocused)
                    return false

                let El = this.$refs.specContainer;
                let elClassName = El.className;
                // 如果点击后又没有输入或者没有输入对，测出现错误提示
                if (this.checkVal) {
                    if (elClassName.indexOf('on-err') > 0) {
                        let reg = new RegExp("on-err", "g");
                        El.className = elClassName.replace(reg, "").replace(/(^\s*)|(\s*$)/g, "")
                    }
                } else {
                    if (elClassName.indexOf('on-err') < 0)
                        El.className = elClassName + ' ' + 'on-err';
                }
    
                if (!this.$refs.panel)
                    return false
                this.panelShow = false;
            }
        },
        mounted () {
            this.chech = this.value
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    @import url('../../../assets/picker.less');
    .spec-picker {
        width: 160px;
        vertical-align: middle;
        &.on-err .tb-input,&.on-err .spce {
            border-color: @dark_red!important;
        }
    }
    
    .spce {
        -webkit-transition: border 0.2s ease-in-out, background 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
        border: @b_d1;
        .borderRadius(3px);
        overflow: hidden;
        &:hover,
        &:active {
            border-color: @hover_blue;
        }
    }
    
    .spec-item {
        position: relative;
        float: left;
        width: 100%/3;
        height: 32px;
    }
    
    .spec-input {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 1.5;
        padding: 4px 7px 4px 12px;
        margin-left: 10px;
        color: #495060;
        background-color: #fff;
        background-image: none;
        cursor: text;
        outline: 0;
        border: 0;
    }
    
    .spec-label {
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 100%;
        line-height: 32px;
        text-align: center;
        left: 3px;
        top: 0;
        color: @f_ligth;
    }
</style>