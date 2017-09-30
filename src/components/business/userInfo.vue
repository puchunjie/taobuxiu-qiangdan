<template>
  <div class="user-info">
      <h3 class="name">无锡淘不锈电子商务有限公司</h3>
      <p>求购活跃度：</p>
      <p>
          <span class="iconfont icon-qq"></span>韩梅梅
          <span class="iconfont icon-qq"></span>18537592746
          <span class="iconfont icon-qq"></span>18537592746
      </p>

    <a class="btn">修改资料</a>
  </div>
</template>

<style lang="less" scoped>
    @import '../../assets/base.less';

    .user-info{
        position: relative;
        width: 100%;
        background-color: #fff;
        padding: 20px;
        margin-bottom: 15px;
        border: @b_d1;
        .borderRadius;
        .name{
            font-size: 20px;
            font-weight: bold;
            color: @f_dark;
        }
        p{
            margin-top: 10px;
            line-height: 20px;
            color: @f_goast;
            .iconfont{
                margin-right: 10px;
                &+.iconfont{
                    margin-left: 80px;
                }
            }
        }

        .btn{
            position: absolute;
            right: 20px;
            top: 20px;
            height: 30px;
            line-height: 30px;
            padding: 0 12px;
            text-align: center;
            color: @mask_blue;
            border: 1px solid @mask_blue;
            .borderRadius;
        }
    }
</style>

