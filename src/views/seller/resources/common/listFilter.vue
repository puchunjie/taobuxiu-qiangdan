<template>
    <div class="filter-container">
        <div class="btns">
            <a class="btn" @click="publish">上架资源</a>
            <a class="btn goast" @click="upload">EXCEL导入</a>
        </div>
    
        <div class="state-contnet">
            <a class="state-item" :class="{ 'active' : i == activeState }" v-for="(item,i) in states" :key="i" @click="pickerState(i)">{{ item.name }}({{ item.count }})</a>
        </div>
        <div class="picker-filter">
            <div class="group">
                品类：
                <asyncPicker class="input-item" v-model="iron" :exclude="exclude" :api="$api.G_getTypes"></asyncPicker>
            </div>
            <div class="group">
                材质：
                <asyncPicker class="input-item" v-model="material" :api="$api.G_getMaterials"></asyncPicker>
            </div>
            <div class="group">
                表面：
                <asyncPicker class="input-item" v-model="surface" :api="$api.G_getSurFace"></asyncPicker>
            </div>
            <div class="group">
                产地：
                <asyncPicker class="input-item" v-model="proPlace" :api="$api.G_getProPlaces"></asyncPicker>
            </div>
            <a class="reset-search" @click="clearFilter">清空搜索条件</a>
        </div>
    </div>
</template>


<script>
    import asyncPicker from '@/components/business/asyncPicker/index'
    export default {
        props: {
            value: {
                type: Object,
                default: function() {
                    return {
                        status: 1,
                        ironTypeId: "",
                        materialId: "",
                        surfaceId: "",
                        proPlaceId: ""
                    }
                }
            },
            exclude: {
                type: Array
            }
        },
        components: {
            asyncPicker
        },
        data() {
            return {
                activeState: 0,
                states: [{
                    name: "已上架",
                    count: 0,
                    state: 1
                }, {
                    name: "已手动下架",
                    count: 0,
                    state: 0
                }, {
                    name: "过期自动下架",
                    count: 0,
                    state: 3
                }, {
                    name: "管理员下架",
                    count: 0,
                    state: 2
                }],
                iron: {
                    name: '',
                    id: ''
                },
                material: {
                    name: '',
                    id: ''
                },
                proPlace: {
                    name: '',
                    id: ''
                },
                surface: {
                    name: '',
                    id: ''
                }
            }
        },
        computed: {
            filterData() {
                return {
                    status: this.states[this.activeState].state,
                    ironTypeId: this.iron.id,
                    materialId: this.material.id,
                    surfaceId: this.surface.id,
                    proPlaceId: this.proPlace.id
                }
            }
        },
        watch: {
            'filterData': {
                handler: function(val, oldVal) {
                    // 切换tab的时候，把currentPage重置为1
                    if (val.status != oldVal.status)
                        this.$parent.page.currentPage = 1;
                    this.$emit('input', val);
                },
                deep: true
            }
        },
        methods: {
            pickerState(i) {
                this.activeState = i;
            },
            clearFilter() {
                this.clearItem("iron");
                this.clearItem("material");
                this.clearItem("surface");
                this.clearItem("proPlace");
            },
            clearItem(key) {
                this[key].id = "";
                this[key].name = "";
            },
            publish() {
                this.$emit("on-publish");
            },
            upload() {
                this.$emit("on-upload");
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url("../../../../assets/base.less");
    .filter-container {
        position: relative;
        width: 100%;
        padding: 30px 20px;
        background-color: #fff;
        border: @b_d1;
        font-size: 14px;
        .state-contnet {
            width: 100%;
            height: 40px;
            border-bottom: @b_d1;
        }
        .state-item {
            display: inline-block;
            width: 140px;
            height: 100%;
            text-align: center;
            border-bottom: 4px solid #fff;
            color: @f_dark;
            font-size: 16px;
            font-weight: bold;
            &.active,
            &:hover {
                border-color: @dark_blue;
                color: @dark_blue;
            }
        }
        .picker-filter {
            position: relative;
            width: 100%;
            margin-top: 30px;
            padding: 0 10px;
            .group {
                display: inline-block;
                margin-right: 50px;
                .input-item {
                    width: 120px;
                }
            }
            .reset-search {
                position: absolute;
                display: inline-block;
                width: 90px;
                height: 32px;
                right: 0;
                line-height: 28px;
                border: 2px solid @dark_blue;
                color: @dark_blue;
                text-align: center;
                font-size: 12px;
                background-color: #fff;
            }
        }
        .btns {
            position: absolute;
            right: 20px;
            top: 20px;
            .btn {
                display: inline-block;
                width: 100px;
                height: 32px;
                line-height: 30px;
                text-align: center;
                background-color: @dark_blue;
                color: #fff;
                border: 1px solid @dark_blue;
                font-weight: bold;
                &.goast {
                    background-color: #fff;
                    color: @dark_blue;
                    margin-left: 20px;
                }
            }
        }
    }
</style>
