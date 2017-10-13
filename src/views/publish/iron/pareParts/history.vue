<template>
    <div class="history-container" :value="value" v-show="visible">
        <div class="ivu-modal-mask"></div>
        <div class="ivu-modal-wrap">
            <div class="content">
                <div class="title">
                    求购历史(最近6条)
                    <span class="iconfont icon-close" @click="visible = false"></span>
                </div>
                <div class="list">
                    <div class="item clearfix" v-for="(item,index) in list" :key="index">
                        <a class="date">{{ item.createTime | dateformat }}</a>
                        <div class="info">
                            <span>{{ item.locationName }}</span>
                            <span>{{ item.ironTypeName }}</span>
                            <span>{{ item.materialName }}</span>
                            <span>{{ item.surfaceName }}</span>
                            <span>{{ item.specifications != '' ? item.specifications :`${item.height}*${item.width}*${item.length}` }}</span>
                            <span>{{ item.tolerance }}</span>
                            <span>{{ `${item.weights}${item.weightUnit}` }}</span>
                            <span>{{ `${item.numbers}${item.numberUnit}` }}</span>
                            <span>{{ item.proPlacesName }}</span>
                        </div>
                        <a class="btn" @click="pushData(item)">选择</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            list: Array,
            can: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            cancel() {
                this.visible = false;
            },
            pushData(item) {
                if (this.can) {
                    let data = _.cloneDeep(item);
                    data.id = '';
                    data.buyStatus = 1;
                    this.$emit('on-click', data)
                } else {
                    this.$Message.error('您的求购列表已超过6条上限！');
                }
    
            }
        },
        watch: {
            value(val) {
                this.visible = val;
            },
            visible(val) {
                this.$emit('input', val);
            }
        },
        mounted() {
            if (this.value) {
                this.visible = true;
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .history-container {
        .content {
            width: 938px;
            background-color: #fff;
            margin: 10% auto 0;
        }
        .title {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            background-color: @mask_blue;
            color: #fff;
            .iconfont {
                position: absolute;
                font-size: 20px;
                color: #fff;
                right: 10px;
                cursor: pointer;
            }
        }
        .list {
            width: 100%;
            padding: 20px;
            .item {
                position: relative;
                width: 820px;
                margin-bottom: 10px;
                line-height: 30px;
                color: @f_dark;
                .btn {
                    position: absolute;
                    display: inline-block;
                    right: -75px;
                    top: 5px;
                    padding: 0 17px;
                    background-color: @mask_blue;
                    color: #fff;
                    text-align: center;
                    line-height: 24px;
                }
                .date {
                    position: absolute;
                    color: @f_goast;
                }
                .info {
                    margin-left: 130px;
                    span {
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>

