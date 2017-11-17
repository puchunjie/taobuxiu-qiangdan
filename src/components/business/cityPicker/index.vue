<template>
    <div class="tb-city-picker" v-clickoutside="ousideClick">
        <div class="tb-city-picker-rel">
            <input ref="input" class="tb-input" v-model="chech.name" @keyup="showPanel" @focus="saveValue" />
        </div>
        <ajaxPanel ref="panel" :search="chech.name" :options="option" :tip="option.searchTitle" @on-picker="saveData" v-if="panelShow"></ajaxPanel>
    </div>
</template>

<script>
    import ajaxPanel from './ajaxPanel.vue'
    export default {
        props: {
            value: {
                type: Object,
                default: function() {
                    return {
                        id: '',
                        name: ''
                    }
                }
            },
            option: {
                type: Object,
                default: function() {
                    return {
                        searchTitle: '标题',
                        selectData: [{
                                tabName: 'xx',
                                api: ''
                            },
                            {
                                tabName: 'xx',
                                api: ''
                            }
                        ],
                        searchData: {
                            api: ''
                        }
                    }
                }
            }
        },
        components: {
            ajaxPanel
        },
        data() {
            return {
                chech: {
                    id: '',
                    name: ''
                },
                oldValue: '',
                panelShow: false
            }
        },
        watch: {
            chech(val) {
                this.$emit('input', val);
            },
            panelShow(val) {
                let inpuEl = this.$refs.input;
                let elClassName = inpuEl.className;
                // 如果点击后又没有输入或者没有输入对，测出现错误提示
                if (!val && this.chech.name == '') {
                    if (elClassName.indexOf('on-err') < 0)
                        inpuEl.className = elClassName + ' ' + 'on-err';
                } else {
                    if (elClassName.indexOf('on-err') > 0) {
                        let reg = new RegExp("on-err", "g");
                        inpuEl.className = elClassName.replace(reg, "").replace(/(^\s*)|(\s*$)/g, "")
                    }
                }
            }
        },
        methods: {
            showPanel() {
                this.panelShow = true
            },
            saveValue() {
                this.showPanel();
                this.oldValue = this.chech.name
            },
            saveData(data) {
                this.chech = data;
                this.panelShow = false;
            },
            // 点击外部
            ousideClick() {
                if (!this.$refs.panel)
                    return false
                let panel = this.$refs.panel,
                    data = this.$clearData(this.chech);
                if (panel.isSearch && panel.search != '' && panel.searchList.length > 0) {
                    data.id = panel.searchList[0].id;
                    data.name = panel.searchList[0].shortName
                } else {
                    data.name = data.name == this.oldValue ? data.name : this.oldValue
                }
                this.saveData(data);
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .tb-city-picker {
        display: inline-block;
        line-height: normal;
    }
    
    .tb-city-picker-rel {
        position: relative;
    }
    
    .tb-input {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 12px;
        border: @b_d1;
        .borderRadius;
        color: #495060;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
        outline: 0;
        &.on-err {
            border-color: @dark_red !important;
        }
    }
    
    .tb-input:focus,
    .tb-input:hover {
        border-color: @hover_blue;
    }
</style>

