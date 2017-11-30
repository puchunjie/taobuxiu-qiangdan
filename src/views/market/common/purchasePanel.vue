<template>
    <div class="purchase-panel" v-if="visible">
        <div class="inner-wrap">
            <div class="header">确认采购订单<span class="close iconfont icon-close" @click="close"></span></div>
            <div class="content">
                <table class="info-table">
                    <thead>
                        <tr>
                            <th :colspan="colspan">
                                供应商：{{ info.companyName }}
                                <merchantLabel :faith="info.isFaithUser == '1'" :guarantee="info.isGuaranteeUser == '1'"></merchantLabel>
                                <crown :level='info.level'></crown>
                                <qq style="margin-left:75px" :data="{name:info.contact,phone:info.contactNum,qq:info.QQ}"></qq>

                                <span style="float:right">{{ item.updateTime | dateformat }}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width:310px">商品信息</td>
                            <td>产地</td>
                            <td>计量方式</td>
                            <td>单价</td>
                            <td>仓库(地区)</td>
                            <td v-show="isSpecail">库存量(吨)</td>
                            <td>备注</td>
                            <td style="width:215px"><span class="red-tip">*</span>采购数量</td>
                        </tr>
                        <tr>
                            <td>
                                {{ `${item.ironTypeName} ${item.materialName}/${item.surfaceName}` }} {{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length} `}} {{ item.tolerance | emptyHlod }}
                            </td>
                            <td>{{ item.proPlacesName }}</td>
                            <td>{{ item.measuringType | measuringStr }}</td>
                            <td>{{ item.price }}元/吨</td>
                            <td>{{ item.storeHouseName }}</td>
                            <td v-show="isSpecail">{{ item.storeHouseCount }}</td>
                            <td v-if="type == 'iron'">-/-</td>
                            <td v-else-if="type == 'plan'">{{ item.remark }}</td>
                            <td v-else-if="type == 'specail'">{{ item.taxType | taxStr(false)}}</td>
                            <td>
                                <tbInput validate style="width:100px;margin-right:5px"></tbInput>吨
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="fresh-index">
                    新鲜指数：该资源更新于<span class="red-tip">{{ item.updateTime | getDateDiff(item.serveTime) }}</span>，{{ item.recommendRemark }}
                </div>
                <p>供应商地址：{{ info.address }}</p>
            </div>
            <div class="bottom-btns">
                有效确认时间
                <tbSelect style="width:120px;margin:0 20px 0 10px;" :api="$api.selectStorerSubOrderName"></tbSelect>
                <a class="btn">确认下单</a>
                <a class="btn goast" @click="close">取消</a>
            </div>
        </div>
    </div>
</template>

<script>
    import tbInput from '@/components/business/tbInput/index'
    import tbSelect from '@/components/business/tbSelect/index'
    import crown from '@/components/basics/crown/index.vue'
    import qq from '@/components/business/qqContant/index.vue'
    import merchantLabel from '@/components/business/merchantLabel/index.vue'
    export default {
        components: {
            tbInput,
            tbSelect,
            crown,
            qq,
            merchantLabel
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            type: {
                type: String
            },
            isSpecail: {
                type: Boolean,
                default: false
            },
            info: {
                type: Object,
                default: function() {
                    return {
                        contactNum: "",
                        QQ: "",
                        address: "",
                        level: "",
                        isFaithUser: "1",
                        companyName: "",
                        contact: "",
                        isGuaranteeUser: "1"
                    }
                }
            },
            item: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        data() {
            return {
                visible: false
            }
        },
        computed: {
            colspan() {
                return this.isSpecail ? 8 : 7
            }
        },
        watch: {
            visible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.visible = val
            }
        },
        methods: {
            close() {
                this.visible = false;
            }
        },
        mounted() {
            this.visible = this.value;
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .purchase-panel {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .4);
        z-index: 990;
        font-size: 12px;
        .inner-wrap {
            width: 1100px;
            min-height: 370px;
            background-color: #fff;
            margin: 150px auto;
            padding-bottom: 20px;
        }
        .header {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;
            font-size: 14px;
            color: #fff;
            background-color: @mask_blue;
            .close {
                position: absolute;
                right: 14px;
                cursor: pointer;
            }
        }
        .content {
            width: 100%;
            padding: 40px 50px 27px;
            .red-tip {
                color: @dark_red;
                font-weight: bold;
            }
            .info-table {
                width: 100%;
                border: @b_d1;
                th {
                    height: 40px;
                    line-height: 40px;
                    background-color: @goast_gray;
                    padding: 0 20px;
                    color: #777;
                }
                td {
                    min-width: 80px;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    border-top: @b_d1;
                    border-right: @b_d1;
                    &:last-child {
                        border-right: 0;
                    }
                }
            }
            .fresh-index {
                width: 100%;
                height: 30px;
                line-height: 30px;
                margin: 10px 0;
                padding: 0 10px;
                color: @dark_yellow;
                background-color: @mask_yellow;
            }
        }
        .bottom-btns {
            width: 100%;
            padding: 0 50px;
            height: 32px;
            text-align: right;
            .btn {
                display: inline-block;
                width: 100px;
                height: 30px;
                line-height: 28px;
                text-align: center;
                background-color: @mask_blue;
                color: #fff;
                border: 1px solid @mask_blue;
                font-weight: bold;
                font-size: 14px;
                .borderRadius(2px);
                vertical-align: middle;
                &.goast {
                    background-color: #fff;
                    color: @mask_blue;
                    margin-left: 20px;
                }
            }
        }
    }
</style>

