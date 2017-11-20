<template>
    <div class="tb-picker">
        <div class="tb-picker-rel">
            <input ref="input" class="tb-input" type="text" v-model="inValue" @blur="checkValue" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: [String, Number],
                default: ''
            }
        },
        data() {
            return {
                inValue: ''
            }
        },
        watch: {
            value(val) {
                this.inValue = val;
            },
            inValue(val) {
                this.$emit('input', val);
            }
        },
        methods: {
            checkValue() {
                let inpuEl = this.$refs.input;
                let elClassName = inpuEl.className;
                if (this.inValue == '') {
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
        mounted() {
            this.inValue = this.value
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/picker.less');
</style>
