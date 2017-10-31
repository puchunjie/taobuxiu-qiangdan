<template>
    <div class="swiper-container" id="bottom">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/static/assets/bottom/1.png">
            </div>
            <div class="swiper-slide">
                <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/static/assets/bottom/2.png">
            </div>
            <div class="swiper-slide">
                <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/static/assets/bottom/3.png">
            </div>
            <div class="swiper-slide">
                <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/static/assets/bottom/4.png">
            </div>
            <div class="swiper-slide">
                <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/static/assets/bottom/5.png">
            </div>
        </div>
        <div class="swiper-button-prev over-write">
            <span class="iconfont icon-lunbo-copy"></span>
        </div>
        <div class="swiper-button-next over-write">
            <span class="iconfont icon-lunbo"></span>
        </div>
        <div class="tips">
            <div class="tip-item" :class="{'hight-light':index <= step -1}" v-for="(el,index) in steps" :key="index">
                <div class="icon-count">{{ index+1 }}</div>
                <p class="name">{{ el }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                swiper: '',
                steps: ['发起求购', '发起报价', '查看报价', '细节沟通', '达成交易'],
                step: 1
            }
        },
        methods: {
            init() {
                let _this = this;
                this.swiper = new Swiper('#bottom', {
                    loop: true,
                    autoplay: 2000,
                    onSlideChangeStart: function(swiper) {
                        _this.step = swiper.activeIndex <= 5 ? swiper.activeIndex : 1;
                    },
                    prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next'
                })
            }
        },
        created() {
            this.$nextTick(() => {
                this.init();
            })
    
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/base.less';

    #bottom img {
        margin-top: 75px;
        width: 100%;
    }
    
    .tips {
        position: absolute;
        .flex-block;
        width: 590px;
        height: 90px;
        left: 356px;
        top: 30px;
        z-index: 2;
        .tip-item {
            position: relative;
            width: 125px;
            height: 100%;
            .opacity(.2);
            &.hight-light {
                .opacity(1);
            }
            .icon-count {
                width: 30px;
                height: 30px;
                margin: 0 auto;
                line-height: 30px;
                font-size: 22px;
                color: @dark_blue;
                background-color: #fff;
                text-align: center;
                .borderRadius(15px);
            }
            .name {
                width: 100%;
                font-size: 20px;
                line-height: 45px;
                text-align: center;
                color: #fff;
            }
            &:after {
                position: absolute;
                content: "";
                width: 70px;
                height: 2px;
                background-color: #fff;
                left: -35px;
                top: 15px;
            }
            &:first-child:after {
                content: none;
            }
        }
    }

    .over-write{
        background: none;
        width: 100px;
        text-align: center;
        .opacity(.5);
        .iconfont{
            color: #fff;
            font-size: 80px;
        }
    }
</style>

