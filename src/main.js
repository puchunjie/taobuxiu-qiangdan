// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../static/css/reset.css';
import 'iview/dist/styles/iview.css';
import '../static/swiper/css/swiper.min.css';
import router from './router'
import store from './store/store'
import axios from './http'
import * as api from './api'
import clickoutside from './directives/clickoutside'
import * as filters from './filters/index' //过滤器
import VueLocalStorage from 'vue-ls';
import Swiper from '../static/swiper/js/swiper.min'
import { spinToggle } from './utils/spin'
import cloneDeep from 'lodash/cloneDeep'
import scroll from 'vue-seamless-scroll'

Vue.use(scroll)
Vue.use(VueLocalStorage);
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

import {
    Modal,
    Button,
    Message,
    Page,
    Circle,
    Poptip,
    Tooltip,
    Notice,
    Form,
    Input,
    Cascader,
    Select,
    Option,
    RadioGroup,
    Radio,
    DatePicker,
    Spin,
    Upload,
    Alert,
    Table
} from 'iview';

Vue.component(Modal.name, Modal);
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
Vue.component(Button.name, Button);
Vue.component(Page.name, Page);
Vue.component('DatePicker', DatePicker);
Vue.component('i-circle', Circle);
Vue.component('i-form', Form);
Vue.component('form-item', Form.Item);
Vue.component('i-input', Input);
Vue.component('i-select', Select);
Vue.component('i-option', Option);
Vue.component('i-radioGroup', RadioGroup);
Vue.component('i-radio', Radio);
Vue.component('i-table', Table);
Vue.component(Poptip.name, Poptip);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Cascader.name, Cascader);
Vue.prototype.$Message = Message;
Vue.prototype.$Spin = Spin;
Vue.component(Spin.name, Spin);
Vue.component(Upload.name, Upload);
Vue.component(Alert.name, Alert);


Vue.prototype.$api = api; //所有接口列表挂载
Vue.prototype.$http = axios;
Vue.prototype.$spinToggle = spinToggle;
Vue.prototype.$clearData = (data) => {
    return JSON.parse(JSON.stringify(data))
}
Vue.prototype.$cloneDeep = cloneDeep;
Vue.directive('clickoutside', clickoutside)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})