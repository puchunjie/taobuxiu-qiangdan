<template>
    <div class="status-bar">
        <div class="status" :class="{'active':activeIndex == index,'disable':st.count == 0}" v-for="(st,index) in status" :key="index" @click="filterSatatus(st,index)">
            <p>{{ st.name }}</p>
            <p>（{{ st.count }}）</p>
        </div>
        <a class="service-num">服务专员：1383746359</a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: [{
                        name: '进行中',
                        status: 1,
                        count: 7
                    },
                    {
                        name: '已成交',
                        status: 2,
                        count: 0
                    },
                    {
                        name: '已失效',
                        status: 3,
                        count: 0
                    },
                    {
                        name: '所有',
                        status: '',
                        count: 7
                    }
                ],
                activeIndex: 0
            }
        },
        methods: {
            filterSatatus(st, index) {
                if (st.count > 0) {
                    this.activeIndex = index;
                    this.$emit('on-filter-status', st.status)
                }else{
                    return false
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../../assets/base.less';
    .status-bar {
        position: relative;
        width: 100%;
        height: 60px;
        background-color: #fff;
        text-align: center;
        padding: 0 20px;
        color: @f_goast;
        .borderRadius;
        .status {
            float: left;
            cursor: pointer;
            width: 42px;
            height: 50px;
            border-bottom: 4px solid #fff;
            line-height: 20px;
            margin: 10px 38px 0 0;
            &.active {
                border-color: @dark_blue;
            }
        }
        .service-num {
            position: absolute;
            right: 10px;
            top: 23px;
            font-size: 12px;
            color: @light_blue;
        }
    }
</style>

