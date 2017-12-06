import * as types from '@/store/types'
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
export default {
    computed: {
        ...mapGetters(['pushData']),
    },
    watch: {
        pushData: debounce(function(val) {
            if (val.type == 'order') {
                this.getOrders();
            } else if (val.type == 'iron') {
                this.getData();
            }
        }, 500)
    }
}