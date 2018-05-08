<template>
    <div class="tab-list">
        <slot></slot>
        <Page class="page-count" ref="page" :total="total" :page-size="pageSize" size="small" @on-change="pageChange"></Page>
    </div>
</template>

<script>
    export default {
        props:{
            total:[String,Number],
            pageSize:{
                type:[String,Number],
                default: 5
            }
        },
        methods: {
            pageChange(current){
                this.$emit('on-page-change',current)
            },
            pageInit(page = 1){
                this.$refs.page.currentPage = page;
            }
        }
    }
</script>

<style lang="less" scoped>
    .tab-list {
        position: absolute;
        width: 398px;
        margin-top: 16px;
        min-height: 615px;
        .page-count {
            position: absolute;
            bottom: 0;
        }
    }
</style>


