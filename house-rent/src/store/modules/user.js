import * as types from '../types';
import * as user from '@/api/user';

const state = {
    user_id: null,
    user_name: null,
    tel: null,
    userEmail: 'asdfadf@163.com'
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
    }
}

const actions = {
    async [types.LOGIN_USER]({ commit, state }, logoInfo) {
        let res = await user.login(logoInfo)
        if (res.data.Code === "200") {
            commit(types.SAVE_USER, res.data.Data);
            return { status: true, msg: res.data.Msg }
        } else {
            return { status: false, msg: res.data.Msg }
        }
    }
}

const mutations = {
    [types.SAVE_USER](state, obj) {
        state.user_id = obj.user_id;
        state.user_name = obj.user_name;
        state.tel = obj.tel;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}