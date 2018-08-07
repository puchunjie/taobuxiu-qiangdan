import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
export default {
    computed: {
        ...mapGetters(['pushData']),
    },
    watch: {
        pushData: debounce(function(val) {
            if (val.type == 'order') {
                if (this.getOrders)
                    this.getOrders();
            } else if (val.type == 'iron') {
                if (this.getDataList)
                    this.getDataList();
            } else if (val.type == 'contract') {
                if (this.getList)
                    this.getList();
            } else if (val.type == 'auction') {
                if (this.init)
                    this.init(val);
            }
        }, 500)
    }
}