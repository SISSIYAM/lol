<template>
  <div class="routing-xiuxiu-container">
    <search-Bar></search-Bar>
    <bike-stations></bike-stations>
    <tabbar class="vux-demo-tabbar" icon-calss="" slot="bottom">
      <tabbar-item :link="{path:'/routePlanning'}">
        <span slot="icon">
          <svg-icon icon-class="icon_male"></svg-icon>
        </span>
        <span slot="label">行程规划</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/xiuxiuUnlocking'}">
        <span slot="icon">
          <svg-icon icon-class="broadcasting"></svg-icon>
        </span>
        <span slot="label">咻咻开锁</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux';
import searchBar from '../../../view/station-search/index';
import BikeStations from '../../bike-stations/index';


export default {
  name: 'routingXiuxiu',
  components: {
    BikeStations,
    TabbarItem,
    Tabbar,
    searchBar,
  },
};
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  .routing-xiuxiu-container{
   min-height: calc( 100vh - 44px );
    position: relative;
    background: #fbc4c4;
    .weui-tabbar {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      position: fixed;
      z-index: 500;
      bottom: 10px;
      left:7px;
      width: 96%;
      background-color: #ffffff;
      border-radius: 3px;
      .weui-tabbar__label {
        text-align: center;
        font-family: PingFangBolding;
        color: #333333;
      }
    }
  }
</style>
