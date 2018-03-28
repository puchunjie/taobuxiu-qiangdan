import {
    mapGetters,
    mapActions
} from 'vuex'
import * as types from '@/store/types'
export default {
    computed: {
        ...mapGetters(['user', 'base', 'roleId'])
    },
    methods: {
        ...mapActions(['getUserCount']),
        getUserInfo() {
            return this.$http.post(this.$api.getUser).then(res => {
                if (res.code === 1000) {
                    this.$store.commit(types.SET_USER_INFO, res.data);
                    document.addEventListener('visibilitychange', () => {
                        let isHidden = document.hidden;
                        if (isHidden) {
                            this.isFocus = false;
                        } else {
                            this.isFocus = true;
                            document.title = this.titleInit;
                            window.clearInterval(this.stl);
                            if (!this.isNotice) {
                                this.notify(this.msg)
                            }
                        }
                    });
                    if (this.initScoket)
                        this.initScoket();
                }
            })
        },
        // 获取用户订单，求购数据统计
        async getUserCounts() {
            await this.getUserInfo();
            if (!!this.user && this.user.pass === '1') {
                this.getUserCount();
            }
        }
    },
    created() {
        this.getUserCounts()
    }
}