<template>
  <div class="app-wrapper" :class="classObj" >
    <drawer-bar></drawer-bar>
    <navbar></navbar>
    <little-utils></little-utils>
    <routing-xiuxiu></routing-xiuxiu>
  </div>
</template>
<script>
import { drawerBar, navbar, littleUtils, routingXiuxiu } from './components';

export default {
  name: 'initLayout',
  components: {
    drawerBar,
    navbar,
    littleUtils,
    routingXiuxiu,
  },
  computed: {
    classObj() {
      return {
      };
    },
  },
};
</script>

<style lang="scss" scoped >
  @import 'src/styles/mixin.scss';
  #app-wrapper

</style>
