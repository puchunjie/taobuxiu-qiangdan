<template>
    <div class="form-box">
        <div class="searh-warp">
            <span class="iconfont icon-search"></span>
        </div>
        <h3>询价找车</h3>
        <div class="form">
            <div class="group-col">
                <div class="group-col-item" style="width: 206px">
                    <lsCitypicker placeholder="装货地" v-model="startPlace"></lsCitypicker>
                </div>
                <div class="group-col-item" style="width: 206px">
                    <lsCitypicker placeholder="卸货地" v-model="endPlace"></lsCitypicker>
                </div>
            </div>
    
        </div>
    </div>
</template>


<script>
    import lsCitypicker from './components/lsCtiypicker';
    export default {
        components: {
            lsCitypicker
        },
        data () {
            return {
                startPlace:[],
                endPlace: []
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../assets/base.less');
    @import url('./components/lsCommon.less');
    .form-box {
        position: relative;
        width: 1200px;
        height: 440px;
        margin: 0 auto;
        top: 410px;
        background-color: #fff;
        .borderRadius;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        padding: 50px 170px;
        .searh-warp {
            position: absolute;
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            left: 68px;
            .borderRadius(60px);
            border: 1px solid @bg_color;
            .iconfont {
                font-size: 20px;
                color: @green;
            }
        }
        h3 {
            line-height: 60px;
            font-size: 18px;
            color: #666;
            font-weight: bold;
        }
        .form {
            width: 100%;
            height: 100%;
            .group-col {
                width: 100%;
                height: 50px;
                line-height: 50px;
                margin-top: 20px;
            }
            .group-col-item {
                display: inline-block;
                min-width: 200px;
                height: 50px;
                border: 2px solid @bg_color;
                .borderRadius;
                cursor: pointer;
                .noselect;
                .transition(all,1s);
                &:hover{
                    border-color: @green;
                }

                &:not(:last-child){
                    margin-right: 36px;
                }
            }
        }
    }
</style>
