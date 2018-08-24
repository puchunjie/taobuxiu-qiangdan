<template>
  <div class="auction-container">
    <div class="auction-container-header">
      <span class="title">我的保证金</span>
    </div>
    <div class="auction-container-main">
      <div class="count">
        <span class="count-item">总余额<i>￥{{count.all}}</i></span>
        <span class="count-item">已冻结<i>￥{{count.lock}}</i></span>
        <span class="count-item">可用余额<i>￥{{count.account}}</i></span>
        <a class="btn money-btn" @click="goassetDetail">余额管理</a>
      </div>
      <div class="auction-container-list">
        <div class="auction-container-list">
          <table class="list-table">
            <thead>
              <tr>
                <th width="10%">场次编号</th>
                <th width="40%">货品详情</th>
                <th width="10%">参拍中
                  <Poptip placement="bottom-start" v-model="visible">
                    <span class="iconfont icon-filter-flat"></span>
                    <ul slot="content" class="table-filter">
                      <li class="filter-item" v-for="(item,i) in [{id: '1',name: '参拍中'},{id: '2',name: '已成交'},{id: '3',name: '未获拍'}]" :key="i" @click="selectFilter(item,1)">{{item.name}}</li>
                    </ul>
                  </Poptip>
                </th>
                <th width="10%">保证金
                  <Poptip placement="bottom-start" v-model="visible1">
                    <span class="iconfont icon-filter-flat"></span>
                    <ul slot="content" class="table-filter">
                      <li class="filter-item" v-for="(item,i) in [{id: '1',name: '冻结中'},{id: '2',name: '抵贷款'},{id: '3',name: '已归还'}]" :key="i" @click="selectFilter(item,2)">{{item.name}}</li>
                    </ul>
                  </Poptip>
                </th>
                <th width="10%">开始时间</th>
                <th width="10%">结束时间</th>
                <th width="10%">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in list" :key="i">
                <td>{{item.auctionId}}</td>
                <td>{{item.description}}</td>
                <td><span :class="`point point${item.status}`"></span>{{item.status | status}}</td>
                <td>￥{{item.maigin}} <span :class="`status-label status${item.status}`">{{item.status | maiginStatus}}</span></td>
                <td>{{item.startTime | dateformat('yyyy-MM-dd hh:mm:ss')}}</td>
                <td>{{item.updateTime | dateformat('yyyy-MM-dd hh:mm:ss')}}</td>
                <td>
                  <a v-if="item.status != '3'" @click="priceHistory(item)">出价记录</a>
                  <a v-if="item.status === '3'" @click="goDetail(item)">订单详情</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="nodata" v-if="list.length === 0">
          <img src="../../../assets/Group@3x.png" style="width:166px;">
        </div>
        <Page class="page-count" show-total show-elevator show-sizer :current="pageApi.currentPage" :total="totalCount" :page-size="pageApi.pageSize" @on-page-size-change="changeSize" size="small" @on-change="pageChange"></Page>
      </div>
    </div>
    <Modal v-model="show" title="出价记录" width="580">
      <div class="price-content">
        <div class="price-header">
          <div class="price-item price-item1">状态</div>
          <div class="price-item price-item2">出价(元/吨)</div>
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
  export default {
    data() {
      return {
        pageApi: {
          currentPage: 1,
          pageSize: 10,
          status: ''
        },
        list: [],
        totalCount: 0,
        count: {
          account: 0,
          all: 0,
          lock: 0
        },
        visible: false,
        visible1: false,
        priceList: [],
        show: false,
      }
    },
    watch: {
      'pageApi.status' (val) {
        this.getList(this.pageApi)
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    filters: {
      status(val) {
        return ['参拍中', '已成交', '未获拍'][val * 1 - 1]
      },
      maiginStatus(val) {
        return ['冻结中', '抵贷款', '已归还'][val * 1 - 1]
      }
    },
    methods: {
      getList(params) {
        this.$http.post(this.$api.findMyMargin, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
            this.count.account = res.data.account;
            this.count.all = res.data.all;
            this.count.lock = res.data.lock;
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
      selectFilter(item, where) {
        this.pageApi.status = item.id;
        if (where === 1) {
          this.visible = false;
        } else {
          this.visible1 = false;
        }
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
      goassetDetail(){
        this.$router.push({name: 'assetDetail'})
      }
    },
    created() {
      this.getList(this.pageApi);
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
      padding: 16px;
      .count {
        position: relative;
        border: 1px solid @back_gray;
        padding: 12px 16px;
        color: @f_ligth;
        margin-bottom: 16px;
        .count-item {
          display: inline-block;
          margin-right: 56px;
          &:first-child {
            margin-left: 20px;
          }
        }
        i {
          font-size: 32px;
          color: @f_dark;
          font-style: normal;
          vertical-align: middle;
          display: inline-block;
          margin-left: 10px;
        }
      }
      .money-btn {
        position: absolute;
        right: 16px;
        top: 16px;
      }
      .auction-container-list {
        .list-table {
          width: 100%;
          border: 1px solid @back_gray;
          thead {
            tr {
              height: 52px;
              line-height: 52px;
              background-color: #fafafa;
              th {
                position: relative;
                color: @f_dark;
                font-size: 14px;
                font-weight: bold;
                padding: 0 10px;
                .icon-filter-flat {
                  font-size: 12px;
                  color: #999;
                  cursor: pointer;
                }
              }
            }
          }
          .ivu-poptip-body-content {
            overflow: inherit;
          }
          .table-filter {
            margin: 0 -16px;
            .filter-item {
              height: 32px;
              line-height: 32px;
              cursor: pointer;
              padding: 0 16px;
              color: @f_ligth;
              font-size: 12px;
              &:hover {
                background: rgba(145, 173, 228, .09);
              }
            }
          }
          tbody {
            tr {
              height: 52px;
              border-top: 1px solid #E9E9E9;
              td {
                color: @f_ligth;
                font-size: 14px;
                padding: 0 10px;
                &.description {
                  color: @dark_blue;
                }
                .status-label {
                  display: inline-block;
                  font-size: 12px;
                  width: 46px;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  border-radius: 4px;
                  &.status1 {
                    color: @dark_blue;
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(217, 217, 217, 1);
                  }
                  &.status2 {
                    color: @dark_red;
                    background: rgba(255, 241, 240, 1);
                    border: 1px solid rgba(255, 163, 158, 1);
                  }
                  &.status3 {
                    color: @dark_green;
                    background: rgba(232, 245, 233, 1);
                    border: 1px solid rgba(165, 214, 167, 1);
                  }
                }
                .point {
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  margin-right: 5px;
                  vertical-align: middle;
                  &.point1 {
                    background-color: @dark_blue;
                  }
                  &.point2 {
                    background-color: @dark_green;
                  }
                  &.point3 {
                    background-color: @dark_red;
                  }
                }
              }
            }
          }
        }
        position: relative;
        padding-bottom: 40px;
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