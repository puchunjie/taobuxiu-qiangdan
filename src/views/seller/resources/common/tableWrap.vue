<template>
    <div class="table-wrap">
        <div class="head-bar">
            <span class="iconfont" :class="checkNum == listNum ? 'icon-check-box' : 'icon-check_box_unselecte'" @click="checkAll"></span>
            <span class="count">全选（{{ checkNum }}条）</span>
            <slot name="btns"></slot>
            <Page class="no-color line-page" :total="page.totleCount" :current.sync="page.currentPage" :page-size="page.pageSize" size="small" show-total></Page>
        </div>
        <div class="slot-contnet">
            <slot v-show="page.totleCount>0"></slot>
            <img class="empty" v-show="page.totleCount <= 0" src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/no-list.png">
        </div>
        <div class="bottom-bar">
            <Page class="no-color line-page" :total="page.totleCount" :current.sync="page.currentPage" :page-size="page.pageSize" size="small" show-total></Page>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            value: {
                type: Object,
                default: function() {
                    return {
                        totleCount: 10,
                        pageSize: 10,
                        currentPage: 1
                    }
                }
            },
            checkNum: {
                type: [String, Number],
                default: 0
            },
            listNum: {
                type: [String, Number],
                default: 0
            }
        },
        data() {
            return {
                page: {
                    totleCount: 10,
                    pageSize: 10,
                    currentPage: 1
                }
            }
        },
        watch: {
            'page': {
                handler: function(val, oldVal) {
                    this.$emit('input', val);
                },
                deep: true
            }
        },
        methods: {
            checkAll(){
                this.$emit("check-all")
            }
        },
        mounted() {
            this.page = this.value
        }
    }
</script>



<style lang="less" scoped>
    @import url("../../../../assets/base.less");
    .table-wrap {
        width: 100%;
        border-left: @b_d1;
        border-right: @b_d1;
        border-bottom: @b_d1;
        background-color: #fff;
        font-size: 12px;
        .head-bar {
            width: 100%;
            height: 44px;
            line-height: 44px;
            border-bottom: @b_d1;
            padding: 0 20px;
            color: @f_dark;
            background-color: @bg_color;
            .noselect;
            .iconfont {
                color: @back_gray;
                font-size: 18px;
                cursor: pointer;
                vertical-align: middle;
                background-color: @goast_gray;
                &:hover {
                    color: @light_blue;
                }
                &.icon-check-box {
                    color: @light_blue;
                }
            }

            .btn-group{
                display: inline-block;
            }
            
            .count,
            .action-btn {
                display: inline-block;
                vertical-align: middle;
                margin-left: 20px;
                color: @f_dark;
            }
            .count{
                width: 83px;
            }
            .action-btn:hover {
                color: @light_blue;
            }
            .line-page {
                float: right;
            }
        }
        .slot-contnet {
            min-height: 265px;
            .empty {
                display: block;
                width: 230px;
                margin: 50px auto 0
            }
        }
        .bottom-bar {
            width: 100%;
            height: 44px;
            margin-top: 14px;
            text-align: right;
            padding: 0 20px;
        }
    }
</style>
