<template>
    <div class="container-doc">
        <div class="group">
            <p>普通输入框</p>
            <tbInput v-model="inputValue"></tbInput>
        </div>
        <div class="group">
            <p>选择框</p>
            <tbSelect v-model="selectValue" :data='[{label:"理算",value:"1"},{label:"过磅",value:"2"}]'></tbSelect>
        </div>
        <div class="group">
            <p>异步选择框</p>
            <tbSelect v-model="selectValue1" :api="$api.findAllKaiping"></tbSelect>
        </div>
        <div class="group">
            <p>城市选择</p>
            <cityPicter v-model="city"></cityPicter>
        </div>
        <div class="group">
            <p>品类,材质,表面,产地</p>
            <asyncPicker v-model="iron" :api="$api.G_getTypes"></asyncPicker>
            <asyncPicker v-model="material" :api="$api.G_getMaterials"></asyncPicker>
            <asyncPicker v-model="surface" :api="$api.G_getSurFace"></asyncPicker>
            <asyncPicker v-model="proPlace" :api="$api.G_getProPlaces"></asyncPicker>
        </div>
        <div class="group">
            <p>规格</p>
            <specPicker v-model="spec" :ironType="iron" :surface="surface"></specPicker>
        </div>
        <div class="group">
            <p>仓库</p>
            <asyncPicker v-model="storeHouse" :api="$api.getStores"></asyncPicker>
        </div>
    </div>
</template>

<script>
    import tbInput from '@/components/business/tbInput/index'
    import tbSelect from '@/components/business/tbSelect/index'
    import cityPicter from '@/components/business/cityPicker/index'
    import asyncPicker from '@/components/business/asyncPicker/index'
    import specPicker from '@/components/business/specPicker/index'
    export default {
        components: {
            tbInput,
            tbSelect,
            cityPicter,
            asyncPicker,
            specPicker
        },
        data() {
            return {
                inputValue: 'test',
                selectValue:"",
                selectValue1:"",
                city: {
                    name: '唐山',
                    id: '130200'
                },
                iron: {
                    name: '冷拉扁钢',
                    id: 'ff8080815f722dab015f72326dca0038'
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
                },
                spec: {
                    specifications: "sssssss",
                    height: "",
                    width: "",
                    length: ""
                },
                storeHouse: {
                    name: '',
                    id: ''
                },
            }
        }
    }
</script>

<style lang="less" scoped>
    .container-doc {
        width: 100%;
        height: 100%;
        padding: 30px;
        .group {
            width: 200px;
            margin: 20px 0;
            p {
                line-height: 40px;
                .iconfont {
                    margin-left: 30px;
                    cursor: pointer;
                }
            }
        }
    }
</style>

