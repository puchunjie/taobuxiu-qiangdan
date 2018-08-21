<style lang="less" scoped>
  @import '../../assets/base.less';
  .index-container {
    .full-group {
      width: 100%;
      padding-bottom: 24px;
      &.floor1 {
        padding-top: 24px;
        background-color: #fff;
      }
      &.floor2 {
        height: 1215px;
      }
      &.floor3 {
        height: 600px;
        background-color: #455D9E;
      }
      &.floor4 {
        background-color: #3E3C3A;
      }
    }
    .swiper-banner {
      position: relative;
      width: 984px;
      height: 422px;
      background-color: #ddd;
      float: left;
    }
    .quality-unit {
      position: relative;
      width: 310px;
      height: 422px;
      border: @b_d1;
      float: right;
      .borderRadius;
    }
    
    .lem-container {
      float: left;
      width: 648px;
      height: 480px;
      background-color: #fff;
      .borderRadius;
    }
    .ranking-container {
      float: right;
      width: 648px;
      height: 480px;
      background-color: #fff;
      .borderRadius;
    }
    .swiper-bottom {
      width: 100%;
      height: 100%;
    }
  }
</style>


<template>
  <div class="index-container">
    <div class="full-group floor1">
      <div class="inner-container">
        <div class="clearfix">
          <swiperBanner class="swiper-banner"></swiperBanner>
          <qualityUnit class="quality-unit"></qualityUnit>
        </div>
        <reSeller></reSeller>
      </div>
    </div>
    <div class="full-group floor2">
      <div class="inner-container">
        <dynamic></dynamic>
        <div class="clearfix">
          <lem class="lem-container"></lem>
          <ranking class="ranking-container"></ranking>
        </div>
      
        <todayPrice></todayPrice>
      </div>
    </div>
    <div class="full-group floor3">
      <div class="inner-container">
        <swiperBottom class="swiper-bottom"></swiperBottom>
      </div>
    </div>
    <div class="full-group floor4">
      <div class="inner-container">
        <publicFooter></publicFooter>
      </div>
    </div>

    <quickNvigation></quickNvigation>

    <asideAd position="left" :vals="adList[0]"></asideAd>
    <asideAd position="right":vals="adList[1]"></asideAd>
    <bottomAd :openVal="adList[3]" :closeVal="adList[2]"></bottomAd>
  </div>
</template>

<script>
  import swiperBanner from './parts/swiperBanner.vue'
  import qualityUnit from './parts/qualityHelper.vue'
  import dynamic from './parts/dynamic.vue'
  import reSeller from './parts/recommendSeller.vue'
  import lem from './parts/lem.vue'
  import ranking from './parts/ranking.vue'
  import todayPrice from './parts/todayPrice.vue'
  import swiperBottom from './parts/swiperBottom.vue'
  import publicFooter from '@/components/publicFooter.vue'
  import quickNvigation from '@/components/quickNvigation.vue'
  import bottomAd from '@/views/index/parts/bottomAd.vue'
  import asideAd from '@/views/index/parts/asideAd.vue'

  export default {
    components: {
      swiperBanner,
      qualityUnit,
      dynamic,
      reSeller,
      lem,
      ranking,
      todayPrice,
      swiperBottom,
      publicFooter,
      quickNvigation,
      bottomAd,
      asideAd
    },
    data(){
      return {
        adList: []
      }
    },
    methods:{
      getData(){
        this.$http.post(this.$api.getHomeAdv).then( res =>{
          if(res.code === 1000){
            this.adList = res.data;
          }
        })
      }
    },
    created(){
      this.getData();
    }
  }
</script>



