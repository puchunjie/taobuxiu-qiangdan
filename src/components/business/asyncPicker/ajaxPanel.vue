<template>
    <div class="tb-picker-panel" :class="{'search-mode':isSearch}">
        <div v-if="!isSearch">
            <p class="tips">{{ tip }}</p>
            <div class="tb-picker-contnet">
                <a class="item" v-for="(item,i) in handleList" :key="i" v-show="!!exclude ? item.isLock : true" @click="pickItem(item)">{{ item.name }}</a>
            </div>
        </div>
        <div class="tinking-content" v-else>
            <div class="item" @click="pickItem(item)" v-for="(item,i) in searchList" :key="i" v-html="highLight(item.name)"></div>
            <div class="item err" v-show="searchList.length == 0">对不起,找不到：‘{{ search }}’</div>
        </div>
    </div>
</template>

<script>
    import isArray from 'lodash/isArray'
    import debounce from 'lodash/debounce'
    import findIndex from 'lodash/findIndex'
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
                        searchTitle: '标题',
                        api: ''
                    }
                }
            },
            exclude: {
                type: Array
            }
        },
        data() {
            return {
                isSearch: false, //搜索模式开关
                list: [], //数据列表
                searchList: [], //搜索列表
                outPut: {
                    id: '',
                    name: ''
                }
            }
        },
        computed: {
            handleList() {
                if (!!this.exclude) {
                    let list = this.$clearData(this.list);
                    list.map(item => {
                        if (!!this.exclude) {
                            item.isLock = findIndex(this.exclude, el => {
                                return el == item.name
                            }) >= 0
                        } else {
                            item.isLock = false
                        }
                    })
                    return list
                } else {
                    return this.list
                }
    
            }
        },
        watch: {
            outPut(val) {
                this.$emit('on-picker', val);
            },
            'search': {
                handler: debounce(function(val, oldVal) {
                    if (val != '') {
                        this.isSearch = true;
                        this.getData(val)
                    } else {
                        this.isSearch = false;
                    }
                }, 500)
            }
        },
        methods: {
            // 获取选择列表
            getData(val) {
                let apiUrl = this.options.api;
                if (apiUrl != '') {
                    this.$http.post(apiUrl, {
                        name: val
                    }).then(res => {
                        if (res.code === 1000) {
                            if (!this.isSearch) {
                                this.list = res.data
                            } else {
                                this.searchList = res.data
                            }
                        }
                    })
                } else {
                    console.log('请检查传入API参数！')
                }
            },
            // 点击选择
            pickItem(item) {
                this.outPut = {
                    id: item.id,
                    name: item.name
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
            this.getData();
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/picker.less');
    .tb-picker-contnet .item {
        width: 100px;
    }
</style>
