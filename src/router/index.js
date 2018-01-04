import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './routes';
import { createStore } from '~/store'
import Meta from 'vue-meta'

const store = createStore();

Vue.use(VueRouter);
Vue.use(Meta, {
  keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vm', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

export const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: '/',
    scrollBehavior: (to, from, savedPosition) => {
      return !savedPosition ? { x: 0, y: 0 } : savedPosition;
    },
    routes,
    beforeEach: (to, from, next) => {
      next();
    },
    afterEach: (to, from, next) => {
    }
  });
}