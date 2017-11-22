<template>
    <div class="tb-picker">
        <div class="tb-picker-rel">
            <p class="tb-select" @click="togglePanel">
                {{ activeItem.label }}
                <span class="iconfont" :class="panelShow ? 'icon-iconjiaobiaoxiangshang': 'icon-iconjiaobiaoxiangxia'"></span>
            </p>
            <div class="select-content" v-show="panelShow">
                <div class="item" v-for="(item,i) in list" :key="i" @click="pickerItem(i)">{{ item.label }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import findIndex from 'lodash/findIndex'
    export default {
        props: {
            // 是否异步获取数据
            ajax: {
                type: Boolean,
                default: false
            },
            value: {
                type: [String, Number],
                default: 1
            },
            api: {
                type: String,
                default: ''
            },
            data: {
                type: Array
            }
        },
        data() {
            return {
                activeIndex: 0,
                list: [],
                panelShow: false
            }
        },
        computed: {
            activeItem() {
                return this.list.length > 0 ? this.list[this.activeIndex] : {
                    label: "",
                    value: ""
                }
            }
        },
        methods: {
            togglePanel() {
                this.panelShow = !this.panelShow
            },
            pickerItem(i) {
                this.activeIndex = i;
                this.panelShow = false;
            },
            getAjax() {
                this.$http.post(this.api).then(res => {
                    if (res.code === 1000) {
                        res.data.forEach(el => {
                            this.list.push({
                                label: el.name,
                                value: el.name
                            })
                        })
                    }
                })
            }
        },
        watch: {
            'activeItem': {
                handler: function(val, oldVal) {
                    this.$emit('input', val.value);
                },
                deep: true
            }
        },
        created() {
            if (this.data) {
                this.list = this.data;
            } else {
                this.getAjax();
            }
        },
        mounted() {
            this.$nextTick(() => {
                let inputActive = findIndex(this.list, el => {
                    return el.value = this.value
                })
                this.activeIndex = inputActive >= 0 ? inputActive : 0
            })
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/picker.less');
</style>