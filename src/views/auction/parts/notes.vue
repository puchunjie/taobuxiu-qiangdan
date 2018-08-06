<template>
    <div v-html="$parent.auction.auctionLob.priceNotice != '' ? $parent.auction.auctionLob.priceNotice : '暂无内容'"></div>
</template>
