import Top from '~/pages/top.vue';
import NotFound from '~/pages/notfound.vue';

export default [
  {
    path: '/',
    component: Top,
  },
  {
    path: '*',
    component: NotFound,
  },
];
