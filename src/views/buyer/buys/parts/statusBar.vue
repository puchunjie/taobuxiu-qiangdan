<template>
    <div class="status-bar">
        <div class="status" :class="{'active':activeIndex == index}" v-for="(st,index) in status" :key="index" @click="filterSatatus(st.status,index)">
            <p>{{ st.name }}</p>
            <p>（{{ st.count }}）</p>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                status:[
                    {
                        name:'进行中',
                        status:1,
                        count:0
                    },
                    {
                        name:'已成交',
                        status:2,
                        count:0
                    },
                    {
                        name:'已失效',
                        status:3,
                        count:0
                    },
                    {
                        name:'所有',
                        status: '',
                        count:0
                    }
                ],
                activeIndex: 0
            }
        },
        methods: {
            filterSatatus(status,index){
                this.activeIndex = index;
                this.$emit('on-filter-status',status)
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .status-bar {
        width: 100%;
        height: 60px;
        background-color: #fff;
        text-align: center;
        padding: 0 20px;
        color: @f_goast;
        .borderRadius;
        .status{
            float: left;
            cursor: pointer;
            width: 42px;
            height: 50px;
            border-bottom: 4px solid #fff;
            line-height: 20px;
            margin:10px 38px 0 0;
            &.active{
                border-color: @dark_blue;
            }
        }
    }
</style>

