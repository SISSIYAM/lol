<template>
<div id="planningroad">
  <div class="header">
    <div class="header_title flex-v flex-hc" @click="headerClicked">
      <div class="header_length flex-h flex-vc">
        <span class="roadTime">{{roadTime}}</span>
        <span class="roadLength">{{roadLength}}</span>
      </div>
      <div class="header_detail flex-h flex-vc">
        <div class="detail_left">
          <svg-icon icon-class="planning_bike"></svg-icon>
        </div>
        <div class="detail_length">
          {{rideLength}}
        </div>
      </div>
    </div>
    <div class="middle_line"></div>
    <div class="immrun flex-h flex-vc flex-hc" @click="beginOrderLine">
      立即出发
    </div>
  </div>
  <div class="bottom">
    <div class="bottom_wrap">
      <component :is="item.component" :dataObj="item.obj" v-for="item in comlist">
      </component>
    </div>
  </div>
</div>

</template>

<script>
import RoadBegin from './road_detail/road_begin';
import RoadWalk from './road_detail/road_walk';
import RoadRide from './road_detail/road_ride';
import RoadEnd from './road_detail/road_end';

export default {
  name: "planning_road",
  components: {
    RoadBegin,
    RoadWalk,
    RoadRide,
    RoadEnd,
  },
  data() {
    return {
      roadTime: '11分钟',
      roadLength: '111公里',
      rideLength: '',
      isFullScreen: false,
      comlist: [],
      myLineList: [],
    };
  },
  methods: {
    setDetailValue(allTime, allLength, ride, values, beginTitle, endTitle) {
      this.myLineList = [];
      this.comlist = [];
      const time = parseInt(allTime / 60);
      let aLength = allLength / 1000;
      aLength = aLength.toFixed(2);
      let aride = ride / 1000;
      aride = aride.toFixed(2);

      console.log(allTime);
      console.log(allLength);
      console.log(ride);
      console.log(values);
      console.log(beginTitle);
      console.log(endTitle);
      this.roadTime = String(time) + '分钟';
      this.roadLength = String(aLength) + '公里';
      this.rideLength = String(aride) + '公里';
      this.createComponentsIn(values, beginTitle, endTitle);
    },
    headerClicked() {
      this.isFullScreen = !this.isFullScreen;
      this.$emit('headerClick', this.isFullScreen);
      // this.createWalkTitle(0);
    },
    /**
     *
     *
     * 根据数据创建不同的组件，添加到数组中
     *
     *
     * */
    createComponentsIn(lineList, beginTitle, endTitle) {
      console.log('开始计算了');

      // 进行重新排序
      const values = this.sortLineListArray(lineList);
      this.comlist = [];
      // values
      values.forEach((data, index) => {
        if (index === 0) {
          // 步行
          const beginCom = {
            'component': 'RoadBegin',
            'obj':{
              'title': beginTitle,
            },
          };
          this.comlist.push(beginCom);

          //
          // // 数据
          // const a = {
          //   'headTitle': beginTitle,
          //   'type': '3',
          // };
          // this.myLineList.push(a);

        }
        let com = '';
        switch (data.tripType){
          case 0:
            const walkObj = {
              'middleTitle': '步行' + data.results.routes[0].distance + '米',
            };
            com = {
              'component': 'RoadWalk',
              'obj': walkObj,
            };

            const b = {
              'middleTitle': '步行' + data.results.routes[0].distance + '米',
              'type': '0',
              'beginLat': data.results.origin.lat,
              'beginLng': data.results.origin.lng,
              'endLat': data.results.destination.lat,
              'endLng': data.results.destination.lng,
            };
            this.myLineList.push(b);

            break;
          case 1:
            // 单车
            console.log('单车路线好了');
            console.log(data);
            let aride = data.results.routes[0].distance / 1000;
            aride = aride.toFixed(2);
            const rideObj = {
              'beginType': '取车',
              'endType': '还车',
              'beginTitle': data.getStation,
              'endTitle': data.putStation,
              'middleTitle': '骑行' + String(aride) + '公里',
              'type': 'RIDE',
            };
            com = {
              'component': 'RoadRide',
              'obj': rideObj,
            };

            const d = {
              'headTitle': data.getStation,
              'middleTitle': '骑行' + String(aride) + '公里',
              'bottomTitle': data.putStation,
              'type': '1',
              'beginLat': data.results.origin.lat,
              'beginLng': data.results.origin.lng,
              'endLat': data.results.destination.lat,
              'endLng': data.results.destination.lng,
              'beginStation': data.line.stationIds.split(',')[0],
              'endStation': data.line.stationIds.split(',')[1],
            };
            this.myLineList.push(d);


            break;
          case 2:
            // 公交车
            console.log(data.results);
            // 获得公交路线文字说明
            let middleTitle = '';
            let beginTitle = '';
            let endTitle = '';
            data.results.plan.segments.forEach((seg, index) => {
              if (seg.transit_mode !== 'WALK' && seg.transit_mode !== 'RIDE') {
                middleTitle = '共' + seg.transit.via_num + '站';
                middleTitle += seg.instruction;
                beginTitle = seg.transit.on_station.name;
                endTitle = seg.transit.off_station.name;
              }
            });
            const busObj = {
              'beginType': '上车',
              'endType': '下车',
              'beginTitle': beginTitle,
              'endTitle': endTitle,
              'middleTitle': middleTitle,
              'type': 'BUS',
            };
            com = {
              'component': 'RoadRide',
              'obj': busObj,
            };

            const c = {
              'headTitle': beginTitle,
              'middleTitle': middleTitle,
              'bottomTitle': endTitle,
              'type': '2',
              'beginLat': data.results.origin.lat,
              'beginLng': data.results.origin.lng,
              'endLat': data.results.destination.lat,
              'endLng': data.results.destination.lng,
            };
            this.myLineList.push(c);
            break;
          default:
            break;
        }
        this.comlist.push(com);
        if (index === values.length - 1) {
          const endCom = {
            'component': 'RoadEnd',
            'obj':{
              'title': endTitle,
            },
          };
          this.comlist.push(endCom);
          // const e = {
          //   'headTitle': endTitle,
          //   'type': '4',
          // };
          // this.myLineList.push(e);
        }
      });
      console.log(JSON.stringify(this.myLineList));
    //   添加起点
      const first = this.myLineList[0];
      first.headTitle = beginTitle;
      const last = this.myLineList[this.myLineList.length - 1];
      last.headTitle = endTitle;
    },
    /**
     *
     * 将路线数组根据index进行排序
     *
     *
     * */
    sortLineListArray(lineList) {
      return lineList.sort(this.compare);
    },
    compare (obj1, obj2) {
      const val1 = obj1.index;
      const val2 = obj2.index;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    },
    /**
     *
     * 点击立即出发
     *
     *
     * */
    beginOrderLine() {
      this.$emit('justRun', this.myLineList);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../station-booking/css/flex.css";
#planningroad{
  width: 100%;
  height: 100%;
  background: #EFEFEF;
  overflow: hidden;
  .header{
    width: 100%;
    height: 147px;
    background: white;
    margin-bottom: 10px;
    .header_title{
      width: 100%;
      height: 79px;
      margin-left: 5%;
    }
    .middle_line{
      width: 90%;
      margin: 0 auto;
      height: 1px;
      background: #e2e2e2;
      margin-bottom: 15px;
    }
    .roadLength{
      margin-left: 10px;
    }
    .detail_length{
      margin-left: 10px;
      font-size: 14px;
      color: #686868;
    }
  }
  .immrun{
    background: #28A7FF;
    color: white;
    height: 40px;
    width: 90%;
    margin: 0 auto;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
  }
  .bottom {
    width: 100%;
    height: calc(100vh - 147px);
    background: white;
    overflow: scroll;
  }
  .bottom_wrap {
    width: calc(100vh - 20px);
    height: calc(100vh - 167px);
    padding-top: 20px;
    margin-left: 20px;
  }
}

</style>
