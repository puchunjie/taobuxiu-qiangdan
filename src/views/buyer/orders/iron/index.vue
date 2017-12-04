<template>
  <div class="order-container">
    <status :data="statusData" v-model="apiData.orderStatus"></status>
    <searchBar placeholder="搜索供应商名称" v-model="searchData"></searchBar>
    <div class="table-contnet">
      <table class="header-table">
        <tr>
          <th class="info">货品详情</th>
          <th class="measure">计量方式</th>
          <th class="price">单价(元/吨)</th>
          <th class="num">数量(吨)</th>
          <th class="totle" v-show="type == 1">总金额(元)</th>
          <th class="time" v-show="type == 2">计划开平时间</th>
          <th class="tax" v-show="type == 3">含税</th>
          <th class="location">所在地</th>
          <th class="warehouse">仓库</th>
          <th class="state">订单状态</th>
          <th class="operation">操作</th>
        </tr>
      </table>
      <table class="item-table" v-for="(item,i) in list" :key="item.id">
        <tr>
          <th colspan="9" class="item-title">
            <span class="mr-80">{{ item.createTime | dateformat('yyyy-MM-dd hh:mm:ss') }}</span>
            <span class="mr-80">订单号：{{ item.id }}</span> {{ item.companyName }}
            <merchantLabel :faith="item.isFaithUser == '1'" :guarantee="item.isGuaranteeUser == '1'"></merchantLabel>
            <crown class="mr-80" :level='item.levelDay'></crown>
            <qq :data="{name:item.contact,phone:item.contactNum,qq:item.QQ}"></qq>
          </th>
        </tr>
        <tr>
          <td class="info bo-b">
            {{ item.ironTypeName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ `${item.materialName}/${item.surfaceName}` }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.proPlacesName }}<br> {{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length}` }}
            &nbsp;&nbsp;&nbsp;&nbsp;{{ item.tolerance | emptyHlod('') }}
          </td>
          <td class="measure bo-b">{{ item.measuringType | measuringStr }}</td>
          <td class="price bo-b">&yen;{{ item.price }}</td>
          <td class="num">x{{ item.nums }}</td>
          <td class="totle" v-show="type == 1">&yen;{{ item.price * item.nums }}</td>
          <td class="time" v-show="type == 2">含税</td>
          <td class="tax" v-show="type == 3">含税</td>
          <td class="location">{{ item.locationName }}</td>
          <td class="warehouse">{{ item.storeHouseName }}</td>
          <td class="state">
            <countDown v-if="item.orderStatus == 2" normal :endTime="item.confirmTime" :nowTime="item.serveTime"></countDown>
            <span v-else-if="item.orderStatus == 1">{{ item.updateTime | dateformat('MM-dd hh:mm') }}</span>
            <br v-show="item.orderStatus == 1 || item.orderStatus == 2"> {{ item.orderStatus | bOrderState }}
          </td>
          <td class="operation">
            <template v-if="item.orderStatus == 2">
                    <a>取消订单</a><br>
                    <a class="link">修改订单</a>
</template>
            <a v-else-if="item.orderStatus == 1">再次采购</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
  import status from '@/components/orderCommon/status.vue'
  import searchBar from '@/components/orderCommon/search.vue'
  import crown from '@/components/basics/crown/index.vue'
  import qq from '@/components/business/qqContant/index.vue'
  import merchantLabel from '@/components/business/merchantLabel/index.vue'
  import countDown from '@/components/countDown.vue'
  export default {
    components: {
      status,
      searchBar,
      crown,
      qq,
      merchantLabel,
      countDown
    },
    props: {
      type: {
        type: [String, Number],
        default: 1
      }
    },
    data() {
      return {
        statusData: [{
          label: '待确认',
          value: '2',
          count: 1
        }, {
          label: '已完成',
          value: '1',
          count: 0
        }, {
          label: '未接单',
          value: '3',
          count: 0
        }, {
          label: '已取消',
          value: '4',
          count: 0
        }, {
          label: '全部订单',
          value: '',
          count: 0
        }],
        apiData: {
          orderStatus: '2',
          storeType: "",
          companyName: "",
          currentPage: "1",
          pageSize: "10"
        },
        totalCount: 0,
        list: [],
        searchData: {
          str: '',
          limitTime: ''
        }
      }
    },
    computed: {
      // 时间区间
      limit() {
        return {
          startTime: this.searchData.limitTime.split(",")[0],
          endTime: this.searchData.limitTime.split(",")[1]
        }
      }
    },
    methods: {
      getOrders() {
        let params = this.$clearData(Object.assign(this.apiData, this.limit));
        this.$http.post(this.$api.findBuyerStoreOrder, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            this.statusData[0].count = res.data.needConfirm;
            this.statusData[1].count = res.data.over;
            this.statusData[2].count = res.data.notGet;
            this.statusData[3].count = res.data.cancel;
            this.statusData[4].count = res.data.all;
            this.totalCount = res.data.totalCount;
          }
        })
      }
    },
    created() {
      this.apiData.storeType = this.type;
      this.getOrders();
    }
  }
</script>


<style lang="less" scoped>
  @import url('../../../../assets/base.less');
  .order-container {
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border: @b_d1;
    font-size: 12px;
    .header-table,
    .item-table {
      width: 100%;
      height: 34px;
      th,
      td {
        text-align: center;
      }
      th {
        background-color: @table_headbg;
        color: #777;
      }
    }
    .item-table {
      border: @b_d1;
      margin-top: 12px;
      .item-title {
        text-align: left;
        text-indent: 20px;
        height: 34px;
        border-bottom: @b_d1;
      }
      td {
        height: 100px;
        line-height: 24px;
        border-right: @b_d1;
        color: @f_dark;
      }
      .price {
        color: @dark_red;
        font-weight: bold;
      }
      .totle {
        font-weight: bold;
      }
    }
    .info {
      width: 310px;
      text-align: left!important;
      padding-left: 20px;
    }
    .measure {
      width: 70px;
    }
    .price,
    .num,
    .warehouse {
      width: 100px;
    }
    .location {
      width: 90px;
    }
    .state,
    .tax,
    .totle,
    .time {
      width: 110px;
    }
    .operation {
      width: 130px;
      a {
        color: @f_dark;
        &.link {
          color: @light_blue;
          text-decoration: underline;
        }
      }
    }
    .bo-b {
      border-right: 0!important;
    }
    .mr-80 {
      margin-right: 80px;
    }
  }
</style>
