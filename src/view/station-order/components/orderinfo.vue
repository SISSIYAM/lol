<template>
  <div id="wrap">
    <div class="title flex-h flex-vc flex-hc">
      <div class="title_icon">
        <svg-icon icon-class="icon_location"></svg-icon>
      </div>
      <div class="title_content flex-v">
        <div class="title_content_head">{{ detailInfo.stationName }}</div>
        <!--<div class="title_content_detail">{{ addressDetail }}</div>-->
      </div>
      <div class="title_btn flex-h flex-vc flex-hc" @click="beginNav">
        <svg-icon icon-class="book_go_where" class="go_where"></svg-icon>
      </div>

    </div>
    <div class="title_line"></div>
    <div class="station flex-v flex-vc flex-hc">
      <div class="station_num flex-h">
        <div class="station_num_title">预约时间：</div>
        <div class="station_num_value">{{ detailInfo.expireTime }}</div>
      </div>
      <div class="station_num flex-h">
        <div class="station_num_title">预约类型：</div>
        <div class="station_num_value">{{ detailInfo.type }}</div>
      </div>
      <div class="station_num flex-h">
        <div class="station_num_title">车桩号：</div>
        <div class="station_num_value">{{ detailInfo.no }}</div>
      </div>
    </div>
    <div class="title_line"></div>
    <div class="action flex-h flex-vc flex-hc"  v-show="isBottomShow">
      <div class="action_stop" @click="cancleOrder(detailInfo.stationDetailId)">取消预约</div>
      <div class="action_line"></div>
      <div class="action_get" @click="openBlue">开锁</div>
    </div>
  </div>
</template>

<script>
import {cancleBookStation} from '../../../api/shareOrder';
import ShareApi from '../../../utils/sharebikeCordovaApi';
import RouteNavigator from '../../../utils/routeNavigator';

export default {
  name: 'orderinfo',
  data() {
    return {
      detailInfo: {},
      connectPeripheral: '',
      hasCarTimer: '',
      isHasCar: false,
      isBottonShow: true,
    }
  },
  mounted() {
    this.showBottom();
  },
  methods: {
    showBottom() {
      if (this.detailInfo.status === '预约过期' || this.detailInfo.status === '预约取消') {
        this.isBottomShow = false;
      }
    },
    cancleOrder(value) {
      const self = this;
      this.$vux.loading.show({
        text: '正在取消...',
      });
      console.log(value);
      cancleBookStation(value).then((response) => {
        this.$vux.loading.hide();
        if (response.data.code === 200) {
          self.$vux.alert.show({
            title: '提示',
            content: '取消预约成功!',
            onHide() {
              self.$emit('goBack');
            },
          });
        } else {
          self.$vux.alert.show({
            title: '提示',
            content: '取消预约失败',
          });
        }
      }).catch((error) => {
        self.$vux.loading.hide();
      });
    },
    openBlue() {
      RouteNavigator.orderInfo = this.detailInfo;
      RouteNavigator.lines = '';
      RouteNavigator.beginConnectBlue(false);
    },
    setValues(obj) {
      console.log('我的对象');
      console.log(obj);
      this.detailInfo = obj;
      // const expireTime = this.detailInfo.expireTime;
    },
    beginNav() {
      const lineObj = {
        'type': '0',  // 数据类型：0：步行，1：骑行，2：公交
        'headTitle': '我的位置',  // 标题，其中type为3或者4的时候，代表起点或终点的标题
        'middleTitle': '步行',// 中间的标题，type为0，1，2的时候才会存在，为0时，只有middletitle，没有其他title
        'bottomTitle': ' this.detailInfo.stationName',// 下面的标题，type为0，1，2的时候才会存在
        'beginLat': ShareApi.userLocation.lat,// 本段路线开始的纬度
        'beginLng': ShareApi.userLocation.lng,// 本段路线开始的经度
        'endLat': this.detailInfo.latitude,// 本段路线结束点的纬度
        'endLng': this.detailInfo.longitude,// 本段路线结束点的经度
      };
      ShareApi.orderLineNavigator([lineObj], [], 0);
    },
  },
};
</script>

<style lang="scss" scoped>
  /*引入flex浏览器适配*/
  @import '../../station-booking/css/flex.css';
  #wrap{
    color: #303030;
    width: calc(96%);
    margin: 0 auto;
    height: 100%;
    background: white;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    .title {
      width: 100%;
      height: 80px;
      .title_icon {
        /*background: blue;*/
        width: 20px;
        height: 20px;
      }
      .title_content {
        margin-left: 10px;
        width: calc(100% - 140px);
        .title_content_head {
          width: 100%;
          /*height: 25px;*/
          font-size: 16px;

        }
        .title_content_detail {
          width: 100%;
          font-size: 8px;
          color: gray;
        }
      }
      .title_btn{
        width: 80px;
        height: 40px;
        border-radius: 20px;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        .go_where{
          width: 100%;
          height: 100%;
        }
      }
    }
    .station {
      width: 100%;
      height: 100px;
      .station_num{
        margin-bottom: 5px;
        width: calc(100% - 20px);
        margin-left: 40px;
        /*height: 100%;*/
        /*text-align: center;*/
        .station_num_value{
          font-size: 14px;
          /*height: 70px;*/
        }
        .station_num_title{
          font-size: 14px;
          font-weight: 200;
          color: gray;
        }
      }
    }
    .action {
      width: 100%;
      height: 50px;
      .action_stop {
        width: calc(50% - 0.5px);
        /*height: 100%;*/
        text-align: center;
      }
      .action_line {
        width: 1px;
        height: 100%;
        background: #E2E2E2;
      }
      .action_get{
        width: calc(50% - 0.5px);
        /*height: 100%;*/
        text-align: center;
      }
    }
    .title_line {
      width: calc(100% - 20px);
      height: 1px;
      background: #E2E2E2;
      margin: 0 auto;
    }
  }
</style>
