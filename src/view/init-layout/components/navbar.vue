<template>
  <el-menu class="navbar-container">
    <div class="drawer-container" @click="toggleDrawerBar" :class="drawerBar.opened">
      <svg-icon icon-class="icon_male" class="user-icon"></svg-icon>
    </div>
    <div class="bike-car-container">
      <div class="tabs" v-bind:class="{selected: isBike}">
        <p>单车</p>
      </div>
      <div class="tabs" v-bind:class="{selected: !isBike}">
        <p>汽车</p>
      </div>
    </div>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'navbar',
  data() {
    return {
      isBike: true,
    };
  },
  computed: {
    ...mapGetters([
      'drawerBar',
    ]),
  },
  methods: {
    toggleDrawerBar() {
      this.$store.dispatch('toggleDrawerBar');
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-container {
  height: 50px;
  line-height: 50px;
  .drawer-container {
    line-height:58px;
    height:50px;
    float:left;
    padding: 0 10px;
    .user-icon {
      width: 27px;
      height: 27px;
    }
  }
  .bike-car-container {
    display: inline-flex;
    font-family: PingFangBold;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
