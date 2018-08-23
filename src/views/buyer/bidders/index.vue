<template>
  <div class="auction-container">
    <div class="auction-container-header">
      <span class="title">我的竞拍</span>
      <div class="header-slot">
        <a class="default btn" @click="goAuction">去逛逛拍卖</a>
      </div>
    </div>
    <div class="auction-container-main">
      <div class="tabs-bar">
        <tabBar v-model="pageApi.status" :tabData="tabs"></tabBar>
        <div class="total-list">共<span>{{totalCount}}</span>条数据</div>
      </div>
      <div class="auction-container-list">
        <div class="table-list">
          <div class="table-list-header clearfix">
            <div class="header-item">货品详情</div>
            <div class="header-item">产地</div>
            <div class="header-item">总量(kg)</div>
            <div class="header-item">当前价</div>
            <div class="header-item">起拍价</div>
            <div class="header-item">保证金</div>
            <div class="header-item">操作</div>
          </div>
          <div class="table-list-main">
            <div class="table-list-main-item" v-for="(item,i) in list" :key="i">
              <div class="main-item-header">
                <span class="item">场次编号：{{item.auctionId}}</span>
                <span class="item">创建时间：{{item.createTime | dateformat('yyyy-MM-dd hh:mm:ss')}}</span>
                <div class="header-solt" v-if="pageApi.status === '1'">
                  <span><i class="circle" :class="item.first ? 'green':'red'"></i>{{item.first ? '领先':'落后'}}</span>
                </div>
                <div class="header-solt" v-if="pageApi.status === '2'">
                  <span class="item">成交时间：{{item.updateTime | dateformat('yyyy-MM-dd hh:mm:ss')}}</span>
                </div>
              </div>
              <div class="main-item-wrap clearfix">
                <div class="header-item">
                  <span class="description" @click="goDetail(item)">{{item.description}}</span>
                </div>
                <div class="header-item">{{item.proPlace}}</div>
                <div class="header-item">{{item.weight}}kg</div>
                <div class="header-item">
                  <span v-if="pageApi.status === '1'" class="currentMoney red">{{item.currentMoney}}元/kg</span>
                  <span v-if="pageApi.status === '2'" class="currentMoney green">{{item.currentMoney}}元/kg</span>
                  <span v-if="pageApi.status === '3'" class="currentMoney">{{item.currentMoney}}元/kg</span>
                </div>
                <div class="header-item">{{item.startPrice}}元/kg</div>
                <div class="header-item">￥{{item.maigin}}</div>
                <div class="header-item">
                  <div v-if="pageApi.status === '1'" class="options" @click="priceHistory(item)"><a>查看出价</a></div>
                  <div v-if="pageApi.status != '1'" class="options"><a @click="goDetail(item)">详情</a><span class="split">|</span><a @click="priceHistory(item)">查看出价</a></div>
                </div>
              </div>
            </div>
            <div class="nodata" v-if="list.length === 0">
              <img src="../../../assets/Group@3x.png" style="width:166px;">
            </div>
            <Page class="page-count" show-total show-elevator show-sizer :current="pageApi.currentPage" :total="totalCount" :page-size="pageApi.pageSize" @on-page-size-change="changeSize" size="small" @on-change="pageChange"></Page>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="show" title="出价记录" width="580">
      <div class="price-content">
        <div class="price-header">
          <div class="price-item price-item1">状态</div>
          <div class="price-item price-item2">出价</div>
          <div class="price-item price-item3">时间</div>
        </div>
        <div class="price-list-main">
          <div class="price-list" v-for="(item,i) in priceList" :key="i">
            <div class="price-list-item price-list-item1">
              <span class="status" :class="i=== 0 ? 'current':''">{{i=== 0 ? '领先':'出局'}}</span>
              <span v-show="item.createUserId == user.userId" class="my">我的</span>
            </div>
            <div class="price-list-item price-list-item2">{{item.price}}</div>
            <div class="price-list-item price-list-item3">{{item.updateTime | dateformat('yyyy-MM-dd hh:mm:ss')}}</div>
          </div>
          <div v-if="priceList.length == 0" class="noData">暂无出价记录</div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="show = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import tabBar from './parts/tabs'
  export default {
    components: {
      tabBar
    },
    data() {
      return {
        pageApi: {
          currentPage: 1,
          pageSize: 10,
          status: '1'
        },
        list: [],
        totalCount: 0,
        tabs: [{
          id: '1',
          name: '参与中'
        }, {
          id: '2',
          name: '已获拍'
        }, {
          id: '3',
          name: '未获拍'
        }],
        priceList: [],
        show: false
      }
    },
    computed: {
      ...mapGetters(['user']),
      status() {
        return this.$route.query.status || 1
      }
    },
    watch: {
      'pageApi.status' (val) {
        // this.$route.query.status = val
        this.$router.push({
          query: {
            status: val
          }
        })
        // this.pageApi.status = val;
        // this.getList(this.pageApi)
      },
      'status' (val) {
        this.pageApi.status = val.toString();
        this.getList(this.pageApi)
      }
    },
    methods: {
      getList(params) {
        this.$http.post(this.$api.findMyAuction, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            this.totalCount = res.data.totalCount
          }
        })
      },
      changeSize(size) {
        this.pageApi.pageSize = size;
        this.getList(this.pageApi)
      },
      pageChange(page) {
        this.pageApi.currentPage = page;
        this.getList(this.pageApi)
      },
      //  出价记录
      priceHistory(item) {
        this.show = true;
        let params = {
          auctionInfoId: item.auctionInfoId,
          currentPage: 1,
          pageSize: 99
        }
        this.$http.post(this.$api.findOfferAuction, params).then(res => {
          if (res.code === 1000) {
            this.priceList = res.data.list;
          }
        })
      },
      goDetail(item) {
        let {
          href
        } = this.$router.resolve({
          name: "auctionDetail",
          params: {
            id: item.auctionInfoId,
          }
        });
        window.open(href, '_blank');
      },
      goAuction() {
        this.$router.push({
          name: 'auction'
        })
      }
    },
    created() {
      this.pageApi.status = this.status.toString();
      this.getList(this.pageApi)
    }
  }
</script>

<style lang='less'>
  @import url("../../../assets/base.less");
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
      padding: 15px;
      .tabs-bar {
        position: relative;
        margin-top: -15px;
        .total-list {
          position: absolute;
          right: 0;
          top: 16px;
          color: @f_ligth;
          font-size: 12px;
          span {
            color: @dark_blue;
          }
        }
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
    }
    .table-list {
      .table-list-header {
        .header-item {
          float: left;
          width: 10%;
          padding: 16px;
          &:first-child {
            width: 35%;
          }
          &:last-child {
            width: 15%;
          }
        }
      }
      .table-list-main {
        position: relative;
        padding-bottom: 40px;
        .table-list-main-item {
          margin-bottom: 16px;
          border: 1px solid @back_gray;
          &:last-child {
            margin-bottom: 0;
          }
          .main-item-header {
            height: 40px;
            line-height: 40px;
            position: relative;
            background-color: #fafafa;
            border-bottom: 1px solid @back_gray;
            padding: 0 15px;
            .header-solt {
              position: absolute;
              right: 15px;
              top: 0;
              color: @f_dark;
              .circle {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin-right: 8px;
                vertical-align: middle;
                &.red {
                  background-color: @dark_red
                }
                &.green {
                  background-color: #52C41A;
                }
              }
            }
            .item {
              color: @f_goast;
              font-size: 12px;
              display: inline-block;
              margin-right: 40px;
            }
          }
          .main-item-wrap {
            height: 52px;
            line-height: 52px;
            overflow: hidden;
            .header-item {
              float: left;
              width: 10%;
              padding: 0 16px;
              .description {
                &:hover {
                  color: @dark_blue;
                  cursor: pointer;
                }
              }
              .options {
                a {
                  font-size: 14px;
                  color: @dark_blue;
                }
                .split {
                  color: rgba(0, 0, 0, .09);
                  display: inline-block;
                  margin: 0 5px;
                }
              }
              &:first-child {
                width: 35%;
              }
              &:last-child {
                width: 15%;
              }
            }
            .currentMoney {
              &.red {
                color: @dark_red;
              }
              &.green {
                color: @dark_green;
              }
            }
          }
        }
      }
      .page-count {
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .nodata {
        text-align: center;
        padding: 20px 0;
      }
    }
  }
  
  .price-content {
    .price-header {
      height: 52px;
      line-height: 52px;
      background-color: #fafafa;
      color: #666;
      font-weight: bold;
      font-size: 14px;
      border: 1px solid rgba(217, 217, 217, 1);
      .price-item {
        display: inline-block;
        text-align: center;
        &.price-item1 {
          width: 150px;
        }
        &.price-item2 {
          width: 150px;
        }
        &.price-item3 {
          width: 236px;
        }
      }
    }
    .noData {
      padding: 20px 0;
      text-align: center;
    }
    .price-list-main {
      height: 400px;
      overflow: auto;
    }
    .price-list {
      height: 52px;
      line-height: 52px;
      border-bottom: 1px solid rgba(217, 217, 217, 1);
      border-left: 1px solid rgba(217, 217, 217, 1);
      border-right: 1px solid rgba(217, 217, 217, 1);
      color: #666;
      .price-list-item {
        display: inline-block;
        text-align: center;
        &.price-list-item1 {
          width: 150px;
          text-align: left;
          padding-left: 40px;
        }
        &.price-list-item2 {
          width: 150px;
        }
        &.price-list-item3 {
          width: 223px;
        }
        .status {
          display: inline-block;
          width: 40px;
          height: 22px;
          line-height: 22px;
          background: rgba(245, 245, 245, 1);
          border-radius: 4px;
          border: 1px solid rgba(217, 217, 217, 1);
          text-align: center;
          &.current {
            color: @dark_red;
            background: rgba(255, 241, 240, 1);
            border: 1px solid rgba(255, 163, 158, 1);
          }
        }
        .my {
          color: @dark_blue;
        }
      }
    }
  }
</style>