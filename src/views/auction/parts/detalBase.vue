<template>
    <div class="goods-info">
        <div class="header">
            <span class="tag">{{ data.goodsType }}</span>
            <span class="category">{{ data.ironType }}</span>
            <span style="font-size:14px" v-if="!data.pack">{{ data.material }}/{{ data.surface }}/{{ data.specifiction ? data.specifiction : `${ data.height }*${ data.width }*${ data.length }` }}/({{ data.tolerance }})</span>
            <span style="font-size:14px" v-else>{{ data.packDescription }}</span>
            <span class="has-b-price" :class="{'disable': data.reservePrice == ''}">{{ data.reservePrice == '' ? '无' : '有' }}底价</span>
    
            <div class="merchant"><label>送拍商户：</label>{{ data.companyName }}</div>
        </div>
    
    
        <div class="base-info">
            <template v-if="!data.pack">
                    <div class="group">
                        <label>品类</label>{{ data.ironType }}
                    </div>
                    <div class="group">
                        <label>材质</label>{{ data.material }}
                    </div>
                    <div class="group">
                        <label>表面</label>{{ data.surface }}
                    </div>
                    <div class="group">
                        <label>规格(mm)</label>{{ data.specifiction ? data.specifiction : `${ data.height }*${ data.width }*${ data.length }` }}
                    </div>
                    <div class="group">
                        <label>公差(mm)</label>{{ data.tolerance }}
                    </div>
                    <div class="group">
                        <label>产地</label>{{ data.proPlace }}
                    </div>
                    <div class="group">
                        <label>仓库</label>{{ data.storeHouse }}
                    </div>
                    <div class="group">
                        <label>所在地</label>{{ data.province == data.city ? data.city : (data.province + data.city) }}
                    </div>
                    <div class="group">
                        <label>数量</label>{{ info.number }}
                    </div>
                    <div class="group">
                        <label>重量(kg)</label>{{ info.weight }}
                    </div>
                    <div class="group">
                        <label>包装</label>{{ data.packaging }}
                    </div>
                    <div class="group" style="width:100%;">
                        <label>备注</label>{{ data.remark }}
                    </div>
                </template>

                <template v-else>
                    <div class="group" style="width:100%;">
                        <label>打包描述</label>{{ data.packDescription }}
                    </div>
                    <div class="group">
                        <label>货物总量</label>{{ info.number }}
                    </div>
                    <div class="group">
                        <label>总重(kg)</label>{{ info.weight }}
                    </div>
                    <div class="group">
                        <label>仓库</label>{{ data.storeHouse }}
                    </div>
                    <div class="group">
                        <label>产地</label>{{ data.proPlace }}
                    </div>
                    <div class="group">
                        <label>所在地</label>{{ data.province == data.city ? data.city : (data.province + data.city) }}
                    </div>
                    <div class="group">
                        <label>包装</label>{{ data.packaging }}
                    </div>
                    <div class="group" style="width:100%;">
                        <label>备注</label>{{ data.remark }}
                    </div>
                </template>
        </div>      
    </div>
</template>


<script>
    export default {
        props: {
            data: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            info: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .goods-info {
        width: 984px;
        height: 186px;
        background-color: #fff;
        margin-top: 16px;
        .header {
            position: relative;
            width: 100%;
            height: 48px;
            color: @f_dark;
            padding: 14px;
            border-bottom: @b_d1;
            span {
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
                font-size: 16px;
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
            .merchant {
                position: absolute;
                right: 16px;
                top: 16px;
                color: @f_ligth;
                label {
                    color: @f_goast;
                }
            }
        }
        .base-info {
            .flex-block;
            .flex-wrap(wrap);
            width: 100%;
            height: auto;
            background-color: #fff;
            padding: 16px;
            font-size: 14px;
            color: @f_ligth;
            .group {
                width: 235px;
                height: 25px;
                line-height: 25px;
                label {
                    display: inline-block;
                    min-width: 60px;
                    margin-right: 15px;
                    color: @f_goast;
                }
            }
        }
    }
</style>

