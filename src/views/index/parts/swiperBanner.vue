<template>
    <div class="swiper-container" id="banner">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(el,i) in data" :key="i">
                <a :href="el != '' ? `/qd/shop-${el}/iron-1` : 'javascript:void(0);'" target="_blank">
                    <img :src="`http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/banner/banner${i+1}.png`">
                </a>
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
                swiper: '',
                data: [
                    '',
                    '402880f25f725cc7015f725daf8701d8',
                    '402880f25f725fca015f7263b4dd05cb',
                    '402880f25f725cc7015f725cf978004c',
                    '402880f25f725cc7015f725da10e01b8',
                    '402880f25f725fca015f7263b40205c9'
                ]
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
    
    .over-write {
        background: none;
        width: 40px;
        text-align: center;
        .iconfont {
            color: #fff;
            font-size: 40px;
        }
    }
</style>

