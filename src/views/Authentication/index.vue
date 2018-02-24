<template>
  <div class="ac-container">
      <div class="head">
          <div class="inner-1200">
              <span class="iconfont icon-ziyuan4"></span>
              <span class="tit">商户认证</span>
          </div>
      </div>
      <div class="step-bar">
          <div class="inner-1200">

          </div>
      </div>
      <div class="content">
          <div class="inner-1200">

          </div>
      </div>
  </div>
</template>

<style lang="less" scoped>
    @import url('../../assets/base.less');
    .inner-1200 {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
    }
   
    .ac-container{
        width: 100%;
        min-height: 100%;
        background-color: #edeef2;
        padding-bottom: 30px;
        .head{
            width: 100%;
            height: 100px;
            line-height: 100px;
            background-color: #fff;
            margin-bottom: 40px;
            .iconfont{
                font-size: 60px;
                color: @dark_blue;
            }
            .tit{
                position: relative;
                display: inline-block;
                vertical-align: bottom;
                font-size: 28px;
                color: @f_dark;
                top: -8px;
                left: 30px;
            }
        }

        .step-bar{
            width: 100%;
            height: 150px;
            margin-bottom: 30px;
            .inner-1200{
                background-color: #fff;
                .borderRadius;
                box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
            }
        }

        .content{
            width: 100%;
            .borderRadius;
            .inner-1200{
                background-color: #fff;
                min-height: 800px;
                .borderRadius;
                box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
            }
        }
    }
</style>



