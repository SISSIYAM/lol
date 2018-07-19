<template>
  <div class="app-wrapper" :class="classObj" >
    <div v-if="drawerBar.opened" class="drawer-bg" v-on:click="handleClickOutside($event)"></div>
    <drawer-bar class="drawer-container"></drawer-bar>
    <div class="main-container">
      <navbar></navbar>
      <routing-xiuxiu></routing-xiuxiu>
    </div>
  </div>
</template>
<script>
import { drawerBar, navbar, routingXiuxiu } from './components';

export default{
  name: 'initLayout',
  components: {
    drawerBar,
    navbar,
    routingXiuxiu,
  },
  computed: {
    drawerBar() {
      return this.$store.state.app.drawerBar;
    },
    classObj() {
      return {
        hideDrawer: !this.drawerBar.opened,
        openDrawer: this.drawerBar.opened,
        withoutAnimation: this.drawerBar.withoutAnimation,
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeDrawerBar', { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped >
  @import '../../styles/mixin';
  #app-wrapper {
    @include clearfix;
    postion:relative;
    height:100%;
    width:100%;
    margin: 0;
    padding: 0;
    &.openDrawer {
      position: fixed;
      top:0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
