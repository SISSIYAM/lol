<template>
<div id="planning_map">
<div id="map_container"></div>
</div>
</template>

<script>
import MapMethod from '../../../utils/map';

export default {
  name: "planningmap",
  data() {
    return {
      map: '',
      allLength: 0,
      allTime: 0,
      // 计算的数量长度
      calIndex: 0,
      lineList: [],
      lineMarker: [],
      rideAllTime: 0,
      rideAllLength: 0,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      MapMethod.loadMapUI(() => {
        // 创建地图，传入缩小级别
        this.map = MapMethod.createMap('map_container', 11);
        console.log(this.map);
        MapMethod.setMapCenter(113.558371,22.280243, this.map, 13);
      });
    },
    /**
     *
     *
     * 通过父组件调用该组件中的方法，将路线传递过来
     *
     * */
    beginDrawRoad(value) {
      this.allLength = 0;
      this.allTime = 0;
      this.rideAllTime = 0;
      this.rideAllLength = 0;
      this.lineList = [];
      value.forEach((data, index) => {
        console.log(index);
        if (index === 0) {
          this.beginSetUrl(data, 0);
        } else if (index === (value.length - 1)) {
          console.log('zhongdian');
          this.beginSetUrl(data, 1);
        } else if (data.tripType === 1) {
          this.beginSetUrl(data, 2);
        }
        // 0:步行，1：骑行，2：公交
        switch (data.tripType) {
          case 0:
            MapMethod.beginDrawWalkLine({
              map: this.map,
              city: '珠海',
              startpoi: {
                lat: data.startLatitude,
                lng: data.startLongitude,
              },
              endpoi: {
                lat: data.endLatitude,
                lng: data.endLongitude,
              },
              index: index,
              tripType: data.tripType,
            }, (results, index, tripType) => {
              this.calculatorLengthAndTime(results, 0);
              this.calIndex += 1;
              this.lineList.push({
                results,
                index,
                tripType,
                'line': value[index],
              });
              this.judgeCalIsEnd(value);
            });
            break;
          case 1:

            MapMethod.beginDrawRideLine({
              map: this.map,
              city: '珠海',
              startpoi: {
                lat: data.startLatitude,
                lng: data.startLongitude,
              },
              endpoi: {
                lat: data.endLatitude,
                lng: data.endLongitude,
              },
              index: index,
              tripType: data.tripType,
            }, (results, index, tripType) => {
              this.calculatorLengthAndTime(results, 1);
              this.calIndex += 1;
              const getArr = value[index].stationNames.split(',');
              this.lineList.push({
                results,
                index,
                tripType,
                'getStation': getArr[0],
                'putStation': getArr[1],
                'line': value[index],
              });
              this.judgeCalIsEnd(value);
            });
            break;
          case 2:
            MapMethod.beginDrawBus({
              map: this.map,
              city: '珠海',
              startpoi: {
                lat: data.startLatitude,
                lng: data.startLongitude,
              },
              endpoi: {
                lat: data.endLatitude,
                lng: data.endLongitude,
              },
              index: index,
              tripType: data.tripType,
            }, data.index, (results, index, tripType) => {
              this.calculatorLengthAndTime(results, 2);
              this.calIndex += 1;
              this.lineList.push({
                results,
                index,
                tripType,
                'line': value[index],
              });
              this.judgeCalIsEnd(value);
            });
            break;
          default:
            break;
        }
      });
    },

    /**
     *
     * 计算时长，距离
     * type:
     * 0: 步行，1：骑行，2：公交
     * */
    calculatorLengthAndTime(data, type) {
      switch (type) {
        case 0:
          const length = data.routes[0].distance;
          const time = data.routes[0].time;

          this.allLength = this.allLength + length;
          this.allTime = this.allTime + time;
          console.log('walktime: ' + time);
          break;
        case 1:
          // 骑行的
          const ridelength = data.routes[0].distance;
          const ridetime = data.routes[0].time;
          this.rideAllLength += ridelength;
          this.rideAllTime += ridetime;
          this.allLength = this.allLength + ridelength;
          this.allTime = this.allTime + ridetime;
          break;
        case 2:
          const busLength = data.plan.distance;
          const busTime = data.plan.time;
          console.log('time: ' + busTime);
          this.allLength = this.allLength + busLength;
          this.allTime = this.allTime + busTime;
          break;
        default:
          break;
      }
    },
    /**
     *
     * 判断是否计算结束，如果结束，则将结果回传给index
     *
     * */
    judgeCalIsEnd(array) {
      if (array.length === this.calIndex) {
        // 将计算好的数据传递给index
        console.log('获得的线路');
        console.log(this.lineList);
        console.log(this.lineList.length);
        this.$emit('getAllDetail', this.allTime, this.allLength, this.rideAllLength, this.lineList);
        // 将数据重置
        this.calIndex = 0;
      }
    },
    /**
     *
     *
     * 开始绘制起点、终点、取车、还车图标
     * type:
     * 0: 起点
     * 1：终点
     * 2：骑行
     *
     * */
    beginSetUrl(data, type) {
      let url = '';
      switch (type) {
        case 0:
          url = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/59b883286a1e4d80bca97bd86df9bee2.png';
          this.beginDraw(data.startLongitude, data.startLatitude, url);
          break;
        case 1:
          url = 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/a0bf30736abd4284a0b69f1b18fa7635.png';
          this.beginDraw(data.endLongitude, data.endLatitude, url);
          break;
        case 2:
          this.beginDraw(data.startLongitude, data.startLatitude, 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/5bece7a122a4436182087a55acc5a0d5.png');
          this.beginDraw(data.endLongitude, data.endLatitude, 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/2af240212ccb4bb6a4107b99bd989bd1.png');
          break;
        default:
          break;
      }
    },
    /**
     *
     * 绘制图标
     *
     * */
    beginDraw(lng, lat, url) {
      const icon = MapMethod.createMapIcon(url, {
        width: 36,
        height: 36,
      });
      const marker = MapMethod.createMarker({
        map: this.map,
        lat: lat,
        lng: lng,
        iconobj: icon,
      });
      this.lineMarker.push(marker);
    },
    /**
     *
     * 清除路线及图标
     *
     * */
    clearLine() {
      MapMethod.clearLine(this.map);
      this.lineMarker.forEach((marker) => {
        MapMethod.clearMarker(this.map, marker);
      })
    },
  },
}
</script>

<style lang="scss">
  #planning_map{
    width: 100%;
    height: 100%;
    #map_container{
      width: 100%;
      height: 100%;
      .amap-logo{
        display: none;
      }
    }
  }
</style>
