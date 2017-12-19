<template>
    <div class="table-tr">
        <div class="table-td iron">
            <asyncPicker validate v-model="iron" :api="$api.G_getTypes"></asyncPicker>
        </div>
        <div class="table-td material">
            <asyncPicker validate v-model="material" :api="$api.G_getMaterials"></asyncPicker>
        </div>
        <div class="table-td surface">
            <asyncPicker validate v-model="surface" :api="$api.G_getSurFace"></asyncPicker>
        </div>
        <div class="table-td proPlace">
            <asyncPicker validate v-model="proPlace" :api="$api.G_getProPlaces"></asyncPicker>
        </div>
        <div class="table-td spec">
            <specPicker validate v-model="spec" :ironType="iron" :surface="surface"></specPicker>
        </div>
        <div class="table-td tolerance">
            <tbInput validate v-model="other.tolerance"></tbInput>
        </div>
        <div class="table-td measuring">
            <tbSelect v-model="other.measuringType" :data='[{label:"理计",value:"2"},{label:"过磅",value:"1"}]'></tbSelect>
        </div>
        <div class="table-td price">
            <tbInput validate v-model="other.price" @on-input="validatePrice"></tbInput>
        </div>
        <div class="table-td tax">
            <tbSelect v-model="other.taxType" :data='[{label:"是",value:"1"},{label:"否",value:"2"}]'></tbSelect>
        </div>
        <div class="table-td location">
            <cityPicter validate v-model="location" placement="right"></cityPicter>
        </div>
        <div class="table-td stock">
            <tbInput validate v-model="other.storeHouseCount"></tbInput>
        </div>
        <div class="table-td warehouse">
            <asyncPicker validate v-model="warehouse" placement="right" :api="$api.getStores"></asyncPicker>
        </div>
        <div class="table-td operation" v-show="!isEdit">
            <Poptip v-model="tip" placement="left" trigger="hover">
                <span class="iconfont icon-ziyuan9 action"></span>
                <div slot="content" class="action-btns">
                    <div class="item" @click="add">新增</div>
                    <div class="item" @click="copy">复制</div>
                    <div class="item" @click="del">删除</div>
                </div>
            </Poptip>
        </div>
    </div>
</template>

<script>
    import tbInput from '@/components/business/tbInput/index'
    import tbSelect from '@/components/business/tbSelect/index'
    import cityPicter from '@/components/business/cityPicker/index'
    import asyncPicker from '@/components/business/asyncPicker/index'
    import specPicker from '@/components/business/specPicker/index'
    import debounce from 'lodash/debounce'
    import assign from 'lodash/assign'
    import remove from 'lodash/remove'
    import cloneDeep from 'lodash/cloneDeep'
    export default {
        components: {
            tbInput,
            tbSelect,
            cityPicter,
            asyncPicker,
            specPicker
        },
        props: {
            value: {
                type: Object,
                default: function() {
                    return {
                        id: "",
                        uuId: "",
                        ironTypeId: "",
                        ironTypeName: "",
                        materialId: "",
                        materialName: "",
                        surfaceId: "",
                        surfaceName: "",
                        proPlacesId: "",
                        proPlacesName: "",
                        length: "",
                        width: "",
                        height: "",
                        specifications: "",
                        tolerance: "",
                        measuringType: "",
                        taxType: "",
                        price: "",
                        locationId: "",
                        locationName: "",
                        storeHouseId: "",
                        storeHouseName: "",
                        storeHouseCount: "",
                        appFlag: "1"
                    }
                }
            },
            index: {
                type: [String, Number]
            },
            isEdit: {
                type: Boolean
            },
        },
        data() {
            return {
                tip: false,
                id: "",
                iron: {
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
                spec: {
                    length: "",
                    width: "",
                    height: "",
                    specifications: ""
                },
                location: {
                    id: "",
                    name: ""
                },
                warehouse: {
                    id: "",
                    name: ""
                },
                other: {
                    tolerance: "",
                    measuringType: "",
                    taxType: "",
                    storeHouseCount: "",
                    price: ""
                }
            }
        },
        computed: {
            assignObj() {
                return {
                    id: this.id,
                    uuId: this.uuId,
                    ironTypeId: this.iron.id,
                    ironTypeName: this.iron.name,
                    materialId: this.material.id,
                    materialName: this.material.name,
                    surfaceId: this.surface.id,
                    surfaceName: this.surface.name,
                    proPlacesId: this.proPlace.id,
                    proPlacesName: this.proPlace.name,
                    length: this.spec.length,
                    width: this.spec.width,
                    height: this.spec.height,
                    specifications: this.spec.specifications,
                    tolerance: this.other.tolerance,
                    measuringType: this.other.measuringType,
                    taxType: this.other.taxType,
                    price: this.other.price,
                    locationId: this.location.id,
                    locationName: this.location.name,
                    storeHouseId: this.warehouse.id,
                    storeHouseName: this.warehouse.name,
                    storeHouseCount: this.other.storeHouseCount,
                    appFlag: "1"
                }
            },
            specOk() {
                return this.spec.specifications != '' || (this.spec.length != "" && this.spec.height != "" && this.spec.width != "")
            },
            otherOk() {
                let isBJ = this.iron.name == '不锈钢卷' || this.iron.name == '不锈钢板';
                let arr = remove(Object.keys(this.assignObj), (n) => {
                    return n != 'id' && n != 'specifications' && n != 'length' && n != 'height' && n != 'width'
                })
                let ok = true;
                if(!isBJ)
                    remove(arr,n=>{return n == 'tolerance'})
                arr.forEach(el => {
                    if (this.assignObj[el] == '') {
                        ok = false
                        return false
                    }
                });
                return ok
            },
            isOk() {
                return this.otherOk && this.specOk
            }
        },
        watch: {
            'assignObj': {
                handler: debounce(function(val, oldVal) {
                    let item = cloneDeep(val);
                    item.isOk = this.isOk;
                    this.$emit('input', item);
                }),
                deep: true
            }
        },
        methods: {
            add() {
                this.$emit('add');
                this.tip = false;
            },
            copy() {
                this.$emit('copy', this.index);
                this.tip = false;
            },
            del() {
                this.$emit('del', this.index);
                this.tip = false;
            },
            validatePrice(){
                if(isNaN(this.other.price )){
                    this.other.price = ''
                }
            }
        },
        mounted() {
            this.id = this.value.id;
            this.uuId = this.value.uuId;
            this.iron.id = this.value.ironTypeId;
            this.iron.name = this.value.ironTypeName;
            this.material.id = this.value.materialId;
            this.material.name = this.value.materialName;
            this.surface.id = this.value.surfaceId;
            this.surface.name = this.value.surfaceName;
            this.proPlace.id = this.value.proPlacesId;
            this.proPlace.name = this.value.proPlacesName;
            this.spec.length = this.value.length;
            this.spec.width = this.value.width;
            this.spec.height = this.value.height;
            this.spec.specifications = this.value.specifications;
            this.location.id = this.value.locationId;
            this.location.name = this.value.locationName;
            this.warehouse.id = this.value.storeHouseId;
            this.warehouse.name = this.value.storeHouseName;
            this.other.tolerance = this.value.tolerance;
            this.other.measuringType = this.value.measuringType;
            this.other.taxType = this.value.taxType;
            this.other.storeHouseCount = this.value.storeHouseCount;
            this.other.price = this.value.price;
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../../../assets/resources.less");
</style>

