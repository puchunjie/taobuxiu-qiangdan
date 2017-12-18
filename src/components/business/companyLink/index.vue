<template>
    <router-link class="company-link" v-if="hasShop == 1" :to="`/shop-${userId}/iron-1`">
        <slot></slot>
    </router-link>
    <span v-else><slot></slot></span>
</template>

<script>
    export default {
        props: {
            userId: String,
            hasShop: {
                type: [String,Number],
                default: 0
            }
        }
    }
</script>

<style lang="less">
    .company-link {
        color: #000;
        &:hover {
            color: #3389FF;
            text-decoration: underline;
        }
    }
</style>

