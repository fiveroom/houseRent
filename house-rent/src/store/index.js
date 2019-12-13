import Vue from 'vue'
import Vuex from 'vuex'

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
    }
})