<template>
<div id="orderdetail">
  <div class="back_icon flex-h flex-vc flex-hc" @click="goBack">
    <svg-icon icon-class="icon_back" class="icon_back"></svg-icon>
  </div>
  <div id="map_container" style="width: 100%;height: 100vh;"></div>
  <div class="orderinfo">
    <order-info ref="orderInfo" @goBack="goBack"></order-info>
  </div>
</div>
</template>

<script>
import OrderInfo from './components/orderinfo';
import MapMethod from '../../utils/map';
import ShareAPI from '../../utils/sharebikeCordovaApi';

export default {
  name: "orderDetail",
  components: {
    OrderInfo,
  },
  data() {
    return {
      map: '',
    }
  },
  mounted() {
    this.initMap();
    this.initValues();
  },
  methods: {
    initMap() {
      MapMethod.loadMapUI(() => {
        // 创建地图，传入缩小级别
        this.map = MapMethod.createMap('map_container', 11);
        MapMethod.setMapCenter(ShareAPI.userLocation.lng, ShareAPI.userLocation.lat, this.map, 14);
      });
    },
    initValues() {
      this.$refs.orderInfo.setValues(this.$route.params.orderObj);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../station-booking/css/flex.css";
#orderdetail{
  width: 100%;
  height: 100%;
  position: relative;
  .back_icon{
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    /*left: 20px;*/
    z-index: 9999;
  }
  .icon_back{
    width: 20px;
    height: 40px;
  }
  /*.map_container{*/
    /*width: 200px;*/
    /*height: 200px;*/
  /*}*/
  .orderinfo{
    position: absolute;
    width: calc(100%);
    /*height: calc(100vh - 34px);*/
    /*z-index: 1000;*/
    /*top: 0;*/
    bottom: 20px;
  }
}
</style>
