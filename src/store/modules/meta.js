const TYPES = Object.freeze({
});

const stateObject = {
  language: 'ja',
  origin: '',
  title: '',
  meta: {
    'description': '',
    'og:type': 'website',
    'og:title': '',
    'og:description': '',
    'og:url': '',
    'og:image': '',
    'og:image:width': '',
    'og:image:height': '',
    'fb:app_id': '',
    'og:site_name': '',
    'twitter:site': '',
    'twitter:card': 'summary',
    'twitter:image': ''
  }
};

const getters = {
  meta: state => data => {

    if(!data) {
      return state
    }

    const mergedMeta = Object.assign(state.meta, data);
    let result = [];

    Object.keys(mergedMeta).forEach(key => {
      var item = {};

      if(key.match(/^(og:|fb:)/)) {
        item['property'] = key;
      } else {
        item['name'] = key;
      }

      item['content'] = mergedMeta[key];
      result.push(item);
    });

    return result;
  },
};

const mutations = {
  SAVE_META(state, meta) {
    state = Object.assign(state, meta)
  },
};

const actions = {
  updateMeta({ commit, state }, meta) {

    Object.keys(meta).forEach(key => {
      if(!state[key]) delete meta[key];
    });

    commit('SAVE_META', meta);
  },
};

export default {
  namespaced: true,
  state: stateObject,
  getters,
  mutations,
  actions,
};
