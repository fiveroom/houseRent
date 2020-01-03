import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"; // 持久化
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import user from './modules/user';
import locat from './modules/locat';

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    actions,
    mutations,
    modules: {
        user,
        locat
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                user: {
                    user_id: val.user.user_id,
                    user_name: val.user.user_name,
                    tel: val.user.tel,
                    userEmail: val.user.userEmail,
                    userAvater: val.user.userAvater
                }
            }
        }
    })]
})