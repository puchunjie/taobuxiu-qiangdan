<template>
    <div class="sample-wrap">
        <p class="tit">示例</p>
        <div class="img-content">
            <img :src="img">
        </div>
        <p class="desc">{{ desc }}</p>
        <a class="show">查看大图</a>
    </div>
</template>

<script>
    export default {
        props:{
            desc:{
                type:String,
                default: ''
            },
            img:{
                type:String,
                default: ''
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../../assets/base.less');
    .sample-wrap {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: @f_dark;
        margin-right: 20px;
        .tit {
            height: 24px;
            line-height: 24px;
        }
        .img-content {
            width: 150px;
            height: 100px;
            background-color: #fff;
            overflow: hidden;
            padding: 5px;
            img{
                display: block;
                width: 100%;
            }
        }
        .desc{
           margin-top: 10px;
        }
        .show{
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
</style>
