<template>
  <div>
    <statusBar @on-filter-status="filterStatus"></statusBar>
    <tabList @on-page-change="pageChange" :total="totalCount">
      <tabCard v-for="(item,index) in list" @click.native="selectItem(index)" :class="{ 'active':activeIndex == index }" :key="index" :item="item"></tabCard>
    </tabList>
    <div class="info-list">
      <Info :item="activeItem"></Info>
      <offerList :offerList="offerList"></offerList>
    </div>
  </div>
</template>

<script>
import statusBar from './parts/statusBar.vue'
  import tabCard from './parts/tabCard.vue'
  import tabList from './parts/tabList.vue'
  import Info from './parts/info.vue'
  import offerList from './parts/offerList.vue'
  
  const mock = {
    "ironTypeId": "40280d815e9e073e015e9e08b1410003",
    "createUserId": "402800815e378255015e378a29340002",
    "proPlacesId": "4028800a5ea2ebe3015ea2f519f90008",
    "surfaceName": "No.1",
    "numbers": 345,
    "editStatus": "0",
    "remark": "哈哈哈哈哈 嘿嘿嘿嘿 吼吼吼吼",
    "appFlag": "1",
    "numberUnit": "张",
    "specifications": "",
    "numberUnitId": "",
    "locationId": "310100",
    "weightUnitId": "40280d815e9d36d6015e9d435ce90000",
    "id": "ff8080815ec306a9015ec60e3d6f000c",
    "proPlacesName": "太钢",
    "tolerance": "11.1-12.121",
    "height": "0.1",
    "locationName": "上海",
    "updateUserId": "402800815e378255015e378a29340002",
    "length": "100",
    "updateUser": "admin",
    "surfaceId": "4028800a5ea2ebe3015ea2f54afb000a",
    "updateTime": 1506561375000,
    "materialId": "ff8080815ea42e56015ea739201d0031",
    "weights": 12,
    "weightUnitName": "",
    "numberUnitName": "",
    "timeLimit": 86400000,
    "materialName": "2507",
    "createTime": 1506561375000,
    "ironTypeName": "不锈钢板",
    "buyStatus": "1",
    "width": "100",
    "createUser": "admin",
    "status": "1",
    "sellNum": 0,
    "weightUnit": "吨"
  };
  export default {
    components: {
      statusBar,
      tabCard,
      tabList,
      Info,
      offerList
    },
    data() {
      return {
        getListApi: {
          currentPage: 1,
          pageSize: 5,
          buyStatus: 1 //默认为进行中的状态
        },
        list: [],
        totalCount: 0,
        activeIndex: 0,
        offerList: []
      }
    },
    computed: {
      activeItem() {
        return this.list.length > 0 ? this.list[this.activeIndex] : {}
      },
      activeItemId(){
        return this.list.length > 0 ? this.list[this.activeIndex].id : ''
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
        this.getIronBuys();
      },
      // 获取求购列表
      getIronBuys() {
        this.$http.post(this.$api.getIronBuys, this.getListApi).then(res => {
          if(res.code === 1000){
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        })
      },
      // 获取求购报价列表
      getOfferList(){
        this.$http.post(this.$api.getOfferList,{
          ironBuyId: this.activeItemId
        }).then(res => {
          if(res.code === 1000){
            this.offerList = res.data;
          }
        })
      },
      //切换状态
      filterStatus(status){
        this.getListApi.buyStatus = status;
        this.activeIndex = 0;
        this.getIronBuys();
      }
    },
    watch: {
      activeItemId(){
        this.getOfferList();
      }
    },
    created() {
      this.getIronBuys();
    }
  }
</script>


<style lang="less" scoped>  
  .info-list {
    margin: 16px 0 0 330px;
  }
</style>

