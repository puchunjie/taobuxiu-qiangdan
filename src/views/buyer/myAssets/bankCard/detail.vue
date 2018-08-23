<template>
  <div class="auction-container">
    <div class="auction-container-header">
      <span class="title">银行卡详情</span>
      <div class="header-slot">
        <div class="card-options">
          <a @click="changeDefault(item)">{{item.isDefault ? '取消默认':'设为默认'}}</a>
          <a @click="editCard(item)"><span class="iconfont icon-bianji"></span>编辑</a>
          <a @click="deleteCard(item)"><span class="iconfont icon-icon--delete"></span>删除</a>
        </div>
      </div>
    </div>
    <div class="auction-container-main">
      <div class="card-form-main">
        <i-form :label-width="100">
          <form-item label="客户性质：">
            {{item.bankCardType === '1' ? '企业':'个人'}}
          </form-item>
          <form-item label="账户种类：" v-if="item.bankCardType === '1'">
            {{item.accountType | cardType}}
          </form-item>
          <form-item :label="item.bankCardType === '1' ? '公司抬头：':'开户人姓名：'">
            {{item.userName}}
          </form-item>
          <form-item label="开户行名称：">
            {{item.bankName}}
          </form-item>
          <form-item label="开户银行：">
            {{item.bank}}
          </form-item>
          <form-item label="银行账号：">
            {{item.bankCardNo}}
          </form-item>
          <form-item label="开户行地址：">
            {{item.bankProvince}}{{item.bankCity}}{{item.bankArea}}
          </form-item>
          <form-item label="货币种类：">
            {{item.financeType === '1' ? '人民币':'外币'}}
          </form-item>
          <form-item label="默认账户：">
            {{item.isDefault ? '是':'否'}}
          </form-item>
          <form-item label="创建时间：">
            {{item.createTime | dateformat}}
          </form-item>
          <form-item label="更新时间：">
            {{item.updateTime | dateformat}}
          </form-item>
        </i-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {}
      }
    },
    computed: {
      id() {
        return this.$route.query.id;
      }
    },
    filters: {
      cardType(val) {
        return ['基本账户', '一般账户', '专用账户', '临时账户'][val * 1 - 1]
      }
    },
    methods: {
      getData() {
        this.$http.post(this.$api.bankCardDetail, {
          id: this.id
        }).then(res => {
          if (res.code === 1000) {
            this.item = Object.assign({}, res.data)
          }
        })
      },
      // 设置取消默认
      changeDefault(item) {
        this.$Modal.confirm({
          title: item.isDefault ? '取消默认' : '设置默认',
          content: item.isDefault ? '确认取消默认银行卡？' : '确认设置为默认银行卡？',
          onOk: () => {
            let params = {
              id: item.id
            }
            this.$http.post(this.$api.bankCardchangeDefault, params).then(res => {
              if (res.code === 1000) {
                this.$Message.success('设置成功');
                this.getData()
              } else {
                this.$Message.error(res.message)
              }
            })
          }
        });
      },
      deleteCard(item) {
        this.$Modal.confirm({
          title: '删除提示',
          content: '确认删除该银行卡？',
          onOk: () => {
            let params = {
              id: item.id
            }
            this.$http.post(this.$api.bankCardDelete, params).then(res => {
              if (res.code === 1000) {
                this.$Message.success('删除成功');
                this.$router.push({
                  name: 'bankCard'
                })
              } else {
                this.$Message.error(res.message)
              }
            })
          }
        });
      },
      editCard(item) {
        this.$router.push({
          name: 'addCard',
          query: {
            type: 2,
            id: item.id
          }
        })
      }
    },
    created() {
      this.getData();
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
      .header-slot {
        position: absolute;
        right: 15px;
        top: 10px;
      }
      .card-options {
        padding-top: 7px;
        a {
          color: #666;
          display: inline-block;
          margin: 0 5px;
          .iconfont {
            font-size: 14px;
            margin-right: 4px;
          }
          &:hover {
            color: @dark_blue;
          }
          &:active{
            color: @dark_red;
          }
        }
      }
    }
    .auction-container-main {
      .card-form-main {
        padding: 40px;
        .ivu-form-item {
          color: #666;
          .ivu-form-item-label {
            font-size: 14px;
          }
          .ivu-form-item-content {
            font-size: 14px;
          }
        }
      }
    }
  }
</style>