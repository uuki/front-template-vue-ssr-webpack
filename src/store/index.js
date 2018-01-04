import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import moduleMeta from './modules/meta';

Vue.use(Vuex);

export const createStore = () => {
  return new Vuex.Store({
    modules: {
      meta: moduleMeta
    },
  });
};
