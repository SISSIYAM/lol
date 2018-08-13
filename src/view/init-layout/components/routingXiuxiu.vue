<template>
  <div class="routing-xiuxiu-container">

    <!--显示地图-->
    <bike-stations></bike-stations>
    <div class="suspend-icons">
      <div class="reservation-circle">
        <svg-icon icon-class="noreservation" class="icons"></svg-icon>
      </div>
      <div class="red-envelope-circle">
        <a>
        <img v-bind:src="gifImg">
        </a>
      </div>
    </div>
    <br>
    <div class="suspend-icons">
      <div class="location-circle">
        <svg-icon icon-class="location" class="icons"></svg-icon>
      </div>
      <div class="service-circle">
        <svg-icon icon-class="service" class="icons"></svg-icon>
      </div>
    </div>

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
import searchBar from '../../../view/station-search/index';
import BikeStations from '../../bike-stations/index';


export default {
  name: 'routingXiuxiu',
  components: {
    BikeStations,
    searchBar,
  },
  // data() {
  //   return {
  //     gifImg: require('@/assets/redEnvelope.gif'),
  //   };
  // },
};
</script>

<style lang="less">
  .routing-xiuxiu-container{
   min-height: calc( 100vh - 44px );
    position: relative;
    /*background: #fbc4c4;*/
  }
  .suspend-icons {
    display:inline;
    padding: 10px 0;
    position: absolute;
    bottom:165px;
    z-index:500;
  }
  .reservation-circle, .location-circle, .service-circle {
    border-radius: 50%;
    background-color: rgb(255, 87, 123);
    height:30px;
    width:30px;
    position:absolute;
    text-align: center;
  }
  .suspend-icons > .reservation-circle,  .suspend-icons > .location-circle{
    left:20px;
  }
  .suspend-icons > .service-circle, .suspend-icons > .red-envelope-circle{
    left:320px;
  }
  .suspend-icons > .location-circle, .suspend-icons > .service-circle {
  }
  .icons{
    display:block;
    position:absolute;
  }

  .reservation-circle > .icons, .location-circle > .icons, .service-circle > .icons  {
    position:relative;
    top: calc(55% - 10px);
    left:calc(24%);
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
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
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
