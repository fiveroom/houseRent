import types from '../types';

const state = {
    user_id: 123
}

const getters = {
    ['user_id'](state) {
        return state.user_id
    }
}

const actions = {

}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}