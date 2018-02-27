<template>
    <i-select filterable v-model="select" @on-change="asyncValue">
        <i-option v-for="(item,i) in list" :key="i" :value="valueIn(item)">{{ showLabel(item) }}</i-option>
    </i-select>
</template>

<script>
    export default {
        props: {
            api: String,
            objKey: {
                type: String,
                default: 'data'
            },
            value: {
                type:String,
                default: ''
            },
            labelKey: {
                type: Array,
                default: function() {
                    return ['name']
                }
            },
            valueKey: {
                type: Array,
                default: function() {
                    return ['id', 'name']
                }
            }
        },
        data() {
            return {
                list: [],
                hasLoad: false,
                select: ''
            }
        },
        methods: {
            // 获取仓库列表
            getList() {
                this.$http.post(this.api).then(res => {
                    if (res.code === 1000) {
                        this.list = res[this.objKey]
                    }
                })
            },
            asyncValue() {
                if (this.select != '') {
                    let rsData = JSON.parse(this.select);
                    let obj = {};
                    Object.keys(rsData).forEach(key => {
                        obj[key] = rsData[key];
                    })
                    this.$emit('on-select', obj);
                }
            },
            showLabel(item) {
                let rot = ''
                this.labelKey.forEach(el => {
                    rot += item[el] + ' ';
                })
                return rot
            },
            valueIn(item) {
                let rot = '';
                let obj = {};
                this.valueKey.forEach(key => {
                    obj[key] = item[key]
                })
                return JSON.stringify(obj);
            }
        },
        watch: {
            value(val) {
                this.select = val;
            }
        },
        created() {
            this.select = this.value;
            this.getList();
        }
    }
</script>

