import * as types from '@/store/types'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['pushData']),
    },
    methods: {

    },
    watch: {
        pushData(val) {
            this.getDataList();
            // 如果是新增求购
            if (val.code == 1) {
                this.$store.commit(types.SET_NUMS, val.result.data);
            }

        }
    }
}