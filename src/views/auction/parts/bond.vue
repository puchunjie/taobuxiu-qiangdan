<template>
    <div v-html="$parent.auction.auctionLob.moneyNotice != '' ? $parent.auction.auctionLob.moneyNotice : '暂无须知'"></div>
</template>
