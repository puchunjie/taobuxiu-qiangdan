<template>
   <div class="authen-container">
    <innerTitle>认证信息</innerTitle>
    <div class="at-main">
      <step nowSetp="3"></step>
      <div class="success-div">
    <p class="icon"><span class="iconfont icon-CombinedShape"></span></p>
    <p class="text">认证信息提交成功，将在1个工作日内完成审核，请耐心等待</p>
    <p>
      <router-link class="btn" :to="{ name: type == 1 ? 'BocAuthen' : 'SocAuthen',params:{type:type,isAjax: true}}">确定</router-link>
    </p>
  </div>
    </div>
  </div>
  
</template>


<script>
  import step from './parts/step.vue'
  import innerTitle from '@/components/business/innerTitle.vue'
  export default {
    components: {
      step,
      innerTitle
    },
    computed: {
      type() {
        return this.$route.params.type
      }
    }
  }
</script>


<style lang="less" scoped>
  @import url('./index.less');
  .success-div {
    text-align: center;
    .icon {
      margin-top: 130px;
    }
    .iconfont {
      font-size: 80px;
      color: @dark_green;
    }
    .text {
      color: @dark_green;
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
    }
  }
</style>
