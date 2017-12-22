<template>
  <div class="market-inner-container">
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
              <th class="tax">含税</th>
              <th class="stock">库存(吨)</th>
              <th class="location">所在地</th>
              <th class="exponentia">实时指数
                <Tooltip content="资源更新越及时，实时指数越高，越推荐下单" placement="top">
                  <span class="iconfont icon-wenhao"></span>
                </Tooltip>
              </th>
              <th class="warehouse">仓库</th>
              <th class="operation">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in list" :key="item.id">
              <td class="icon"><span class="iconfont icon-te"></span></td>
              <td>{{ item.ironTypeName }}</td>
              <td>{{ item.materialName }}</td>
              <td>{{ item.surfaceName }}</td>
              <td>{{ item.proPlacesName }}</td>
              <td>{{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length}` }}</td>
              <td>{{ item.tolerance | emptyHlod }}</td>
              <td>{{ item.measuringType | measuringStr }}</td>
              <td class="price">&yen;{{ item.price }}</td>
              <td class="tax">{{ item.taxType | taxStr }}</td>
              <td class="stock">{{ item.storeHouseCount }}</td>
              <td>{{ item.locationName }}</td>
              <td class="exponentia">
                <exponentia :recommendPoint="item.recommendPoint" :updateTime="item.updateTime" :serveTime="item.serveTime"></exponentia>
              </td>
              <td>{{ item.storeHouseName }}</td>
              <td>
                <a class="purchase down" v-if="!openStatus">已经休市</a>
                <a class="purchase" v-else-if="item.createUserId != roleId" @click="purchase(item.createUserId,item)">我要采购</a>
                <span class="me-gry" v-else>我的资源</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </tableWrap>
    <purchasePanel v-model="purchaseShow" :item="purchaseItem" type="3" isSpecail></purchasePanel>
  </div>
</template>

<script>
  import sameMix from '../mixin.js'
  export default {
    mixins: [sameMix]
  }
</script>


<style lang="less" scoped>
  @import url('../../../assets/market.less');
</style>

