<template>
    <div class="status-bar">
        <div class="status" :class="{'active':activeIndex == index,'disable':st.count == 0}" v-for="(st,index) in status" :key="index" @click="filterSatatus(st,index)">
            <p>{{ st.name }}</p>
            <p>（{{ st.count }}）</p>
        </div>
        <a class="service-num">服务专员：{{ base.sellManName }}-{{ base.sellManTel }}</a>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: {
            status: Array
        },
        data() {
            return {
                activeIndex: 0
            }
        },
        computed: {
            ...mapGetters(['base'])
        },
        methods: {
            filterSatatus(st, index) {
                this.activeIndex = index;
                this.$emit('on-filter-status', st.status)
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
                color: @dark_blue;
                border-color: @dark_blue;
            }
        }
        .service-num {
            position: absolute;
            right: 20px;
            top: 23px;
            font-size: 12px;
            color: @light_blue;
        }
    }
</style>

