<template>
    <div class="inner-container auction-detail">
        <div class="links">
            <router-link tag="span" :to="{ name: 'index' }">首页</router-link>>
            <router-link tag="span" :to="{ name: 'auction' }">拍卖中心</router-link>> 拍卖详情
        </div>
    
        <div class="top-part clearfix">
            <offerRecord :id="id"></offerRecord>
            <detailBase :data="auction" :info="auctionInfo"></detailBase>
            <auctioning :base="auction" :data="auctionInfo" :isDeposit="isDeposit"></auctioning>
        </div>
        <process></process>

        <!-- <div class="pay-deposit">
            
        </div> -->
    </div>
</template>

<script>
    import process from './parts/process.vue'
    import detailBase from './parts/detalBase.vue'
    import auctioning from './parts/auctioning.vue'
    import offerRecord from './parts/offerRecord.vue'
    export default {
        components:{
            process,
            detailBase,
            auctioning,
            offerRecord
        },
        data() {
            return {
                auction: {},
                auctionInfo: {},
                isDeposit: false,//是否需要支付保证金
            }
        },
        computed: {
            id() {
                return this.$route.params.id
            }
        },
        methods: {
            getDetail() {
                this.$http.post(this.$api.findAuction, {
                    auctionInfoId: this.id
                }).then(res => {
                    if (res.code === 1000) {
                        this.auction = res.data.auction;
                        this.auctionInfo = res.data.auctionInfo;
                        this.isDeposit = res.data.isDeposit;
                    }
                })
            }
        },
        created() {
            this.getDetail();
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/base.less');
    .auction-detail {
        margin-top: 24px;
        .links {
            color: @f_ligth;
            font-size: 12px;
            span {
                cursor: pointer;
                &:hover {
                    color: @dark_blue;
                }
            }
        }
        .top-part {
            width: 100%;
            & > div {
                float: left;
            }
        }


        .pay-deposit{
            position: fixed;
            width: 520px;
            height: 550px;
            top: 100px;
            background-color: #fff;
        }
    }
</style>


