import Vue from 'vue';
import './assets/scss/style.scss';
import { createApp } from './app-universal';
// import VueAnalytics from 'vue-analytics'

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// Vue.use(VueAnalytics, {
//   id: 'UA-*********-*',
//   router,
//   autoTracking: {
//     pageviewTemplate (route) {
//       return {
//         page: route.fullPath,
//         title: document.title,
//         location: window.location.href
//       }
//     }
//   }
// });

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // まだ描画されていないコンポーネントにのみ関心を払うため、
    // 2つの一致したリストに差分が表れるまで、コンポーネントを比較します
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    // もしローディングインジケーターがあるならば、
    // この箇所がローディングインジケーターを発火させるべき箇所です
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      // ローディングインジケーターを停止させます
      next()
    }).catch(next)
  })

  app.$mount('#app');
});