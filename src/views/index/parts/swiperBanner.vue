<template>
    <div class="swiper-container" id="banner">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="../../../assets/banner/banner1.png">
            </div>
            <div class="swiper-slide">
                <img src="../../../assets/banner/banner2.png">
            </div>
            <div class="swiper-slide">
                <img src="../../../assets/banner/banner3.png">
            </div>
            <div class="swiper-slide">
                <img src="../../../assets/banner/banner4.png">
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev over-write">
            <span class="iconfont icon-fanyejiantou-copy"></span>
        </div>
        <div class="swiper-button-next over-write">
            <span class="iconfont icon-fanyejiantou"></span>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                swiper: ''
            }
        },
        methods: {
            init() {
                this.swiper = new Swiper('#banner', {
                    loop: true,
                    autoplay: 3000,
                    pagination: '.swiper-pagination',
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
    #banner img {
        width: 100%;
        height: 100%;
    }

    .over-write{
        background: none;
        width: 40px;
        text-align: center;
        .iconfont{
            color: #fff;
            font-size: 40px;
        }
    }
</style>

