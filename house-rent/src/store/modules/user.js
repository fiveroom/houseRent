import * as types from '../types';
import * as userApi from '@/api/user';
import myWebS from '@/config/webSocket';

const state = {
    user_id: null,
    user_name: null,
    tel: null,
    userEmail: 'asdfadf@163.com',
    userAvater: null,
    userRemind: [],
    bsRemind: {
        TotalCount: 0,
        _Items: []
    }, // 预约
    conRemind: {
        TotalCount: 0,
        _Items: []
    }, // 合同
    payRemind: {
        TotalCount: 0,
        _Items: []
    },
    sysRemind: {
        TotalCount: 0,
        _Items: []
    },
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
        return state.bsRemind.TotalCount + state.conRemind.TotalCount + state.payRemind.TotalCount + state.sysRemind.TotalCount
    }
}

const actions = {
    async [types.LOGIN_USER]({ dispatch, commit, state }, logoInfo) {
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
    async [types.GET_REMIND]({ commit, state }) {
        console.log('开始连接webSocket');
        let webS = new myWebS(`${types.REMIND_URL}/u_${state.user_id}`);
        webS.conSuss = userApi.findMsg({ user_id: state.user_id, noLoading: true });
        commit(types.UP_REMINDOBJ, webS)
        webS.message(data => {
            console.log(data, '=================');
            if (data.Msg) {
                commit(types.UP_REMIND, {
                    type: data.Msg + 'Remind',
                    data: data.Data
                })
            }
            // switch (data.Msg) {
            //     case 'bs':
            //         console.log(data.Data, 'bs');
            //         commit(types.UP_REMIND, {
            //             type: 'bsRemind',
            //             data: data.Data
            //         })
            //         break;
            //     case 'con':
            //         console.log(data.Data, 'con');
            //         commit(types.UP_REMIND, {
            //             type: 'conRemind',
            //             data: data.Data
            //         })
            //         break;
            //     case 'pay':
            //         console.log(data.Data, 'pay');
            //         commit(types.UP_REMIND, {
            //             type: 'payRemind',
            //             data: data.Data
            //         })
            //         break;
            //     case 'sys':
            //         break;
            // }
        })
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
        state.remindWebS.close();
        state.webS = null;
        sessionStorage.clear()
    },
    [types.UP_AVATOR](state, url) {
        state.userAvater = url
    },
    [types.UP_REMIND](state, { type, data }) {
        console.log(data, 'sssssssssssssss==========================');
        state[type] = data
    },
    [types.UP_REMINDOBJ](state, obj) {
        state.remindWebS = obj
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}