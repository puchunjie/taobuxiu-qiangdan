import * as types from '@/store/types'
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['pushData']),
    },
    watch: {
        pushData: _.debounce(function() {
            this.getDataList();
        }, 500)
    }
}