import Vuex from 'vuex'
import Vue from 'vue'
import * as api from '../api.js'
import * as types from './types'
import VueLocalStorage from 'vue-ls';
import axios from 'axios'


Vue.use(VueLocalStorage);
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: undefined,
        base: "",
        authorization: Vue.ls.get('authorization'),
        loginId: Vue.ls.get('loginId'),
        nums: {
            historyBuy: 0,
            historySell: 0,
            todayBuy: 0,
            todaySell: 0,
        },
        pushData: '',
        userCount: {
            buyD: 0, //买家 定开
            buyIronH: 0, //买家 求购历史
            buyIronT: 0, //买家 求购当日
            buyT: 0, //买家 特价
            buyX: 0, //买家 现货
            sellD: 0, //卖家 定开
            sellIronH: 0, //卖家 求购历史
            sellIronT: 0, //卖家 求购当日
            sellT: 0, //卖家 特价
            sellX: 0, //卖家 现货
        }
    },
    getters: {
        isLogin: state => {
            return state.user != undefined
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
        },
        userCount: state => {
            return state.userCount
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
        },
        //订单，求购数据存储
        [types.SAVE_USER_COUNT]: (state, payload) => {
            state.userCount = payload;
        }
    },
    actions: {
        getUserCount(context) {
            axios.post(api.userCountInfo).then(res => {
                if (res.code === 1000) {
                    context.commit(types.SAVE_USER_COUNT, res.data);
                }
            })
        }
    }
});