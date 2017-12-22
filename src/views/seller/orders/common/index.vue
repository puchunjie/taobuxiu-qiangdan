<template>
  <div class="order-container">
    <status :data="statusData" v-model="apiData.orderStatus"></status>
    <searchBar placeholder="搜索买方公司抬头/订单号" v-model="searchData">
      <Page class="no-color line-page" :total="page.totalCount" :current.sync="page.currentPage" :page-size="page.pageSize" size="small" show-total></Page>
    </searchBar>
    <div class="table-contnet">
      <Spin fix v-show="listLoad"></Spin>
      <table class="header-table">
        <tr>
          <th class="info">货品详情</th>
          <th class="measure">计量方式</th>
          <th class="price">单价(元/吨)</th>
          <th class="num">重量(吨)</th>
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
            <span class="mr-80">订单号：{{ item.id }}</span>
            <companyLink :hasShop="item.isHaveShop" :userId="item.buserUserId">{{ item.companyName }}</companyLink>
            <merchantLabel :faith="item.isFaithUser == '1'" :guarantee="item.isGuaranteeUser == '1'"></merchantLabel>
            <crown class="mr-80" :level='item.buyLevel'></crown>
            <qq class="qq-right" :data="{name:item.contact,phone:item.contactNum,qq:item.QQ}"></qq>
          </th>
        </tr>
        <tr>
          <td class="info bo-b">
            <span class="hight-light">{{ item.ironTypeName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ `${item.materialName}/${item.surfaceName}` }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length}` }}
            &nbsp;&nbsp;&nbsp;&nbsp;{{ item.tolerance | emptyHlod('') }}</span><br> <span class="pro">{{ item.proPlacesName }}</span>
            <span v-show="type == 2">开平尺寸：</span><span class="kp-mark" v-if="item.buyRemark.length < 14">{{ item.buyRemark }}</span>
            <Tooltip v-else :content="item.buyRemark" placement="top-start">
                <span class="kp-mark">{{ item.buyRemark }}</span>
            </Tooltip>
          </td>
          <td class="measure bo-b">{{ item.measuringType | measuringStr }}</td>
          <td class="price bo-b">&yen;{{ item.price }}</td>
          <td class="num">{{ item.nums }}</td>
          <td class="totle" v-show="type == 1">&yen;{{ item.totalPrice }}</td>
          <td class="time" v-show="type == 2">{{ item.remark }}</td>
          <td class="tax" v-show="type == 3">{{ item.taxType | taxStr }}</td>
          <td class="location">{{ item.locationName }}</td>
          <td class="warehouse">{{ item.storeHouseName }}</td>
          <td class="state">
            <countDown v-if="item.orderStatus == 2" normal :endTime="item.confirmTime" :nowTime="item.serveTime"></countDown>
            <span v-else-if="item.orderStatus == 1">{{ item.updateTime | dateformat('MM-dd hh:mm') }}</span>
            <br v-show="item.orderStatus == 1 || item.orderStatus == 2"> {{ item.orderStatus | bOrderState }}
          </td>
          <td class="operation">
            <template v-if="item.orderStatus == 2">
                    <a @click="confirmOrder(item.id)">确认接单</a><br>
                    <a @click="delOrder(item.id)">不接此单</a>
            </template>
            <Tooltip v-else-if="item.orderStatus == 3" :content="item.sellRemark" placement="top">
                <a>查看取消原因</a>
            </Tooltip>
          </td>
        </tr>
      </table>
      <div class="empty" v-show="page.totalCount <= 0">
          <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/no-list.png">
      </div>
    </div>
    <div class="bottom-bar">
      <Page show-elevator :total="page.totalCount" :current.sync="page.currentPage" :page-size="page.pageSize"></Page>
    </div>

    <modelPanel title="不接此单" v-model="reasonShow" width="600">
            <div>
                <div class="input-textarea">
                  <tbTextarea placeholder="请描述不接此单的理由" v-model="delData.remark" height="100"></tbTextarea>
                </div>
                <div class="inner-btns">
                  <a class="inner-btn goast" @click="reasonShow = false">取消</a>
                  <a class="inner-btn" @click="cancelStoreOrder">确认</a>
                </div>
            </div>
        </modelPanel>
  </div>
</template>


<script>
  import {
    mapActions
  } from 'vuex'
  import status from '@/components/orderCommon/status.vue'
  import searchBar from '@/components/orderCommon/search.vue'
  import crown from '@/components/basics/crown/index.vue'
  import qq from '@/components/business/qqContant/index.vue'
  import merchantLabel from '@/components/business/merchantLabel/index.vue'
  import companyLink from '@/components/business/companyLink/index.vue'
  import countDown from '@/components/countDown.vue'
  import modelPanel from '@/components/basics/modelPanel/index.vue'
  import tbTextarea from '@/components/business/tbTextarea/index'
  import debounce from 'lodash/debounce'
  import pushAsync from '@/utils/pushAsync.js'
  export default {
    mixins: [pushAsync],
    components: {
      status,
      searchBar,
      crown,
      qq,
      merchantLabel,
      countDown,
      companyLink,
      modelPanel,
      tbTextarea
    },
    props: {
      type: {
        type: [String, Number],
        default: 1
      }
    },
    data() {
      return {
        reasonShow: false,
        listLoad: false,
        statusData: [{
          label: '待确认',
          value: '2',
          count: 0
        }, {
          label: '已成交',
          value: '1',
          count: 0
        }, {
          label: '已放弃',
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
          storeType: ""
        },
        page: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 0
        },
        list: [],
        searchData: {
          str: '',
          limitTime: ''
        },
        delData:{
          id: '',
          remark:''//取消订单备注
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
      },
      apiParams() {
        return {
          orderStatus: this.apiData.orderStatus,
          storeType: this.apiData.storeType,
          companyName: this.searchData.str,
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          startTime: this.searchData.limitTime.split(",")[0],
          endTime: this.searchData.limitTime.split(",")[1]
        }
      }
    },
    watch: {
      'apiParams': {
        handler: debounce(function(val, oldVal) {
          if (val.currentPage == oldVal.currentPage)
            this.page.currentPage = 1;
          this.getOrders();
        }, 200),
        deep: true
      }
    },
    methods: {
      ...mapActions(['getUserCount']),
      getOrders() {
        this.listLoad = true;
        this.$http.post(this.$api.findSellerStoreOrder, this.apiParams).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            if (res.data.needConfirm != undefined) {
              this.statusData[0].count = res.data.needConfirm;
              this.statusData[1].count = res.data.over;
              this.statusData[2].count = res.data.notGet;
              this.statusData[3].count = res.data.cancel;
              this.statusData[4].count = res.data.all;
            }
            this.page.totalCount = res.data.totalCount;
          }
          this.listLoad = false;
        })
      },
      delOrder(id){
        this.delData.id = id;
        this.delData.remark = '';
        this.reasonShow = true;
      },
      cancelStoreOrder() {
        if(this.delData.remark != ''){
          this.$Modal.confirm({
          title: "取消确认",
          content: "是否确认取消？",
          onOk: () => {
            this.$Spin.show()
            this.$http.post(this.$api.cancelStoreOrder, this.delData).then(res => {
              if (res.code === 1000) {
                this.getUserCount();
                this.getOrders();
                this.reasonShow = false;
                this.$Message.success('订单已取消');
              }
              this.$Spin.hide();
            })
          }
        })
        }else{
          this.$Message.warning('请填写不接单理由！');
        }
      },
      // 确认接单
      confirmOrder(id) {
        this.$Modal.confirm({
          title: "接单确认",
          content: "是否确认接单？",
          onOk: () => {
            this.$Spin.show()
            this.$http.post(this.$api.confirmStoreOrder, {
              id: id
            }).then(res => {
              if (res.code === 1000) {
                this.getUserCount();
                this.getOrders();
                this.$Message.success('接单成功！');
              }
              this.$Spin.hide();
            })
          }
        })
      }
    },
    created() {
      this.apiData.storeType = this.type;
    }
  }
</script>


<style lang="less" scoped>
  @import url('../../../../assets/order.less');
</style>
