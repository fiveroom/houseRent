import * as types from '../types';
import * as locatApi from '@/api/third';

const state = {
    city: null,
    adcode: null,
    arrDistrict: null,
    rectangle: null
}

const getters = {
    city(state) {
        return state.city
    }
}

const actions = {
    async [types.GET_CURLOCAT]({ commit }) {
        let res = await locatApi.getCurrCity()
        if (res.data.status === "1") {
            commit(types.SAVE_LOCAT, res.data)
            return { status: true, msg: '获取地理位置成功' }
        }
        return { status: true, msg: '获取地理位置失败' }
    },
    async [types.DEAL_DISTRICT]({ commit }, data) {
        let res = await locatApi.getDistrict(data)
        if (res.data.status === '1') {
            return { status: true, msg: res.data.districts[0].districts }
        }
        return { status: false, msg: '区域查询失败' }
    }
}

const mutations = {
    [types.SAVE_LOCAT](state, obj) {
        state.city = obj.city;
        state.adcode = obj.adcode;
        state.rectangle = obj.rectangle;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}