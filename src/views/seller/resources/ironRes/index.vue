<template>
  <div class="resource-container">
    <innerTitle>定开计划 </innerTitle>
    <listFilter v-model="filterData" ref="filter" @on-publish="publish" @on-upload="excelShow = true"></listFilter>
    <tableWrap v-model="page" :checkNum="checkedItem.length" :listNum="list.length" @check-all="checkAll">
      <div class="btn-group" slot="btns" v-show="filterData.status == 1">
        <a class="action-btn" @click="batchEdit('批量修改','确认修改')">批量修改</a>
        <a class="action-btn" @click="batchRefresh">批量刷新</a>
        <a class="action-btn" @click="batchModify">批量调价</a>
        <a class="action-btn" @click="batchGetoff">批量下架</a>
      </div>
      <div class="btn-group" slot="btns" v-show="filterData.status == 0">
        <a class="action-btn" @click="batchEdit('批量上架','确认上架')">批量上架</a>
        <a class="action-btn" @click="batchDelete">批量删除</a>
      </div>
  
      <div class="list-table-container plan">
        <Spin fix v-show="listLoad"></Spin>
        <table>
          <thead>
            <tr>
              <th class="ckeck-box"></th>
              <th class="iron">品类</th>
              <th class="material">材质</th>
              <th class="surface">表面</th>
              <th class="proPlace">产地</th>
              <th class="spec">规格</th>
              <th class="tolerance">公差</th>
              <th class="metering">计量方式</th>
              <th class="price">单价(元/吨)
                <sortIcon v-model="sort.price" @on-sort="sort.time = ''"></sortIcon>
              </th>
              <th class="location">所在地</th>
              <th class="warehouse">仓库</th>
              <th class="time">更新时间
                <sortIcon v-model="sort.time" @on-sort="sort.price = ''"></sortIcon>
              </th>
              <th class="operation">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in list" :key="item.id">
              <td class="ckeck-box">
                <span class="iconfont" @click="checkItem(i)" :class="item.check ? 'icon-check-box':'icon-check_box_unselecte'"></span>
              </td>
              <td>{{ item.ironTypeName }}</td>
              <td>{{ item.materialName }}</td>
              <td>{{ item.surfaceName }}</td>
              <td>{{ item.proPlacesName }}</td>
              <td>{{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length}` }}</td>
              <td>{{ item.tolerance | emptyHlod }}</td>
              <td>{{ item.measuringType | measuringStr }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.locationName }}</td>
              <td>{{ item.storeHouseName }}</td>
              <td>{{ item.updateTime | dateformat('MM-dd hh:mm') }}</td>
              <td>
                <Poptip v-model="item.tip" placement="left" trigger="hover" v-show="filterData.status == 1">
                  <span class="iconfont icon-caozuo action"></span>
                  <div slot="content" class="action-btns">
                    <div class="item" @click="refresh(item)">刷新</div>
                    <div class="item" @click="getOff(item)">下架</div>
                    <div class="item" @click="edit(item,'修改','确认修改')">修改</div>
                  </div>
                </Poptip>
                <Poptip v-model="item.tip" placement="left" trigger="hover" v-show="filterData.status == 0">
                  <span class="iconfont icon-caozuo action"></span>
                  <div slot="content" class="action-btns">
                    <div class="item" @click="edit(item,'上架','确认上架')">上架</div>
                    <div class="item" @click="del(item)">删除</div>
                  </div>
                </Poptip>
  
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
    </tableWrap>
    <upload v-model="uploadShow" :strs="uploadStr" :editList="editList" @on-ajax-success="getList"></upload>
    <ModifyPrice v-model="modifyPriceShow" :apiUrl="$api.changePriceSpotGoods" :batchIds="batchIds" :listData="editList" @on-ajax-success="getList"></ModifyPrice>
    <uploadExcel v-model="excelShow" :uploadApi="$api.saveSpotGoodsByExcel" :historyApi="''"></uploadExcel>
  </div>
</template>


<script>
  import innerTitle from '../common/innerTitle.vue'
  import listFilter from '../common/listFilter.vue'
  import tableWrap from '../common/tableWrap.vue'
  import sortIcon from '../common/sortIcon.vue'
  import upload from './parts/upload.vue'
  import ModifyPrice from '../common/modifyPrice.vue'
  import uploadExcel from '../common/uploadExcel.vue'
  import cloneDeep from 'lodash/cloneDeep'
  import debounce from 'lodash/debounce'
  import filter from 'lodash/filter'
  import {
    getuuId
  } from '@/utils/tools.js'
  export default {
    components: {
      innerTitle,
      listFilter,
      tableWrap,
      sortIcon,
      upload,
      ModifyPrice,
      uploadExcel
    },
    data() {
      return {
        uploadShow: false, //上架弹窗
        modifyPriceShow: false, //调价弹窗
        excelShow: false, //上传excel弹窗
        uploadStr: {
          title: '',
          btn: ''
        },
        list: [],
        listLoad: false,
        editList: [],
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
        },
        sort: {
          time: "", //按时间排序 1正序 2倒序
          price: "" //按价格排序 1正序 2倒序
        }
      }
    },
    computed: {
      apiParams() {
        return {
          status: this.filterData.status,
          ironTypeId: this.filterData.ironTypeId,
          materialId: this.filterData.materialId,
          surfaceId: this.filterData.surfaceId,
          proPlaceId: this.filterData.proPlaceId,
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage,
          time: this.sort.time,
          price: this.sort.price
        }
      },
      // check项
      checkedItem() {
        return filter(this.list, el => {
          return el.check
        })
      },
      batchIds() {
        let arr = [];
        this.checkedItem.forEach(el => {
          arr.push(el.id);
        })
        return JSON.stringify(arr);
      },
      batchLength() {
        return this.checkedItem.length
      },
      // 是否可以批量操作
      batchCan() {
        return this.batchLength > 0
      }
    },
    watch: {
      'apiParams': {
        handler: debounce(function(val, oldVal) {
          this.getList();
        }, 800),
        deep: true
      }
    },
    methods: {
      // 获取列表
      getList() {
        this.listLoad = true;
        this.$http.post(this.$api.findSpotGoodsPage, this.apiParams).then(res => {
          if (res.code === 1000) {
            let list = res.data.list;
            list.map(item => {
              item.check = false;
              item.tip = false;
            })
            this.list = list;
            this.page.totleCount = res.data.totalCount;
            if (this.page.currentPage == 1) {
              this.$refs.filter.states[0].count = res.data.ing;
              this.$refs.filter.states[1].count = res.data.yDown;
              this.$refs.filter.states[2].count = res.data.aDown;
              this.$refs.filter.states[3].count = res.data.sDown;
            }
            this.listLoad = false;
          }
        })
      },
      // 单选
      checkItem(i) {
        this.list[i].check = !this.list[i].check
      },
      // 全选
      checkAll() {
        if (this.list.length > this.checkedItem.length) {
          // 全选
          this.setCheck(this.list, true)
        } else {
          this.setCheck(this.list, false)
        }
      },
      setCheck(list, b) {
        list.map(item => {
          item.check = b
        })
      },
      // 发布资源
      publish() {
        this.uploadStr.title = '新增录入';
        this.uploadStr.btn = '确认上架';
        this.uploadShow = true;
      },
      // 单个刷新
      refresh(item) {
        this.doSimple(item, this.$api.refreshSingleSpotGoods, '刷新');
      },
      // 批量刷新
      batchRefresh() {
        this.doBatch(this.$api.refreshSpotGoods, '刷新');
      },
      // 单个下架
      getOff(item) {
        this.doSimple(item, this.$api.removeSingleSpotGoods, '下架');
      },
      // 批量下架
      batchGetoff() {
        this.doBatch(this.$api.removeSpotGoods, '下架');
      },
      // 单个修改、上架
      edit(item, t, b) {
        this.uploadStr.title = t;
        this.uploadStr.btn = b;
        let itemFu = cloneDeep(item);
        itemFu.uuId = getuuId();
        itemFu.isOk = true;
        delete itemFu.check
        this.editList.push(itemFu);
        item.tip = false;
        this.uploadShow = true;
      },
      // 批量修改、上架
      batchEdit(t, b) {
        let maxOk = this.batchLength <= 5;
        if (this.batchCan && maxOk) {
          this.uploadStr.title = t;
          this.uploadStr.btn = b;
          this.mapUuid();
          this.uploadShow = true;
        } else {
          this.$Message.warning('批量修改数据上限为5条！');
        }
      },
      // 批量调价
      batchModify() {
        if (this.batchCan) {
          this.mapUuid();
          this.modifyPriceShow = true;
        } else {
          this.$Message.warning('请先选择要操作的数据!');
        }
      },
      // 单个删除
      del(item) {
        this.doSimple(item, this.$api.deleteSingleSpotGoods, '删除');
      },
      //批量删除
      batchDelete() {
        this.doBatch(this.$api.deleteSpotGoods, '删除');
      },
      // 批量操作公共方法
      doBatch(api, str) {
        if (this.batchCan) {
          this.$Modal.confirm({
            title: str + "确认",
            content: "是否确认" + str + "？",
            onOk: () => {
              this.$Spin.show()
              this.$http.post(api, {
                storeInfoIds: this.batchIds
              }).then(res => {
                if (res.code === 1000) {
                  this.getList();
                  this.$Spin.hide();
                  this.$Message.success('已' + str);
                }
              })
            }
          })
        } else {
          this.$Message.warning('请先选择要操作的数据！');
        }
      },
      // 单个操作公共方法
      doSimple(item, api, str) {
        this.$Modal.confirm({
          title: str + "确认",
          content: "是否确认" + str + "？",
          onOk: () => {
            this.$http.post(api, {
              id: item.id
            }).then(res => {
              if (res.code === 1000) {
                item.tip = false;
                this.getList();
                this.$Message.success('已' + str);
              }
            })
          }
        })
      },
      // 给需要操作的数据添加uuId
      mapUuid() {
        let arr = cloneDeep(this.checkedItem);
        arr.map(el => {
          el.uuId = getuuId();
          el.isOk = true;
          delete el.check
        })
        this.editList = arr;
      }
    },
    created() {
      this.getList();
    }
  }
</script>


<style lang="less" scoped>
  @import url('../../../../assets/resources.less');
  .plan {
    .iron,
    .material,
    .surface,
    .proPlace,
    .tolerance {
      width: 77px;
    }
    .spec {
      width: 100px;
    }
    .metering {
      width: 70px;
    }
    .price {
      width: 110px;
    }
    .location {
      width: 80px;
    }
    .warehouse {
      width: 70px;
    }
    .plan-time {
      width: 95px;
    }
    .time {
      width: 100px;
    }
    .operation {
      width: 35px;
    }
  }
</style>
