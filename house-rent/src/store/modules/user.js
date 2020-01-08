import * as types from '../types';
import * as userApi from '@/api/user';
import { myWebS, webMsg } from '@/config/webSocket';

const state = {
    user_id: null,
    user_name: null,
    tel: null,
    userEmail: 'asdfadf@163.com',
    userAvater: null,
    userRemind: [],
    bsRemind: [], // 预约
    conRemind: [], // 合同
    payRemind: [],
    sysRemind: [],
    remindWebS: null,
    adminInfo: {}
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
    },
    allRemindCount(state) {
        return state.bsRemind.length + state.conRemind.length + state.payRemind.length + state.sysRemind.length
    }
}

const actions = {
    async [types.LOGIN_USER]({ dispatch, commit }, logoInfo) {
        let res = await userApi.login(logoInfo)
        if (res.status) {
            commit(types.SAVE_USER, res.Data);
            dispatch(types.GET_REMIND)
        }
        return res
    },
    async [types.UPDATE_USER]({ commit }, updateData) {
        let res = await userApi.updateUserInfo(updateData);
        return res
    },
    // 建立webSocket连接
    [types.GET_REMIND]({ commit, state }) {
        // console.log('开始连接webSocket');
        let webS = new myWebS(`${webMsg}u_${state.user_id}`);
        webS.conSuss(() => { userApi.findMsg({ user_id: state.user_id, noLoading: true }) });
        commit(types.UP_REMINDOBJ, webS)
        webS.message(data => {
            console.log(data, '=================');
            if (data.Msg) {
                commit(types.UP_REMIND, {
                    type: data.Msg + 'Remind',
                    data: data.Data._Items,
                    arr: true
                })
            }
        })
    },
    [types.DEL_REMIND]({ commit }, { mge_id, type }) {
        userApi.delMsg({ mge_id }).then(res => {
            console.log(res, '删除状态');
            if (res) {
                commit(types.DEL_REMIND_LOCAT, { mge_id, type })
            }
        });
    }
}

const mutations = {
    // 保存用户信息
    [types.SAVE_USER](state, obj) {
        state.user_id = obj.user_id;
        state.user_name = obj.user_name;
        state.tel = obj.tel;
        state.userAvater = obj.user_avaterPath;
    },
    // 清除用户信息
    [types.LOGIN_OUT](state) {
        state.user_id = '';
        state.user_name = '';
        state.tel = '';
        state.userEmail = '';
        state.userAvaterPath = '';
        state.adminInfo = {}
        state.bsRemind = [];
        state.conRemind = [];
        state.payRemind = [];
        state.sysRemind = [];
        if (state.remindWebS instanceof myWebS) {
            state.remindWebS.close();
        }
        sessionStorage.clear();
    },
    [types.UP_AVATOR](state, url) {
        state.userAvater = url
    },
    [types.UP_REMIND](state, { type, data, arr }) {
        if (arr) {
            // console.log(data, 'push');
            let arrMgeId = state[type].map(item => item.Mge_id);
            state[type].push(...data.filter(item => !arrMgeId.includes(item.Mge_id)));
        } else {
            state[type] = data
        }
    },
    [types.UP_REMINDOBJ](state, obj) {
        state.remindWebS = obj
    },
    // 删除消息
    [types.DEL_REMIND_LOCAT](state, { mge_id, type }) {
        type += 'Remind';
        state[type].splice(state[type].findIndex(item => item.mge_id == mge_id), 1)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}