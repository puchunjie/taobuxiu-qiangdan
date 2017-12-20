<template>
    <div class="tb-picker" v-clickoutside="ousideClick">
        <div class="tb-picker-rel">
            <input ref="input" class="tb-input" :placeholder="placeholder" v-model="chech.name" @keyup="showPanel" @focus="saveValue" />
        </div>
        <ajaxPanel ref="panel" :class="placement" :search="chech.name" :options="option" :tip="option.searchTitle" @on-picker="saveData" v-if="panelShow"></ajaxPanel>
    </div>
</template>

<script>
    import ajaxPanel from './ajaxPanel.vue'
    export default {
        props: {
            placeholder:{
                type: String,
                default: ''
            },
            validate: {
                type: Boolean,
                default: false
            },
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
                        searchTitle: '支持中文/拼音/简拼输入',
                        selectData: [{
                                tabName: '省份',
                                api: this.$api.G_getProvince
                            },
                            {
                                tabName: '市区',
                                api: this.$api.G_getCity
                            }
                        ],
                        searchData: {
                            api: this.$api.G_getArea
                        }
                    }
                }
            },
            placement:{
                type:String,
                default:'left'
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
                if (this.validate) {
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
                }else{
                    data.id = '';
                    data.name = '';
                }
                
                this.saveData(data);
            }
        },
        mounted() {
            this.chech = this.value
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/picker.less');
</style>

