<template>
    <div v-html="$parent.auction.auctionLob.introduction != '' ? $parent.auction.auctionLob.introduction : '暂无介绍'"></div>
</template>
