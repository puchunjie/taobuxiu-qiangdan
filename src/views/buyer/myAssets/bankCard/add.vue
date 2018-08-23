<template>
  <div class="auction-container">
    <div class="auction-container-header">
      <span class="title">{{type === 1 ? '新增银行卡':'编辑银行卡'}}</span>
    </div>
    <div class="auction-container-main">
      <div class="card-form-main">
        <i-form :model="dataApi" :label-width="100" ref="cardForm" :rules="rules">
          <form-item label="客户性质：" prop="bankCardType">
            <i-radioGroup v-model="dataApi.bankCardType">
              <i-radio v-for="(item,i) in [{id:'1',name:'企业'},{id:'2',name:'个人'}]" :key="i" :label="item.id">
                <span>{{item.name}}</span>
              </i-radio>
            </i-radioGroup>
          </form-item>
          <form-item label="账户种类：" prop="accountType" v-if="isB">
            <i-select v-model="dataApi.accountType" style="width: 104px;">
              <i-option v-for="(item,i) in [{val: '1',label: '基本账户'},{val: '2',label: '一般账户'},{val: '3',label: '专用账户'},{val: '4',label: '临时账户'}]" :value="item.val" :key="i">{{item.label}}</i-option>
            </i-select>
          </form-item>
          <form-item :label="dataApi.bankCardType === '1' ? '公司抬头：':'户名：'" prop="userName">
            <i-input placeholder="请输入" :disabled="isB" v-model="dataApi.userName" style="width: 320px;"></i-input>
          </form-item>
          <!-- <form-item label="开户行名称：" prop="bankName">
              <i-input placeholder="请输入" v-model="dataApi.bankName" style="width: 320px;"></i-input>
            </form-item> -->
          <form-item label="银行账号：" prop="bankCardNo">
            <i-input placeholder="请输入" v-model="dataApi.bankCardNo" @on-blur="cardNum" style="width: 320px;"></i-input>
          </form-item>
          <form-item label="开户银行：" prop="bankName" v-if="dataApi.bankCardType === '1'">
            <i-input placeholder="请输入" v-model="dataApi.bankName" style="width: 320px;"></i-input>
          </form-item>
          <form-item label="开户银行：" prop="bank" v-if="dataApi.bankCardType === '2'">
            <i-input placeholder="请输入" disabled v-model="dataApi.bank" style="width: 140px;"></i-input>
            <i-input placeholder="请输入支行" v-model="dataApi.bankName" style="width: 160px;"></i-input>
          </form-item>
          <form-item label="开户行地址：" prop="bankProvince" :class="type === 2 ? 'form-placeholder':''">
            <citySelect :value="[dataApi.bankProvince,dataApi.bankCity,dataApi.bankArea]" @on-select="asyncAdress" style="width: 320px;"></citySelect>
          </form-item>
          <form-item label="账户币种：" prop="financeType">
            <i-radioGroup v-model="dataApi.financeType">
              <i-radio v-for="(item,i) in [{id:'1',name:'人民币'},{id:'2',name:'外币'}]" :key="i" :label="item.id">
                <span>{{item.name}}</span>
              </i-radio>
            </i-radioGroup>
          </form-item>
          <form-item>
            <div class="isdefault">
              <span class="iconfont" @click="defaults" :class="dataApi.isDefault ? 'icon-ziyuan3':'icon-ziyuan21'"></span>是否设为默认
            </div>
          </form-item>
          <div class="save-btn">
            <a class="btn" @click="saveCard('cardForm')">{{type === 1 ? '确定':'编辑'}}</a>
            <a class="btn default" @click="quitCard">取消</a>
          </div>
        </i-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import citySelect from '@/components/basics/citySelect/index'
  import {
    bankCardAttribution
  } from '@/utils/getBankName'
  export default {
    components: {
      citySelect
    },
    data() {
      return {
        type: 1,
        cardId: '',
        dataApi: {
          bankCardType: '1',
          userName: '',
          bank: '',
          bankProvince: '',
          bankCity: '',
          bankArea: '',
          bankName: '',
          bankCardNo: '',
          financeType: '1',
          isDefault: false,
          id: '',
          accountType: '1'
        },
        companyName: '',
        editItem: {},
        rules: {
          userName: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          bankName: [{
            required: true,
            message: '开户银行名称不能为空',
            trigger: 'blur'
          }],
          bank: [{
            required: true,
            message: '开户行名称不能为空',
            trigger: 'blur'
          }],
          bankCardNo: [{
            required: true,
            message: '银行账号不能为空',
            trigger: 'blur'
          }],
          bankProvince: [{
            required: true,
            message: '开户行地址不能为空',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (value != '') {
                callback();
              }
            }
          }],
          accountType: [{
            required: true,
            message: '请选择账户种类',
            trigger: 'change'
          }],
          bankCardType: [{
            required: true,
            message: '请选择账户类型',
            trigger: 'change'
          }],
          financeType: [{
            required: true,
            message: '请选择币种',
            trigger: 'change'
          }]
        }
      }
    },
    watch: {
      cardId(val) {
        if (val != 'undefined' && val != undefined) {
          this.getCard();
        } else {
          this.dataApi.userName = this.companyName;
        }
      },
      'dataApi.bankCardType' (val) {
        if (val === '2') {
          if (this.isEdit) {
            this.dataApi.userName = this.editItem.userName
          } else {
            this.dataApi.userName = '';
          }
        } else {
          this.dataApi.userName = this.companyName;
        }
      }
    },
    computed: {
      isB() {
        return this.dataApi.bankCardType === '1';
      },
      isEdit() {
        return this.$route.query.id != undefined
      },
      ...mapGetters(['user'])
    },
    methods: {
      getCard() {
        this.$http.post(this.$api.bankCardDetail, {
          id: this.cardId
        }).then(res => {
          if (res.code === 1000) {
            Object.assign(this.editItem, res.data)
            this.dataApi = {
              bankCardType: res.data.bankCardType,
              userName: res.data.userName,
              bank: res.data.bank,
              bankProvince: res.data.bankProvince,
              bankCity: res.data.bankCity,
              bankArea: res.data.bankArea,
              bankName: res.data.bankName,
              bankCardNo: res.data.bankCardNo,
              financeType: res.data.financeType,
              isDefault: res.data.isDefault,
              id: res.data.id,
              accountType: res.data.accountType
            }
          }
        })
      },
      defaults() {
        this.dataApi.isDefault = !this.dataApi.isDefault;
      },
      // 获取银行卡名称6217001210024455220
      cardNum(e) {
        if (this.dataApi.bankCardType === '2') {
          if (bankCardAttribution(e.target.value) === 'error') {
            this.$Message.error('请输入正确的银行卡号')
            this.dataApi.bank = '';
          } else {
            this.dataApi.bank = bankCardAttribution(e.target.value).bankName;
          }
        }
      },
      asyncAdress(data) {
        this.dataApi.bankProvince = data.provinceName;
        this.dataApi.bankCity = data.cityName;
        this.dataApi.bankArea = data.districtName;
      },
      saveCard(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.dataApi);
            this.$http.post(this.$api.bankCardSave, params).then(res => {
              if (res.code === 1000) {
                this.$router.push({
                  name: 'bankCard'
                })
              } else {
                this.$Message.error(res.message)
              }
            })
          } else {
            this.$Message.error('表单验证失败')
          }
        })
      },
      quitCard() {
        this.$router.go(-1)
      }
    },
    created() {
      this.type = this.$route.query.type;
      this.cardId = this.$route.query.id;
      this.companyName = this.user.companyName;
    }
  }
</script>

<style lang="less" scoped>
  @import url('../../../../assets/base.less');
  .auction-container {
    background-color: #fff;
    .auction-container-header {
      position: relative;
      border-bottom: 1px solid @back_gray;
      padding: 15px;
      .title {
        font-size: 16px;
        color: @f_dark;
        font-weight: bold;
      }
    }
    .auction-container-main {
      .card-form-main {
        padding: 40px;
        .isdefault {
          font-size: 14px;
          color: #666;
          .iconfont {
            font-size: 14px;
            margin-right: 5px;
            color: #D9D9D9;
            cursor: pointer;
            &.icon-ziyuan3 {
              color: @dark_blue;
            }
          }
        }
        .save-btn {
          padding-left: 80px;
          .btn {
            margin-right: 10px;
          }
        }
        .btn {
          display: inline-block;
          vertical-align: middle;
          width: 90px;
          height: 32px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          background-color: @dark_blue;
          border: 1px solid @dark_blue;
          &.default {
            background-color: #fff;
            color: @f_ligth;
            border-color: @back_gray;
          }
          &.batch {
            &:hover {
              border: 1px solid @dark_blue;
              color: @dark_blue;
            }
          }
        }
      }
    }
  }
  
  .form-placeholder {
     ::-webkit-input-placeholder {
      color: #666;
    }
     :-moz-placeholder {
      color: #666;
    }
     ::-moz-placeholder {
      color: #666;
    }
     :-ms-input-placeholder {
      color: #666;
    }
  }
</style>