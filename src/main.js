// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../static/css/reset.css';
import '../static/css/iview.css';
import '../static/swiper/css/swiper.min.css';
import router from './router'
import store from './store/store'
import axios from './http'
import * as api from './api'
import clickoutside from './directives/clickoutside'
import _ from 'lodash'
import * as filters from './filters/index' //过滤器
import VueLocalStorage from 'vue-ls';
import Swiper from '../static/swiper/js/swiper.min'
import { spinToggle } from './utils/spin'

Vue.use(VueLocalStorage);
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

import {
    Modal,
    Button,
    Message,
    Page,
    iCircle,
    Poptip,
    Notice,
    iForm,
    FormItem,
    iInput,
    Cascader,
    iSelect,
    iOption,
    DatePicker
} from 'iview';

Vue.component(Modal.name, Modal);
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
Vue.component(Button.name, Button);
Vue.component(Page.name, Page);
Vue.component('DatePicker', DatePicker);
Vue.component('i-circle', iCircle);
Vue.component('i-form', iForm);
Vue.component('form-item', FormItem);
Vue.component('i-input', iInput);
Vue.component('i-select', iSelect);
Vue.component('i-option', iOption);
Vue.component(Poptip.name, Poptip);
Vue.component(Cascader.name, Cascader);
Vue.prototype.$Message = Message;


Vue.prototype.$api = api; //所有接口列表挂载
Vue.prototype.$http = axios;
Vue.prototype.$spinToggle = spinToggle;
Vue.prototype.$clearData = (data) => {
    return JSON.parse(JSON.stringify(data))
}
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