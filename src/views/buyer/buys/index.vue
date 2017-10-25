<template>
  <div class="buy-index">
    <statusBar ref="statusBar" @on-filter-status="filterStatus" :status="statusData"></statusBar>
    <template v-if="listEmpty">
      <tabList @on-page-change="pageChange" :total="totalCount" ref="tabList">
        <tabCard v-for="(item,index) in list" @click.native="selectItem(index)" :class="{ 'active':activeIndex == index }" :key="index" :item="item" :index="index" @on-edit="itemEdit" @on-del="deleteItem" @on-copy="copy(index)"></tabCard>
      </tabList>
      <div class="info-list">
        <div class="winner-panel" v-if="activeItem.buyStatus == 2">
          <div class="tit">中标商家</div>
          <offerItem :item="selectBusiness" v-if="selectBusiness" :isDone="false" style="border-bottom:0"></offerItem>
        </div>
        <Info :item="activeItem"></Info>
        <offerList :offerList="offerList" :buyStatus="activeItem.buyStatus" @on-bidDone="bidDone"></offerList>
      </div>
      <!-- 编辑面板 -->
      <div class="edit-container" v-if="editShow">
        <div class="inner-content">
          <div class="head">
            编辑求购
            <span class="iconfont icon-close" @click="editShow = false"></span>
          </div>
          <editItem :data="activeItem" @on-close="editShow = false" @on-save="doEdit"></editItem>
        </div>
      </div>
    </template>
    <img v-else class="no-list" src="../../../assets/no-list.png">
  </div>
</template>

<script>
  import statusBar from './parts/statusBar.vue';
  import tabCard from './parts/tabCard.vue';
  import tabList from './parts/tabList.vue';
  import Info from './parts/info.vue';
  import offerList from './parts/offerList.vue';
  import editItem from './parts/editItem.vue';
  import offerItem from './parts/offerItem.vue';
  import pushAsync from '@/utils/pushAsync.js'
  export default {
    mixins: [pushAsync],
    components: {
      statusBar,
      tabCard,
      tabList,
      Info,
      offerList,
      editItem,
      offerItem
    },
    data() {
      return {
        ajaxLoading: true,
        editShow: false,
        getListApi: {
          currentPage: 1,
          pageSize: 5,
          buyStatus: 1 //默认为进行中的状态
        },
        list: [],
        totalCount: 0,
        activeIndex: 0,
        offerList: [],
        statusData: [{
            name: '进行中',
            status: 1,
            count: 0
          },
          {
            name: '已成交',
            status: 2,
            count: 0
          },
          {
            name: '已失效',
            status: 3,
            count: 0
          },
          {
            name: '所有',
            status: '',
            count: 0
          }
        ]
      }
    },
    computed: {
      // 是否没有数据
      listEmpty(){
        return this.list.length > 0
      },
      activeItem() {
        return this.list.length > 0 ? this.list[this.activeIndex] : {}
      },
      activeItemId() {
        return this.list.length > 0 ? this.list[this.activeIndex].id : ''
      },
      isToday() {
        return this.$route.params.isToday
      },
      // 中标商户
      selectBusiness(){
        return this.offerList.length > 0 ? this.offerList[0] : false
      }
    },
    methods: {
      // 切换Item
      selectItem(index) {
        this.activeIndex = index;
      },
      // 分页点击
      pageChange(current) {
        this.getListApi.currentPage = current;
        // 每次翻页，重置选中为第一个
        this.activeIndex = 0;
        this.getDataList();
      },
      // 获取求购列表
      getDataList() {
        let params = this.$clearData(this.getListApi);
        params.today = this.isToday;
        this.$http.post(this.$api.getIronBuys, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
            if (res.data.ing != undefined) {
              this.statusData[0].count = res.data.ing;
              this.statusData[1].count = res.data.get;
              this.statusData[2].count = res.data.end;
              this.statusData[3].count = res.data.all;
              this.getOfferList();
            }
          }
        })
      },
      // 获取求购报价列表
      getOfferList() {
        this.$http.post(this.$api.getOfferList, {
          ironBuyId: this.activeItemId
        }).then(res => {
          if (res.code === 1000) {
            this.offerList = res.data;
          }
        })
      },
      //切换状态
      filterStatus(status) {
        this.getListApi.buyStatus = status;
        this.getListApi.currentPage = 1;
        if(this.$refs.tabList)
          this.$refs.tabList.pageInit();
        this.activeIndex = 0;
        this.getDataList();
      },
      // 打开编辑
      itemEdit(i) {
        this.activeIndex = i;
        this.editShow = true;
      },
      // 确认修改
      doEdit(item) {
        this.$http.post(this.$api.publish_one, item).then(res => {
          if (res.code === 1000) {
            this.getDataList();
            this.editShow = false;
            this.$Message.success('修改成功！')
          }
        })
      },
      // 删除求购
      deleteItem(item) {
        let params = _.cloneDeep(item);
        params.status = 0;
        this.$http.post(this.$api.publish_one, params).then(res => {
          if (res.code === 1000) {
            // 如果这也删完了，且不是第一页，就往后退一页
            if(this.list.length <= 1 && this.getListApi.currentPage > 1)
              this.getListApi.currentPage--
              
            this.activeIndex = 0;
            this.getDataList();
            this.$Message.success('已删除！')
          }
        })
      },
      // 复制
      copy(index) {
        this.activeIndex = index;
        let saveList = this.$ls.get('publishList') != null ? this.$ls.get('publishList') : [];
        if (saveList.length < 6) {
          this.$Modal.confirm({
            title: '复制成功！',
            content: '求购信息已复制，是否千万发布页面进行发布？',
            okText: '前往',
            cancelText: '留在此页',
            onOk: () => {
              let data = this.$clearData(this.activeItem);
              data.id = '';
              delete data.buyStatus;
              delete data.editStatus;
              delete data.sellNum;
              delete data.updateTime;
              this.$ls.set('copyData', data);
              this.$router.push({
                name: 'publishIron',
                params: {
                  isCopy: 1
                }
              })
            }
          })
        } else {
          this.$Message.error('发布列表已经保存了六条信息,无法继续发布!')
        }
      },
      // 选择中标
      bidDone() {
        this.$refs.statusBar.activeIndex = 1;
        this.filterStatus(2);
      }
    },
    watch: {
      activeItemId() {
        this.getOfferList();
      },
      isToday() {
        // 当日和所有切换的时候，初始化所有参数
        this.getListApi.currentPage = 1;
        this.getListApi.buyStatus = 1;
        this.$refs.statusBar.activeIndex = 0;
        this.getDataList();
      }
    },
    created() {
      this.getDataList();
    }
  }
</script>


<style lang="less" scoped>
  @import '../../../assets/base.less';
  .info-list {
    margin: 16px 0 0 330px;
  }
  
  .buy-index {
    position: relative;
    .no-list{
      display: block;
      width: 230px;
      margin: 200px auto 0;
    }
  }
  
  .edit-container {
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 2223;
    .inner-content {
      width: 860px;
      background-color: #fff;
      margin: 200px auto;
      .head {
        position: relative;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        padding: 0 10px;
        background-color: @mask_blue;
        .iconfont {
          position: absolute;
          font-size: 20px;
          color: #fff;
          right: 10px;
          cursor: pointer;
        }
      }
      .content {
        width: 100%;
        height: 328px;
        padding: 20px 40px;
        border: @b_d1;
      }
    }
  }
  
  .winner-panel {
    width: 100%;
    background-color: #fff;
    margin-bottom: 16px;
    overflow: hidden;
    border:@b_d1;
    .borderRadius;
    .tit {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: @light_green;
      color: #fff;
      text-indent: 20px;
    }
  }
</style>

