<style lang="less" scoped>
    @import '../../../assets/base.less';
    .scope-container {
        width: 100%;
        background-color: #fff;
        padding: 20px;
        .tit {
            position: relative;
            width: 100%;
            height: 30px;
            border-bottom: @b_d1;
            .btn {
                position: absolute;
                display: inline-block;
                width: 80px;
                height: 30px;
                right: 0;
                top: -10px;
                line-height: 30px;
                text-align: center;
                border: 1px solid @mask_blue;
                color: @mask_blue;
                .borderRadius;
                .ellipsis;
                &:active {
                    background-color: @mask_blue;
                    color: #fff;
                }
            }
        }
        .group {
            width: 100%;
            margin-top: 30px;
            padding: 0 10px;
            .head {
                position: relative;
                width: 100%;
                height: 18px;
                a{
                   position: absolute;
                    right: 0;
                    color: @mask_blue;
                    cursor: pointer; 
                }
                .iconfont{
                    margin-right: 5px;
                }
            }
            .item-content {
                .item {
                    position: relative;
                    display: inline-block;
                    margin: 10px 10px 0 0;
                    padding: 5px 10px;
                    height: 30px;
                    line-height: 20px;
                    background-color: @goast_gray;
                    color: @f_goast;
                    cursor: pointer;
                    .borderRadius;
                    .noselect;
                    .iconfont {
                        font-size: 14px;
                    }
                    .icon-duihao {
                        display: none;
                    }
                    &:hover {
                        background-color: @mask_blue;
                        color: #fff;
                    }
                    &.selected {
                        background-color: @mask_blue;
                        color: #fff;
                        .icon-jiahao {
                            display: none;
                        }
                        .icon-duihao {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="scope-container">
        <p class="tit">经营范围<a class="btn" @click="saveScope">保存</a></p>
        <div class="group" v-for="(item,index) in list" :key="index">
            <div class="head">
                {{ item.title }}
                <a><span class="iconfont" :class="checkAll[index] ? 'icon-check-box' : 'icon-check_box_unselecte'" @click="setCheckAll(index)"></span>全选</a>
            </div>
            <div class="item-content clearfix">
                <div class="item" :class="{'selected':sub.isCheck}" v-for="(sub,i) in item.arr" :ref="sub.id" :key="sub.id" @click="selectItem(item,sub,i)">
                    {{ sub.name }}
                    <span class="iconfont icon-jiahao"></span>
                    <span class="iconfont icon-duihao"></span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                list: [{
                    title: '种类',
                    key: 'ironType',
                    arr: [],
                    api: this.$api.G_getTypes
                }, {
                    title: '材质',
                    key: 'surface',
                    arr: [],
                    api: this.$api.G_getMaterials
                }, {
                    title: '表面',
                    key: 'material',
                    arr: [],
                    api: this.$api.G_getSurFace
                }, {
                    title: '产地',
                    key: 'proPlace',
                    arr: [],
                    api: this.$api.G_getProPlaces
                }],
                apiData: {
                    ironType: [],
                    surface: [],
                    material: [],
                    proPlace: []
                }
            }
        },
        computed: {
            checkAll(){
                let arr = []
                this.list.forEach(el => {
                    let check = true;
                    el.arr.forEach(sub => {
                        if(!sub.isCheck){
                            check = false;
                            return false
                        }
                    })
                    arr.push(check)
                })
                return arr
            }
        },
        methods: {
            init() {
                // 获取基础数据
                this.$http.all([
                    this.$http.get(this.list[0].api),
                    this.$http.get(this.list[1].api),
                    this.$http.get(this.list[2].api),
                    this.$http.get(this.list[3].api)
                ]).then(res => {
                    this.list.forEach((el, index) => {
                        let data = res[index].data;
                        if (res[index].code === 1000) {
                            _.map(data, (n) => {
                                return n.isCheck = false
                            });
                            el.arr = data;
                        }
                    });
                    this.getUerScope(res);
                });
            },
            // 获取用户设置的经营范围
            getUerScope(lists) {
                let list = _.cloneDeep(lists);
                this.$http.post(this.$api.userScope).then(res => {
                    if (res.code === 1000) {
                        // 用户没有设置过，默认所有都选择
                        if (res.data == '') {
                            this.apiData = {
                                ironType: list[0].data,
                                surface: list[1].data,
                                material: list[2].data,
                                proPlace: list[3].data
                            };
                        } else {
                            this.apiData = {
                                ironType: res.data.ironType,
                                surface: res.data.surface,
                                material: res.data.material,
                                proPlace: res.data.proPlace
                            };
                        }
                        this.setClass();
                    }
                })
            },
            // 选择操作
            selectItem(item, sub, i) {
                if(sub.isCheck){
                    this.apiData[item.key].splice(i, 1);
                }else{
                    this.apiData[item.key].push(sub);
                }
                sub.isCheck = !sub.isCheck;
            },
            // 全选
            setCheckAll(i){
                let isCheck = this.checkAll[i];
                if(isCheck){
                    this.apiData[this.list[i].key] = [];
                    this.list[i].arr.forEach(el => {
                        el.isCheck = false;
                    })
                }else{
                    this.apiData[this.list[i].key] = [];
                    let data = _.cloneDeep(this.list[i].arr);
                    data.forEach(el => {
                        this.apiData[this.list[i].key].push({
                            id: el.id,
                            name: el.name
                        })
                    })
                }
                this.setClass();
            },
            // 设置高亮
            setClass() {
                this.list.forEach(el => {
                    el.arr.forEach( subEl => {
                        this.apiData[el.key].forEach( inEl => {
                            if(subEl.id == inEl.id){
                                subEl.isCheck = true;
                            }
                        })
                    })
                }); 
            },
            // 保存经营范围
            saveScope() {
                let params = this.$clearData(this.apiData);
                _.forEach(params, (n, key) => {
                    params[key] = JSON.stringify(n);
                })
                this.$http.post(this.$api.saveScope, params).then(res => {
                    if (res.code === 1000) {
                        this.$Message.success('已保存！');
                    }
                })
            }
        },
        created() {
            this.init();
        }
    }
</script>



