<template>
  <div></div>
</template>

<script>
  export default {
    name: 'page-notfound',
    async asyncData({ store, route }) {
    },
    // beforeRouteEnter(to, from, next) {
    //   next({
    //     path: '/'
    //   });
    // },
    metaInfo() {
      const update = {
        'og:title': ``,
        'og:url': ``,
        'og:description': ``
      };
      const merged = this.$store.getters['meta/meta'](update);
      const meta = {
        title: ``,
        titleTemplate: null,
        meta: merged
      };

      return meta;
    },
    methods: {
    },
  }
</script>