<template>
    <div class="exponentia-box" :class="'type-color'+num">
        <p class="time-limit">{{ updateTime | getDateDiff(nowTime) }}</p>
        <div class="line-wrap">
            <span class="line-item" v-for="el in num" :key="el"></span>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            recommendPoint: {
                type: [String, Number],
                default: 0
            },
            updateTime: {
                type: [String, Number]
            },
            serveTime:{
                type: [String, Number]
            },
            maxNum: {
                type: Number,
                default: 5
            }
        },
        computed: {
            num(){
                return +this.recommendPoint > 0 ? +this.recommendPoint : 1
            },
            nowTime(){
                return !!this.serveTime ? this.serveTime : new Date().getTime();
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .exponentia-box {
        position: relative;
        display: inline-block;
        width: 90px;
        height: 30px;
        top: 8px;
        .time-limit {
            position: absolute;
            display: inline-block;
            width: auto;
            padding: 2px 5px;
            background-color: @f_goast;
            color: #fff;
            font-size: 12px;
            line-height: 16px;
            .borderRadius;
            top: 0;
        }
        .line-wrap {
            position: absolute;
            width: 90px;
            height: 4px;
            .borderRadius;
            background-color: @back_gray;
            top: 30px;
            overflow: hidden;
            .line-item{
                display: block;
                float: left;
                width: 20%;
                height: 100%;
            }
        }

        &.type-color1{
            .line-item{
                background-color: @f_goast;
            }
        }
        &.type-color2{
            .line-item,.time-limit{
                background-color: @light_green;
            }
        }
        &.type-color3{
            .line-item,.time-limit{
                background-color: @light_yellow;
            }
        }
        &.type-color4{
            .line-item,.time-limit{
                background-color: @light_orange;
            }
        }
        &.type-color5{
            .line-item,.time-limit{
                background-color: @dark_red;
            }
        }
    }
</style>
