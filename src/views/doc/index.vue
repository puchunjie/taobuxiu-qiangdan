<template>
    <div class="container-doc">
        <div class="group">
            <p>城市选择 <span class="iconfont icon-iconcrk" @click="viewCode('cityPicterText')"></span></p>
            <cityPicter v-model="test" :option="cityOption"></cityPicter>
            <span>{{ `id:${test.id},name:${test.name}` }}</span> 
        </div>
        <div class="group">
            <p>品类、材质、表面、产地 <span class="iconfont icon-iconcrk" @click="viewCode('asyncPickerText')"></span></p>
            <asyncPicker v-model="test1" :option="asyncOption1"></asyncPicker>
            <span>{{ `id:${test1.id},name:${test1.name}` }}</span> 
        </div>
    </div>
</template>

<script>
    import cityPicter from '@/components/business/cityPicker/index'
    import asyncPicker from '@/components/business/asyncPicker/index'
    export default {
        components: {
            cityPicter,
            asyncPicker
        },
        methods: {
          viewCode(value){
              this.$Modal.info({
                  content:'组件路径：'+this[value]
              })
          }  
        },
        data() {
            return {
                cityPicterText:"@/components/business/cityPicker/index'",
                test: {
                    name: '',
                    id: ''
                },
                cityOption: {
                    searchTitle: '支持中文/拼音/简拼输入',
                    selectData: [{
                            tabName: '省份',
                            api: this.$api.G_getProvince
                        },
                        {
                            tabName: '市区',
                            api: this.$api.G_getCity
                        }
                    ],
                    searchData: {
                        api: this.$api.G_getArea
                    }
                },
                asyncPickerText:'@/components/business/asyncPicker/index',
                test1: {
                    name: '',
                    id: ''
                },
                
                asyncOption1: {
                    searchTitle: '支持中文输入',
                    api: this.$api.G_getTypes
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .container-doc {
        width: 100%;
        height: 100%;
        padding: 30px;
        .group{
            width: 100%;
            margin: 20px 0;
            p{
                line-height: 40px;
                .iconfont{
                    margin-left: 30px;
                    cursor: pointer;
                }
            }
        }
    }
</style>

