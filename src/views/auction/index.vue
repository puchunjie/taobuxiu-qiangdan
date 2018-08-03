<template>
    <div class="auction-container">
        <div class="inner-container clearfix">
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
                    <div class="simple-page">
                        <Page @on-change="getList" :total="totalCount" :current.sync="page.currentPage" :page-size="page.pageSize" @on-page-size-change="initList" size="small" show-elevator show-sizer />
                    </div> 
                </div>
                <div class="list-container">
                    <div class="item" :class="{'open':item.isOpen}" v-for="(item,i) in list" :key="i" @click="goDetail(item)">
                        <div class="header">
                            <span class="spec-link" @click="toggleAuctionInfos(item)">
                                <span class="tag">{{ item.goodsType }}</span>
                                <span class="category">{{ item.ironType }}</span>
                                <span>{{ item.description }}</span>
                                <span class="has-b-price" :class="{'disable': item.reservePrice == ''}">{{ item.reservePrice == '' ? '无' : '有' }}底价</span>
                            </span>

                            <span v-if="item.status == 1" class="time">开始倒计时：<countDown color="#00A854" :endTime='item.startTime'></countDown></span>
                            <span v-if="item.status == 2" class="time">结束倒计时：<countDown color="#F5222D" :endTime='item.realEndTime'></countDown></span>
                            <span v-if="item.status == 3" class="time st3">出价次数：{{ item.priceNumber }} 结束时间：{{ item.realEndTime | dateformat }}</span>
                        </div>
                        <div class="body">
                            <div v-show="item.status == 1">
                                <div v-if="item.isBatch" @click="toggleAuctionInfos(item)" class="state-tip1">
                                    展开<i class="iconfont" :class="item.isOpen ? 'icon-up' : 'icon-down'"></i>
                                </div>
                                <div v-else class="state-tip">预热中</div>
                            </div>
                            
                            <div v-show="item.status == 2" class="count">
                                <div class="number">{{ item.priceNumber }}</div>
                                <div class="toggle">
                                    <i v-if="item.isBatch" @click="toggleAuctionInfos(item)" class="iconfont" :class="item.isOpen ? 'icon-up' : 'icon-down'"></i>
                                    <span v-else>次出价</span>
                                </div>
                            </div>

                            <div v-show="item.status == 3">
                                <div v-if="item.isBatch" @click="toggleAuctionInfos(item)" class="state-tip3">
                                    展开<i class="iconfont" :class="item.isOpen ? 'icon-up' : 'icon-down'"></i>
                                </div>
                                <div v-else class="state-tip tip3">已结束</div>
                            </div>
                            <div class="item-warp">
                                <div class="group">
                                    <label class="tit">重量</label>
                                    <div style="width:190px">{{ item.weight }}KG</div>
                                    <label class="tit">产地</label>
                                    <div style="width:260px">{{ item.proPlace }}</div>
                                    <template v-if="item.status == 1">
                                        <label class="tit">加价幅度</label>
                                        <div style="width:310px" class="red bold">{{ item.priceStep }}元/吨</div>
                                    </template>
                                    <template v-if="item.status == 2">
                                        <label class="tit">当前价</label>
                                        <div style="width:310px" class="red bold">{{ item.currentPrice }}元/吨</div>
                                    </template>
                                    <template v-if="item.status == 3 && item.money != ''">
                                        <label class="tit">成交价</label>
                                        <div style="width:310px" class="red bold">{{ item.money }}元/吨</div>
                                    </template>
                                    <template v-if="item.status == 3 && item.isBatch">
                                        <label class="tit">成交价</label>
                                        <div style="width:310px" class="some" @click="toggleAuctionInfos(item)">多个结果<i class="iconfont"  :class="item.isOpen ? 'icon-up' : 'icon-down'"></i></div>
                                    </template>
                                    
                                </div>
                                <div class="group">
                                    <label class="tit">数量</label>
                                    <div style="width:190px">{{ item.number }}</div>
                                    <label class="tit">仓库</label>
                                    <div style="width:260px">{{ item.storeHouse }}</div>
                                    <label class="tit">起拍价</label>
                                    <div style="width:310px">{{ item.startPrice }}元/吨</div>
                                </div>
                            </div>
                        </div>
                        <div class="price-list">
                            <div class="list-item" v-for="(el,j) in item.auctionInfos" :key="j">
                                <div class="inner">
                                    <router-link tag="span" :to="{ name: 'auctionDetail', params: { id: el.auctionInfoId } }" class="desc">{{ item.description }}</router-link>
                                    <label class="tit">重量</label>
                                    <div>{{ el.weight }}KG</div>
                                    <label class="tit">数量</label>
                                    <div>{{ el.number }}</div>
                                    <template v-if="item.status == 2">
                                        <label class="tit">当前价</label>
                                        <div class="red bold">{{ el.currentPrice }}</div>
                                    </template>

                                    <div class="prcie" v-show="item.status == 2">
                                        <span class="red bold">{{ el.priceNumber }}</span>次出价
                                    </div>
                                    <div class="state" v-show="item.status == 3">
                                        <template v-if="el.status == 2">
                                            成交价 <span  class="red bold">{{ el.money }}元/吨</span>
                                        </template>
                                        <span class="lp" v-show="el.status == 3">已流拍</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img class="empty-img" v-show="list.length == 0" src="../../assets/Group@3x.png">
                </div>
                <div class="page-count" v-show="list.length != 0">
                    <Page show-total @on-change="getList" :total="totalCount" :current.sync="page.currentPage" :page-size="page.pageSize" @on-page-size-change="initList" show-elevator show-sizer />
                </div>
            </div>
            
            <div class="notice-warp"></div>
        </div>
        <div class="inner-container"><process></process></div>
        <div style="background-color: #3E3C3A"><publicFooter></publicFooter></div>
    </div>
</template>

<script>
    import screenFilter from './parts/filter.vue'
    import process from './parts/process.vue'
    import publicFooter from '@/components/publicFooter.vue'
    import countDown from './parts/countDown.vue'
    export default {
        components: {
            screenFilter,
            publicFooter,
            countDown,
            process
        },
        data() {
            return {
                activeSort: 0,
                listParams: {
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
                },
                page:{
                    currentPage: 1,
                    pageSize: 10
                },
                list: [],
                totalCount: 0,
                nowTime: 0
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
                this.page.currentPage = 1;
                this.getList();
            },
            // 切换排序
            switchSort(sort, i) {
                this.activeSort = i;
                this[sort.func]();
            },
            sortEmpty() {
                this.listParams.price = '';
                this.listParams.endTime = '';
                this.getList();
            },
            priceToggle() {
                this.listParams.endTime = '';
                this.listParams.price = !this.listParams.price;
                this.getList();
            },
            timeToggle() {
                this.listParams.price = '';
                this.listParams.endTime = !this.listParams.endTime;
                this.getList();
            },
            // 获取拍卖列表
            getList(){
                let params = Object.assign(this.listParams,this.page)
                this.$http.post(this.$api.findAuctionList,params).then(res =>{
                    if(res.code === 1000){
                        this.list = res.data.list.map(item => {
                            item.isOpen = false;
                            return item
                        });
                        this.totalCount = res.data.totalCount;
                        this.nowTime = res.data.systemTime
                    }
                })
            },
            initList(data){
                this.page.pageSize = data;
                this.getList();
            },
            //展开搜索
            toggleAuctionInfos(item){
                if(!item.isBatch) return 
                item.isOpen = !item.isOpen
            },
            // 进入详情
            goDetail(item){
                if(item.isBatch) return 
                this.$router.push({ name: 'auctionDetail', params: { id: item.auctionInfos[0].auctionInfoId } })
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
            position: relative;
            .flex-block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            background-color: #fff;
            margin-bottom: 16px;
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

            .simple-page{
                position: absolute;
                right: 16px;
            }
        }
        .body-warp {
            width: 984px;
            padding-bottom: 20px; 
            margin-top: 24px;
            float: left;
            .page-count{
                text-align: center;
                margin-top: 10px;
            }
        }

        .notice-warp{
            width: 312px;
            height: 254px;
            margin-top: 24px;
            background-color: #fff;
            float: right;
        }
        .list-container {
            width: 100%;
            margin-bottom: 8px;
            .empty-img{
                display: block;
                width: 166px;
                margin: 50px auto 0;
            }
            .red {
                color: @dark_red;
            }
            .bold {
                font-weight: bold;
            }
            .some{
                cursor: pointer;
            }
            .tit {
                display: block;
                margin-right: 8px;
                color: #999;
            }
            .item {
                position: relative;
                width: 100%;
                background-color: #fff;
                margin-bottom: 8px;
                padding-top: 16px;
                font-size: 14px;
                margin-bottom: 8px;
                overflow: hidden;
                border: 1px solid #fff;
                .header {
                    width: 100%;
                    height: 20px;
                    color: @f_dark;
                    padding: 0 16px;
                    .spec-link:hover{
                        color: @dark_blue;
                        cursor: pointer;
                    }

                    & > span {
                        margin-right: 8px;
                    }
                    .tag {
                        display: inline-block;
                        height: 100%;
                        border: 1px solid @dark_blue;
                        .borderRadius;
                        line-height: 18px;
                        font-size: 12px;
                        color: @dark_blue;
                        padding: 0 5px;
                        background-color: rgba(239, 243, 251, 1);
                    }
                    .category {
                        font-weight: bold;
                    }
                    .has-b-price {
                        position: relative;
                        display: inline-block;
                        width: 45px;
                        height: 20px;
                        line-height: 20px;
                        border-top-right-radius: 5px;
                        border-bottom-right-radius: 5px;
                        background-color: @dark_yellow;
                        font-size: 12px;
                        color: #fff;
                        margin-left: 12px;
                        padding-left: 5px;
                        &:before {
                            position: absolute;
                            content: '';
                            width: 0;
                            height: 0;
                            left: -12px;
                            border-top: 10px solid transparent;
                            border-right: 12px solid @dark_yellow;
                            border-bottom: 10px solid transparent;
                        }
                        &:after {
                            position: absolute;
                            content: '';
                            width: 5px;
                            height: 5px;
                            .borderRadius(5px);
                            background-color: #fff;
                            left: -3px;
                            top: 7px;
                        }
                        &.disable {
                            background-color: rgba(217, 217, 217, 1);
                            &:before {
                                border-right-color: rgba(217, 217, 217, 1);
                            }
                        }
                    }
                    .time {
                        position: absolute;
                        right: 16px;
                        margin: 0;
                        &.st3{
                            color: @f_goast;
                        }
                    }
                }
                .body {
                    position: relative;
                    width: 100%;
                    margin-top: 16px;
                    padding: 0 16px;
                    color: @f_ligth;
                    .group {
                        .flex-block;
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        margin-top: 10px;
                    }
                    .count {
                        position: absolute;
                        width: 56px;
                        height: 56px;
                        text-align: center;
                        right: 16px;
                        color: @dark_red;
                        .number {
                            width: 100%;
                            height: 30px;
                            background-color: rgba(255, 241, 240, 1);
                            font-weight: bold;
                            font-size: 16px;
                            line-height: 30px;
                        }
                        .toggle {
                            margin-top: 2px;
                            width: 100%;
                            height: 20px;
                            background-color: rgba(255, 241, 240, 1);
                            line-height: 20px;
                            cursor: pointer;
                        }
                    }

                    .state-tip{
                        position: absolute;
                        width: 80px;
                        height: 40px;
                        line-height: 40px;
                        right: 16px;
                        color: @dark_green;
                        background-color: #E8F5E9;
                        text-align: center;
                        &.tip3{
                            color: @f_ligth;
                            background-color: #E8E8E8;
                        }
                    }

                    .state-tip1{
                        position: absolute;
                        color: @dark_green;
                        right: 16px;
                        top: 20px;
                        cursor: pointer;
                        .iconfont{
                            font-size: 14px;
                        }
                    }

                    .state-tip3{
                        position: absolute;
                        color: @f_goast;
                        right: 16px;
                        top: 20px;
                        cursor: pointer;
                        .iconfont{
                            font-size: 14px;
                        }
                    }
                    
                }

                .price-list{
                    width: 100%;
                    margin-top: 16px;
                    background-color: #fff;
                    height: 0;
                    .list-item{
                        width: 100%;
                        height: 64px;
                        line-height: 64px;
                        .inner{
                            .flex-block;
                            position: relative;
                            width: 100%;
                            height: 100%;
                            margin-left: 24px;
                            border-left: 1px solid #E9E9E9;
                            &:not(:last-child){
                                border-left: 1px solid #E9E9E9;
                            }

                            &:before{
                                position: absolute;
                                left: -4px;
                                top: 28px;
                                display: block;
                                content: '';
                                width: 8px;
                                height: 8px;
                                .borderRadius(8px);
                                background-color: #E9E9E9;
                            }

                            .desc{
                                color: @f_dark;
                                margin-left: 30px;
                                cursor: pointer;
                                &:hover{
                                    color: @dark_blue;
                                }
                            }

                            .tit{
                                margin-left: 50px;
                            }

                            .prcie{
                                position: absolute;
                                color: @f_goast;
                                right: 40px;
                            }

                            .state{
                                position: absolute;
                                color: @f_goast;
                                right: 40px;
                                .lp{
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                }

                &.open .price-list{
                    height: auto;
                    border-top: 1px solid #E9E9E9;
                }
                &:hover{
                    border-color: #FFA39E;
                }
            }
        }
    }
</style>
