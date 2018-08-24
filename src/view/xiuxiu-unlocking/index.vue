<template>
  <div id="xiuxiuWrap">
    <div class="title flex-h flex-vc flex-hc">
      <!--<img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage" />-->
      <!--<p class="titleName">{{titleName}}</p>-->
      <!--<img class="rightIcon" src="../../../static/images/scanOpen.png" @click="enterScanQRCode"/>-->
      <div class="left" @click="backPrePage">
        <svg-icon icon-class="icon_back" class="leftIcon"></svg-icon>
      </div>
      <div class="center">
        附近车桩
      </div>
      <div @click="enterScanQRCode" class="right">
        <svg-icon icon-class="scan" class="rightIcon"></svg-icon>
      </div>
    </div>
    <div class="subTitle" v-show="subTitleShow">
      <aside><img class="subLeftIcon" src="../../../static/images/orderStationIconSmall.png" /></aside>
      <div class="detail">
        <span>{{stationName}}</span>
      </div>
    </div>
    <div class="bluListWrapper">
      <div class="bluList">
        <ul>
          <li class="item flex-h flex-vc" v-bind:class="{isToRead:item.status===0}" v-for="(item, index) in bleDeviceList" :key="index" @click="openPickerFunction(item)">
            <div class="item_left">{{item.no}}号车桩</div>
            <div class="item_center">
              <svg-icon :icon-class="iconName(item)" class="exchange"></svg-icon>
            </div>
            <div class="icon" :class="listIconStyle(item)">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import ShareBikeApi from '../../utils/sharebikeCordovaApi';
import { getUsableStation, lockStatusUpdate } from '../../api/shareStation';
import BluetoothManager from '../../utils/bluetoothConnect/bluetoothManager';
import RouteNavigator from '../../utils/routeNavigator';

export default {
  components: {
  },
  data() {
    return {
      subTitleShow: false,
      titleName: '咻咻开锁',
      bleDeviceList: [],
      bikeDockListBox: true,
      pickerVisiliable: false,
      stationName: '',
    };
  },

  mounted() {
  },

  created() {
    this.getStations();
  },
  methods: {
    // 车桩类型style
    stationTypeStyle(item) {
      if (Number(item.type) === 0) {
        return 'bluContentPrivate';
      }
      return 'bluContent';
    },
    iconName(item) {
      console.log(item);
      if (Number(item.carType) === 0) {
        return 'public_icon';
      } else if (Number(item.type) === 1) {
        return 'private_icon';
      }
      return 'empty_icon';
    },
    // 车桩可用状态style
    listIconStyle(item) {
      if (Number(item.carType) === 1) {
        return 'listIconUnable';
      }
      return 'listIconAble';
    },
    enterScanQRCode() {
      ShareBikeApi.startScan();
    },
    //  获取附近停车桩
    getStations() {
      console.log('加载数据中');
      const self = this;
      getUsableStation(113.549641, 22.215396, -1).then((response) => {
        console.log(response);
        if (response.data.code !== 200) {
          self.showPlugin('提示', '附近没有可用车桩');
        }	else {
          console.log(response);
          if (response.data.data.length > 0) {
            self.subTitleShow = true;
            self.bleDeviceList = response.data.data;
            self.stationName = self.bleDeviceList[0].stationName;
            self.bleDeviceList.forEach((obj) => {
              obj.carType = obj.type;
              if (String(obj.type) === '0') {
                obj.content = '共享单车';
              }
              if (String(obj.type === '1')) {
                obj.content = '私人单车';
              }
              if (String(obj.status === '0')) {
                obj.content = '空闲车位';
              }
            });
          } else {
            self.showPlugin('提示', '附近没有可用车桩');
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // 返回上一页
    backPrePage() {
      this.$router.go(-1);
    },
    openPickerFunction(item) {
      RouteNavigator.connectingBlue = '';
      RouteNavigator.orderInfo = item;
      RouteNavigator.lines = '';
      // 相当于取车
      if (String(item.status) === '0') {
        console.log('iiii');
        // --------------------------?????????????????????????????????????---------------------------------
        // 弹出选择框选择车辆类型
        // --------------------------?????????????????????????????????????---------------------------------
        RouteNavigator.orderInfo.type = '1';
      } else if (String(item.status) === '1') {
        RouteNavigator.orderInfo.type = '0';
      } else if (String(item.status) === '2') {

      }

      RouteNavigator.beginConnectBlue(false);
    },
    // 提示框
    showPlugin(title, content) {
      this.$vux.alert.show({
        title,
        content,
        onShow() {
          console.log('显示的时候触发的事件');
        },
        onHide() {
          console.log('点击确定按钮后触发');
        },
      });
    },

    // 加载框
    showLoading(text) {
      // 显示loading界面
      this.$vux.loading.show({
        text,
      });
      // loading在2秒后消失（网络请求结束或者蓝牙链接成功的时候调用）
      setTimeout(() => {
        this.$vux.loading.hide();
      }, 2000);
    },
  },
};
</script>


<style lang="less" scoped>
@import "../station-booking/css/flex.css";
#xiuxiuWrap {
  overflow: hidden;
}
  /*********标题栏  *********/
  .title {
    height: 44px;
    width: 100%;
    background-color: white;
    .center {
      text-align: center;
      left: 0;
      right: 0;
      font-size: 18px;
      color: black;
      width: calc(100% - 84px);
    }
    .left{
      margin-left: 20px;
      .leftIcon {
        width: 24px;
        height: 24px;
      }
    }
    .right{
      margin-right: 20px;
      .rightIcon {
        width: 20px;
        height: 20px;
      }
    }
  }

  /*********次标题  *********/
  .subTitle {
    /*margin-top: 44px;*/
    display: flex;
    align-items: center;
    height: 40px;
    .subLeftIcon {
      margin-left: 20px;
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }
    .detail {
      display: flex;
      width: 100%;
      padding-right: 20px;
      justify-content: space-between;
      line-height: 40px;
      font-size: 14px;
      color: #666666;
      .more {
        font-size: 10px;
        color: #ff3b30;
      }
    }
  }

  /**********预约列表***********/
  .bluListWrapper {
    width: 100%;
    height: calc(100vh - 84px);
    overflow: hidden;
    background-color: white;
    .bluList {
      height: 100%;
      overflow-y: scroll;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-left: 20px;
        margin-right: 20px;
        .item {
          height: 60px;
          box-sizing: border-box;
          border-bottom: solid 1px #dfdfdf;
          .item_left{
            /*margin-left: 20px;*/

          }
          .item_center {
            width: calc(100% - 100px);
            margin-left: 10px;
            .exchange {
              height: 14px;
              width: 60px;
            }
          }
          .icon {
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            /*align-self: stretch;*/
          }
          .listIconAble {
            background-image: url(../../../static/images/stationOrderStatus.png);
          }
          .listIconUnable {
            background-image: url(../../../static/images/stationOrderStatusUnable.png);
          }
        }
      }
    }
  }


  .right-item{
    /*display: inline-block;*/
    margin-right: 20px;
    width: 22px;
    height: 22px;
  }
</style>
