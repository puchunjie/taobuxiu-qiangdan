<template>
    <div class="tb-picker-panel" :class="{'search-mode':isSearch}">
        <div v-if="!isSearch">
            <p class="tips">{{ tip }}</p>
            <div class="tb-picker-tab">
                <a class="tab-item" :class="{'active':i<active}" v-for="(el,i) in options.selectData" :key="i" @click="backToP(i)">{{ el.tabName }}</a>
            </div>
            <div class="tb-picker-contnet">
                <a class="item" v-for="(item,i) in list" :key="i" @click="pickItem(item)">{{ item.shortName }}</a>
            </div>
        </div>
        <div class="tinking-content" v-else>
            <div class="item" @click="pickItem(item)" v-for="(item,i) in searchList" :key="i" v-html="highLight(item.shortName)"></div>
            <div class="item err" v-show="searchList.length == 0">对不起,找不到：‘{{ search }}’</div>
        </div>
    </div>
</template>

<script>
    import isArray from 'lodash/isArray'
    import debounce from 'lodash/debounce'
    export default {
        props: {
            search: {
                type: String,
                default: ''
            },
            tip: {
                type: String,
                default: '支持中文/拼音/简拼输入'
            },
            options: {
                type: Object,
                default: function() {
                    return {
                        selectData: [{
                                tabName: '省份',
                                api: ''
                            },
                            {
                                tabName: '市区',
                                api: ''
                            }
                        ],
                        searchData: {
                            api: ''
                        }
                    }
                }
            }
        },
        data() {
            return {
                isSearch: false, //搜索模式开关
                list1: [], //省份列表
                list2: [], //城市列表
                searchList: [], //搜索列表
                active: 1, //一级二级开关
    
                outPut: {
                    id: '',
                    name: ''
                }
            }
        },
        computed: {
            list() {
                return this['list' + this.active]
            }
        },
        watch: {
            outPut(val) {
                this.$emit('on-picker', val);
            },
            search: {
                handler: debounce(function(val, oldVal) {
                    this.setSearch(val);
                }, 500)
            }
        },
        methods: {
            setSearch(val) {
                if (val != '') {
                    this.isSearch = true;
                    this.active = 1;
                    this.searchData(val)
                } else {
                    this.isSearch = false;
                }
            },
            // 获取选择列表
            getData(i, params = {}) {
                let apiUrl = this.options.selectData[i].api;
                if (apiUrl != '') {
                    this.$http.post(apiUrl, params).then(res => {
                        if (res.code === 1000) {
                            this['list' + this.active] = res.data
                        }
                    })
                } else {
                    console.log('请检查传入API参数！')
                }
            },
            // 获取搜索列表
            searchData(val) {
                this.$http.post(this.options.searchData.api, {
                    name: val
                }).then(res => {
                    if (res.code === 1000) {
                        this.searchList = res.data
                    }
                })
            },
            // 点击选择
            pickItem(item) {
                // 如果是选择省份
                if (this.active < this.options.selectData.length && !this.isSearch) {
                    this.getData(this.active, {
                        id: item.id
                    });
                    this.active++;
                } else {
                    this.outPut = {
                        id: item.id,
                        name: item.shortName
                    }
                }
            },
            // 切回一级
            backToP(i) {
                if (this.active != (i + 1)) {
                    this.active = i + 1;
                    this.getData(i);
                }
            },
            // 搜索词汇高亮
            highLight(value) {
                let val = this.search;
                let newVal = `<span class="hight--light">${val}</span>`;
                let final = val != '' ? value.replace(new RegExp(val, 'g'), newVal) : value;
                return final
            }
        },
        created() {
            this.getData(0);
            this.setSearch(this.search);
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/picker.less');
    .tb-picker-contnet .item {
        min-width: 50px;
    }
</style>
