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
    <div class="immrun flex-h flex-vc flex-hc">
      立即出发
    </div>
  </div>
  <div class="bottom flex-v">
    <div class="bottom_wrap">
      <!--<road-begin></road-begin>-->
      <!--<road-walk></road-walk>-->
      <!--<road-ride></road-ride>-->
      <!--<road-end></road-end>-->
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
    };
  },
  methods: {
    setDetailValue(allTime, allLength, ride, values, beginTitle, endTitle) {
      const time = parseInt(allTime / 60);
      let aLength = allLength / 1000;
      aLength = aLength.toFixed(2);
      let aride = ride / 1000;
      aride = aride.toFixed(2);
      this.roadTime = String(time) + '分钟';
      this.roadLength = String(aLength) + '公里';
      this.rideLength = String(aride) + '公里';
      this.createComponentsIn(values, beginTitle, endTitle);
    },
    headerClicked() {
      this.isFullScreen = !this.isFullScreen;
      this.$emit('headerClick', this.isFullScreen);
      this.createWalkTitle(0);
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
            break;
          case 1:
            // 单车
            break;
          case 2:
            // 公交车
            console.log(data.results);
            const busObj = {
              'beginType': '上车',
              'endType': '下车',
              'beginTitle': data.results.segments[0].transit.on_station.name,
              'endTitle': data.results.segments[0].transit.off_station.name,
              'middleTitle': '共' + data.results.segments[0].transit.via_num + '站',
            };
            com = {
              'component': 'RoadRide',
              'obj': busObj,
            };
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
        }
      });
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
     * type:
     * 0:起点
     * 1：终点
     * */
    createWalkTitle(type) {

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
  }
  .bottom_wrap {
    padding-top: 20px;
    margin-left: 20px;
  }
  .walk_detail{
    height: 30px;
  }
  .walk_detail_mill{
    height: 80px;
    /*margin-left: 20px;*/
    color: #616161;
    font-size: 14px;
  }
  .walk_detail_title{
    margin-left: 20px;
  }
  .walk_detail_add{
    margin-left: 10px;
    font-weight: 700;
  }
  .ride_detail{
    height: 130px;
  }
  .ride_detail_left{
    height: 100%;
  }
  .detailRide{
    width: 16px;
    height: 100%;
  }
  .ride_order_num{
    border: 1px solid #78C9FF;
    width: 20px;
    height: 14px;
    color: #78C9FF;
    font-size: 10px;
    line-height: 14px;
  }
  .ride_detail_length{

  }
  .begin_left_icon {
    width: 16px;
    height: 16px;
  }
  .planning_walk_left_icon{
    width: 16px;
    height: 100%;
  }
  .walk_detail_mill_length{
    margin-left: 20px;
  }

}

</style>
