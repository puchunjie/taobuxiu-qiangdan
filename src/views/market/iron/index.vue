<template>
  <div class="market-inner-container">
    <FilterGrop @on-change="asyncFilter" @on-search="search"></FilterGrop>
    <tableWrap v-model="page" @on-sort="getData">
      <div class="list-table">
        <Spin fix v-show="listLoad"></Spin>
        <table>
          <thead>
            <tr>
              <th class="icon"></th>
              <th class="iron">品类</th>
              <th class="material">材质</th>
              <th class="surface">表面</th>
              <th class="proPlace">产地</th>
              <th class="spec">规格</th>
              <th class="tolerance">公差</th>
              <th class="metering">计量方式</th>
              <th class="price">单价(元/吨)</th>
              <th class="location">所在地</th>
              <th class="exponentia">实时指数
              </th>
              <th class="warehouse">仓库</th>
              <th class="operation">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in list" :key="item.id">
              <td class="icon"><span class="iconfont icon-xian"></span></td>
              <td>{{ item.ironTypeName }}</td>
              <td>{{ item.materialName }}</td>
              <td>{{ item.surfaceName }}</td>
              <td>{{ item.proPlacesName }}</td>
              <td>{{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length}` }}</td>
              <td>{{ item.tolerance | emptyHlod }}</td>
              <td>{{ item.measuringType | measuringStr }}</td>
              <td class="price">&yen;{{ item.price }}</td>
              <td>{{ item.locationName }}</td>
              <td class="exponentia">
                <exponentia :recommendPoint="item.recommendPoint" :updateTime="item.updateTime" :serveTime="item.serveTime"></exponentia>
              </td>
              <td>{{ item.storeHouseName }}</td>
              <td><a class="purchase">我要采购</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </tableWrap>
  </div>
</template>

<script>
  import FilterGrop from '../common/filter.vue'
  import tableWrap from '../common/tableWrap.vue'
  import exponentia from '../common/exponentia.vue'
  export default {
    components: {
      FilterGrop,
      tableWrap,
      exponentia
    },
    data() {
      return {
        filterValue: {},
        listLoad: false,
        list: [],
        page: {
          totleCount: 10,
          pageSize: 20,
          currentPage: 1,
          priceSort: ""
        }
      }
    },
    computed: {
      queryParams(){
        return Object.assign(this.filterValue,this.page);
      }
    },
    watch: {
      'page.currentPage': {
          handler: function(val, oldVal) {
              this.getData();
          },
          deep: true
      }
    },
    methods: {
      asyncFilter(data) {
        this.filterValue = data;
      },
      getData() {
        this.listLoad = true;
        this.$http.post(this.$api.findAllSpotGoodsPage,this.queryParams).then(res=>{
          if(res.code === 1000){
            this.page.totleCount = res.data.totalCount;
            this.list = res.data.list;
          }
          this.listLoad = false;
        })
      },
      search(data){
        this.filterValue = data;
        this.page.currentPage = 1;
        this.getData();
      }
    },
    created () {
      this.getData();
    }
  }
</script>


<style lang="less" scoped>
  @import url('../../../assets/market.less');
</style>

