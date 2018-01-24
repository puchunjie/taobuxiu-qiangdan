<template>
    <div class="form-box">
        <div class="searh-warp">
            <span class="iconfont icon-search"></span>
        </div>
        <h3>询价找车</h3>
        <div class="form">
            <div class="group-col">
                <div class="group-col-item">
                    <lsCitypicker placeholder="装货地" v-model="startPlace"></lsCitypicker>
                </div>
                <div class="group-col-item">
                    <lsCitypicker placeholder="卸货地" v-model="endPlace"></lsCitypicker>
                </div>
            </div>
            <div class="group-col">
                <div class="group-col-item" style="width: 264px">
                    <div class="inner-warp" style="width: 160px">
                        <lsCitypicker placeholder="货物" v-model="startPlace"></lsCitypicker>
                    </div>
                    <div class="inner-warp" style="width: 95px">
                        <input class="goast-input" placeholder="重量" type="text">
                        <span class="goast-unit">吨(T)</span>
                    </div>
                </div>
                <div class="group-col-item" style="width: 264px">
                    <div class="inner-warp" style="width: 160px">
                        <lsCitypicker placeholder="货物" v-model="startPlace"></lsCitypicker>
                    </div>
                    <div class="inner-warp" style="width: 95px">
                        <input class="goast-input" placeholder="重量" type="text">
                        <span class="goast-unit">吨(T)</span>
                    </div>
                </div>
                <div class="group-col-item" style="width: 264px">
                    <div class="inner-warp" style="width: 160px">
                        <lsCitypicker placeholder="货物" v-model="startPlace"></lsCitypicker>
                    </div>
                    <div class="inner-warp" style="width: 95px">
                        <input class="goast-input" placeholder="重量" type="text">
                        <span class="goast-unit">吨(T)</span>
                    </div>
                </div>
            </div>
            <div class="group-col">
                <div class="group-col-item" style="width: 206px">
                    <div class="inner-warp">
                        <input class="goast-input" style="width:100%" placeholder="联系方式" type="text">
                    </div>
                </div>
                <div class="group-col-item" style="width: 514px">
                    <div class="inner-warp">
                        <input class="goast-input" style="width:100%" placeholder="备注（35字以内）" type="text">
                    </div>
                </div>
            </div>
            <div class="group-col">
                <a class="logs-btn">发布</a>
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
        data() {
            return {
                startPlace: [],
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
        padding: 50px 160px;
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
                width: 206px;
                height: 50px;
                border: 2px solid @bg_color;
                .borderRadius;
                cursor: pointer;
                .noselect;
                .transition(all,1s);
                font-size: 12px;
                &:hover {
                    border-color: @green;
                }
                &:not(:last-child) {
                    margin-right: 36px;
                }
                .inner-warp {
                    display: inline-block;
                    width:100%;
                    height: 100%;
                    vertical-align: top;
                    &+.inner-warp {
                        border-left: 2px solid @bg_color;
                    }
                }
                .goast-input {
                    display: inline-block;
                    width: 50px;
                    height: 100%;
                    border: 0;
                    margin: 0;
                    padding: 0;
                    text-indent: 10px;
                    vertical-align: top;
                    .placeholder( {
                        color: #999
                    }
                    );
                    &:focus {
                        outline: 0
                    }
                }
                .goast-unit {
                    display: inline-block;
                    width: 35px;
                    height: 100%;
                    line-height: 46px;
                    text-align: center;
                    vertical-align: top;
                    color: #999;
                }
            }

            .logs-btn{
                display: inline-block;
                width: 100px;
                height: 50px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                background-color: @green;
                .borderRadius;
                border-bottom: 4px solid @green;
                .transition(all,1s);
                &:hover{
                    border-color: #15996F;
                }
            }
        }
    }
</style>
