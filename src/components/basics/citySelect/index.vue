<template>
    <Cascader v-model="activeValue" :data="areaData" :placeholder="placeHolder" class="form-input" @on-change="asyncValue">
    </Cascader :class="isValue ? 'holder':''">
</template>

<script>
    export default {
        props:{
            value:Array
        },
        data() {
            return {
                areaData: [],
                activeValue: []
            }
        },
        computed: {
          placeHolder(){
            return this.value[0] != '' ? `${this.value[0]}/${this.value[1]}/${this.value[2]}` : '请选择'
          } 
        },
        methods: {
            // 获取仓库列表
            getArea() {
                this.$http.post(this.$api.getArea).then(res => {
                    if (res.code === 1000) {
                        this.areaData = res.data;
                    }
                })
            },
            asyncValue(value, selectedData) {
                this.$emit('on-select', {
                    provinceId: selectedData[0].value,
                    provinceName: selectedData[0].label,
                    cityId: selectedData[1].value,
                    cityName: selectedData[1].label,
                    districtId: selectedData[2].value,
                    districtName: selectedData[2].label,
                })
            }
        },
        watch: {
            value(val){
                this.activeValue = val[0] != '' ? val : [];
            }
        },
        created() {
            this.activeValue = this.value[0] != '' ? this.value : [];
            this.getArea();
        }
    }
</script>

