<template>
  <div class="auction-container">
    <div class="auction-container-header">
      <span class="title">银行卡管理</span>
      <div class="header-slot">
        <div class="card-search">
          <i-input placeholder="搜索卡号或户主姓名" v-model="pageApi.userName" style="width: 240px;" icon="ios-search" @on-blur="onSearch"></i-input>
        </div>
      </div>
    </div>
    <div class="auction-container-main">
      <div class="card-list clearfix">
        <div class="card-list-item" v-for="(item,i) in list" :key="i" :class="item.bankCardType === '1' ? 'business':'person'" @click="goDetail(item)">
          <div class="card-list-inner">
            <div class="card-name">
              <div class="card-type">
                <span>{{item.bankCardType == '1'? '企业':'个人'}}</span>
                <span class="point"></span>
                <span v-if="item.bankCardType == '1'">{{item.accountType | cardType}}</span>
                <span v-if="item.bankCardType == '2'">{{item.userName}}</span>
              </div>
              <span class="name">{{item.bank}}</span>
            </div>
            <div class="card-num">
              {{item.bankCardNo | numSpace}}
            </div>
          </div>
          <div class="card-able">
            <span v-if="item.isDefault">默认账户</span>
            <span v-else>{{item.status === '1' ? '有效':''}}</span>
          </div>
          <div class="card-edit">
            <div class="edit">
              <a class="iconfont icon-bianji" @click.stop="editCard(item)"></a>
              <a class="iconfont icon-icon--delete" @click.stop="deleteCard(item)"></a>
            </div>
            <a @click.stop="changeDefault(item)">{{item.isDefault ? '取消默认账户':'设为默认账户'}}</a>
          </div>
          <div class="cover"></div>
        </div>
        <div class="card-list-item add" @click="goAdd">
          <div class="add-btn">
            <div class="icon-plus-circle-o iconfont"></div>
            <div>添加新卡</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageApi: {
          currentPage: 1,
          pageSize: 30,
          bankCardType: '',
          bankCardNo: '',
          userName: ''
        },
        list: []
      }
    },
    filters: {
      cardType(val) {
        return ['基本账户', '一般账户', '专用账户', '临时账户'][val * 1 - 1]
      },
      numSpace(val) {
        if (/\S{5}/.test(val)) {
          return val.replace(/(\d{4})(?=\d)/g, "$1  ");
        }
      }
    },
    methods: {
      getList(params) {
        this.$http.post(this.$api.bankCardPage, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.data;
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
                this.getList(this.pageApi)
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
                this.getList(this.pageApi)
              } else {
                this.$Message.error(res.message)
              }
            })
          }
        });
      },
      onSearch() {
        this.getList(this.pageApi)
      },
      goAdd() {
        this.$router.push({
          name: 'addCard',
          query: {
            type: 1
          }
        })
      },
      editCard(item) {
        this.$router.push({
          name: 'addCard',
          query: {
            type: 2,
            id: item.id
          }
        })
      },
      goDetail(item) {
        this.$router.push({
          name: 'bankDetail',
          query: {
            id: item.id
          }
        })
      }
    },
    created() {
      this.getList(this.pageApi)
    }
  }
</script>

<style lang='less'>
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
    }
    .auction-container-main {
      overflow: hidden;
      .card-list {
        padding: 40px;
        margin-right: -32px;
        .card-list-item {
          position: relative;
          float: left;
          width: 336px;
          height: 176px;
          border-radius: 8px;
          margin-right: 32px;
          margin-bottom: 32px;
          padding: 16px 26px;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
          a {
            color: #fff;
          }
          .card-list-inner {
            position: relative;
            height: 100%;
            .card-name {
              .card-type {
                float: right;
              }
              .point {
                display: inline-block;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: #fff;
                vertical-align: middle;
                margin: 0 8px;
              }
              .name {
                font-size: 16px;
              }
            }
            .card-num {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 20px;
              width: 100%;
            }
          }
          &.business {
            background: linear-gradient(-180deg, rgba(41, 129, 235, 1), rgba(114, 201, 255, 1));
          }
          &.person {
            background: linear-gradient(-180deg, rgba(255, 95, 109, 1), rgba(255, 195, 113, 1));
          }
          .cover {
            width: 276px;
            height: 128px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: url('../../../../assets/card-bg.png') no-repeat;
          }
          &.add {
            background: #f7f7f7;
            border: 1px solid @back_gray;
            text-align: center;
            color: @f_goast;
            box-shadow: none;
            .add-btn {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              .iconfont {
                font-size: 48px;
                margin-bottom: 8px;
              }
            }
          }
          .card-able {
            position: absolute;
            bottom: 16px;
            left: 26px;
            right: 26px;
            font-size: 14px;
          }
          .card-edit {
            display: none;
            position: absolute;
            bottom: 16px;
            left: 26px;
            right: 26px;
            font-size: 14px;
            .edit {
              float: right;
              .iconfont {
                font-size: 14px;
                margin-left: 10px;
              }
            }
          }
          &:hover {
            .card-edit {
              display: block;
            }
            .card-able {
              display: none;
            }
          }
        }
      }
    }
  }
</style>