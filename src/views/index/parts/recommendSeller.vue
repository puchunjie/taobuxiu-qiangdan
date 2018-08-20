<template>
    <div>
        <div class="inner-title">推荐卖家</div>
        <div class="seller-items">
            <a class="seller-img" v-for="(el,i) in onShop" :key="i" :href="el.id != '' ? `/qd/shop-${el.id}/iron-1` : 'javascript:void(0);'" target="_blank">
                <img :src="`http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/recommend/${el.img}.png`">
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //有效商店
                onShop: [{
                    id: "402880f25f725fca015f7263a6bb05a9",
                    img: "shop1"
                },{
                    id: "402880f25f725cc7015f725d40bb00e4",
                    img: "shop2"
                },{
                    id: "402880f25f725fca015f726203e301b5",
                    img: "shop3"
                },{
                    id: "402880f25f725cc7015f725dd657022e",
                    img: "shop4"
                },{
                    id: "402880f25f725cc7015f725d4eb20104",
                    img: "shop5"
                },{
                    id: "402880f25f725fca015f7263407204bf",
                    img: "shop6"
                },{
                    id: "402880f25f725cc7015f725d4ff00106",
                    img: "shop7"
                },{
                    id: "402880f25f725fca015f7261ee67017f",
                    img: "shop8"
                },{
                    id: "2c90182f608259c00160b61357f0081e",
                    img: "shop9"
                },{
                    id: "402880f25f725fca015f7263b0ab05c1",
                    img: "shop10"
                }]
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .seller-items {
        .flex-block;
        .flex-wrap(wrap);
        width: 100%;
        border-left: @b_d1;
        border-top: @b_d1;
        .seller-img {
            display: block;
            width: 20%;
            height: 114px;
            border-right: @b_d1;
            border-bottom: @b_d1;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
