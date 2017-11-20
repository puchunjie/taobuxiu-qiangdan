<template>
    <div class="container-doc">
        <div class="group">
            <p>普通输入框</p>
            <tbInput v-model="inputValue"></tbInput>
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
    import cityPicter from '@/components/business/cityPicker/index'
    import asyncPicker from '@/components/business/asyncPicker/index'
    import specPicker from '@/components/business/specPicker/index'
    export default {
        components: {
            tbInput,
            cityPicter,
            asyncPicker,
            specPicker
        },
        methods: {
            viewCode(value) {
                this.$Modal.info({
                    content: '组件路径：' + this[value]
                })
            }
        },
        data() {
            return {
                inputValue: 'test',
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
            width: 100%;
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

