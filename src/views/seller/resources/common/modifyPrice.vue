<template>
    <div class="upload-container modify-panel" v-if="visible">
        <div class="inner-wrap">
            <div class="header">批量调价<span class="close iconfont icon-close" @click="close"></span></div>
            <div class="modify-table">
                <table>
                    <thead>
                        <tr>
                            <th class="iron">品类</th>
                            <th class="material">材质</th>
                            <th class="surface">表面</th>
                            <th class="proPlace">产地</th>
                            <th class="spec">规格</th>
                            <th class="tolerance">公差</th>
                            <th class="metering">计量方式</th>
                            <th class="price">单价(元/吨)</th>
                            <th class="location">所在地</th>
                            <th class="warehouse">仓库</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,i) in list" :key="item.id">
                            <td>{{ item.ironTypeName }}</td>
                            <td>{{ item.materialName }}</td>
                            <td>{{ item.surfaceName }}</td>
                            <td>{{ item.proPlacesName }}</td>
                            <td>{{ `${item.height}*${item.width}*${item.length}` }}</td>
                            <td>{{ item.tolerance | emptyHlod }}</td>
                            <td>{{ item.measuringType | measuringStr }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.locationName }}</td>
                            <td>{{ item.storeHouseName }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modify-statistics">
                共选中{{ listData.length }}条，
                <tbSelect class="modify-type" v-model="type" :data='[{label:"上涨",value:"2"},{label:"下调",value:"1"}]'></tbSelect>， 调整金额：
                <tbInput class="modify-type" v-model="price"></tbInput>
            </div>
            <div class="bottom-btns">
                <a class="btn" @click="modifySome">确认调价</a>
                <a class="btn goast" @click="close">取消</a>
            </div>
        </div>
    </div>
</template>

<script>
    import tbSelect from '@/components/business/tbSelect/index'
    import tbInput from '@/components/business/tbInput/index'
    import debounce from 'lodash/debounce'
    import cloneDeep from 'lodash/cloneDeep'
    import {
        accSub,
        accAdd
    } from '@/utils/tools.js'
    export default {
        components: {
            tbSelect,
            tbInput
        },
        props: {
            listData: {
                type: Array,
                default: function() {
                    return []
                }
            },
            value: {
                type: Boolean,
                default: false
            },
            batchIds: String,
            apiUrl:String
        },
        data() {
            return {
                visible: false,
                list: [],
                type: 2,
                price: ''
            }
        },
        computed: {
            // 上调下调
            accType() {
                return this.type == 2
            },
            handlerPrice() {
                return isNaN(this.price) ? 0 : Number(this.price)
            },
            isOk() {
                let priceOk = this.handlerPrice > 0;
                let accOk = true;
                this.list.map((el, i) => {
                    if (!this.accType && accSub(el.price, this.handlerPrice) <= 0) {
                        accOk = false
                        return false
                    }
                })
                return priceOk && accOk
            }
        },
        watch: {
            visible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.visible = val
            },
            listData(val) {
                if (val.length > 0)
                    this.list = cloneDeep(val)
            }
        },
        methods: {
            close() {
                this.visible = false;
                this.list = [];
                this.price = '';
                this.type = 2;
                this.$parent.editList = [];
            },
            modifySome() {
                if (this.isOk) {
                    this.$Modal.confirm({
                        title: "调价确认",
                        content: "是否确认调价？",
                        onOk: () => {
                            this.$Spin.show()
                            this.$http.post(this.apiUrl, {
                                storeInfoIds: this.batchIds,
                                md: this.type,
                                price: this.handlerPrice
                            }).then(res => {
                                if (res.code === 1000) {
                                    this.$Spin.hide();
                                    this.$Message.success('调价完成');
                                    this.close();
                                    this.$emit('on-ajax-success');
                                }
                            })
                        }
                    })
                } else {
                    this.$Message.error('此次调价有资源价格小于等于0，请重新调价！');
                }
    
            }
        },
        mounted() {
            this.visible = this.value
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../../assets/resources.less");
</style>
