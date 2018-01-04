<template>
  <!--transition name="p-tr--route" mode="out-in"-->
    <router-view :key="$route.path"></router-view>
  <!--/transition-->
</template>

<script>
  // Components
  // import globalHeader from '~/partial/global-header.vue';
  // import globalFooter from '~/partial/global-footer.vue';

  export default {
    components: {
      // globalHeader,
      // globalFooter,
    },
  }
</script>