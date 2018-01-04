<template>
  <div class="l-content">
    <p>Hello, World...</p>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'page-top',
    components: {
    },
    async asyncData({ store, route }) {
    },
    async beforeRouteUpdate(to, from, next) {
      next();
    },
    metaInfo() {
      const merged = this.$store.getters['meta/meta']({});
      return {
        title: '',
        titleTemplate: null,
        meta: merged
      }
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        'meta': 'meta/meta'
      }),
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {
    },
  }
</script>