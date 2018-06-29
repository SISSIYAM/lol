<template>
  <div class="app-wrapper" :class="classObj" >
    <div v-if="sidebar.opened" class="" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <navbar></navbar>
    <little-utils></little-utils>
    <routing-xiuxiu></routing-xiuxiu>
  </div>
</template>

<script>
import { sidebar, navbar, littleUtils, routingXiuxiu } from './components';

export default {
  name: 'initLayout',
  components: {
    sidebar,
    navbar,
    littleUtils,
    routingXiuxiu,
  },
  computed: {
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,

      };
    },
  },
};
</script>

<style lang="scss" scoped >
  @import "src/styles/mixin.scss";
</style>
