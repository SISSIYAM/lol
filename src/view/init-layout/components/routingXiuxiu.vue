<template>
  <div class="routing-xiuxiu-container">

    <!--显示地图-->
    <bike-stations ref="bikeStation"></bike-stations>
    <div class="reservation-circle" :class="{'circle_top_iPhonX': iPhoneX}">
      <router-link :to="({path:'/stationOrder'})">
        <svg-icon icon-class="noreservation" class="icons"></svg-icon>
      </router-link>
    </div>
    <div class="red-envelope-circle" :class="{'circle_top_iPhonX': iPhoneX}">
      <a>
        <img v-bind:src="gifImg">
      </a>
    </div>
    <div class="location-circle" :class="{'circle_bot_iPhonX': iPhoneX}" @click="getUserLocation">
      <svg-icon icon-class="location" class="icons"></svg-icon>
    </div>
    <div class="service-circle" :class="{'circle_bot_iPhonX': iPhoneX}" @click="callCustomer">
      <svg-icon icon-class="service" class="icons"></svg-icon>
    </div>

    <div id="whereGo" class="whereGo" :class="{'whereGo_iPhoneX': iPhoneX}">
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
import ShareAPI from '../../../utils/sharebikeCordovaApi';

let iPhoneX = false;
const u = navigator.userAgent;
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
if (isIOS) {
  if (screen.height == 812 && screen.width == 375) {
    iPhoneX = true;
  }
}
export default {
  name: 'routingXiuxiu',
  data() {
    return {
      gifImg: 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/29f7a91a89544c05bbb3b50beba9b278.gif',
      iPhoneX,
    };
  },
  components: {
    BikeStations,
    searchBar,
  },
  methods: {
    getUserLocation() {
      this.$refs.bikeStation.setUserMapCenter();
    },
    callCustomer() {
      ShareAPI.callPhone('18610282461');
    },
  },
};
</script>

<style lang="less">

  .routing-xiuxiu-container{
   min-height: calc( 100vh - 44px );
    position: relative;
    /*background: #fbc4c4;*/
  }
  .reservation-circle, .red-envelope-circle, .location-circle, .service-circle{
    display:inline;
    position: absolute;
    z-index: 500;
  }
  .reservation-circle{
    bottom: 191px;
    left: 10px;
  }
  .red-envelope-circle{
    bottom: 191px;
    right: 0;
    img{
      width: 44px;
    }
  }
  .location-circle{
    bottom: 140px;
    left: 10px;
  }
  .service-circle{
    bottom: 140px;
    right: 10px;
  }
  .reservation-circle, .location-circle, .service-circle {
    border-radius: 50%;
    background-color: #FFFFFF;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);
    height:30px;
    width:30px;
    position:absolute;
    text-align: center;
  }
  .icons{
    display:block;
    position:absolute;
    padding: calc(55% - 10px) calc(24%);
  }

  #whereGo {
    display: flex;
    position: fixed;
    z-index: 500;
    left: 10px;
    width: calc(100% - 20px);
    height:60px;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);
    .whereGoitem {
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      line-height: 60px;
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

  .whereGo{
    bottom: 10px;
  }

  .whereGo_iPhoneX{
    // 暂时不适配底部Home条
    // bottom: 42px;
  }
  .circle_top_iPhonX{
    // 暂时不适配底部Home条
    // bottom: 172px;
    bottom: 211px;
  }
  .circle_bot_iPhonX{
    // 暂时不适配底部Home条
    // bottom: 121px;
    bottom: 160px;
  }
</style>
