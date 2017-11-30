import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: "",
        base: "",
        authorization: Vue.ls.get('authorization'),
        loginId: Vue.ls.get('loginId'),
        nums: {
            historyBuy: 0,
            historySell: 0,
            todayBuy: 0,
            todaySell: 0,
        },
        pushData: ''
    },
    getters: {
        isLogin: state => {
            return state.user != ''
        },
        roleId: state => {
            //写死的超管id,后期修改为从state user中获取
            return state.loginId
        },
        ajaxHead: state => {
            return {
                authorization: state.authorization,
                loginId: state.loginId
            }
        },
        user: state => {
            return state.user
        },
        base: state => {
            return state.base
        },
        nums: state => {
            return state.nums
        },
        pushData: state => {
            return state.pushData
        }
    },
    mutations: {
        [types.LOGIN]: (state, payload) => {
            Vue.ls.set('authorization', payload.authorization);
            Vue.ls.set('loginId', payload.loginId);
            state.authorization = payload.authorization;
            state.loginId = payload.loginId;
        },
        [types.LOGOUT]: (state) => {
            Vue.ls.remove('authorization');
            Vue.ls.remove('loginId');
            state.authorization = undefined;
            state.loginId = undefined;
            state.user = '';
            state.base = '';
        },
        [types.SET_USER_INFO]: (state, payload) => {
            state.user = payload.buserInfo;
            delete payload.buserInfo;
            state.base = payload;
        },
        [types.UPDATE_USER_INFO]: (state, payload) => {
            state.user = payload;
        },
        [types.UPDATE_PRO_INFO]: (state, payload) => {
            state.user.proInfo = payload;
        },
        [types.SET_NUMS]: (state, payload) => {
            state.nums = payload;
        },
        [types.UPDATE_NUMS]: (state) => {
            state.nums.historySell++;
            state.nums.todaySell++;
        },
        // 消息推送commit
        [types.UPDATE_PUSH_MSG]: (state, payload) => {
            state.pushData = payload;
        }
    }
})