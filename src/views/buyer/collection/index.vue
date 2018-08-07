<template>
  <div class="auction-container">
    <div class="auction-container-header">
      <span class="title">我的收藏</span>
      <div class="header-slot">
        <switchStatus v-model="pageApi.auctionStatus" :status="statusData"></switchStatus>
      </div>
    </div>
    <div class="auction-container-main">
      <div class="auction-container-filter">
        <i-form :model="pageApi" :label-width="80" inline>
          <form-item label="货品内容：">
            <i-input placeholder="请输入货品" v-model="pageApi.description" style="width: 224px;"></i-input>
          </form-item>
          <form-item label="参与状态：">
            <i-select v-model="pageApi.participate" style="width: 104px;">
              <i-option v-for="(item,i) in [{val: 'true',label: '是'},{val: 'false',label: '否'}]" :value="item.val" :key="i">{{item.label}}</i-option>
            </i-select>
          </form-item>
          <form-item label="销售底价：">
            <i-select v-model="pageApi.hasReservePrice" style="width: 104px;">
              <i-option v-for="(item,i) in [{val: 'true',label: '有底价'},{val: 'false',label: '无底价'}]" :value="item.val" :key="i">{{item.label}}</i-option>
            </i-select>
          </form-item>
          <form-item label="产地：">
            <asyncPicker class="input-item" v-model="proPlace" :api="$api.G_getProPlaces"></asyncPicker>
          </form-item>
          <div class="search-btn">
            <a class="btn" @click="search">搜索</a>
            <a class="btn default" @click="reset">取消</a>
          </div>
        </i-form>
      </div>
      <div class="pl-options">
        <a class="checkAll" @click="checkAll" v-show="isBatch"><i class="iconfont" :class="isAll ? 'icon-ziyuan3':'icon-ziyuan21'"></i>全选</a>
        <a class="del" v-show="isBatch" @click="delCollect"><i class="icon-shanchu iconfont"></i>删除</a>
        <a class="btn default batch" @click="batch">{{isBatch ? '取消管理' : '批量管理'}}</a>
      </div>
      <div class="auction-container-list">
        <table class="list-table">
          <thead>
            <tr>
              <th width="5%" v-show="isBatch"></th>
              <th width="10%">场次编号</th>
              <th width="35%">货品详情</th>
              <th width="10%">产地</th>
              <th width="10%">总量(kg)</th>
              <th width="10%">起拍价(元/吨)</th>
              <th width="10%">保证金</th>
              <th width="10%">参与状态</th>
              <th v-show="!isBatch" width="5%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in list" :key="i">
              <td v-show="isBatch" class="selected">
                <span @click="selected(item,i)" class="iconfont" :class="item.isCheck ? 'icon-ziyuan3':'icon-ziyuan21'"></span>
              </td>
              <td>{{item.auctionId}}</td>
              <td class="description">
                <span>{{item.description}}</span>
                <span class="details">
                                        <span class="iconfont icon-youdijia"></span>
                <span class="hasReservePrice">{{item.hasReservePrice ? '有底价':'无底价'}}</span>
                </span>
              </td>
              <td>{{item.proPlace}}</td>
              <td>{{item.startPrice}}</td>
              <td>{{item.maigin}}</td>
              <td>{{item.maigin}}</td>
              <td>{{item.participate ? '是':'否'}}</td>
              <td v-show="!isBatch"><span class="unCollect" @click="unCollect(item)">取消收藏</span></td>
            </tr>
          </tbody>
        </table>
        <div class="nodata" v-if="list.length === 0">
          <img src="../../../assets/Group@3x.png" style="width:166px;">
        </div>
        <Page class="page-count" show-total show-elevator show-sizer :current="pageApi.currentPage" :total="totalCount" :page-size="pageApi.pageSize" @on-page-size-change="changeSize" size="small" @on-change="pageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import remove from 'lodash/remove'
  import asyncPicker from "@/components/business/asyncPicker/index";
  import switchStatus from "./parts/switchStauts.vue";
  export default {
    components: {
      switchStatus,
      asyncPicker
    },
    data() {
      return {
        pageApi: {
          auctionStatus: "1",
          description: "",
          participate: "",
          hasReservePrice: "",
          proPlace: "",
          currentPage: 1,
          pageSize: 20
        },
        proPlace: {
          name: "",
          id: ""
        },
        statusData: [{
            id: "1",
            lable: "等待竞拍"
          },
          {
            id: "2",
            lable: "正在竞拍"
          },
          {
            id: "3",
            lable: "竞拍结束"
          }
        ],
        list: [],
        totalCount: 0,
        isBatch: false,
        ids: [],
        isAll: false
      };
    },
    watch: {
      "proPlace.name" (val) {
        this.pageApi.proPlace = val;
      },
      'pageApi.auctionStatus' () {
        this.getList(this.pageApi)
      }
    },
    computed: {
      // isAll() {
      //   return this.ids.length == this.list.length
      // }
    },
    methods: {
      getList(params) {
        this.$http.post(this.$api.findStoreUpList, params).then(res => {
          res.data.list.forEach(el => {
            el.isCheck = false;
          })
          this.list = res.data.list;
          this.totalCount = res.data.totalCount;
        });
      },
      // 搜索
      search() {
        this.getList(this.pageApi);
        this.resetData();
      },
      // 取消搜索
      reset() {
        this.pageApi = {
          auctionStatus: "1",
          description: "",
          participate: "",
          hasReservePrice: "",
          proPlace: "",
          currentPage: 1,
          pageSize: 20
        }
        this.proPlace = {
          id: '',
          name: ''
        }
        this.resetData();
        this.getList(this.pageApi)
      },
      // 批量
      batch() {
        this.isBatch = !this.isBatch;
        this.isAll = false;
        this.ids = [];
        this.list.map(el => {
          el.isCheck = false;
        })
      },
      hasAll() {
        if (this.ids.length === this.list.length) {
          this.isAll = true;
        } else {
          this.isAll = false;
        }
      },
      // 单条选择
      selected(item, i) {
        if (item.isCheck) {
          remove(this.ids, n => {
            return n === item.id;
          });
        } else {
          this.ids.push(item.id)
        }
        item.isCheck = !item.isCheck;
        this.hasAll();
      },
      //  全选
      checkAll() {
        if (this.isAll) {
          this.ids = [];
          this.list.map(el => {
            el.isCheck = false;
          })
        } else {
          this.ids = [];
          this.list.map(el => {
            el.isCheck = true;
            this.ids.push(el.id)
          })
        }
        this.hasAll();
      },
      resetData() {
        this.isBatch = false;
        this.ids = []
      },
      pageChange(page) {
        this.pageApi.currentPage = page;
        this.getList(this.pageApi);
      },
      changeSize(size) {
        this.pageApi.pageSize = size;
        this.getList(this.pageApi);
      },
      // 取消单条收藏
      unCollect(item) {
        this.ids.push(item.id);
        this.confirm(1)
      },
      // 删除
      delCollect() {
        if (this.ids.length) {
          this.confirm(2);
        } else {
          this.$Message.error('请选择要删的收藏拍品')
        }
      },
      confirm(status) {
        this.$Modal.confirm({
          title: status === 2 ? '删除收藏' : '取消收藏',
          content: status === 2 ? '确认删除收藏拍品？' : '确认取消收藏该条拍品？',
          onOk: () => {
            let params = {
              ids: JSON.stringify(this.ids)
            }
            this.$http.post(this.$api.deleteStoreUp, params).then(res => {
              if (res.code === 1000) {
                this.$Message.success('取消收藏成功');
                this.getList(this.pageApi)
              } else {
                this.$Message.error(res.message)
              }
            })
          }
        });
      }
    },
    created() {
      this.getList(this.pageApi);
    }
  };
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
    }
    .auction-container-list {
      position: relative;
      padding-bottom: 40px;
      .page-count {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .search-btn {
      display: inline-block;
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
    .pl-options {
      .del {
        font-size: 14px;
        color: @f_ligth;
        display: inline-block;
        margin: 0 20px;
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
        &:hover {
          color: @dark_red;
        }
      }
      .checkAll {
        font-size: 14px;
        color: @f_ligth;
        display: inline-block;
        .iconfont {
          margin-right: 5px;
          cursor: pointer;
          &.icon-ziyuan21 {
            color: @back_gray;
          }
          &.icon-ziyuan3 {
            color: @dark_blue;
          }
        }
      }
    }
    .list-table {
      width: 100%;
      border: 1px solid @back_gray;
      margin: 16px 0;
      thead {
        tr {
          height: 52px;
          line-height: 52px;
          background-color: #fafafa;
          th {
            color: @f_dark;
            font-size: 14px;
            font-weight: bold;
            padding: 0 10px;
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
            .unCollect {
              color: @dark_blue;
              cursor: pointer;
            }
          }
        }
        .selected {
          text-align: center;
          .iconfont {
            cursor: pointer;
            &.icon-ziyuan21 {
              color: @back_gray;
            }
            &.icon-ziyuan3 {
              color: @dark_blue;
            }
          }
        }
        .details {
          position: relative;
          display: inline-block;
          vertical-align: 16px;
          margin-left: 10px;
          .iconfont {
            position: absolute;
            top: 0;
            left: 0;
            color: #FFC107;
            font-size: 20px;
            z-index: 1;
          }
          .hasReservePrice {
            position: absolute;
            top: 0;
            left: 0;
            color: #fff;
            z-index: 2;
            font-size: 12px;
            width: 59px;
            height: 23px;
            line-height: 23px;
            text-align: center;
          }
        }
      }
    }
    .nodata {
      text-align: center;
    }
  }
</style>