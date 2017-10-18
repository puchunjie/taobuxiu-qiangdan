<template>
    <div class="swiper-container" id="banner">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="el in 5" :key="el">
                <img src="http://fpoimg.com/984x422">
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <!-- <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div> -->
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
                    autoplay: 5000,
                    pagination: '.swiper-pagination',
                    // prevButton: '.swiper-button-prev',
                    // nextButton: '.swiper-button-next'
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
</style>

