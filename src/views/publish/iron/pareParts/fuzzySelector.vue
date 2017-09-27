<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .fuzzy-container {
        position: absolute;
        width: 422px;
        background-color: #fff;
        z-index: 999;
        padding: 10px;
        font-size: 12px;
        border: @b_d1;
        overflow: hidden;
        // .transition;
        .borderRadius;
        .select-content {
            display: block;
        }
        .thinking-content {
            display: none;
            .item {
                width: 100%;
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                cursor: pointer;
                border-bottom: @b_d1;
                color: @f_dark;
                .ellipsis;
                &.no-b {
                    border-bottom: 0;
                }
                &:hover {
                    background-color: @dark_blue;
                    color: #fff;
                }
                &.err {
                    color: @dark_red;
                    background-color: @goast_red;
                }
            }
        }
        &.thinking {
            width: 250px;
            padding: 0;
            .select-content {
                display: none;
            }
            .thinking-content {
                display: block;
            }
        }
        .select-content {
            .title {
                width: 100%;
                height: 30px;
                color: @f_goast;
            }
            .item-content {
                border-top: @b_d1;
                min-height: 30px;
                .item {
                    display: block;
                    float: left;
                    height: 20px;
                    line-height: 20px;
                    margin: 5px 0;
                    cursor: pointer;
                    color: @f_dark;
                    &:hover {
                        background-color: @dark_blue;
                        color: #fff;
                    }
                }
                &.type .item {
                    min-width: 75px;
                }
                &.material .item {
                    width: 78px;
                }
                &.surface .item {
                    min-width: 56px;
                }
                &.proPlace .item {
                    min-width: 56px;
                }
                &.city .item {
                    width: 50px;
                }
            }
            .city-tab {
                width: 100%;
                height: 30px;
                line-height: 30px;
                // border-bottom:@b_d1;
                .tab-item {
                    display: inline-block;
                    height: 30px;
                    border-bottom: 2px solid #fff;
                    margin-right: 10px;
                    color: @f_goast;
                    cursor: pointer;
                    &.active {
                        color: @f_dark;
                        border-color: @dark_blue;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="fuzzy-container" :style="{left:x,top:y}" v-clickoutside="ousideClick" :class="{'thinking':isInput}">
        <div class="select-content">
            <p class="title">支持中文{{ classType == 'city' ?'/拼音/简拼': '' }}输入</p>
            <div class="select-items ">
                <div v-if="isCity">
                    <div class="city-tab">
                        <a class="tab-item active" @click="getProvinceData">省份</a>
                        <a class="tab-item" :class="{'active':cityActive}">市区</a>
                    </div>
                    <div class="item-content clearfix" :class="classType">
                        <a class="item" v-for="item in listData" :key="item.id" @click="selectArea(item)">{{ item.shortName }}</a>
                    </div>
                </div>
                <div v-else class="item-content clearfix" :class="classType">
                    <a class="item" v-for="item in listData" :key="item.id" @click="selectItem(item)">{{ item.name }}</a>
                </div>
            </div>
        </div>
        <div class="thinking-content">
            <div class="item" :class="{'no-b':index === thinkingList.length -1}" v-for="(item,index) in thinkingList" :key="item.id" @click="selectItem(item)" v-html="item.shortName ? highLight(item.shortName) : highLight(item.name)">
            </div>
            <div class="item err no-b" v-show="thinkingList.length == 0">对不起,找不到：‘{{ apiData }}’</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            x: [String, Number],
            y: [String, Number],
            queryStr: String,
            selectApi: String,
            isCity: Boolean,
            id: String,
            oldVal: String
        },
        data() {
            return {
                apiData: '',
                listData: [],
                thinkingList: [],
                actionApi: this.selectApi,
                cityActive: false,
                activeItem: null
            }
        },
        computed: {
            //是否输入
            isInput() {
                return this.apiData != ''
            },
            classType() {
                return this.id.replace(/\d|id/g, "")
            }
        },
        methods: {
            // 搜索词汇高亮
            highLight(value){
                let val = this.apiData;
                let newVal = `<span class="hight--light">${val}</span>`;
                let final = val != '' ? value.replace(new RegExp(val,'g'), newVal) : value;
                return final
            },
            ousideClick() {
                this.$emit('outside-click')
            },
            init() {
                this.apiData = '';
                this.listData = [];
                this.thinkingList = [];
                this.actionApi = this.selectApi;
                this.getData({
                    name: ''
                }, (res) => {
                    this.listData = res.data;
                })
            },
            getData: _.debounce(function(params, fun) {
                this.$http.post(this.actionApi, params).then(res => {
                    if (res.code === 1000) {
                        fun(res);
                    }
                });
            }, 100),
            // 选择
            selectItem(item) {
                this.activeItem = JSON.parse(JSON.stringify(item));
                this.$emit('on-item-click')
            },
            selectArea(item) {
                let id = this.id;
                if (item.levelType == 1) {
                    this.getCityData(item.id);
                    this.cityActive = true;
                } else {
                    this.activeItem = JSON.parse(JSON.stringify(item));
                    this.$emit('on-item-click')
                }
            },
            getProvinceData() {
                this.cityActive = false;
                this.$http.post(this.$api.G_getProvince).then(res => {
                    if (res.code === 1000) {
                        this.listData = res.data;
                    }
                });
            },
            getCityData(pId) {
                this.$http.post(this.$api.G_getCity, {
                    id: pId
                }).then(res => {
                    if (res.code === 1000) {
                        this.listData = res.data;
                    }
                });
            },
        },
        watch: {
            queryStr(now) {
                this.apiData = now.replace(/'/g, "");
                if (this.classType == 'city') this.actionApi = this.$api.G_getArea;
                this.getData({
                    name: this.apiData
                }, (res) => {
                    this.thinkingList = res.data;
                })
            }
        },
        created() {
            this.init()
        },
        beforeDestroy() {
            let id = this.id;
            // 验证输入是否有效
            // 是否有联想词汇？
            let isTinking = this.apiData != '' && this.thinkingList.length > 0;
            let isValide = this.oldVal != '' || this.activeItem != null || isTinking;
    
            let item = this.activeItem != null ? JSON.parse(JSON.stringify(this.activeItem)) : isTinking ? JSON.parse(JSON.stringify(this.thinkingList[0])) : {
                name: this.oldVal,
                id: ''
            };
    
            this.$emit("on-destroy", {
                valide: isValide,
                id: id,
                item: item
            })
        }
    }
</script>



