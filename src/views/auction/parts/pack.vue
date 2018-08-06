<template>
    <div v-html="$parent.auction.auctionLob.packMessage != '' ? $parent.auction.auctionLob.packMessage : '暂无详情'"></div>
</template>
