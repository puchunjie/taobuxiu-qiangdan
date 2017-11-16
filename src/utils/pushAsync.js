import * as types from '@/store/types'
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
export default {
    computed: {
        ...mapGetters(['pushData']),
    },
    watch: {
        pushData: debounce(function() {
            this.getDataList();
        }, 500)
    }
}