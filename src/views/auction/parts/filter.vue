<template>
    <div class="sreen-warp">
        <!-- 拍卖类型切换 -->
        <div class="switch-parts">
            <a class="item" :class="{ 'active': activeSwitch == i }" @click="pickAindex(item,i)" v-for="(item,i) in switchs" :key="i">{{ item}}</a>
        </div>
        <!-- 选中的筛选值展示 -->
        <div class="screen-body" :class="{'open': filterShow}">
            <div class="filter-items">
                <label class="filter-label label">全部结果:</label>
                <div class="item-tab" v-for="(item,i) in filterResults" :key="i">
                    {{ item.name }}:{{ item.label }} <span @click="delItem(i)" class="del">&times;</span>
                </div>
                <a @click="emptyFilters" v-show="filterResults.length > 0">清空</a>
    
                <div class="toggle-filter" @click="filterShow = !filterShow">
                    {{ filterShow ? '收起' : '展开' }}筛选
                    <i class="iconfont" :class="filterShow ? 'icon-up' : 'icon-down'"></i>
                </div>
            </div>
            <div class="filter-warp">
                <filterItem name="类型" :api="$api.goodsType" ref="goodsType" keyName="goodsType" @on-pick="filterOnPick"></filterItem>
                <filterItem name="品类" :api="$api.auctionIronType" ref="ironType" keyName="ironType" @on-pick="filterOnPick"></filterItem>
                <filterItem multi name="产地" :api="$api.auctionProPlace" ref="proPlace" keyName="proPlace" @on-pick="filterOnPick"></filterItem>
                <filterItem multi name="材质" :api="$api.auctionMaterial" ref="material" keyName="material" @on-pick="filterOnPick"></filterItem>
                <filterItem multi name="表面" :api="$api.auctionSurface" ref="surface" keyName="surface" @on-pick="filterOnPick"></filterItem>
                <div class="filter-item">
                    <label class="label">规格:</label>
                    <spec :showDeatil="isBj" ref="spec" @on-pick="speOnpick" @on-reset="specReset"></spec>
                </div>
                <filterItem multi name="仓库" :api="$api.auctionStoreHouse" ref="storeHouse" keyName="storeHouse" @on-pick="filterOnPick"></filterItem>
                <div class="filter-item">
                    <label class="label">所在地:</label>
                    <div class="ac-city-warp">
                        <cityPicker ref="cityPick" placeholder="请选择" v-model="city" @on-finsh="syncCity"></cityPicker>
                    </div>
                </div>
                <filterItem name="状态" :data="status" ref="status" keyName="status" @on-pick="filterOnPick"></filterItem>
            </div>
        </div>
    </div>
</template>

<script>
    import filterItem from './filterItem.vue'
    import cityPicker from './cityPicker.vue'
    import spec from './spec.vue'
    export default {
        components: {
            filterItem,
            cityPicker,
            spec
        },
        props: {
            params: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        data() {
            return {
                filterShow: true, //筛选展开，收起
                // 拍卖类型
                switchs: [],
                // 选中拍卖类型下标
                activeSwitch: 0,
                // 选中筛选集合
                filterResults: [],
                // 筛选器对外传递参数
                listParams: {
                    auctionIndex: '', //场次
                    goodsType: '', //货品类型
                    ironType: '', //品类
                    proPlace: '', //产地
                    material: '', //材质
                    surface: '', //表面
                    province: '', //省
                    city: '', //市
                    storeHouse: '', //仓库
                    specification: '', //规格
                    heightMin: '', //厚最小
                    heightMax: '', //厚最大
                    widthMin: '', //宽最小
                    widthMax: '', //宽最大m
                    lengthMin: '', //长最小
                    lengthMax: '', //长最大
                    status: '', //状态（ 1等待拍卖 2正在拍卖 3竞拍完成
                },
                status: ['等待拍卖', '正在拍卖', '已经结束'],
                city: []
            }
        },
        computed: {
            isBj() {
                return this.listParams.ironType == '不锈钢卷' || this.listParams.ironType == '不锈钢板' || this.listParams.ironType == ''
            }
        },
        watch: {
            listParams: {
                handler(cval, oval) {
                    let data = this.$clearData(cval);
                    data.status = this.status.findIndex(item => item == data.status) + 1 || '';
                    this.$emit('on-change', data)
                },
                deep: true
            }
        },
        methods: {
            delItem(i) {
                let key = this.filterResults[i].key;
                let fucName = this.filterResults[i].fucName;
                this.filterResults.splice(i, 1);
                // 处理城市等多个值得清空
                if (key.split(',').length > 1) {
                    key.split(',').forEach(k => {
                        this.listParams[k] = '';
                    })
                } else {
                    this.listParams[key] = '';
                }
    
                // 子组件的清空
                if (this.$refs[key]) {
                    this.$refs[key].init();
                } else {
                    this[fucName]();
                }
            },
            emptyFilters() {
                this.filterResults.forEach((item, i) => {
                    let key = this.filterResults[i].key;
                    let fucName = this.filterResults[i].fucName;
                    // 处理城市等多个值得清空
                    if (key.split(',').length > 1) {
                        key.split(',').forEach(k => {
                            this.listParams[k] = '';
                        })
                    } else {
                        this.listParams[key] = '';
                    }
    
                    if (this.$refs[key]) {
                        this.$refs[key].init();
                    } else {
                        this[fucName]();
                    }
                })
                this.filterResults = [];
            },
            //选中筛选条件
            filterOnPick(item) {
                if (this.filterResults.length > 0) {
                    let inSide = this.filterResults.findIndex(el => el.key == item.key);
                    if (inSide >= 0) {
                        for (let key in this.filterResults[inSide]) {
                            this.filterResults[inSide][key] = item[key]
                        }
                    } else {
                        this.filterResults.push(item)
                    }
                } else {
                    this.filterResults.push(item)
                }
                this.listParams[item.key] = item.label;
            },
            //规格选择
            speOnpick(data) {
                let height = '厚：' + this.assemble(data.heightMin,data.heightMax);
                let width = '宽：' + this.assemble(data.widthMin,data.widthMax);
                let length = '长：' + this.assemble(data.lengthMin,data.lengthMax);
                let item = {
                    label: data.specification != '' ? data.specification : `${height} ${width} ${length}`,
                    key: "specification,heightMin,heightMax,widthMin,widthMax,lengthMin,lengthMax",
                    name: "规格",
                    isCheck: false,
                    fucName: 'resetSpec'
                }
                if (this.filterResults.length > 0) {
                    let inSide = this.filterResults.findIndex(el => el.key == item.key);
                    if (inSide >= 0) {
                        for (let key in this.filterResults[inSide]) {
                            this.filterResults[inSide][key] = item[key]
                        }
                    } else {
                        this.filterResults.push(item)
                    }
                } else {
                    this.filterResults.push(item)
                }

                for (let key in data) {
                    this.listParams[key] = data[key];
                }
                
            },
            //规格重置
            specReset(data){
                let inSide = this.filterResults.findIndex(el => el.key == "specification,heightMin,heightMax,widthMin,widthMax,lengthMin,lengthMax" );
                if(inSide >=0)
                    this.filterResults.splice(inSide, 1);

                for (let key in data) {
                    this.listParams[key] = data[key];
                }   
            },
            // 拼装规格
            assemble(min,max){
                if(min != '' && max != ''){
                    return min + '-' + max
                }else if(min != '' && max == ''){
                    return '>=' + min
                }else if(min == '' && max != ''){
                    return '0-'+ max
                }else{
                    return ''
                }
            },
            // 选择场次
            pickAindex(item, i) {
                this.activeSwitch = i;
                this.listParams.auctionIndex = item;
            },
            getAcutionIndex() {
                this.$http.post(this.$api.acutionIndex).then(res => {
                    if (res.code == 1000) {
                        this.switchs = res.data;
                        this.listParams.auctionIndex = res.data[0] || '';
                    }
                })
            },
            //同步城市数据
            syncCity(arr) {
                this.listParams.province = arr[0].name;
                this.listParams.city = arr[1].name;
                this.filterResults.push({
                    label: `${arr[0].name};${arr[1].name}`,
                    key: "province,city",
                    name: "所在地",
                    isCheck: false,
                    fucName: 'resetCity'
                });
            },
            resetCity() {
                this.city = [];
                this.$refs.cityPick.init();
            },
            resetSpec() {
                this.listParams.specification = '';
                this.listParams.heightMin = '';
                this.listParams.heightMax = '';
                this.listParams.widthMin = '';
                this.listParams.widthMax = '';
                this.listParams.lengthMin = '';
                this.listParams.lengthMax = '';
                this.$refs.spec.init();
            }
        },
        created() {
            this.getAcutionIndex();
        },
    }
</script>



<style lang="less">
    @import url('../../../assets/base.less');
    .sreen-warp {
        width: 100%;
        height: auto;
        background-color: #fff;
        .switch-parts {
            .flex-block;
            width: 100%;
            height: 40px;
            border-bottom: 2px solid @dark_blue;
            .item {
                display: block;
                width: 96px;
                height: 100%;
                text-align: center;
                line-height: 38px;
                color: @f_ligth;
                font-size: 14px;
                &.active {
                    background-color: @dark_blue;
                    color: #fff;
                }
            }
        }
        .screen-body {
            width: 100%;
            height: auto;
            padding: 0 16px 0 16px;
            font-size: 12px;
            .filter-warp {
                display: none;
            }
            .filter-items {
                position: relative;
                width: 100%;
                min-height: 40px;
                line-height: 40px;
                padding: 0 148px 0 75px;
                .toggle-filter {
                    position: absolute;
                    display: inline-block;
                    right: 10px;
                    top: 8px;
                    height: 24px;
                    line-height: 22px;
                    border: @b_d1;
                    color: @f_ligth;
                    padding: 0 8px;
                    cursor: pointer;
                    .iconfont {
                        font-size: 12px;
                    }
                }
                .filter-label {
                    position: absolute;
                    left: 0;
                }
                .item-tab {
                    display: inline-block;
                    width: auto;
                    height: 22px;
                    line-height: 20px;
                    background-color: #f5f5f5;
                    border: @b_d1;
                    padding: 0 8px;
                    color: #666;
                    .borderRadius;
                    margin-right: 4px;
                    .del {
                        position: relative;
                        top: -1px;
                        cursor: pointer;
                        font-size: 14px;
                        &:hover {
                            color: red
                        }
                    }
                }
            }
            &.open {
                padding: 0 16px 16px 16px;
                .filter-warp {
                    display: block;
                }
                .filter-items {
                    border-bottom: @b_d1;
                }
            }
        }
        .label {
            color: @f_goast;
        }
        .filter-item {
            position: relative;
            width: 100%;
            min-height: 24px;
            line-height: 24px;
            padding: 0 148px 0 75px;
            margin-top: 16px;
            &.in-multi {
                height: auto;
            }
            .label {
                position: absolute;
                left: 5px;
                color: @f_goast;
            }
            .ac-city-warp {
                width: 224px;
                border: @b_d1;
                height: 24px;
                line-height: 22px;
                cursor: pointer;
            }
            .item {
                display: inline-block;
                margin-right: 32px;
                color: #666;
                cursor: pointer;
                &:hover,
                &.active {
                    color: @dark_blue;
                }
                .iconfont {
                    position: relative;
                    top: 1px;
                }
            }
            .show-more {
                position: absolute;
                right: 0;
                top: 0;
                color: @dark_blue;
                cursor: pointer;
            }
            .multi-btn {
                position: absolute;
                right: 100px;
                top: 0;
            }
            .multi-btns {
                width: 100%;
                height: 24px;
                line-height: 24px;
                text-align: center;
            }
            .filter-btn {
                display: inline-block;
                width: 52px;
                height: 24px;
                line-height: 22px;
                text-align: center;
                font-size: 12px;
                color: @f_ligth;
                border: @b_d1;
                &.primary {
                    background-color: @dark_blue;
                    border-color: @dark_blue;
                    color: #fff;
                }
            }
        }
    }
</style>
