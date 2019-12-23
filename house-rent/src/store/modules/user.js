import * as types from '../types';
import * as userApi from '@/api/user';

const state = {
    user_id: null,
    user_name: null,
    tel: null,
    userEmail: 'asdfadf@163.com',
    userAvater: null
}

const getters = {
    userId(state) {
        return state.user_id
    },
    telDeal(state) {
        if (state.tel) {
            return state.tel.replace(/(?<=\d{3})(\d{4})(?=\d{4})/g, '****')
        }
        return
    },
    userName(state) {
        return state.user_name
    },
    userEmail(state) {
        return state.userEmail
    },
    tel(state) {
        return state.tel
    },
    userAvater(state) {
        return state.userAvater
    }
}

const actions = {
    async [types.LOGIN_USER]({ commit, state }, logoInfo) {
        let res = await userApi.login(logoInfo)
        if (res.status) {
            commit(types.SAVE_USER, res.Data);
        }
        return res
    },
    async [types.UPDATE_USER]({ commit }, updateData) {
        let res = await userApi.updateUserInfo(updateData);
        return res
    }
}

const mutations = {
    [types.SAVE_USER](state, obj) {
        state.user_id = obj.user_id;
        state.user_name = obj.user_name;
        state.tel = obj.tel;
        state.userAvater = obj.user_avaterPath;
    },
    [types.LOGIN_OUT](state, obj) {
        state.user_id = '';
        state.user_name = '';
        state.tel = '';
        state.userEmail = '';
        state.userAvaterPath = '';
        sessionStorage.clear()
    },
    [types.UP_AVATOR](state, url) {
        state.userAvater = url
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}