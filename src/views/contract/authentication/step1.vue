<template>
  <div class="authen-container">
    <innerTitle>认证信息</innerTitle>
    <div class="at-main">
      <step></step>
  
      <div class="step-container">
        <p class="tip">
          <span class="iconfont icon-about"></span> 请您确认以下主体信息的准确性，如不准确，请尽快完成变更；如遇问题，请联系平台客服：0510-81812186
        </p>
        <div class="form">
          <h2 class="sub-tit">填写企业主体信息</h2>
          <div class="group">
            <div class="label"><span class="required">*</span>企业抬头</div>
            <div class="value">
              <p class="input-disable">{{ user.companyName }}</p>
            </div>
          </div>
          <div class="group">
            <div class="label"><span class="required">*</span>主体类型</div>
            <div class="value">
              <p class="input-disable">企业</p>
            </div>
          </div>
          <div class="group">
            <div class="label"><span class="required">*</span>主体认证证件类型</div>
            <div class="value">
              <tbSelect :data='idTypes' v-model="apiData.certifyType"></tbSelect>
            </div>
          </div>
          <div class="group">
            <div class="label"><span class="required">*</span>主体证件号码</div>
            <div class="value">
              <tbInput validate v-model="apiData.certifyNumber" placeholder="请输入主体证件号码"></tbInput>
            </div>
          </div>
          <div class="group">
            <div class="label"><span class="required">*</span>主体所属区域</div>
            <div class="value">
              <cityPicter placeholder="请选择省市区信息" v-model="locaiton"></cityPicter>
            </div>
          </div>
          <div class="group">
            <div class="label">主体通讯地址</div>
            <div class="value">
              <tbInput v-model="apiData.address" placeholder="请输入详细通讯地址"></tbInput>
            </div>
          </div>
        </div>
  
        <div class="form person">
          <h2 class="sub-tit">填写企业主体信息</h2>
          <div class="group">
            <div class="label"><span class="required">*</span>认证负责人姓名</div>
            <div class="value">
              <tbInput validate v-model="apiData.legalPersonName" placeholder="请输入认证负责人姓名"></tbInput>
            </div>
          </div>
          <div class="group">
            <div class="label"><span class="required">*</span>主体类型</div>
            <div class="value">
              <tbSelect :data='pIdTypes' v-model="apiData.legalPersonCertifyType"></tbSelect>
            </div>
          </div>
          <div class="group">
            <div class="label"><span class="required">*</span>负责人证件号</div>
            <div class="value">
              <tbInput validate v-model="apiData.legalPersonCardId" placeholder="请输入负责人证件号"></tbInput>
            </div>
          </div>
          <div class="group">
            <div class="label"><span class="required">*</span>负责人手机号</div>
            <div class="value">
              <tbInput validate v-model="apiData.legalPersonMobile" placeholder="请输入手机号码"></tbInput>
            </div>
          </div>
          <div class="group">
            <div class="label"><span class="required">*</span>短信验证码</div>
            <div class="value">
              <tbInput validate style="width:180px" v-model="apiData.smsCode" placeholder="请输入短信验证码"></tbInput>
              <getCode :apiUrl="$api.getSmsCode" :mobile="apiData.legalPersonMobile" @on-success="codeSend = true">
                <a class="get-code">获取短信验证码</a>
              </getCode>
            </div>
          </div>
          <a class="btn" style="margin-left:180px" @click="goNext">下一步</a>
          <a class="btn goast" @click="giveUp">放弃认证</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import {
    mapGetters
  } from 'vuex'
  import step from './parts/step.vue'
  import innerTitle from '@/components/business/innerTitle.vue'
  import tbSelect from '@/components/business/tbSelect/index'
  import tbInput from '@/components/business/tbInput/index'
  import cityPicter from '@/components/business/cityPicker/index'
  import getCode from '@/components/business/getCode/index'
  import map from 'lodash/map'
  export default {
    components: {
      tbSelect,
      tbInput,
      cityPicter,
      getCode,
      step,
      innerTitle
    },
    data() {
      return {
        isOver: false,
        codeSend: false,
        idTypes: [{
          label: "营业执照",
          value: "4"
        }, {
          label: "组织机构代码证",
          value: "5"
        }, {
          label: "社会统一信用代码",
          value: "6"
        }],
        pIdTypes: [{
          label: '身份证',
          value: '1'
        }],
        apiData: {
          companyName: '',
          userType: '2',
          certifyType: '',
          certifyNumber: '',
          locationId: '',
          locationName: '',
          address: '',
          legalPersonName: '',
          legalPersonCertifyType: '',
          legalPersonCardId: '',
          legalPersonMobile: '',
          smsCode: ''
        },
        locaiton: {
          id: '',
          name: ''
        }
      }
    },
    computed: {
      ...mapGetters(['user', 'ajaxHead']),
      ajaxParams() {
        let params = this.$clearData(this.apiData);
        params.companyName = this.user.companyName;
        params.locationId = this.locaiton.id;
        params.locationName = this.locaiton.name;
        return params
      },
      isOk() {
        let ok = true;
        map(this.ajaxParams, (v, k) => {
          ok = v != '' || k == 'address'
        })
        return ok
      },
      type() {
        return this.$route.params.type
      },
      status() {
        return this.$route.params.status
      }
    },
    methods: {
      giveUp() {
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
      },
      // 保存商户信息到本地去，然后去下一步
      saveBaseInfo() {
        let data = this.$clearData(this.ajaxParams);
        data.v = this.ajaxHead.loginId;
        this.$ls.set('rzInfo', data);
      },
      goNext() {
        if (this.isOk && this.codeSend) {
          let params = this.$clearData(this.ajaxParams);;
          let rzUrl = this.isOver ? this.$api.appContractAgain : this.$api.saveBaseInfo;
          this.$http.post(rzUrl, params).then(res => {
            if (res.code === 1000) {
              this.$router.push({
                name: this.type == 1 ? 'BatStep2' : 'SatStep2',
                params: {
                  type: this.type,
                  status: this.status
                }
              })
            } else {
              this.$Message.error(res.message)
            }
          })
        } else {
          this.$Message.error(this.isOk ? '请发送验证码验证手机号！' : '请将带星号的栏目正确填写完整！')
        }
      },
      // 查看是否有历史填写记录，如果有就填充
      getHistory() {
        let data = this.$ls.get('rzInfo');
        if (data && data.v == this.ajaxHead.loginId) {
          data.smsCode = '';
          this.apiData = data;
          this.locaiton.id = data.locationId;
          this.locaiton.name = data.locationName;
        } else {
          this.$ls.remove('rzInfo');
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      this.saveBaseInfo();
      next();
      // if (to.name != 'SatStep2' && to.name != 'BatStep2') {
      //   this.$Modal.confirm({
      //     title: '提示！',
      //     content: '离开页面将丢失您填写的信息，是否继续离开？',
      //     onOk() {
      //       next();
      //     }
      //   })
      // } else {
      //   next();
      // }
    },
    created() {
      this.getHistory();
      this.isOver = this.status == 9;
    }
  }
</script>


<style lang="less" scoped>
  @import url('./index.less');
</style>


