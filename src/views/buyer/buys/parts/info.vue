<template>
    <div class="item-info">
        <div class="tit">
            求购详情
            <div class="count-down">
                <template v-if="item.buyStatus == 1">
                    剩余时间：<countDown :endTime="item.updateTime + item.timeLimit"></countDown>
                </template>
                <template v-else-if="item.buyStatus == 2">
                    成交时间：{{ item.updateTime | dateformat }}
                </template>
                <template v-else>
                    失效时间：{{ item.updateTime | dateformat }}
                </template>
            </div>
        </div>
        <div class="table table-head">
            <div class="item location">货源地</div>
            <div class="item type">品名</div>
            <div class="item material">材质</div>
            <div class="item surface">表面</div>
            <div class="item specifications">规格</div>
            <div class="item tolerance">公差</div>
            <div class="item number">数量</div>
            <div class="item weight">重量</div>
            <div class="item proPlaces">生产商</div>
        </div>
        <div class="table">
            <div class="item location">{{ item.locationName }}</div>
            <div class="item type">{{ item.ironTypeName }}</div>
            <div class="item material">{{ item.materialName }}</div>
            <div class="item surface">{{ item.surfaceName }}</div>
            <div class="item specifications">{{ item.specifications!= '' ? item.specifications : `${ item.height }*${ item.width }*${ item.length }` }}</div>
            <div class="item tolerance">{{ item.tolerance }}</div>
            <div class="item number">{{ item.numbers ? `${ item.numbers }${ item.numberUnit }`: '-' }}</div>
            <div class="item weight">{{ item.weights ? `${ item.weights }${ item.weightUnit }`: '-' }}</div>
            <div class="item proPlaces">{{ item.proPlacesName }}</div>
        </div>
        <div class="remark">
            <span>备注：</span>{{ item.remark }}
        </div>
    </div>
</template>

<script>
    import countDown from './countDown.vue'
    export default {
        components: {
          countDown  
        },
        props:{
            item:Object
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .p20() {
        padding: 0 20px;
    }
    
    .item-info {
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        margin-bottom: 16px;
        border-left: @b_d1;
        border-top: @b_d1;
        .borderRadius;
        .tit {
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            color: @f_dark;
            border-bottom: @b_d1;
            border-right: @b_d1;
            .p20;
            .count-down{
                position: absolute;
                font-weight: normal;
                color: @f_goast;
                right: 10px;
                top: 0;
            }
        }
        .table {
            width: 100%;
            height: 50px;
            line-height: 50px;
            color: @f_dark;
            .item {
                float: left;
                text-indent: 20px;
                border-right: @b_d1;
                border-bottom: @b_d1;
                .ellipsis;
                &.location {
                    min-width: 90px;
                    width: 11%;
                }
                &.type {
                    min-width: 100px;
                    width: 12.25%;
                }
                &.material {
                    min-width: 80px;
                    width: 9.8%;
                }
                &.surface {
                    min-width: 70px;
                    width: 8.6%;
                }
                &.specifications {
                    min-width: 120px;
                    width: 15.5%;
                }
                &.tolerance {
                    min-width: 100px;
                    width: 12.25%;
                }
                &.number {
                    min-width: 80px;
                    width: 9.8%;
                }
                &.weight {
                    min-width: 80px;
                    width: 9.8%;
                }
                &.proPlaces {
                    min-width: 90px;
                    width: 11%;
                }
            }
            &.table-head {
                color: @f_goast;
            }
        }
        .remark {
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            border-bottom: @b_d1;
            border-right: @b_d1;
            .p20;
            span {
                color: @f_goast;
            }
        }
    }
</style>

