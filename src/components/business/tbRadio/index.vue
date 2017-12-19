<template>
    <div class="tb-checkbox-container">
        <a class="riado-group" v-for="(item,i) in data" :key="i" @click="picker(i)">
            <span class="iconfont" :class="i == activeIndex ? 'icon-radioacheck' : 'icon-radio'"></span>
            <label>{{ item.label }}</label>
        </a>
    </div>
</template>

<script>
    import findIndex from 'lodash/findIndex'
    export default {
        props: {
            value: {
                type: [Number, String]
            },
            data: {
                type: Array,
                default: function() {
                    return [{
                        label: '电汇',
                        value: 1
                    }, {
                        label: '支票',
                        value: 2
                    }, {
                        label: '承兑',
                        value: 3
                    }]
                }
            }
        },
        data() {
            return {
                activeIndex: 0,
                isInit: false
            }
        },
        computed: {
            activeItem() {
                return this.data.length > 0 ? this.data[this.activeIndex] : {
                    label: undefined,
                    value: undefined
                }
            }
        },
        methods: {
            picker(i) {
                this.activeIndex = i;
                this.$emit('input', this.activeItem.value);
            },
            setActive() {
                let inputActive = findIndex(this.data, el => {
                    return el.value == this.value
                })
                if (inputActive > 0) {
                    this.activeIndex = inputActive;
                } else {
                    this.activeIndex = 0;
                    this.$emit('input', this.activeItem.value);
                }
                this.isInit = true;
            }
        },
        mounted () {
            this.setActive();
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .tb-checkbox-container {
        display: inline-block;
        .icon-radio {
            color: @f_ligth;
        }
        .icon-radioacheck {
            color: @dark_blue;
        }
        label {
            margin-right: 30px;
            color: @f_dark;
            cursor: pointer;
        }
    }
</style>


