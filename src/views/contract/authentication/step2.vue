<template>
  <div class="step-container">
    <p class="tip">
      <span class="iconfont icon-about"></span> 请将证件原件清晰拍照或彩色扫描上传，图片支持jpg/jpeg、png格式，图片大小建议在2M以下
    </p>
    <h2 class="sub-tit">上传 <a>无锡淘不锈电子商务有限公司</a> 工商营业执照</h2>
    <div class="upload-group">
      <uploadPic title="工商营业执照" v-model="apiData.businessLicense"></uploadPic>
      <sample desc="副本" style="margin-left:60px;"></sample>
    </div>
    <h2 class="sub-tit">上传认证负责人<a>彭澄</a>的身份证信息</h2>
    <div class="upload-group">
      <uploadPic title="身份证正面" v-model="apiData.legalPersonCardPhotoA"></uploadPic>
      <uploadPic title="身份证反面" v-model="apiData.legalPersonCardPhotoB"></uploadPic>
      <sample desc="副本" style="margin-left:60px;"></sample>
      <sample desc="副本"></sample>
    </div>
    <h2 class="sub-tit">上传认证负责人<a>彭澄</a>的企业饿授权书</h2>
    <div class="upload-group">
      <div style="margin-bottom:10px">
        <span style="color:red">*必须使用本品台提供的模板《企业应用电子合同认证授权书》，请您下载</span>
        <a class="in-btn" style="margin-left:10px" download :href="$api.aliClound+'contract/%E6%8E%88%E6%9D%83%E5%A7%94%E6%89%98%E4%B9%A6.pdf'">下载</a>
      </div>
  
      <uploadPic v-model="apiData.businessCertificate"></uploadPic>
      <sample desc="副本" style="margin-left:60px;"></sample>
    </div>
    <div style="text-align:right;">
      <a class="btn goast" @click="giveUp">放弃认证</a>
      <a class="btn" style="margin-left:20px" @click="submitData">提交认证</a>
    </div>
  </div>
</template>

<script>
  import uploadPic from './parts/uploadPic.vue'
  import sample from './parts/sample.vue'
  import map from 'lodash/map'
  import viewPic from '@/components/basics/viewPic/index.vue'
  export default {
    components: {
      uploadPic,
      sample,
      viewPic
    },
    data() {
      return {
        apiData: {
          businessCertificate: '',
          businessLicense: '',
          legalPersonCardPhotoA: '',
          legalPersonCardPhotoB: ''
        },
        isOver: false //是否是重新编辑
      }
    },
    computed: {
      isOk() {
        let ok = true;
        map(this.apiData, (v, k) => {
          ok = v != ''
        })
        return ok
      },
      type() {
        return this.$route.params.type
      }
    },
    methods: {
      submitData() {
        if (this.isOk) {
          let part1Data = this.$ls.get('rzInfo');
          let params = this.$clearData(Object.assign(this.apiData, part1Data));
          // 是否是重新认证
          let rzUrl = this.isOver ? this.$api.appContractAgain : this.$api.saveBaseInfo;
          this.$http.post(rzUrl, params).then(res => {
            if (res.code === 1000) {
              this.$Message.success('提交审核成功！');
              this.$router.replace({
                name: this.type == 1 ? 'BatStep3' : 'SatStep3'
              })
              this.$ls.remove('rzInfo');
            }
          })
        } else {
          this.$Message.error('请上传相关图片！')
        }
      },
      giveUp(){
        this.$Modal.confirm({
          title: '提示！',
          content: '是否要放弃认证？',
          onOk: () => {
            this.$router.replace({
              name: this.type == 1 ? 'BocAuthen' : 'SocAuthen',
              params: {
                type: this.type
              }
            })
          }
        })
      }
    },
    created () {
      let data = this.$ls.get('rzInfo');
      this.isOver = !!data && !!data.id;
      if(this.isOver){
        map(this.apiData,(v,k) => {
          this.apiData[k] = data[k]
        })
      }
    }
  }
</script>


<style lang="less" scoped>
  @import url('./index.less');
</style>
