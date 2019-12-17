import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"; // 持久化
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    actions,
    mutations,
    modules: {
        user
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            debugger;
            return {
                user: val.user
            }
        }
    })]
})