<template>
  <div class="routing-xiuxiu-container">

    <!--显示地图-->
    <bike-stations></bike-stations>

    <div id="whereGo">
      <div class="whereGoitem">
        <router-link :to="{path:'/routePlanning'}">
          <div class="itemChild">
            <svg-icon icon-class="routing" class="tab"></svg-icon>
            <span>行程规划</span>
          </div>
        </router-link>
      </div>
      <div class="whereGoitem">
        <router-link :to="{path:'/xiuxiuUnlocking'}">
          <div class="itemChild">
            <svg-icon icon-class="broadcasting" class="tab"></svg-icon>
            <span>咻咻开锁</span>
          </div>
        </router-link>
      </div>
    </div>
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
    searchBar,
  },
};
</script>

<style lang="less">
  .routing-xiuxiu-container{
   min-height: calc( 100vh - 44px );
    position: relative;
    /*background: #fbc4c4;*/
  }
  #whereGo {
    display: flex;
    position: fixed;
    z-index: 500;
    bottom: 10px;
    left: 7px;
    width: 96%;
    height:60px;
    background-color: #ffffff;
    border-radius: 3px;
    .whereGoitem {
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      padding: 5px 0 0;
      font-size: 13px;
      color: #999999;
      text-align: center;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      .itemChild {
        height: 100%;
        margin: 0 auto;
        display: inline-flex;
        span {
          align-self: center;
          margin-left: 5px;
          color:#333333;
        }
        img {
          align-self: center;
        }
        .tab{
          width:22px;
          height:22px;
          align-self: center;
        }
      }
    }
  }
</style>
