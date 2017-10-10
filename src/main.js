// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../static/css/reset.css'
import '../static/css/iview.css';
import router from './router'
import axios from './http'
import * as api from './api'
import clickoutside from './directives/clickoutside'
import _ from 'lodash'
import * as filters from './filters/index' //过滤器
import VueLocalStorage from 'vue-ls';

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

import { Modal, Button, Message, Page, iCircle, Spin, Poptip } from 'iview';

Vue.component(Modal.name, Modal);
Vue.component(Button.name, Button);
Vue.component(Page.name, Page);
Vue.component('i-circle', iCircle);
Vue.component(Poptip.name, Poptip);
Vue.prototype.$Modal = Modal;
Vue.prototype.$Message = Message;
Vue.component(Spin.name, Spin);
Vue.prototype.$Spin = Spin;

Vue.use(VueLocalStorage);
Vue.prototype.$api = api; //所有接口列表挂载
Vue.prototype.$http = axios;
Vue.prototype.$clearData = (data) => {
    return JSON.parse(JSON.stringify(data))
}
Vue.directive('clickoutside', clickoutside)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})