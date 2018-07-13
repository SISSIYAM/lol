<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('hasUsersToken');
  },
};
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
