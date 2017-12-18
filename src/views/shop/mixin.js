import tableWrap from '@/views/market/common/tableWrap.vue'
import exponentia from '@/views/market/common/exponentia.vue'
import purchasePanel from '@/views/market/common/purchasePanel.vue'
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        tableWrap,
        exponentia,
        purchasePanel
    },
    data() {
        return {
            purchaseShow: false,
            listLoad: false,
            openStatus: false, //是否开市
            list: [],
            apiData: {
                userId: '',
                storeType: 1,
                searchName: ""
            },
            page: {
                totleCount: 10,
                pageSize: 20,
                currentPage: 1,
                priceSort: ""
            },
            businessInfo: {}, //商家信息
            pickerItem: {}
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'roleId']),
        queryParams() {
            return Object.assign(this.apiData, this.page);
        },
        purchaseItem() {
            return Object.assign(this.businessInfo, this.pickerItem)
        },
        userId() {
            return this.$route.params.id
        },
        storeType() {
            return this.$route.params.type
        },
        searchName() {
            return this.$route.query.search
        }
    },
    watch: {
        'page.currentPage': {
            handler: function(val, oldVal) {
                this.getData();
            },
            deep: true
        },
        searchName(val) {
            this.getData();
        }
    },
    methods: {
        search(data) {
            this.filterValue = data;
            this.page.currentPage = 1;
            this.getData();
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
        // 采购
        purchase(id, item) {
            // 判断是否登录
            if (this.isLogin) {
                let itemObj = this.$clearData(item);
                itemObj.userId = id;
                this.pickerItem = itemObj;
                this.getBusinessInfo(id).then(() => {
                    this.purchaseShow = true;
                });
            } else {
                this.$Modal.confirm({
                    content: '您还没有登录，请登录',
                    onOk: () => {
                        this.$router.replace({
                            path: '/login',
                            query: {
                                redirect: this.$route.fullPath
                            }
                        })
                    }
                })
            }
        },
        getData() {
            this.apiData.userId = this.userId;
            this.apiData.storeType = this.storeType;
            this.apiData.searchName = this.searchName;
            this.$http.post(this.$api.queryDemandStoreInfo, this.queryParams).then(res => {
                if (res.code === 1000) {
                    this.page.totleCount = res.data.totalCount;
                    this.list = res.data.list;
                    this.openStatus = res.data.openStatus;
                }
            })
        }
    },
    created() {
        this.getData();
    }
}