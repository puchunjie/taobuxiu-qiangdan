<template>
    <div class="tb-picker">
        <div class="tb-picker-rel">
            <textarea ref="input" v-if="!disabled" :style="{height:height+'px'}" :placeholder="placeholder" class="tb-textarea" type="text" v-model="inValue" @blur="checkValue" @keyup="inPut" />
        </div>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce'
    export default {
        props: {
            validate: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: [String, Number],
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder:{
                type: String,
                default: ''
            },
            height:{
                type:[String,Number],
                default: 60
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
                if (this.validate) {
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
                this.$emit("on-input")
            },
            // 类型检查
            inPut:debounce(function(){
                this.$emit("on-input")
            },100)
        },
        mounted() {
            if(this.type == 'number'){
                this.inValue = isNaN(Number(this.value)) ? 0 : Number(this.value)
            }else{
                this.inValue = this.value
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/picker.less');
</style>
