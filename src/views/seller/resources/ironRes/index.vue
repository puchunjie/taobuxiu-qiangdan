<template>
  <div class="resource-container">
    <innerTitle>现货资源</innerTitle>
    <listFilter v-model="filterData"></listFilter>
    <tableWrap v-model="page">
      <div class="list-table-container">
        <div class="table-tr table-head">
          <div class="padding-wrap">
            <div class="table-td ckeck-box"></div>
            <div class="table-td iron">品类</div>
            <div class="table-td material">材质</div>
            <div class="table-td surface">表面</div>
            <div class="table-td proPlace">产地</div>
            <div class="table-td spec">规格</div>
            <div class="table-td tolerance">公差</div>
            <div class="table-td metering">计量方式</div>
            <div class="table-td price">单价（元/吨）</div>
            <div class="table-td location">所在地</div>
            <div class="table-td warehouse">仓库</div>
            <div class="table-td time">更新时间</div>
            <div class="table-td operation">操作</div>
          </div>
        </div>
        <div class="table-tr">
          <div class="padding-wrap">
            <div class="table-td ckeck-box"><span class="iconfont icon-check_box_unselecte"></span></div>
            <div class="table-td iron">品类</div>
            <div class="table-td material">材质</div>
            <div class="table-td surface">表面</div>
            <div class="table-td proPlace">产地</div>
            <div class="table-td spec">规格</div>
            <div class="table-td tolerance">公差</div>
            <div class="table-td metering">计量方式</div>
            <div class="table-td price">单价（元/吨）</div>
            <div class="table-td location">所在地</div>
            <div class="table-td warehouse">仓库</div>
            <div class="table-td time">更新时间</div>
            <div class="table-td operation">操作</div>
          </div>
        </div>
      </div>
    </tableWrap>
  </div>
</template>


<script>
  import innerTitle from '../common/innerTitle.vue'
  import listFilter from '../common/listFilter.vue'
  import tableWrap from '../common/tableWrap.vue'
  export default {
    components: {
      innerTitle,
      listFilter,
      tableWrap
    },
    data() {
      return {
        filterData: {
          status: 1,
          ironTypeId: "",
          materialId: "",
          surfaceId: "",
          proPlaceId: ""
        },
        page: {
          totleCount: 10,
          pageSize: 10,
          currentPage: 1
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  @import url('../../../../assets/resources.less');
  .table-td{
    margin-right: 26px;
  }

  .iron {
    width: 62px;
  }
  
  .material {
    width: 76px;
  }
  
  .surface {
    width: 48px;
  }
  
  .proPlace {
    width: 62px;
  }
  
  .spec {
    width: 80px;
  }
  
  .tolerance {
    width: 70px;
  }
  
  .metering {
    width: 62px;
  }
  
  .price {
    width: 76px;
  }
  
  .location {
    width: 65px;
  }
  
  .warehouse {
    width: 89px;
  }
  
  .time {
    width: 79px;
  }
  
  .operation {
    width: 50px;
  }
</style>
