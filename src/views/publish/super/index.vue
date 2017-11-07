<style lang="less" scoped>
  @import '../../../assets/base.less';
  .punlish-container {
    .list-content {
      width: 100%;
      font-size: 14px;
      border: @b_d1;
      background-color: #fff;
      .borderRadius;
      .row {
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: @f_dark;
        padding: 0 30px;
        border-bottom: @b_d1;
        &.head {
          color: @f_goast;
        }
        &.no-border-b {
          border-bottom: 0;
        }
        li {
          float: left;
          height: 100%;
          margin-left: 20px;
          .ellipsis;
          &:first-child {
            margin-left: 0;
          }
        }
        .checkbox {
          width: 18px;
          line-height: 16px!important;
          .warp {
            width: 18px;
            height: 18px;
            margin-top: 15px;
            background-color: #eee;
            border: @b_d1;
            border-color: #eee;
            .borderRadius;
            .iconfont {
              opacity: 0;
              font-size: 12px;
              color: #fff;
            }
            &:hover {
              border: @b_d1;
            }
            &.checked {
              background-color: @dark_blue;
              border-color: @dark_blue!important;
              .iconfont {
                opacity: 1;
              }
            }
          }
        }
        .souse {
          width: 70px;
        }
        .type {
          width: 130px;
        }
        .material {
          width: 100px;
        }
        .surface {
          width: 60px;
        }
        .specifica {
          width: 110px;
        }
        .tolerance {
          width: 80px;
        }
        .quantity {
          width: 60px;
        }
        .manufacturer {
          width: 70px;
        }
        .desc {
          .transition(width);
          width: 300px;
        }
      }
    }
    .add-row {
      width: 100%;
      height: 50px;
      line-height: 50px;
      margin-top: 10px;
      background-color: #fff;
      text-align: center;
      cursor: pointer;
      overflow: hidden;
      color: @mask_blue;
      border: 1px dashed @mask_blue;
      .borderRadius;
      &:hover {
        background-color: @goast_blue;
        color: @mask_blue;
      }
    }
    .action-bar {
      width: 100%;
      margin-top: 10px;
      text-align: right;
      .btn {
        display: inline-block;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #fff;
        background-color: @dark_blue;
        margin: 0 10px;
        cursor: pointer;
        .borderRadius;
        .noselect;
        &.goast {
          background: none;
          color: @dark_blue;
        }
      }
    }
    .list-item {
      .right-btn {
        position: absolute;
        width: 0;
        height: 48px;
        line-height: 50px;
        overflow: hidden;
        right: 20px;
        top: 0;
        background-color: #fff;
        .transition(width);
        .iconfont {
          font-size: 20px;
          margin-left: 10px;
          cursor: pointer;
        }
        .icon-bianji {
          color: @light_green;
        }
        .icon-fuzhi {
          color: @light_yellow;
        }
        .icon-shanchu {
          color: @dark_red;
        }
      }
    }
    .pr {
      position: relative;
      cursor: pointer;
      &:hover {
        background-color: @goast_blue;
        .right-btn {
          background-color: @goast_blue;
          width: 100px;
        }
        .desc {
          width: 200px;
        }
      }
    }
  }
  
  .success-content {
    text-align: center;
    font-size: 14px;
    .iconfont {
      font-size: 75px;
      color: @light_green;
    }
    p {
      color: @f_dark;
    }
  }
  
  .search-shop {
    width: 100%;
    height: 80px;
    input {
      margin-top: 10px;
      outline: 0;
      line-height: 40px;
      font-size: 18px;
    }
  }
</style>

<template>
  <div class="punlish-container inner-container">
    <div class="search-shop">
      <input type="text" v-model="shopMobile"> <a class="btn" style="font-size:18px" @click="queryShop">查询</a>
      <span v-show="ajaxDone&&shopDone" class="iconfont icon-guanggaolanyouhua02" style="color:green"></span>
      <span v-show="ajaxDone&&!shopDone" class="iconfont icon-close" style="color:red"></span>
    </div>
    <div class="list-content">
      <ul class="row head clearfix" v-show="headShow">
        <li class="checkbox"></li>
        <li class="souse">货源地</li>
        <li class="type">品名</li>
        <li class="material">材质</li>
        <li class="surface">表面</li>
        <li class="specifica">规格</li>
        <li class="tolerance">公差</li>
        <li class="quantity">数量</li>
        <li class="quantity">重量</li>
        <li class="manufacturer">产地</li>
        <li class="desc">备注</li>
      </ul>
      <div class="list-body">
        <div class="list-item" v-for="(item,index) in list" :key="index" :class="{'pr': item.save && !item.edit}">
          <ul class="row clearfix" v-show="item.save && !item.edit" :class="{'no-border-b':index == list.length -1}">
            <li class="checkbox">
              <div class="warp" :class="{'checked':item.check}" @click="item.check = !item.check;">
                <span class="iconfont icon-duigou"></span>
              </div>
            </li>
            <li class="souse">{{ item.data.locationName }}</li>
            <li class="type">{{ item.data.ironTypeName }}</li>
            <li class="material">{{ item.data.materialName }}</li>
            <li class="surface">{{ item.data.surfaceName }}</li>
            <li class="specifica">{{ item.data.specifications != '' ? item.data.specifications : `${item.data.height}*${item.data.width}*${item.data.length}`}}</li>
            <li class="tolerance">{{ item.data.tolerance | emptyHlod }}</li>
            <li class="quantity">{{ item.data.numbers != '' ? `${item.data.numbers}${item.data.numberUnit}`: '—'}}</li>
            <li class="quantity">{{ item.data.weights != '' ? `${item.data.weights}${item.data.weightUnit}`: '—'}}</li>
            <li class="manufacturer">{{ item.data.proPlacesName }}</li>
            <li class="desc">{{ item.data.remark | emptyHlod }}</li>
          </ul>
          <div class="right-btn">
            <span class="iconfont icon-bianji" @click="editItem(item,index)"></span>
            <span class="iconfont icon-fuzhi" @click="copyItem(item)"></span>
            <span class="iconfont icon-shanchu" @click="confirmDel(index)"></span>
          </div>
          <editItem ref="ei" :class="{'exception-bg':needException}" v-if="!item.save || item.edit" :data="item.data" @on-save="itemSave" @on-close="itemClose" @on-publish="itemPublish"></editItem>
        </div>
      </div>
    </div>
    <div class="add-row" @click="addNew()" v-show="!isEditShow && isMax">新增一条</div>
    <div class="action-bar" v-show="!isEditShow">
      <a class="btn goast" @click="checkAll">{{ checkItems.length == list.length ? '全不选' :'全选' }}</a>
      <a class="btn goast" @click="removeSome">批量删除</a>
      <a class="btn" style="width: 110px" @click="publishSome">发布{{ checkItems.length > 0 ? `(${checkItems.length})` : '' }}</a>
    </div>
  </div>
</template>

<script>
  import editItem from '../iron/pareParts/editItem.vue'
  const initialItem = {
    check: false,
    save: false,
    edit: false,
    data: {
      id: '',
      locationId: '',
      locationName: '',
      ironTypeId: '',
      ironTypeName: '',
      materialId: '',
      materialName: '',
      surfaceId: '',
      surfaceName: '',
      proPlacesId: '',
      proPlacesName: '',
      height: '',
      width: '',
      length: '',
      specifications: '',
      tolerance: '',
      numbers: '',
      weights: '',
      numberUnitId: '',
      weightUnitId: '',
      numberUnit: '件',
      weightUnit: '吨',
      remark: '',
      timeLimit: '86400000',
      appFlag: 1
    }
  }
  export default {
    components: {
      editItem
    },
    data() {
      return {
        activeIndex: 0,
        list: [],
        shopMobile: '',
        shopDone: false,
        ajaxDone: false,
        apiData: {
          userId: '',
          name: ''
        }
      }
    },
    computed: {
      loginId() {
        return this.$route.params.loginId
      },
      //是否查询到商户
      isShopOk() {
        return this.apiData.userId != '' && this.apiData.name != '' && this.shopDone && this.ajaxDone
      },
      // 是否显示表头,list中有保存的数据时才有
      headShow() {
        return this.list.find(el => {
          return el.save
        })
      },
      // 是否有编辑框存在,显示添加按钮用,只要有未保存或者在编辑的，就不返回false
      isEditShow() {
        let item = this.list.find(el => {
          return !el.save || el.edit
        })
        return item != undefined
      },
      // 总条数
      totleNum() {
        return this.list.length
      },
      //是否条数到达上限
      isMax() {
        return this.totleNum < 6
      },
      // 选中数据
      checkItems() {
        let checkItem = _.filter(this.list, 'check', true);
        let apiList = [];
        checkItem.forEach(item => {
          apiList.push(item.data);
        })
        return apiList;
      },
      // 编辑框是否需要隔离色
      needException() {
        return this.totleNum > 1
      },
      // 当前操作item
      activeItem() {
        return this.list[this.activeIndex] || {}
      }
    },
    methods: {
      //查询是否为商家
      queryShop() {
        this.$http.post(this.$api.isShop, {
          mobile: this.shopMobile
        }).then(res => {
          this.ajaxDone = true;
          if (res.code === 1000) {
            this.shopDone = true;
            this.apiData.userId = res.data.userId;
            this.apiData.name = res.data.name;
          } else {
            this.shopDone = false;
          }
        })
      },
      // 保存
      itemSave(item) {
        this.activeItem.data = item;
        this.activeItem.save = true;
        this.activeItem.edit = false;
        this.updateStorge();
        this.$Message.success('已保存!');
      },
      // 取消
      itemClose(item) {
        if (this.activeItem.save) {
          // 取消编辑内容
          this.activeItem.edit = false;
        } else {
          if (this.needException) {
            this.deleteItem(this.activeIndex);
          } else {
            this.$router.push({
              name: 'Bbuys',
              params: {
                isToday: 1
              }
            });
          }
        }
      },
      // 单个发布后回调
      itemPublish(item) {
        if (this.isShopOk) {
          item.userId = this.apiData.userId;
          item.name = this.apiData.name;
          item.bgId = this.loginId;
          this.$spinToggle(true);
          this.$http.post(this.$api.superPublishOne, item).then(res => {
            this.$spinToggle(false);
            if (res.code === 1000) {
              // 如果有超过1条的数据，就是发布后列表中还有数据存在
              if (this.needException) {
                // 直接发布，删除数据
                this.deleteItem(this.activeIndex);
              } else {
                this.refalshList();
              }
              this.updateStorge();
            } else {
              this.$Message.error(res.message)
            }
          })
        } else {
          this.$Message.error('请确保商户账号存在！')
        }
      },
      // 编辑
      editItem(item, index) {
        // 如果其他东西在编辑或者在添加，不处理
        if (this.isEditShow) return false
  
        this.activeIndex = index;
        item.edit = true;
      },
      // 复制
      copyItem(item) {
        // 如果有编辑或者添加，或者超过条数上限，不处理
        if (!this.isMax) {
          this.$Message.warning('最多同时存在6条求购！')
          return false
        }
        let copyItem = _.cloneDeep(item);
        copyItem.save = false;
        if (this.isEditShow) {
          this.list.pop();
          this.$nextTick(() => {
            this.list.push(copyItem)
          })
          return false
        }
        this.addNew(copyItem);
      },
      // 删除
      deleteItem(index) {
        this.list.splice(index, 1);
        if (this.list.length == 0)
          this.addNew();
        this.updateStorge();
      },
      confirmDel(index) {
        this.$Modal.confirm({
          title: '是否要删除？',
          content: '删除后将无法撤销，是否继续？',
          onOk: () => {
            this.deleteItem(index)
          }
        });
      },
      // 新增一条
      addNew(item = initialItem) {
        if (this.isMax) {
          let data = _.cloneDeep(item);
          // data.data.id = 'id' + new Date().getTime();
          data.save = false;
          data.edit = false;
          data.check = false;
          this.activeIndex = this.list.length;
          this.list.push(data);
        }
      },
      // 全选
      checkAll() {
        let isCheckAll = true;
        this.list.forEach(el => {
          if (!el.check) {
            isCheckAll = false;
          }
        })
        if (isCheckAll) {
          this.list.map(item => {
            item.check = false;
          })
        } else {
          this.list.map(item => {
            item.check = true;
          })
        }
      },
      //批量删除
      removeSome() {
        this.$Modal.confirm({
          title: '是否要删除？',
          content: '删除后将无法撤销，是否继续？',
          onOk: () => {
            let listData = this.$clearData(this.list);
            this.list = _.filter(listData, function(el) {
              return !el.check
            });
            if (this.list.length == 0)
              this.addNew();
            this.updateStorge();
            this.$Message.success("已删除");
          }
        });
      },
      // 批量发布
      publishSome() {
        if (this.checkItems.length > 0 && this.isShopOk) {
          this.$spinToggle(true);
          this.$http.post(this.$api.superPublishAll, {
            userId: this.apiData.userId,
            name: this.apiData.name,
            bgId: this.loginId,
            ironBuyInfos: JSON.stringify(this.checkItems)
          }).then(res => {
            this.$spinToggle(false);
            if (res.code === 1000) {
              let listData = this.$clearData(this.list);
              this.list = _.filter(listData, function(el) {
                return !el.check
              });
              this.updateStorge();
              // 发布成功提示
              if (this.list.length <= 0)
                this.refalshList();
            } else {
              this.$Message.error(res.message);
            }
          })
        } else {
          this.$Message.error('请勾选您想发布的求购,请确保商户账号存在!');
        }
      },
      // 保存数据到本地
      updateStorge() {
        let listData = this.$clearData(this.list);
        let willSave = _.filter(listData, function(el) {
          return el.save;
        });
        this.$ls.set('super_publishList', willSave);
      },
      // 跳转到其他页面
      jumpTo() {
        this.$router.push({
          name: 'Bbuys',
          params: {
            isToday: 1
          }
        })
      },
      refalshList() {
        //发布之后把数据重置为添加状态
        this.activeIndex = 0;
        this.list = [];
        this.list.push(_.cloneDeep(initialItem));
        setTimeout(() => {
          this.$refs.ei[0].initItem();
        }, 300);
      }
    },
    created() {
      this.list = this.$ls.get('super_publishList') != null ? this.$ls.get('super_publishList') : [];
      if (this.list.length == 0)
        this.addNew();
    }
  }
</script>




