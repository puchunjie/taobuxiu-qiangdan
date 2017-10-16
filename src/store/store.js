import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        authorization: Vue.ls.get('authorization'),
        loginId: Vue.ls.get('loginId')
    },
    getters: {
        roleId: state => {
            //写死的超管id,后期修改为从state user中获取
            return state.loginId
        },
        user: state => {
            return state.user
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
        },
        [types.SET_USER_INFO]: (state, payload) => {
            state.user = payload;
        }
    }
})