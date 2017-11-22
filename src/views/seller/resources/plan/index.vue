<template>
  <div class="resource-container">
    <innerTitle>定开计划 </innerTitle>
    <listFilter v-model="filterData" ref="filter" @on-publish="uploadShow = true"></listFilter>
    <tableWrap v-model="page" :checkNum="checkedItem.length" :listNum="list.length" @check-all="checkAll">
      <div class="btn-group" slot="btns" v-show="filterData.status == 1">
        <a class="action-btn" @click="batchEdit">批量修改</a>
        <a class="action-btn" @click="batchRefresh">批量刷新</a>
        <a class="action-btn" @click="batchModify">批量调价</a>
        <a class="action-btn" @click="batchGetoff">批量下架</a>
      </div>
      <div class="btn-group" slot="btns" v-show="filterData.status == 0">
        <a class="action-btn" @click="batchShelves">批量上架</a>
        <a class="action-btn" @click="batchDelete">批量删除</a>
      </div>
      <div class="list-table-container plan">
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
            <div class="table-td price">
              单价（元/吨）
              <sortIcon v-model="sort.price" @on-sort="sort.time = ''"></sortIcon>
            </div>
            <div class="table-td location">所在地</div>
            <div class="table-td warehouse">仓库</div>
            <div class="table-td plan-time">计划开平时间</div>
            <div class="table-td time">
              更新时间
              <sortIcon v-model="sort.time" @on-sort="sort.price = ''"></sortIcon>
            </div>
            <div class="table-td operation">操作</div>
          </div>
        </div>
        <div class="table-tr" v-for="(item,i) in list" :key="item.id">
          <div class="padding-wrap">
            <div class="table-td ckeck-box">
              <span class="iconfont" @click="checkItem(i)" :class="item.check ? 'icon-check-box':'icon-check_box_unselecte'"></span>
            </div>
            <div class="table-td iron">{{ item.ironTypeName }}</div>
            <div class="table-td material">{{ item.materialName }}</div>
            <div class="table-td surface">{{ item.surfaceName }}</div>
            <div class="table-td proPlace">{{ item.proPlacesName }}</div>
            <div class="table-td spec">{{ `${item.height}*${item.width}*${item.length}` }}</div>
            <div class="table-td tolerance">{{ item.tolerance | emptyHlod }}</div>
            <div class="table-td metering">{{ item.measuringType | measuringStr }}</div>
            <div class="table-td price">{{ item.price }}</div>
            <div class="table-td location">{{ item.locationName }}</div>
            <div class="table-td warehouse">{{ item.storeHouseName }}</div>
            <div class="table-td plan-time">{{ item.remark }}</div>
            <div class="table-td time">{{ item.updateTime | dateformat('MM-dd hh:mm') }}</div>
            <div class="table-td operation">
              <Poptip v-model="item.tip" placement="left" trigger="hover" v-show="filterData.status == 1">
                <span class="iconfont icon-caozuo action"></span>
                <div slot="content" class="action-btns">
                  <div class="item" @click="refresh(item)">刷新</div>
                  <div class="item" @click="getOff(item)">下架</div>
                  <div class="item">修改</div>
                </div>
              </Poptip>
              <Poptip v-model="item.tip" placement="left" trigger="hover" v-show="filterData.status == 0">
                <span class="iconfont icon-caozuo action"></span>
                <div slot="content" class="action-btns">
                  <div class="item" @click="shelves(item)">上架</div>
                  <div class="item" @click="del(item)">删除</div>
                </div>
              </Poptip>
            </div>
          </div>
        </div>
      </div>
    </tableWrap>
    <upload v-model="uploadShow"></upload>
  </div>
</template>


<script>
  import innerTitle from '../common/innerTitle.vue'
  import listFilter from '../common/listFilter.vue'
  import tableWrap from '../common/tableWrap.vue'
  import sortIcon from '../common/sortIcon.vue'
  import upload from './parts/upload.vue'
  import cloneDeep from 'lodash/cloneDeep'
  import debounce from 'lodash/debounce'
  import filter from 'lodash/filter'
  export default {
    components: {
      innerTitle,
      listFilter,
      tableWrap,
      sortIcon,
      upload
    },
    data() {
      return {
        uploadShow: false, //上架弹窗
        list: [],
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
      // 是否可以批量操作
      batchCan() {
        return this.checkedItem.length > 0
      }
    },
    watch: {
      'apiParams': {
        handler: debounce(function(val, oldVal) {
          this.getList();
        }),
        deep: true
      }
    },
    methods: {
      // 获取列表
      getList() {
        this.$http.post(this.$api.dingKaiList, this.apiParams).then(res => {
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
      // 单个刷新
      refresh(item) {
        this.$http.post(this.$api.flushDingKaiSimple, {
          id: item.id
        }).then(res => {
          if (res.code === 1000) {
            item.tip = false;
            this.getList();
            this.$Message.success('已刷新');
          }
        })
      },
      // 批量刷新
      batchRefresh() {
        this.doBatch(() => {
          this.$http.post(this.$api.flushDingKai, {
            storeInfoIds: this.batchIds
          }).then(res => {
            if (res.code === 1000) {
              this.getList();
              this.$Spin.hide();
              this.$Message.success('已刷新');
            }
          })
        })
      },
      // 单个下架
      getOff(item) {
        this.$Modal.confirm({
          title: "确认下架？",
          content: "是否确认下架？",
          onOk: () => {
            this.$http.post(this.$api.downDingKaiSimple, {
              id: item.id
            }).then(res => {
              if (res.code === 1000) {
                item.tip = false;
                this.getList();
                this.$Message.success('已下架');
              }
            })
          }
        })
      },
      // 批量下架
      batchGetoff() {
        this.$Modal.confirm({
          title: "确认下架？",
          content: "是否确认下架？",
          onOk: () => {
            this.doBatch(() => {
              this.$http.post(this.$api.downDingKai, {
                storeInfoIds: this.batchIds
              }).then(res => {
                if (res.code === 1000) {
                  this.getList();
                  this.$Spin.hide();
                  this.$Message.success('已下架');
                }
              })
            })
          }
        })
      },
      // 单个修改
      edit() {},
      // 批量修改
      batchEdit() {},
      // 批量调价
      batchModify() {},
      //批量上架
      batchShelves() {
        // this.$Modal.confirm({
        //   title: "确认上架？",
        //   content: "是否重新上架？",
        //   onOk: () => {
        //     this.doBatch(() => {
        //       this.$http.post(this.$api.downDingKai, {
        //         storeInfoIds: this.batchIds
        //       }).then(res => {
        //         if (res.code === 1000) {
        //           this.getList();
        //           this.$Spin.hide();
        //           this.$Message.success('已下架');
        //         }
        //       })
        //     })
        //   }
        // })
      },
      // 单个删除
      del(item) {
        this.$Modal.confirm({
          title: "删除确认",
          content: "是否确认删除？",
          onOk: () => {
            this.$http.post(this.$api.deleteDingKaiSimple, {
              id: item.id
            }).then(res => {
              if (res.code === 1000) {
                item.tip = false;
                this.getList();
                this.$Message.success('已删除');
              }
            })
          }
        })
      },
      //批量删除
      batchDelete() {},
      // 批量操作判断
      doBatch(callback) {
        if (this.batchCan) {
          this.$Spin.show()
          callback();
        } else {
          this.$Message.warning('请先选择要操作的数据！');
        }
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
    .table-td {
      margin-right: 20px;
    }
    .iron {
      width: 57px;
    }
    .material {
      width: 69px;
    }
    .surface {
      width: 45px;
    }
    .proPlace {
      width: 57px;
    }
    .spec {
      width: 80px;
    }
    .tolerance {
      width: 57px;
    }
    .metering {
      width: 62px;
    }
    .price {
      width: 90px;
    }
    .location {
      width: 60px;
    }
    .warehouse {
      width: 80px;
    }
    .plan-time {
      width: 80px;
    }
    .time {
      width: 80px;
    }
    .operation {
      width: 50px;
    }
  }
</style>
