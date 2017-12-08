<template>
    <div>
        <div class="oc-business-info">
            <div class="inner">
                签约公司：{{ businessInfo.companyName }}
                <merchantLabel :faith="businessInfo.isFaithUser == '1'" :guarantee="businessInfo.isGuaranteeUser == '1'"></merchantLabel>
                <crown class="mr-80" :level='type == 2 ? businessInfo.buyLevel : businessInfo.sellLevel'></crown>
                <qq :data="{name:businessInfo.contact,phone:businessInfo.contactNum,qq:businessInfo.QQ}"></qq>
            </div>
        </div>
        <div class="oc-search">
            <div class="search-input">
                <input type="text" v-model="apiData.orderId" placeholder="请输入订单号搜索" />
                <a @click="search">搜索</a>
            </div>
            <div class="time-limit">
                成交时间：
                <DatePicker type="daterange" placement="bottom-end" v-model="dateTime" placeholder="选择时间" style="width: 190px"></DatePicker>
            </div>
            <div class="store-type">
                订单类型：
                <tbSelect style="width: 190px" v-model="apiData.storeType" :data='storeTypes'></tbSelect>
            </div>
            <div class="btns">
                <a class="btn" @click="search">搜索</a>
                <a class="btn goast" @click="reset">清空条件</a>
            </div>
        </div>
        <div class="oc-table">
            <Spin fix v-show="listLoad"></Spin>
            <table class="header-table">
                <tr>
                    <th class="ckeck-box">
                        <span class="iconfont" :class="checkedItem.length == list.length ? 'icon-check-box' : 'icon-check_box_unselecte'" @click="checkAll"></span>
                    </th>
                    <th class="info">货品详情</th>
                    <th class="measure">计量方式</th>
                    <th class="price">单价(元/吨)</th>
                    <th class="num">数量(吨)</th>
                    <th class="totle">总金额(元)</th>
                    <th class="location">所在地</th>
                    <th class="warehouse">仓库</th>
                    <th class="state">订单状态</th>
                    <th class="operation">订单类型</th>
                </tr>
            </table>
            <div class="oc-page">
                <Page class="no-color line-page" show-total size="small" :total="totalCount" :current.sync="apiData.currentPage" :page-size="apiData.pageSize" @on-change="getList"></Page>
            </div>
            <table class="item-table" v-for="(item,i) in list" :key="item.id">
                <tr>
                    <th class="ckeck-box">
                        <span class="iconfont" @click="checkItem(i)" :class="item.check ? 'icon-check-box':'icon-check_box_unselecte'"></span>
                    </th>
                    <th colspan="9" class="item-title">
                        <span class="mr-80">{{ item.updateTime | dateformat('yyyy-MM-dd hh:mm:ss') }}</span>
                        <span class="mr-80">订单号：{{ item.id }}</span> {{ item.companyName }}
                    </th>
                </tr>
                <tr>
                    <td class="ckeck-box bo-b"></td>
                    <td class="info bo-b">
                        {{ item.ironTypeName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ `${item.materialName}/${item.surfaceName}` }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.proPlacesName }}<br> {{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length}`
                        }} &nbsp;&nbsp;&nbsp;&nbsp;{{ item.tolerance | emptyHlod('') }}
                    </td>
                    <td class="measure bo-b">{{ item.measuringType | measuringStr }}</td>
                    <td class="price bo-b">&yen;{{ item.price }}</td>
                    <td class="num">x{{ item.storeType == 0 ? item.weights != '' ? item.weights : item.numbers : item.nums }}</td>
                    <td class="totle">&yen;{{ item.allPrice }}</td>
                    <td class="location">{{ item.locationName }}</td>
                    <td class="warehouse">{{ item.storeHouseName }}</td>
                    <td class="state">已完成</td>
                    <td class="operation">{{ item.storeType | storeTypeStr }}</td>
                </tr>
            </table>
            <div class="empty" v-show="totalCount <= 0">
                <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/no-list.png">
            </div>
        </div>
        <div class="oc-step2-bottom">
            <a class="back" @click="$router.go(-1)">返回上一步</a>
            <div class="next-step">
                已经选中<span>{{ checkedItem.length }}</span>条
                <a class="go-next" @click="goNext">下一步，确认订单内容</a>
            </div>
        </div>
    </div>
</template>

<script>
    import crown from '@/components/basics/crown/index.vue'
    import qq from '@/components/business/qqContant/index.vue'
    import merchantLabel from '@/components/business/merchantLabel/index.vue'
    import tbSelect from '@/components/business/tbSelect/index'
    import filter from 'lodash/filter'
    export default {
        components: {
            crown,
            qq,
            merchantLabel,
            tbSelect
        },
        data() {
            return {
                listLoad: false,
                list: [],
                totalCount: 0,
                apiData: {
                    sellId: "",
                    currentPage: 1,
                    pageSize: 10,
                    type: "",
                    orderId: '',
                    storeType: ""
                },
                dateTime: ['', ''],
                storeTypes: [{
                    label: "所有类型",
                    value: ""
                }, {
                    label: "实单求购",
                    value: "0"
                }, {
                    label: "现货资源",
                    value: "1"
                }, {
                    label: "定开计划",
                    value: "2"
                }, {
                    label: "特价资源",
                    value: "3"
                }],
                businessInfo: {}
            }
        },
        computed: {
            timeFrame() {
                return {
                    startTime: this.dateTime[0] != '' ? new Date(this.dateTime[0]).getTime() : '',
                    endTime: this.dateTime[1] != '' ? new Date(this.dateTime[1]).getTime() : ''
                }
            },
            type() {
                return this.$route.params.type
            },
            sellId() {
                return this.$route.params.sellId
            },
            // check项
            checkedItem() {
                return filter(this.list, el => {
                    return el.check
                })
            },
            checkedItemId(){
                let arr = [];
                this.checkedItem.forEach(el => {
                    arr.push(el.id)
                })
                return arr
            }
        },
        methods: {
            // 获取合同签约方列表
            getList() {
                this.listLoad = true;
                this.apiData.type = this.type;
                this.apiData.sellId = this.sellId;
                let params = this.$clearData(Object.assign(this.apiData, this.timeFrame));
                this.$http.post(this.$api.queryContractOrderPage, params).then(res => {
                    if (res.code === 1000) {
                        let list = res.data.list;
                        list.map(item => {
                            item.check = false;
                            item.tip = false;
                        })
                        this.list = list;
                        this.totalCount = res.data.totalCount;
                    }
                    this.listLoad = false;
                })
            },
            getBusinessInfo(id) {
                return this.$http.post(this.$api.queryUserInfo, {
                    userId: id
                }).then(res => {
                    if (res.code === 1000) {
                        this.businessInfo = res.data;
                    }
                })
            },
            search() {
                this.apiData.currentPage = 1;
                this.getList();
            },
            reset() {
                this.dateTime = ['', ''];
                this.apiData.storeType = '';
                this.apiData.orderId = '';
                this.search();
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
            goNext() {
                if (this.checkedItem.length > 0) { 
                    this.saveContractInfo();  
                    this.$router.push({
                        name: this.type == 1 ? 'Bstep3' : 'Sstep3',
                        params: {
                            type: this.type
                        }
                    })
                }else{
                    this.$Message.warning('请选择订单！');
                }
            },
            // 本地保存合同信息
            saveContractInfo(){
                this.$ls.set('contractInfo', this.$clearData({
                    partBId: this.sellId, //乙方ID
                    partAContractId: '', //甲方ID
                    orderIds: this.checkedItemId, //订单ids
                }));
            }
        },
        created() {
            this.getList()
            this.getBusinessInfo(this.sellId)
        }
    }
</script>


<style lang="less">
    @import url('../../assets/base.less');
    .oc-business-info {
        width: 100%;
        height: 40px;
        padding: 0 20px;
        margin-top: 10px;
        .inner {
            width: 100%;
            height: 100%;
            line-height: 38px;
            padding: 0 10px;
            background-color: @goast_blue;
            border: 1px solid @mask_blue;
            font-size: 14px;
            color: @dark_blue;
            font-weight: bold;
        }
    }
    
    .oc-search {
        position: relative;
        width: 100%;
        height: 34px;
        margin: 20px 0;
        padding: 0 20px;
        .search-input {
            display: inline-block;
            width: 280px;
            height: 34px;
            border: @b_d1;
            background-color: @goast_gray;
            margin-right: 30px;
            input {
                display: inline-block;
                width: 200px;
                height: 100%;
                border: 0;
                margin: 0;
                outline: none;
                padding: 0 12px;
                border-right: @b_d1;
                background-color: #fff;
            }
            a {
                display: inline-block;
                width: 70px;
                height: 100%;
                text-align: center;
                color: @f_goast;
            }
        }
        .time-limit,
        .store-type {
            display: inline-block;
            width: 270px;
        }
        .btns {
            float: right;
            .btn {
                display: inline-block;
                width: 90px;
                height: 32px;
                line-height: 28px;
                border: 2px solid @dark_blue;
                color: #fff;
                text-align: center;
                background-color: @dark_blue;
            }
            .goast {
                background-color: #fff;
                color: @dark_blue;
                margin-left: 20px;
            }
        }
    }
    
    .oc-table {
        position: relative;
        width: 100%;
        padding: 0 20px;
        color: @f_dark;
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
            margin-bottom: 12px;
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
        .ckeck-box {
            width: 40px;
            .iconfont {
                color: @back_gray;
                font-size: 18px;
                cursor: pointer;
                vertical-align: sub;
                background-color: @goast_gray;
                &:hover {
                    color: @light_blue;
                }
                &.icon-check-box {
                    color: @light_blue;
                }
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
                &:hover {
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
        .bottom-bar {
            width: 100%;
            text-align: right;
            margin: 20px 0;
        }
    }
    
    .oc-page {
        width: 100%;
        text-align: right;
        padding: 0 20px;
        margin: 8px 0;
    }
    
    .empty {
        width: 100%;
        min-height: 270px;
        text-align: center;
        background-color: #fff;
        img {
            display: inline-block;
            width: 230px;
            margin-top: 20px;
        }
    }
    
    .oc-step2-bottom {
        width: 100%;
        height: 34px;
        margin-top: 20px;
        padding: 0 20px;
        font-size: 14px;
        .noselect;
        .back {
            display: inline-block;
            width: 120px;
            height: 34px;
            line-height: 32px;
            border: 1px solid @dark_blue;
            color: @dark_blue;
            text-align: center;
            background-color: #fff;
        }
        .next-step {
            float: right;
            font-size: 12px;
            span {
                color: @dark_blue;
                margin: 0 5px;
                font-weight: bold;
            }
            .go-next {
                display: inline-block;
                width: 180px;
                height: 34px;
                margin-left: 10px;
                line-height: 32px;
                border: 1px solid @dark_blue;
                color: #fff;
                font-size: 14px;
                text-align: center;
                background-color: @dark_blue;
            }
        }
    }
</style>
