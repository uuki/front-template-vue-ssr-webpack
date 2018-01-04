import { createApp } from './app-universal';

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    const meta = app.$meta();

    router.push(context.url);
    context.meta = meta;

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({ code: 404, url: context.url });
      }
      Promise.all(matchedComponents.map((Component) => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
          });
        }
      }))
        .then(() => {
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
