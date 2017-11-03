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
        height: 340px;
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
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    
    .lem-container{
      float: left;
      width: 648px;
      height: 480px;
      background-color: #fff;
      .borderRadius;
    }

    .ranking-container{
      float: right;
      width: 648px;
      height: 480px;
      background-color: #fff;
      .borderRadius;
    }

    .swiper-bottom{
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
        <div>
          <div class="inner-title">推荐卖家</div>
          <div class="seller-items">
            <a class="seller-img" v-for="el in 10" :key="el">
              <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/2017/10/20/20171020110002049449.png">
            </a>
          </div>
        </div>
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
  </div>
</template>

<script>
  import swiperBanner from './parts/swiperBanner.vue'
  import qualityUnit from './parts/qualityHelper.vue'
  import dynamic from './parts/dynamic.vue'
  import lem from './parts/lem.vue'
  import ranking from './parts/ranking.vue'
  import todayPrice from './parts/todayPrice.vue'
  import swiperBottom from './parts/swiperBottom.vue'
  import publicFooter from '@/components/publicFooter.vue'
  export default {
    components: {
      swiperBanner,
      qualityUnit,
      dynamic,
      lem,
      ranking,
      todayPrice,
      swiperBottom,
      publicFooter
    }
  }
</script>



