<template>
    <div class="ls-picker-container" @click.self="showPanel">
        <span class="value" :class="{ 'place-holder' : placeholderShow }">{{ placeholderShow ? placeholder : label }}</span>
        <span class="iconfont" :class=" show ? 'icon-arrowdown' : 'icon-arrowup'"></span>
        <div class="area-box" v-clickoutside="ousideClick" v-if="show">
            <Spin fix v-show="ajaxLoad">加载中...</Spin>
            <div class="tabs">
                <span v-for="(tab,i) in tabs" :key="i" :class="{ 'active': i == activeTab }" v-show="tab.data.length > 0" @click="switchTab(i)">{{ tab.label }}</span>
            </div>
            <div class="items-contnet">
                <span class="item" :class="{ 'active': activeItem.active == j }" v-for="(item,j) in activeItem.data" :key="item.id" @click="pick(j)">{{ item.shortName }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: ''
            },
            value: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        data() {
            return {
                tabs: [{
                        label: '请选择',
                        api: 'G_getProvince',
                        active: null,
                        data: []
                    },
                    {
                        label: '请选择',
                        api: 'G_getCity',
                        active: null,
                        data: []
                    },
                    {
                        label: '请选择',
                        api: 'G_getDistrict',
                        active: null,
                        data: []
                    }
                ],
                activeTab: 0,
                results: [],
                ajaxLoad: false,
                show: false
            }
        },
        computed: {
            activeItem() {
                return this.tabs[this.activeTab];
            },
            collectResults() {
                let i = this.activeTab,
                    arr = [];
                this.tabs.forEach((tab, j) => {
                    if (j <= i) {
                        arr.push({
                            id: tab.data[tab.active].id,
                            name: tab.data[tab.active].shortName
                        });
                    }
                });
                return this.$clearData(arr)
            },
            label() {
                let str = '',le = this.results.length;
                this.results.forEach((item,i) => {
                    // 是否是最后一项
                    let isLast = i == (le -1);
                    str += isLast ?  item.name : `${item.name} `;
                })
                return str
            },
            // 是否显示placeHolder
            placeholderShow(){
                return this.results.length <= 0
            }
        },
        watch: {
            results(val) {
                this.$emit('input', val)
            },
            show(val){
                // 减少对服务器的请求
                if(val && this.activeTab === 0 && this.activeItem.data.length <= 0)
                    this.getData()
            }
        },
        methods: {
            getData() {
                let params = {};
                let activeItem = this.tabs[this.activeTab];
                if (this.activeTab > 0) {
                    let parent = this.tabs[this.activeTab - 1];
                    params.id = parent.data[parent.active].id;
                }
                this.ajaxLoad = true;
                this.$http.post(this.$api[activeItem.api], params).then(res => {
                    if (res.code === 1000) {
                        activeItem.data = res.data;
                    }
                    this.ajaxLoad = false;
                })
            },
            switchTab(i) {
                this.activeTab = i;
            },
            // 选择
            pick(i) {
                let nowItem = this.tabs[this.activeTab];
                let acItem = nowItem.data[i];
                nowItem.active = i;
                nowItem.label = acItem.shortName;
                this.results = this.collectResults;
                // 是否是最终选择完成，activeTab >= 2
                if (this.activeTab < 2) {
                    this.tabs.forEach((item,i)=>{
                        if( i <= 2 && i > this.activeTab){
                            this.tabs[i].active = null;
                            this.tabs[i].label = '请选择';
                        }
                    });
                    this.activeTab++;
                    this.getData();
                }else{
                    this.closePanel();
                }
            },
            showPanel(){
                this.show = true;
            },
            closePanel(){
                this.show = false;
            },
            ousideClick(){
                this.closePanel()
            }
        },
        created() {
            this.results = this.value;
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    @import url('./lsCommon.less');
    .ls-picker-container {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0 16px;
        color: #999;
        font-size: 12px;

        .value{
            color: #333;
            pointer-events: none;
            &.place-holder{
                color: #999;
            }
        }

        .iconfont {
            color: #999;
            font-size: 10px;
            float: right;
        }
        .area-box {
            position: absolute;
            width: 472px;
            height: 236px;
            top: 60px;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
            .borderRadius(6px);
            .tabs {
                width: 100%;
                height: 45px;
                line-height: 45px;
                padding: 0 20px;
                border-bottom: 1px solid @bg_color;
                span {
                    display: inline-block;
                    width: 48px;
                    margin-right: 16px;
                    text-align: right;
                }
                .active {
                    color: @green;
                }
            }
            .items-contnet {
                width: 100%;
                height: 190px;
                padding: 20px;
                line-height: 0;
                .item {
                    display: inline-block;
                    font-size: 12px;
                    padding: 0 6px;
                    width: 60px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    margin-bottom: 10px;
                    .borderRadius;
                    overflow: hidden;
                    &:hover,
                    &.active {
                        background-color: @green;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
