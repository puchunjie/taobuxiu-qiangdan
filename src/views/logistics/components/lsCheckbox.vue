<template>
    <div class="ls-checkbox-container">
        <div class="checkbox-item" v-for="(item,i) in copyChecks" :key="i" @click="checkItem(item,i)">
            <span class="iconfont" :class=" item.isCheck ? 'icon-check-box' : 'icon-check_box_unselecte'"></span>{{ item.name }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            checks: {
                type: Array,
                default: function() {
                    return [{
                        id: '1',
                        name: '含税'
                    }, {
                        id: '2',
                        name: '自卸车'
                    }, {
                        id: '3',
                        name: '垫出库费'
                    }]
                }
            },
            value:{
                type:Array,
                default:function(){
                    return []
                }
            }
        },
        data() {
            return {
                copyChecks: [],
                feedback: []
            }
        },
        methods: {
            dataInit() {
                let copyChecks = this.$clearData(this.checks);
                copyChecks.map(el => {
                    el.isCheck = false;
                });
                this.copyChecks = copyChecks;
            },
            exportHander(){
                let data = this.$clearData(this.copyChecks);
                let outPut = data.filter(el=>el.isCheck);
                this.$emit('input',outPut);
            },
            checkItem(item,i){
                item.isCheck = !item.isCheck;
                this.exportHander();
            }
        },
        watch: {
            checks(){
                this.dataInit();
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('./lsCommon.less');
    .ls-checkbox-container {
        display: inline-block;
        .checkbox-item {
            display: inline-block;
            color: #999;
            cursor: pointer;
            &:not(:first-child) .iconfont {
                margin-left: 40px;
            }
            &:hover {
                color: @green;
                .iconfont {
                    color: @green;
                }
            }
        }
        .iconfont {
            font-size: 20px;
            color: #999;
            vertical-align: middle;
            margin-right: 10px;
        }
        .icon-check-box{
            color: @green;
        }
    }
</style>
