<template>
    <div class="tb-picker" v-clickoutside="ousideClick">
        <div class="tb-picker-rel">
            <input ref="input" class="tb-input" v-model="chech.name" @keyup="showPanel" @focus="saveValue" />
        </div>
        <ajaxPanel ref="panel" :search="chech.name" :options="{searchTitle: tip,api: api}" :tip="tip" @on-picker="saveData" v-if="panelShow"></ajaxPanel>
    </div>
</template>

<script>
    import ajaxPanel from './ajaxPanel.vue'
    export default {
        props: {
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
            tip: {
                type: String,
                default: '支持中文输入'
            },
            api: {
                type: String,
                default: ''
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
                    data.name = panel.searchList[0].name
                } else {
                    data.name = data.name == this.oldValue ? data.name : this.oldValue
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

