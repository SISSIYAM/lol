<template>
  <div class="app-wrapper">
    <vue-drawer-layout
      :enable='false'
      ref="drawer"
      @mask-click="handleMaskClick"
    >
      <div class="drawer-content" slot="drawer">
        <div class="left-drawer-div">
          <div class="user-bg-div">
            <div class="user-bg-bottom" v-on:click="handleMaskClick">
              <svg-icon icon-class="icon_male" class="user-icon"></svg-icon>
            </div>
          </div>
          <div>
            <router-link :to="{path:'/myWallet'}" class="row-div">
              <svg-icon icon-class="my_wallet" class="small-icon"></svg-icon>
              <p class="txt">我的钱包</p>
            </router-link>
            <router-link :to="{path:'/stationOrder'}" class="row-div">
              <svg-icon icon-class="station_order"></svg-icon>
              <p class="txt">我的订单</p>
            </router-link>
            <router-link :to="{path:'/stationBooking'}" class="row-div">
              <svg-icon icon-class="station_reservation"></svg-icon>
              <p class="txt">我的预约</p>
            </router-link>
            <router-link :to="{path:''}" class="row-div">
              <svg-icon icon-class="report"></svg-icon>
              <p class="txt">违停举报</p>
            </router-link>
            <router-link :to="{path:'/customerService'}" class="row-div">
              <svg-icon icon-class="customer_service"></svg-icon>
              <p class="txt">客服中心</p>
            </router-link>
            <router-link :to="{path:'/setting'}" class="row-div">
              <svg-icon icon-class="setting"></svg-icon>
              <p class="txt">系统设置</p>
            </router-link>
          </div>
        </div>
      </div>
      <div slot="content">
        <div class="main-drawer-div">
          <navbar @showPageTotal="showPageTotal"></navbar>
          <routing-xiuxiu></routing-xiuxiu>
        </div>
      </div>
    </vue-drawer-layout>
  </div>
</template>
<script>
import { navbar, routingXiuxiu } from './components';

export default {
  name: 'initLayout',
  components: {
    navbar,
    routingXiuxiu,
  },
  computed: {
  },
  methods: {
    showPageTotal() {
      this.$refs.drawer.toggle(true);
    },
    handleMaskClick() {
      this.$refs.drawer.toggle(false);
    },
  },
};
</script>

<style lang="scss">
  @import '../../styles/mixin';
  #app-wrapper {
    position:relative;
    height:100%;
    width:100%;
  }
  .user-bg-div {
    height: 134px;
    background-color: #f5f7fa;
    position: relative;
  }
  .user-bg-bottom {
    position: absolute;
    bottom: 10%;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .user-icon {
    width: 70px;
    height: 70px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .row-div {
    margin-top: 8%;
    margin-left: 10%;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 35px;
  }
  .txt {
    margin-left: 30px;
    color: #333333;
  }
  .small-icon {
    width: 22px;
    height: 22px
  }
  .left-drawer-div {
    width: 100%;
    height: 100%;
    background-color: white;
  }
  .drawer-content {
    width: 100%;
    height: 100%;
  }
  .main-drawer-div {
    height: 100%;
    width: 100%;
  }
</style>
