<template>
    <div class="filter-container">
        <div class="filter-item">
            <label>货源所在地</label>
            <cityPicter style="width:100px" v-model="location"></cityPicter>
        </div>
        <div class="filter-item">
            <label>品名</label>
            <asyncPicker v-if="!isDk" style="width:200px" v-model="ironType" :api="$api.G_getTypes"></asyncPicker>
            <asyncPicker v-else v-model="ironType" style="width:200px" :api="$api.G_getTypes" :exclude="['不锈钢板','不锈钢卷']"></asyncPicker>
        </div>
        <div class="filter-item">
            <label>材质</label>
            <asyncPicker style="width:160px" v-model="material" :api="$api.G_getMaterials"></asyncPicker>
        </div>
        <div class="filter-item">
            <label>表面</label>
            <asyncPicker style="width:100px" v-model="surface" :api="$api.G_getSurFace"></asyncPicker>
        </div>
        <div class="filter-item">
            <label>产地</label>
            <asyncPicker style="width:110px" v-model="proPlace" placement="right" :api="$api.G_getProPlaces"></asyncPicker>
        </div>
        <div class="filter-item no-m">
            <label>仓库</label>
            <asyncPicker style="width:110px" v-model="storeHouse" placement="right" :api="$api.getStores"></asyncPicker>
        </div>
        <div class="filter-item">
            <label>厚度</label>
            <tbInput class="interval" :disabled="!hwlDisabel" v-model="other.heightMin"></tbInput>
            <span>-</span>
            <tbInput class="interval" :disabled="!hwlDisabel" v-model="other.heightMax"></tbInput>
        </div>
        <div class="filter-item">
            <label>宽度</label>
            <tbInput class="interval" :disabled="!hwlDisabel" v-model="other.widthMin"></tbInput>
            <span>-</span>
            <tbInput class="interval" :disabled="!hwlDisabel" v-model="other.widthMax"></tbInput>
        </div>
        <div class="filter-item">
            <label>长度</label>
            <tbInput class="interval" :disabled="!hwlDisabel" v-model="other.lengthMin"></tbInput>
            <span>-</span>
            <tbInput class="interval" :disabled="!hwlDisabel" v-model="other.lengthMax"></tbInput>
        </div>
        <div class="filter-item">
            <label>公差</label>
            <tbInput class="interval" :disabled="!hwlDisabel" v-model="other.tolenceMin"></tbInput>
            <span>-</span>
            <tbInput class="interval" :disabled="!hwlDisabel" v-model="other.tolenceMax"></tbInput>
        </div>
        <div class="filter-item no-m"><span class="red-tip">*精确搜索，对应内容项只需填写任意一空</span></div>
    
        <template v-if="!isDk">
                 <div class="filter-item">
                    <label>规格</label>
                    <tbInput class="lager-input" :disabled="!stDisable" v-model="other.specifications"></tbInput>
                </div>
            
                <div class="filter-item">
                    <label>公差</label>
                    <tbInput class="lager-input" :disabled="!stDisable" v-model="other.tolerance"></tbInput>
                </div>
</template>

        <div class="filter-item" v-else>
            <label>计划开平时间</label>
            <asyncPicker style="width:160px" v-model="kaiPing" :api="$api.findAllKaiping"></asyncPicker>
        </div>
    
        <div class="search-btns">
            <a class="reflash-list" @click="reFalsh">刷新列表</a>
            <a class="btn" @click="search(false)">搜索</a>
            <a class="btn goast" @click="search(true)">清空条件</a>
        </div>
    </div>
</template>

<script>
    import tbInput from '@/components/business/tbInput/index'
    import cityPicter from '@/components/business/cityPicker/index'
    import asyncPicker from '@/components/business/asyncPicker/index'
    import specPicker from '@/components/business/specPicker/index'
    import _froEach from 'lodash/forEach'
    export default {
        components: {
            tbInput,
            cityPicter,
            asyncPicker,
            specPicker
        },
        props: {
            isDk: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                location: {
                    id: "",
                    name: ""
                },
                ironType: {
                    id: "",
                    name: ""
                },
                material: {
                    id: "",
                    name: ""
                },
                surface: {
                    id: "",
                    name: ""
                },
                proPlace: {
                    id: "",
                    name: ""
                },
                storeHouse: {
                    id: "",
                    name: ""
                },
                kaiPing: {
                    id: "",
                    name: ""
                },
                other: {
                    heightMin: "",
                    heightMax: "",
                    widthMin: "",
                    widthMax: "",
                    lengthMin: "",
                    lengthMax: "",
                    tolenceMin: "",
                    tolenceMax: "",
                    specifications: "",
                    tolerance: ""
                }
            }
        },
        computed: {
            // 是否为板卷？
            isBJ() {
                return this.ironType.name == '不锈钢板' || this.ironType.name == '不锈钢卷'
            },
            // 厚宽长公差是否可输入
            hwlDisabel() {
                let threeInput = this.other.specifications == '' && this.other.tolerance == '';
                let bj = this.isBJ || this.ironType.name == '';
                return threeInput && bj
            },
            stDisable() {
                let twoInput = this.other.heightMin == '' && this.other.heightMax == '' && this.other.widthMin == '' && this.other.widthMax == '' && this.other.lengthMin == '' && this.other.lengthMax == '' && this.other.tolenceMin == '' && this.other.tolenceMax == '';
                let bj = !this.isBJ;
                return twoInput && bj
            },
            filterValue() {
                return {
                    locationId: this.location.id,
                    ironTypeId: this.ironType.id,
                    materialId: this.material.id,
                    surfaceId: this.surface.id,
                    proPlaceId: this.proPlace.id,
                    storeHouseId: this.storeHouse.id,
                    heightMin: this.other.heightMin,
                    heightMax: this.other.heightMax,
                    widthMin: this.other.widthMin,
                    widthMax: this.other.widthMax,
                    lengthMin: this.other.lengthMin,
                    lengthMax: this.other.lengthMax,
                    tolenceMin: this.other.tolenceMin,
                    tolenceMax: this.other.tolenceMax,
                    specifications: this.other.specifications,
                    tolerance: this.other.tolerance,
                    kaiPing: this.kaiPing.name
                }
            }
        },
        watch: {
            //板卷、非板卷切换时候重置筛选参数
            hwlDisabel(val) {
                this.switchValue(val)
            },
            stDisable(val) {
                this.switchValue(!val)
            },
            'other': {
                handler: function(val, oldVal) {
                    this.$emit('on-change', val);
                },
                deep: true
            },
            'filterValue': {
                handler: function(val, oldVal) {
                    this.$emit('on-change', val);
                },
                deep: true
            }
        },
        methods: {
            search(isRest) {
                if (isRest)
                    this.resetFrom();
                this.$emit('on-search', this.$clearData(this.filterValue));
            },
            resetFrom() {
                this.location.id = '';
                this.location.name = '';
                this.ironType.id = '';
                this.ironType.name = '';
                this.material.id = '';
                this.material.name = '';
                this.surface.id = '';
                this.surface.name = '';
                this.proPlace.id = '';
                this.proPlace.name = '';
                this.storeHouse.id = '';
                this.storeHouse.name = '';
                this.kaiPing.id = '';
                this.kaiPing.name = '';
                _froEach(this.other, (val, key) => {
                    this.other[key] = ''
                })
            },
            reFalsh() {
                this.$parent.getData()
            },
            switchValue(val) {
                if (val) {
                    this.other.specifications = '';
                    this.other.tolerance = '';
                } else {
                    this.other.heightMin = '';
                    this.other.heightMax = '';
                    this.other.widthMin = '';
                    this.other.widthMax = '';
                    this.other.lengthMin = '';
                    this.other.lengthMax = '';
                    this.other.tolenceMin = '';
                    this.other.tolenceMax = '';
                }
            }
        }
    }
</script>



<style lang="less" scoped>
    @import url("../../../assets/base.less");
    .filter-container {
        position: relative;
        width: 100%;
        height: 178px;
        background-color: #fff;
        border: @b_d1;
        padding: 20px 30px 30px;
        .filter-item {
            display: inline-block;
            margin: 0 30px 16px 0;
            label {
                color: @f_goast;
                margin-right: 10px;
            }
            &.no-m {
                margin-right: 0;
            }
        }
        .interval {
            width: 80px;
        }
        .lager-input {
            width: 173px;
        }
        .red-tip {
            font-size: 12px;
            color: @dark_red;
        }
        .search-btns {
            position: absolute;
            right: 30px;
            bottom: 30px;
            .btn {
                display: inline-block;
                width: 90px;
                height: 32px;
                line-height: 28px;
                border: 2px solid @dark_blue;
                color: #fff;
                text-align: center;
                background-color: @dark_blue;
            }
            .goast {
                background-color: #fff;
                color: @dark_blue;
                margin-left: 20px;
            }
            .reflash-list {
                font-size: 12px;
                margin-right: 20px;
            }
        }
    }
</style>
