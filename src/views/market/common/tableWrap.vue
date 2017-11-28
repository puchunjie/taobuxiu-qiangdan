<template>
    <div class="table-wrap">
        <div class="head-bar">
            <a class="sort-item" :class="{'active':page.priceSort == ''}" @click="pickerSort('')">默认</a>
            <div class="sort-item" :class="{'active':page.priceSort != ''}" @click="sortPicker = true" v-clickoutside="hidePicker">
                {{ sortStr }} <span class="iconfont icon-iconjiaobiaoxiangxia"></span>
                <div class="select-box" v-show="sortPicker">
                    <a @click.stop="pickerSort(1)">价格从高到低<span class="iconfont icon-iconjiaobiaoxiangshang"></span></a>
                    <a @click.stop="pickerSort(2)">价格从低到高</a>
                </div>
            </div>
            <Page class="no-color line-page" :total="page.totleCount" :current.sync="page.currentPage" :page-size="page.pageSize" size="small" show-total></Page>
        </div>
        <div class="slot-contnet">
            <slot v-show="page.totleCount>0"></slot>
            <div class="empty" v-show="page.totleCount <= 0">
                <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/no-list.png">
            </div>
        </div>
        <div class="bottom-bar">
            <Page :total="page.totleCount" show-elevator :current.sync="page.currentPage" :page-size="page.pageSize" size="small" show-total></Page>
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
                        currentPage: 1,
                        priceSort: ''
                    }
                }
            }
        },
        data() {
            return {
                page: {
                    totleCount: 10,
                    pageSize: 10,
                    currentPage: 1,
                    priceSort: ""
                },
                sortPicker: false
            }
        },
        computed: {
          sortStr(){
              return this.page.priceSort != '' ? this.page.priceSort == 1 ? '价格从高到低': '价格从低到高' : '价格从高到低'
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
            hidePicker() {
                this.sortPicker = false;
            },
            pickerSort(sort = '') {
                this.page.priceSort = sort;
                this.sortPicker = false;
                this.$emit('on-sort')
            }
        },
        mounted() {
            this.page = this.value
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .table-wrap {
        width: 100%;
        margin-top: 10px;
        padding-bottom: 20px;
        .list-table{
            border: @b_d1;
        }

        .head-bar {
            width: 100%;
            height: 40px;
            background-color: #fff;
            border: @b_d1;
            border-bottom: 0;
            letter-spacing: -4px;
            .noselect;
            .line-page {
                position: relative;
                float: right;
                letter-spacing: 0;
                top: 5px;
            }
            .sort-item {
                position: relative;
                display: inline-block;
                min-width: 70px;
                height: 100%;
                text-align: center;
                line-height: 40px;
                color: @f_goast;
                padding: 0 10px;
                font-size: 12px;
                border-right: @b_d1;
                letter-spacing: 0;
                cursor: pointer;
                &.active {
                    background-color: @mask_blue;
                    color: #fff;
                }
                .iconfont {
                    vertical-align: middle;
                }
                .select-box {
                    position: absolute;
                    width: 100%;
                    height: 80px;
                    background-color: #fff;
                    z-index: 300;
                    left: 0;
                    top: 0;
                    a {
                        display: inline-block;
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        text-align: left;
                        text-indent: 10px;
                        color: @f_goast;
                        &:hover {
                            color: @mask_blue;
                        }
                    }
                }
            }
        }

        .slot-contnet{
            width: 100%;
            .empty{
                width: 100%;
                min-height: 270px;
                text-align: center;
                background-color: #fff;
                img{
                    display: inline-block;
                    width: 230px;
                    margin-top:20px;
                }
            }
        }

        .bottom-bar{
            width: 100%;
            margin-top: 20px;
            text-align: center; 
        }
    }
</style>


