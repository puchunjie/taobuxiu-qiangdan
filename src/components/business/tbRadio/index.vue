<template>
    <div class="tb-checkbox-container">
        <a class="riado-group" v-for="(item,i) in data" :key="i" @click="picker(i)">
            <span class="iconfont" :class="i == activeIndex ? 'icon-radioacheck' : 'icon-radio'"></span>
            <label>{{ item.name }}</label>
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
                        name: '电汇',
                        id: 1
                    }, {
                        name: '支票',
                        id: 2
                    }, {
                        name: '承兑',
                        id: 3
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
                    name: undefined,
                    id: undefined
                }
            }
        },
        watch: {
            // activeItem(old,newVal){
            //     if(newVal.id)
            //         this.$emit('input', this.activeItem.id);
            // }
            value(val){
                this.activeIndex = findIndex(this.data, el => {
                    return el.id == val
                })
            }
        },
        methods: {
            picker(i) {
                this.activeIndex = i;
                this.$emit('input', this.activeItem.id);
            },
            setActive() {
                let inputActive = findIndex(this.data, el => {
                    return el.id == this.activeItem.id
                })
                if (inputActive > 0) {
                    this.activeIndex = inputActive;
                } else {
                    this.activeIndex = 0;
                }
                this.$emit('input', this.activeItem.id);
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


