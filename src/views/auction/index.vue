<template>
    <div class="auction-container">
        <div class="inner-container">
            <screenFilter :params="listParams" @on-change="updateParams"></screenFilter>
            <div class="body-warp">
                <div class="sort-pag-div">
                    <div class="item" :class="{'active': activeSort == i}" v-for="(sort,i) in sorts" :key='i' @click="switchSort(sort,i)">
                        {{ sort.label }}
                        <template v-if="sort.sort != null">
                            <i class="iconfont icon-caret-up" :class="{'active': sort.sort}"></i>
                            <i class="iconfont icon-caret-down" :class="{'active': !sort.sort}"></i>
                        </template>
                    </div>
                </div>
                <div class="list-container">
                    <div class="item"></div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    import screenFilter from './filter.vue'
    export default {
        components: {
            screenFilter
        },
        data() {
            return {
                activeSort: 0,
                listParams: {
                    currentPage: 1,
                    pageSize: 10,
                    auctionIndex: '', //场次
                    goodsType: '', //货品类型
                    ironType: '', //品类
                    proPlace: '', //产地
                    material: '', //材质
                    surface: '', //表面
                    province: '', //省
                    city: '', //市
                    storeHouse: '', //仓库
                    specification: '', //规格
                    heightMin: '', //厚最小
                    heightMax: '', //厚最大
                    widthMin: '', //宽最小
                    widthMax: '', //宽最大
                    lengthMin: '', //长最小
                    lengthMax: '', //长最大
                    status: '', //状态（ 1等待拍卖 2正在拍卖 3竞拍完成）
                    price: '', //按价格排序（true正序 false 倒序）
                    endTime: '', //按结束时间排序（true正序 false 倒序）
                }
            }
        },
        computed: {
            sorts() {
                return [{
                    label: '默认',
                    func: 'sortEmpty',
                    sort: null,
                    
                }, {
                    label: '价格',
                    func: 'priceToggle',
                    sort: this.listParams.price
                }, {
                    label: '结束时间',
                    func: 'timeToggle',
                    sort: this.listParams.endTime
                }]
            }
        },
        methods: {
            //更新api参数
            updateParams(params) {
                for (let key in params) {
                    this.listParams[key] = params[key]
                }
            },
            // 切换排序
            switchSort(sort, i) {
                this.activeSort = i;
                this[sort.func]()
            },
            sortEmpty() {
                this.listParams.price = '';
                this.listParams.endTime = '';
            },
            priceToggle(){
                this.listParams.endTime = '';
                this.listParams.price = !this.listParams.price
            },
            timeToggle(){
                this.listParams.price = '';
                this.listParams.endTime = !this.listParams.endTime
            }
        }
    }
</script>


<style lang="less">
    @import url('../../assets/base.less');
    @import url('../../assets/common.less');
    .auction-container {
        margin-top: 24px;
        .sort-pag-div {
            .flex-block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            background-color: #fff;
            margin: 24px 0 16px 0;
            .item {
                position: relative;
                width: auto;
                padding: 0 24px;
                font-size: 12px;
                color: @f_ligth;
                cursor: pointer;
                border-right: 1px solid #E9E9E9;
                overflow: hidden;
                &.active,
                &:hover {
                    color: @dark_blue;
                    .iconfont {
                        color: @f_ligth;
                    }
                    .active {
                        color: @dark_blue;
                    }
                }
                .iconfont {
                    position: absolute;
                    font-size: 10px;
                    display: block;
                    .scale(.6);
                }
                .icon-caret-up {
                    right: 10px;
                    top: -3px;
                }
                .icon-caret-down {
                    right: 10px;
                    top: 3px;
                }
            }
        }
        .body-warp{
            width: 984px;
        }
        .list-container{
            width: 100%;
            .item{
                width: 100%;
                height: 118px;
                background-color: #fff;
                margin-bottom: 8px;
            }
        }
    }
</style>
