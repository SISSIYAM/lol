<template>
  <el-menu class="navbar-container">
    <div class="drawer-container" @click="showDrawer">
      <img class="user-icon" src="../../../../src/icons/png/icon_male.png">
    </div>
    <div class="bike-car-container">
      <div class="tabs" v-bind:class="{selected: isBike}" @click="selectedBike">
        <p>单车</p>
      </div>
      <div class="tabs" v-bind:class="{selected: !isBike}" @click="selectedCar">
        <p>汽车</p>
      </div>
    </div>
  </el-menu>
</template>
<script>
export default {
  name: 'navbar',
  data() {
    return {
      isBike: true,
    };
  },
  methods: {
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
