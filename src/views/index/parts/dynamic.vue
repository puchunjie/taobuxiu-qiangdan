<template>
    <div>
        <div class="inner-title">最新求购（求购动态）</div>
        <div class="swiper-container" id="iron" @mouseenter="pause" @mouseleave="play">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(page,index) in pages" :key="index">
                    <div class="item-group">
                        <div class="item" :class="{'no-mr':(i+1)%4 == 0}" v-for="(item,i) in page" :key="item.id">
                            <h3>
                                {{ item.ironTypeName }}
                                <span>{{ item.specifications!= '' ? item.specifications : `${ item.height }*${ item.width }*${ item.length }` }}</span>
                            </h3>
                            <p>{{ item.weights != '' ? `${item.weights}${item.weightUnit}`: '' }}&nbsp;&nbsp;{{ item.numbers != '' ? `${item.numbers}${item.numberUnit}`: '' }}</p>
                            <p class="gray">发布时间 {{ item.updateTime | dateformat('MM-dd hh:mm') }}</p>
                            <span class="count">{{ item.sellNum }}个报价</span>
                            <div class="status" :class="'st'+item.buyStatus">
                                <span></span>
                                进行中
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                swiper: '',
                list: []
            }
        },
        computed: {
            pages() {
                return [this.list.slice(0, 8), this.list.slice(8, 16)]
            }
        },
        methods: {
            init() {
                this.swiper = new Swiper('#iron', {
                    // loop: true,
                    speed: 100,
                    direction: 'vertical',
                    autoplay: 3000
                })
            },
            // 获取求购信息列表
            getIron() {
                this.$http.post(this.$api.newIronList).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data;
                    }
                })
            },
            pause() {
                this.swiper.stopAutoplay()
            },
            play() {
                this.swiper.startAutoplay();
            }
        },
        created() {
            this.getIron();
        },
        mounted() {
            this.$nextTick(() => {
                this.init();
            })
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/base.less';
    #iron {
        width: 100%;
        height: 285px;
    }
    
    .item-group {
        .flex-block;
        .flex-wrap(wrap);
        width: 100%;
        .item {
            position: relative;
            width: 312px;
            height: 120px;
            background-color: #fff;
            margin: 0 24px 24px 0;
            padding: 18px 20px;
            font-size: 16px;
            border: 1px solid #fff;
            .borderRadius;
            &.no-mr {
                margin-right: 0;
            }
            h3 {
                width: 220px;
                line-height: 22px;
                font-weight: 500;
                .ellipsis;
                span {
                    margin-left: 10px;
                }
            }
            p {
                line-height: 22px;
                margin-top: 10px;
                &.gray {
                    color: @f_goast;
                }
            }
            .count {
                position: absolute;
                display: block;
                width: 52px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                border: 1px solid @dark_blue;
                color: @dark_blue;
                font-size: 12px;
                right: 20px;
                bottom: 15px;
            }
            
            .status{
                position: absolute;
                right: 20px;
                bottom: 50px;
                font-size: 14px;
                span{
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    .borderRadius(4px);
                    background-color: #ddd; 
                }

                &.st1{
                    color: @light_yellow;
                    span{
                        background-color: @light_yellow;
                    }
                }
                &.st2{
                    color: @light_green;
                    span{
                        background-color: @light_green;
                    }
                }
                &.st3{
                    color: @f_goast;
                    span{
                        background-color: @f_goast;
                    }
                }
            }
            
            &:hover {
                border: 1px solid @dark_blue;
            }
        }
    }
</style>

