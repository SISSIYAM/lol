<template>
  <div id="wrap">
    <div id="map_container" style="width: 100%;height: 100%;"></div>
    <router-link :to="{ path: '/stationSearch', params: {} }">
      <div class="search_btn">
        <div class="search_back">
          <div class="search_icon">
            <svg-icon icon-class="search_icon"></svg-icon>
          </div>
          <div class="search_value">{{ stationName }}</div>
        </div>
      </div>
    </router-link>
    <div class="station-detail" v-show="stationBookingShow">
      <station-booking ref="stationbook" v-on:removeStation="removeStation" v-bind:address="stationClickInfo.address" v-bind:address-detail="stationClickInfo.addressDetail" v-bind:free_num="stationClickInfo.freeNum" v-bind:use_num="stationClickInfo.useNum"></station-booking>
    </div>

  </div>
</template>

<script>
import MapMethod from '../../utils/map';

import { getStationByGPS } from '../../api/shareStation';

import SearchResults from '../station-search/searchResults';

import ShareAPI from '../../utils/sharebikeCordovaApi';

import StationBooking from '../station-booking/index';

export default {
  name: 'bikeStations',
  components: {
    StationBooking,
  },
  data() {
    return {
      // 用户位置
      userLocation: {
        lat: '',
        lng: '',
        address: '我的位置',
      },
      stationName: '搜站点、查站点、找车位',
      // 地图变量
      map: '',
      // 用户定位点
      userMarker: '',
      // 中心移动点的图标
      positionPicker: '',

      // 是否是第一次打开，为true代表第一次打开，用于判断searchLocation的赋值内容
      isFirstIn: true,
      // 地图上显示的所有的站点
      allStationsInfo: [],
      allStationMarkers: [],
      // 以下变量用于显示预约界面的内容
      stationBookingShow: false,
      stationClickInfo: {
        address: '',
        addressDetail: '',
        freeNum: '',
        useNum: '',
      },
      // 计时器
      stationTimer: '',
    };
  },
  mounted() {
    console.log('你好');
    this.initMap();

    // 更新站点信息
    this.updateStationInfo();
  },
  methods: {
    initMap() {
      MapMethod.loadMapUI(() => {
        // 创建地图，传入缩小级别
        this.map = MapMethod.createMap('map_container', 11);
        this.positionPicker = MapMethod.createCenterMarker(this.map);
        // MapMethod.setMapCenter(113.558371,22.280243, this.map, 14);
        this.positionPicker.on('success', this.positionMoveSuccess);
        console.log('正在加载地图');
        console.log(typeof SearchResults.searchLocation.lat);
        if (SearchResults.searchLocation.lat.length > 0) {
          console.log('找到了');
          this.setMapCenter(SearchResults.searchLocation);
        }
        // 在正式打包的时候需要打开，获得用户定位信息
        ShareAPI.handleGetUserLocation = this.handleGetUserLocation.bind(this);
        ShareAPI.getUserLocation();
      });
    },
    /**
     *
     * 1。获得用户定位位置
     * 2。创建用户的当前位置图标
     *
     *
     * */
    handleGetUserLocation(data) {
      MapMethod.clearMarker(this.map, this.userMarker);
      this.userLocation = {
        lng: data.lng,
        lat: data.lat,
      };
      this.userMarker = MapMethod.createMarker({
        map: this.map,
        lat: data.lat,
        lng: data.lng,
        icon: '../../static/images/my_location.png',
        title: '我的位置',
      });
      // 如果搜索点不存在，则设置搜索点为定位点，进行搜索
      if (SearchResults.searchLocation.lat.length <= 0) {
        this.setMapCenter(this.userLocation);
      }
    },
    /**
     *
     * 设置地图中心
     *
     *
     * */
    setMapCenter(position) {
      MapMethod.positionStop(this.positionPicker);
      MapMethod.setMapCenter(position.lng,position.lat, this.map, 14);
      MapMethod.positionStart(this.positionPicker);
      console.log('定位到中心了')
    },
    /**
     *
     *
     * 拖拽地图后的事件
     *
     * */
    positionMoveSuccess(positionResult) {
      console.log('拖拽结束');
      console.log(positionResult);
      SearchResults.searchLocation = {
        lat: String(positionResult.position.lat),
        lng: String(positionResult.position.lng),
        des: positionResult.regeocode.pois[0].name,
      };
      this.searchNearbyStations();
      this.updateStationInfo();
      this.stationName = SearchResults.searchLocation.des;
    },
    /**
     *
     *
     * 每隔多久开始搜索附近的车桩
     *
     * */
    // 每隔1分钟更新界面上的车桩信息
    updateStationInfo() {
      const self = this;
      clearInterval(this.stationTimer);
      this.stationTimer = setInterval(() => {
        self.searchNearbyStations();
      }, 60000);
    },
    /**
     *
     *
     * 开始搜索附近的车桩
     *
     *
     * */
    searchNearbyStations() {
      const myThis = this;
      getStationByGPS(1, SearchResults.searchLocation.lng, SearchResults.searchLocation.lat).then((response) => {
        console.log(JSON.stringify(response));
        if (response.data.code === 200) {
          myThis.allStations = myThis.changeMarkImage(response.data.data);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    /**
     *
     * 设置站点图片样式
     *
     *
     * */
    // 改变图片
    changeMarkImage(objs) {
      // 清除图标
      this.clearAllStationMarker();
      objs.forEach((stationInfo) => {
        if (stationInfo.usage >= 0.0 && stationInfo.usage <= 0.4) {
          stationInfo.icon = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/60db77dc402f458cbaf7f5dd967a1c03.png';
        } else if (stationInfo.usage > 0.4 && stationInfo.usage <= 0.8) {
          stationInfo.icon = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/711ad3aaaf164d148e2d386d5941db3a.png';
        } else {
          stationInfo.icon = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/8df3eefaf0104def9aeedc107f017dc5.png';
        }
        // 创建图标
        this.beginDrawMarker(stationInfo);
      });
      return objs;
    },
    /**
     *
     * 开始绘制站点
     *
     * */
    // 开始绘制站点
    beginDrawMarker(station) {
      // MapMethod.clearMarker()
      const icon = MapMethod.createMapIcon(station.icon, {
        width: 36,
        height: 43,
      });
      const marker = MapMethod.createMarker({
        title: '',
        iconobj: icon,
        map: this.map,
        lat: station.latitude,
        lng: station.longitude,
      }, this.markerClick);
      // 给marker添加点击事件
      marker.on('click', () => {
        console.log(station);
        this.stationBookingShow = true;
        const useNum = Number(station.usage) * Number(station.total);
        const freeNum = Number(station.total) - Number(useNum);
        this.stationClickInfo = {
          address: station.description,
          addressDetail: station.description,
          useNum,
          freeNum,
        };
        this.$refs.stationbook.setStationInfo(station);
      });
      this.allStationMarkers.push(marker);
    },
    /**
     *
     * 清除所有站点图标
     *
     * */
    // 清除所有marker
    clearAllStationMarker() {
      this.allStationMarkers.forEach((marker) => {
        MapMethod.clearMarker(this.map, marker);
      });
      this.allStationMarkers = [];
    },
    /**
     *
     * 移除掉站点信息
     *
     * */
    // 站点信息消失
    removeStation() {
      this.stationBookingShow = false;
    },
  },
  beforeDestroy() {

    clearInterval(this.stationTimer);
    this.stationTimer = '';
  },
  destroyed() {
    console.log('已经销毁了');
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/index.scss";
  @import "../station-booking/css/flex.css";
  #wrap{
    width: 100%;
    height: calc( 100vh - 44px );
    position: relative;
  }
  #map_container{
    width: 100%;
    height: 100%;
  }
  .search_btn {
    width: 100%;
    height: 40px;
    position: absolute;
    top: 20px;
    .search_back {
      width: 90%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      border-radius: 20px;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      background: white;
      .search_icon {
        width: 10px;
      }
      .search_value{
        /*width: 150px;*/
        margin-left: 10px;
        font-size: 10px;
        color: lightgray;
        text-align: center;
      }
    }
  }
  .station-detail {
    position: absolute;
    width: calc(100%);
    height: calc(100vh - 34px);
    z-index: 1000;
    top: 0;
  }
</style>
