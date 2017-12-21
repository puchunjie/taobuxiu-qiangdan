<template>
    <div class="qn-container">
        <div class="qn-item-group" v-for="(group,i) in qnData" :key="i" :class="{'open':group.open}">
            <div class="qn-tip" @click="group.open = !group.open">
                {{ group.tipName }}
                <div class="count" v-show="totleCount[i] > 0"><span>{{ totleCount[i] }}</span></div>
            </div>
            <div class="qn-ac-items">
                <router-link tag="div" class="ac-item" :to="item.path" v-for="(item,j) in group.iconLinks" :key="j">
                    <span class="iconfont" :class="item.icon"></span>
                    <div class="ac-item-count" v-show="item.count > 0">
                        <span>{{ item.count }}</span>
                    </div>
                    <div class="ac-item-desc">{{ item.desc }}</div>
                </router-link>
            </div>
        </div>
        <div class="qn-item-group open">
            <div class="qn-ac-items">
                <a class="ac-item" :href='"tencent://message/?uin=3252645503&amp;Site=&amp;Menu=yes"'>
                    <span class="iconfont icon-kefu"></span>
                    <div class="ac-item-desc">在线客服</div>
                </a>
            </div>
        </div>
        <div class="qn-item-group open">
            <div class="qn-ac-items">
                <div class="ac-item" @click="backToTop">
                    <span class="iconfont icon-fanhuidingbu"></span>
                    <div class="ac-item-desc">回到顶部</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                collect: {},
                qnData: [{
                    tipName: '买家中心',
                    open: false,
                    iconLinks: [{
                        icon: 'icon-216',
                        count: 0,
                        desc: '进行中求购订单',
                        path: {name:'Bbuys',params: {isToday: 1}}
                    }, {
                        icon: 'icon-xianhuo',
                        count: 10,
                        desc: '待确认现货订单',
                        path: {name:'BironOrder'}
                    }, {
                        icon: 'icon-c-allocation',
                        count: 10,
                        desc: '待确认定开订单',
                        path: {name:'BplanOrder'}
                    }, {
                        icon: 'icon-tejia',
                        count: 10,
                        desc: '待确认特价订单',
                        path: {name:'BspecialOrder'}
                    }]
                }, {
                    tipName: '卖家中心',
                    open: false,
                    iconLinks: [{
                        icon: 'icon-baojia',
                        count: 10,
                        desc: '待报价求购订单',
                        path: {name:'Sbuys',params: {isToday: 1}}
                    }, {
                        icon: 'icon-xianhuo',
                        count: 10,
                        desc: '待接单现货订单',
                        path: {name:'SironOrder'}
                    }, {
                        icon: 'icon-c-allocation',
                        count: 10,
                        desc: '待接单定开订单',
                        path: {name:'SplanOrder'}
                    }, {
                        icon: 'icon-tejia',
                        count: 10,
                        desc: '待接单特价订单',
                        path: {name:'SspecialOrder'}
                    }]
                }]
            }
        },
        computed: {
            ...mapGetters(['userCount']),
            totleCount() {
                let arr = [];
                this.qnData.forEach(group => {
                    let count = 0;
                    group.iconLinks.forEach(el => {
                        count += el.count
                    })
                    arr.push(count)
                });
                return arr;
            }
        },
        methods: {
            backToTop() {
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            },
            updateData() {
                this.qnData[0].iconLinks[0].count = this.userCount.buyIronH;
                this.qnData[0].iconLinks[1].count = this.userCount.buyX;
                this.qnData[0].iconLinks[2].count = this.userCount.buyD;
                this.qnData[0].iconLinks[3].count = this.userCount.buyT;
                this.qnData[1].iconLinks[0].count = this.userCount.sellIronH;
                this.qnData[1].iconLinks[1].count = this.userCount.sellX;
                this.qnData[1].iconLinks[2].count = this.userCount.sellD;
                this.qnData[1].iconLinks[3].count = this.userCount.sellT;
            }
        },
        watch: {
            'userCount': {
                handler: function(val, oldVal) {
                    this.updateData();
                },
                deep: true
            }
        },
        created () {
            this.updateData();
        }
    }
</script>


<style lang="less">
    @import url('../assets/base.less');
    .qn-container {
        position: fixed;
        right: 10px;
        bottom: 50px;
        .noselect;
        z-index: 902;
    }
    
    .qn-item-group {
        width: 50px;
        margin-top: 10px;
        &.open {
            .qn-ac-items {
                height: auto;
                overflow: inherit;
            }
            .count {
                display: none;
            }
        }
    }
    
    .qn-tip {
        position: relative;
        width: 50px;
        height: 50px;
        padding: 7px;
        background-color: @mask_blue;
        color: #fff;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        .borderRadius;
        cursor: pointer;
        .count {
            position: absolute;
            width: 18px;
            height: 18px;
            right: -5px;
            top: -5px;
            background-color: @dark_red;
            color: #fff;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            .borderRadius(9px);
            pointer-events: none;
            span {
                display: block;
                width: 100%;
                height: 100%;
                .ellipsis;
                .scale(.8);
            }
        }
    }
    
    .qn-ac-items {
        width: 50px;
        height: 0;
        .borderRadius;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 @back_gray;
        overflow: hidden;
        .ac-item {
            position: relative;
            display: block;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
            &:hover .ac-item-desc {
                display: block;
            }
        }
        .iconfont {
            font-size: 24px;
            padding: 5px;
            color: #bdbdbd;
            .borderRadius(2px);
            background-color: #f7f4f4;
            &:hover {
                color: @mask_blue;
            }
        }
        .ac-item-count {
            position: absolute;
            width: 18px;
            height: 18px;
            right: 5px;
            top: 5px;
            background-color: @dark_red;
            color: #fff;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            .borderRadius(9px);
            pointer-events: none;
            span {
                display: block;
                width: 100%;
                height: 100%;
                .ellipsis;
                .scale(.8);
            }
        }
        .ac-item-desc {
            position: absolute;
            display: none;
            height: 34px;
            line-height: 24px;
            top: 8px;
            right: 55px;
            padding: 5px 10px;
            background-color: @mask_blue;
            color: #fff;
            font-size: 14px;
            word-break: keep-all;
            white-space: nowrap;
            .borderRadius;
            &:after {
                position: absolute;
                content: '';
                right: -5px;
                top: 10px;
                width: 0;
                height: 0;
                border-top: 5px solid transparent;
                border-left: 5px solid @mask_blue;
                border-bottom: 5px solid transparent;
            }
        }
    }
</style>

