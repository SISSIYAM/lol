<template>
  <div id="wrap">
    <div id="map_container" style="width: 100%;height: 100%;"></div>
    <router-link :to="{ path: '/stationSearch', params: {} }">
      <div class="search_btn">
        <div class="search_back">
          <div class="search_icon"></div>
          <div class="search_value">{{ searchLocation.value }}</div>
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
      // 搜索目标位置
      searchLocation: {
        lat: '',
        lng: '',
        value: '搜地点、查站点、找车位',
      },
      // 地图变量
      map: '',
      // 用户定位点
      userMarker: '',
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
    };
  },
  mounted() {
    console.log('你好');
    this.initMap();
    // ShareAPI.handleGetUserLocation = this.handleGetUserLocation.bind(this);
    // ShareAPI.getUserLocation();
    // 是否从搜索界面返回，如果是，则进行搜索，定位点不需要进行搜索
    console.log(SearchResults);
    if (SearchResults.isSearching) {
      SearchResults.isSearching = false;
      this.setSearchLocation(SearchResults.searchLocation);
    }
  },
  methods: {
    initMap() {
      // 创建地图，传入缩小级别
      this.map = MapMethod.createMap('map_container', 11);
      MapMethod.setMapCenter(113.544888, 22.265654, this.map, 14);
    },
    // 获得用户定位信息
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
        icon: 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/c093ee70ffe749339120c78670dd20c0.png',
        title: '我的位置',
      });
      // this.setSearchLocation();
      // 如果搜索点不存在，则设置搜索点为定位点，进行搜索
      if (this.searchLocation.lat.length <= 0) {
        this.setSearchLocation(this.userLocation);
      }
    },
    // 设置搜索点的坐标位置
    setSearchLocation(obj) {
      this.searchLocation = {
        lat: obj.lat,
        lng: obj.lng,

      };
      if (obj.des) {
        this.searchLocation.value = obj.des;
      }
      // 缺少marker坐标

      MapMethod.setMapCenter(this.searchLocation.lng, this.searchLocation.lat, this.map, 14);
      this.searchNearbyStations();
    },
    // 搜索附近的车桩列表
    searchNearbyStations() {
      console.log('开始搜索');
      const myThis = this;
      getStationByGPS(2, this.searchLocation.lng, this.searchLocation.lat).then((response) => {
        console.log(JSON.stringify(response));
        if (response.data.code === 200) {
          myThis.allStations = myThis.changeMarkImage(response.data.data);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // 改变图片
    changeMarkImage(objs) {
      objs.forEach((stationInfo) => {
        if (stationInfo.usage >= 0.0 && stationInfo.usage <= 0.4) {
          stationInfo.icon = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/60db77dc402f458cbaf7f5dd967a1c03.png';
        } else if (stationInfo.usage > 0.4 && stationInfo.usage <= 0.8) {
          stationInfo.icon = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/711ad3aaaf164d148e2d386d5941db3a.png';
        } else {
          stationInfo.icon = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/8df3eefaf0104def9aeedc107f017dc5.png';
        }
        this.beginDrawMarker(stationInfo);
      });
      return objs;
    },
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
    removeStation() {
      this.stationBookingShow = false;
    },
  },
  destroyed() {
    console.log('已经销毁了');
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/index.scss";
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
        height: 10px;
        background: yellow;
      }
      .search_value{
        width: 150px;
        height: 15px;
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
    /*bottom: 10px;*/
    z-index: 1000;
    top: 0;
  }
</style>
