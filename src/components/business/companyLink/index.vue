<template>
    <div class="company-link-container">
        <template v-if="hasShop == 1">
            <router-link class="company-link" :to="`/shop-${userId}/iron-1`">
                <slot></slot>
                <span class="iconfont icon-dian"></span>
            </router-link>
        </template>
        
        <span v-else><slot></slot></span>
    </div>
</template>

<script>
    export default {
        props: {
            userId: String,
            hasShop: {
                type: [String, Number],
                default: 0
            }
        }
    }
</script>

<style lang="less">
    .company-link-container{
        display: inline;
    }
    .company-link {
        color: #000;
        &:hover {
            color: #3389FF;
            text-decoration: underline;
        }
        .iconfont{
            color: #FF5555;
        }
    }
</style>

