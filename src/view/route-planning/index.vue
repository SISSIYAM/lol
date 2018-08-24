<template>
  <div id="routplanning_wrap">
    <div class="position_header flex-h flex-vc">
      <div class="position_header_left flex-v">
        <div class="begin_position flex-h flex-vc">
          <div class="back_icon flex-h flex-hc flex-vc" @click="goBack">
            <svg-icon icon-class="icon_back" class="icon_back"></svg-icon>
          </div>
          <div class="begin_position_point_green">
          </div>
          <div class="begin_position_edit_begin" @click="positionClick(0)">
            {{beginPosition.des}}
          </div>
        </div>
        <div class="middle_line"></div>
        <div class="begin_position flex-h flex-vc">
          <div class="back_icon flex-h flex-hc">
            <svg-icon icon-class="planning_add" class="icon_back"></svg-icon>
          </div>
          <div class="begin_position_point_red">
          </div>
          <div :class="[endPosition.lat.length > 0 ? 'begin_position_edit_end_hasValue' : 'begin_position_edit_end']" @click="positionClick(1)">
            {{endPosition.des}}
          </div>
        </div>
      </div>
      <div class="exchange" @click="exchange">
        <svg-icon icon-class="planning_exchange" class="exchange"></svg-icon>
      </div>
    </div>
    <div class="planning_type flex-v">
      <div class="planning_top flex-h">
        <div class="planning_road flex-h flex-vc flex-hc" @click="changeRouteLineType(0)">
          <svg-icon :icon-class="routeObj.rideClick.img" class="type_icon"></svg-icon>
          <div :class="routeObj.rideClick.class">
            骑行
          </div>
        </div>
        <div class="planning_road flex-h flex-vc flex-hc" @click="changeRouteLineType(1)">
          <svg-icon :icon-class="routeObj.busClick.img" class="type_icon"></svg-icon>
          <div :class="routeObj.busClick.class">
            公交
          </div>
        </div>
      </div>
      <div class="planning_bottom flex-h">
        <div :class="routeObj.rideClick.line"></div>
        <div :class="routeObj.busClick.line"></div>
      </div>
    </div>
    <!--显示地图-->
    <div class="planning_map" v-show="isShowMap">
      <planning-map ref="planningMap" @getAllDetail="onGetAllDetail"></planning-map>
    </div>
    <!--显示路线详情-->
    <div class="planning_road_detail" v-show="isShowDetail">
      <planning-road ref="planningRoadDetail" @headerClick="headerClick" @justRun="immediatelyGo"></planning-road>
    </div>
  </div>
</template>

<script>
import { XInput } from 'vux';
import PlanningMap from './components/planningmap';
import SearchResults from '../station-search/searchResults';
import { tripPlan, batchBookStation } from '../../api/shareStation';
import PlanningRoad from './components/planning_road';
import ShareAPI from '../../utils/sharebikeCordovaApi';

export default {
  name: 'index',
  components: {
    XInput,
    PlanningMap,
    PlanningRoad,
  },
  data() {
    return {
      titleName: '',
      beginPosition: {
        lat: '',
        lng: '',
        des: '我的位置',
      },
      endPosition: {
        lat: '',
        lng: '',
        des: '输入终点',
      },
      isShowMap: true,
      isShowDetail: false,
      routeObj:{
        'rideClick':{
          'img': 'planning_bike_green',
          'class': 'planning_road_title road_green',
          'line': 'line_green',
        },
        'busClick': {
          'img': 'planning_bus',
          'class': 'planning_road_title',
          'line': 'line_white',
        },
      },
      routeType: '0',// 0:骑行，1：公交
      // 网络请求结束后
      lineStations: [],
    };
  },
  mounted() {
    this.setCurrentPlace();
    this.getLocationValue();
  },
  methods: {
    /**
     *
     * 获得当前用户的位置
     *
     * */
    setCurrentPlace() {
      console.log('长度');
      console.log(ShareAPI.userLocation.lat);
      console.log(SearchResults.beginLocation.lat.length);
      if (SearchResults.beginLocation.lat.length <= 0) {
        SearchResults.beginLocation = {
          lat: ShareAPI.userLocation.lat,
          lng: ShareAPI.userLocation.lng,
          des: '我的位置',
        }
      }
    },
    /**
     *
     * 点击我的位置、输入终点这两个按钮，进入搜索界面
     * type: 0: 我的位置，1：终点位置
     *
     * */
    positionClick(type) {
      console.log(type);
      this.$router.push({
        name: 'stationSearch',
        params: {
          searchType: type,
        }
      });
    },
    goBack() {
      SearchResults.beginLocation = {
        lat: '',
        lng: '',
        des: '我的位置',
      };
      SearchResults.endLocation = {
        lat: '',
        lng: '',
        des: '输入终点',
      };
      this.$router.go(-1);
    },
    /**
     *
     *
     * 点击骑行、公交进行路线切换
     * type:
     * 0:骑行
     * 1：公交
     *
     * */
    changeRouteLineType(type) {

      if (type === 0) {
        // 修改样式
        this.routeObj = {
          'rideClick':{
            'img': 'planning_bike_green',
              'class': 'planning_road_title road_green',
              'line': 'line_green',
          },
          'busClick': {
            'img': 'planning_bus',
              'class': 'planning_road_title',
              'line': 'line_white',
          },
        };
      } else if (type === 1) {
        this.routeObj = {
          'rideClick':{
            'img': 'planning_bike',
              'class': 'planning_road_title',
              'line': 'line_white',
          },
          'busClick': {
            'img': 'planning_bus_green',
              'class': 'planning_road_title road_green',
              'line': 'line_green',
          },
        };
      }
      this.routeType = type;
      // 绘制路线
      this.getLocationValue();
    },
    /**
     *
     * 交换起点和终点
     *
     * */
    exchange() {
      console.log('点击交换');
      const temp = SearchResults.beginLocation;
      SearchResults.beginLocation = SearchResults.endLocation;
      SearchResults.endLocation = temp;
      // 绘制路线
      console.log(SearchResults.beginLocation);
      console.log(SearchResults.endLocation);
      this.getLocationValue();
    },
    /**
     *
     *
     * 获得搜索结果显示在上面的按钮上
     * 并开始进行路线规划请求
     *
     * */
    getLocationValue() {
      this.beginPosition = SearchResults.beginLocation;
      this.endPosition = SearchResults.endLocation;
      console.log('获得定位点');
      console.log(this.beginPosition);
      console.log(this.endPosition);
      if (this.endPosition.lat.length > 0 && this.beginPosition.lat.length > 0) {
        // 先清除原先的路线
        this.$refs.planningMap.clearLine();
        this.beginPlanningRoad();
      }
    },
    /**
     *
     * 开始进行网络请求，获得路线规划
     *
     * */
    beginPlanningRoad() {
      const self = this;
      this.isShowDetail = false;
      // 网络等待
      this.$vux.loading.show({
        text: '正在计算路线...',
      });
      setTimeout(() => {
        self.$vux.loading.hide();
      }, 5000);
      console.log('计算路线:' + this.routeType);
      tripPlan(this.beginPosition.lng, this.beginPosition.lat, this.endPosition.lng, this.endPosition.lat, this.routeType).then((response) => {
        console.log('获得路线计算');
        console.log(response);
        if (response.data.code === 200) {
          // this.beginDrawRoad(response.data.data);
          // 开始路线绘制
          self.$refs.planningMap.beginDrawRoad(response.data.data);
          // 获得所有的骑行站点
          this.getAllStations(response.data.data);
        } else if (response.data.code === 201){
          self.$vux.loading.hide();
          self.$vux.alert.show({
            title: '路线规划失败',
            content: '该路线无可预约车桩，请重新选择目的地',
          });
        } else {
          self.$vux.loading.hide();
          self.$vux.alert.show({
            title: '路线规划失败',
            content: '该路线无可预约车桩，请重新选择目的地',
          });
        }
      }).catch((error) => {
        self.$vux.loading.hide();
      });
    },
    /**
     *
     * 获得骑行中的所有站点
     *
     * */
    getAllStations(lines) {
      let stations = [];
      lines.forEach((myLine) => {
        if (myLine.tripType === 1) {
          const s = myLine.stationIds.split(",");
          stations = stations.concat(s);
        }
      });
      this.lineStations = stations;
    },

    // 开始出发
    immediatelyGo(lineList) {
      const ids = this.lineStations.join(',');
      if (ids.length > 0) {
        batchBookStation(ids).then((response) => {
          console.log(response);
          if (response.data.code === 200) {
            this.reSortData(lineList, response.data.data);
          }
          console.log('我的line');
          console.log(lineList);
        }).catch((error) => {

        });
      } else {
        this.reSortData(lineList, []);
      }
    },
    // 重新组合数据，发送给原生
    reSortData(lineList, orderList) {
      // const
      // 路线遍历
      lineList.forEach((line, index) => {
        line.serialNum = index;
        // 如果路线是骑行的
        if (line.type === '1') {
          orderList.forEach((order) => {
            console.log(order.stationId);
            console.log(line.beginStation);
            if (Number(order.stationId) === Number(line.beginStation)) {
              line.beginDumpId = order.mac;
              line.beginDumpNum = order.no;
            } else if (Number(order.stationId) === Number(line.endStation)) {
              line.endDumpId = order.mac;
              line.endDumpNum = order.no;
            }
          });
        }
      });
      // lineList是最终的路线规划
      // orderlist是最终的预约
      console.log('最终的路线');
      console.log(lineList);
      ShareAPI.orderLineNavigator(lineList, orderList, '1');
    },
    //----------------------------------------------------------------------
    // 以下为回调内容planningmap
    //----------------------------------------------------------------------
    /**
     *
     * 获得路线的详细信息
     * values：路线数组
     *
     * */
    onGetAllDetail(allTime, allLength, rideLength, values) {
      this.$vux.loading.hide();
      this.isShowDetail = true;
      // 将数据传递给planning_road
      this.$refs.planningRoadDetail.setDetailValue(allTime, allLength, rideLength, values, this.beginPosition.des, this.endPosition.des);
    },
    //----------------------------------------------------------------------
    // 以下为回调内容planningroad
    //----------------------------------------------------------------------
    /**
     * 点击显示路线详情（通过组件：planning_road回调过来）；
     * isFull:
     * true: 详情页向上移动
     * false：详情页向下移动
     * */
    headerClick(isFull) {
      console.log('点击了');
      // $(window.event.target).toggleClass("className");
      const arr = document.getElementsByClassName('planning_road_detail');
      if (isFull === true) {
        arr[0].className = 'planning_road_detail moveTop';
      } else {
        arr[0].className = 'planning_road_detail moveBottom';
      }
    },
  },
};
</script>

<style lang="scss">
  @import "../station-booking/css/flex.css";
#routplanning_wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .icon_back{
    width: 25px;
    height: 25px;
  }
  .position_header {
    /*padding-top: 20px;*/
    /*margin-left: 20px;*/
    .position_header_left{
      width: calc(100vw - 40px);
    }
    .begin_position{
      height: 44px;
    }
    .begin_position_point_green {
      width: 10px;
      height: 10px;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: #43D551;
      /*margin-left: 10px;*/
    }
    .begin_position_point_red {
      width: 10px;
      height: 10px;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: #FC2025;
      /*margin-left: 10px;*/
    }
    .begin_position_edit_begin{
      width: 70%;
      margin-left: 10px;
      color: #262626;
    }
    .begin_position_edit_end{
      width: 70%;
      margin-left: 10px;
      color: #C2C2C2;
    }
    .begin_position_edit_end_hasValue{
      width: 70%;
      margin-left: 10px;
      color: #262626;
    }
  }
  .middle_line{
    width: calc(100% - 40px);
    height: 1px;
    background: #e2e2e2;
    margin: 0 auto;
  }
  .exchange{
    width: 20px;
    height: 20px;
  }
  .planning_type{
    padding-top: 20px;
  }
  .planning_road{
    width: 50%;
  }
  .planning_road_title{
    margin-left: 10px;
    font-size: 14px;
  }
  .road_green{
    color: #28A7FF;
  }
  .line_green{
    width: 50%;
    height: 2px;
    background: #28A7FF;
  }
  .line_white{
    width: 50%;
    height: 2px;
    background: white;
  }
  .type_icon{
    width: 25px;
    height: 25px;
  }
  .planning_bottom{
    padding-top: 10px;
  }
  .planning_map{
    width: 100%;
    height: calc(100vh - 145px);
  }
  .planning_map .amap-logo{
    display: none;
  }
  .back_icon{
    width: 50px;
  }
  .planning_road_detail{
    width: 100%;
    height: calc(100vh);
    position: absolute;
    top: calc(100vh - 147px);
    transition:top 0.5s;
    -moz-transition:top 0.5s; /* Firefox 4 */
    -webkit-transition:top 0.5s; /* Safari and Chrome */
    -o-transition:top 0.5s; /* Opera */
  }
  .moveTop {
    top: 0;
  }
  .moveBottom{
    top: calc(100vh - 147px);
  }
}
</style>
