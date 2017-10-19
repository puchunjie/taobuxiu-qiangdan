<template>
    <div class="data-panel" :class="color">
        <div class="title">
            {{ title }}
            <div class="btn-group" v-show="filter.length > 1">
                <a class="btn" :class="{'active':activeFilter == index}" v-for="(el,index) in filter" :key="index" @click="activeFilter = index">{{ el.name }}</a>
            </div>
        </div>
        <div class="contnet">
            <i-circle :percent="ativeFilterItem.percent" :size="220" :stroke-width="8" :trail-width="8" :stroke-color="strokeColor" :trail-color="trailColor">
                <span class="tit">{{ tit }}</span>
                <h1>{{ ativeFilterItem.percent }}%</h1>
            </i-circle>
        </div>
        <div class="foot">
            <div class="item" v-for="(item,i) in ativeFilterItem.data" :key="i">
                <p><span v-show="i>0" class="note" :class="i == 1 ? 'dark' : i == 2 ? 'light' : ''"></span>{{ item.name }}</p>
                <h3>{{ item.count }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            tit: String,
            filter: Array,
            strokeColor: {
                type: String,
                default: '#60AAF3'
            },
            trailColor: {
                type: String,
                default: '#E8F3FD'
            },
            color: {
                type: String,
                default: 'blue'
            }
        },
        data() {
            return {
                activeFilter: 0
            }
        },
        computed: {
            ativeFilterItem() {
                return this.filter[this.activeFilter]
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../assets/base.less';
    .data-panel {
        padding-top: 15px;
        background-color: #fff;
        border: @b_d1;
        .borderRadius;
        .title {
            position: relative;
            color: @f_dark;
            padding: 0 15px;
            height: 32px;
            line-height: 32px;
            margin-bottom: 30px;
            font-weight: bold;
            .btn-group {
                position: absolute;
                right: 20px;
                top: 0;
                font-weight: normal;
                .borderRadius;
                .btn {
                    display: block;
                    float: left;
                    width: 60px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    &.active {
                        color: #fff;
                    }
                }
            }
        }
        .contnet {
            width: 100%;
            text-align: center;
            .tit {
                color: @f_goast;
            }
            h1 {
                font-size: 48px;
            }
        }
        .foot {
            .flex-block;
            width: 100%;
            height: 70px;
            margin-top: 40px;
            text-align: center;
            border-top: @b_d1;
            .item {
                flex: 1;
                height: 100%;
                &:not(:last-child) {
                    border-right: @b_d1;
                }
                p {
                    color: @f_goast;
                    font-size: 12px;
                    margin-top: 10px;
                    .note {
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        .borderRadius(10px);
                    }
                }
                h3 {
                    font-size: 20px;
                    color: @f_dark;
                    margin-top: 10px;
                }
            }
        }

        &.blue {
            .btn-group {
                border: 1px solid @mask_blue;
                .btn {
                    color: @mask_blue;
                    &.active {
                        background-color: @mask_blue;
                    }
                    &:not(:last-child) {
                        border-right: 1px solid @mask_blue;
                    }
                }
            }
            .foot {
                .note {
                    &.dark {
                        background-color: @mask_blue;
                    }
                    &.light {
                        background-color: @goast_blue;
                    }
                }
            }
        }


        &.red {
            .btn-group {
                border: 1px solid @light_red;
                .btn {
                    color: @light_red;
                    &.active {
                        background-color: @light_red;
                    }
                    &:not(:last-child) {
                        border-right: 1px solid @light_red;
                    }
                }
            }
            .foot {
                .note {
                    &.dark {
                        background-color: @light_red;
                    }
                    &.light {
                        background-color: @goast_red;
                    }
                }
            }
        }
    }
</style>

