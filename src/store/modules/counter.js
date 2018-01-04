const TYPES = Object.freeze({
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
});

const stateObject = {
  count: 0,
};

const getters = {
  getCount(state) {
    return state.count
  }
};

const mutations = {
  // [TYPES.INCREMENT]: (state) => {
  //   state.count++
  // },
  // [TYPES.DECREMENT]: (state) => {
  //   state.count--
  // },
  [TYPES.INCREMENT](state) {
    state.count++
  },
  [TYPES.DECREMENT](state) {
    state.count--
  },
};

const actions = {
  // increment: ({ commit }, bool) => commit('INCREMENT')
  increment({ commit }) {
    commit(TYPES.INCREMENT);
  },
  decrement({ commit }) {
    commit(TYPES.DECREMENT);
  },
};

export default {
  namespaced: true,
  state: stateObject,
  getters,
  mutations,
  actions,
};
