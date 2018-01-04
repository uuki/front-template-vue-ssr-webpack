import Vue from 'vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';

import App from './App.vue';

if(process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}

export const createApp = () => {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });
  return { app, router, store };
};
