import FilterGrop from './filter.vue'
import tableWrap from './tableWrap.vue'
import exponentia from './exponentia.vue'
import purchasePanel from './purchasePanel.vue'
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        FilterGrop,
        tableWrap,
        exponentia,
        purchasePanel
    },
    data() {
        return {
            purchaseShow: false,
            filterValue: {},
            listLoad: false,
            list: [],
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
            return Object.assign(this.filterValue, this.page);
        },
        purchaseItem() {
            return Object.assign(this.businessInfo, this.pickerItem)
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
                this.pickerItem = this.$clearData(item);
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
        }
    },
    created() {
        this.getData();
    }
}