<template>
  <div>
    <div class="title" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">
      <img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage" />
      <p class="titleName">{{titleName}}</p>
      <img class="rightIcon" src="../../../static/images/scanOpen.png" />
    </div>
    <div class="subTitle" v-show="subTitleShow">
      <aside><img class="subLeftIcon" src="../../../static/images/orderStationIconSmall.png" /></aside>
      <div class="detail">
        <span>{{stationName}}</span>
        <!-- <span class="more">计费说明</span> -->
      </div>
    </div>
    <div class="bluListWrapper">
      <div class="bluList">
        <ul>
          <li class="item" v-bind:class="{isToRead:item.status===0}" v-for="(item, index) in bleDeviceList" :key="index" @click="openPickerFunction(item)">
            <aside>
              <span>{{item.no}}号车桩</span>
              <span class="badge" :class="stationTypeStyle(item)">{{item.content}}</span>
            </aside>
            <div class="icon" :class="listIconStyle(item)" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import ShareBikeApi from '../../utils/sharebikeCordovaApi';
  import { getUsableStation ,lockStatusUpdate} from '../../api/shareStation'
  import BluetoothManager from '../../utils/bluetoothConnect/bluetoothManager'
  import RouteNavigator from '../../utils/routeNavigator';

  export default {
    components: {
    },
    data() {
      return {
        subTitleShow:false,
        titleName: "咻咻开锁",
        bleDeviceList: [],
        bikeDockListBox: true,
        pickerVisiliable: false,
        stationName:'',
      }
    },

    mounted() {
    },

    created() {
      this.getStations();
    },
    methods: {
      // 车桩类型style
      stationTypeStyle(item){
        if (Number(item.type) == 0) {
          return 'bluContentPrivate'
        } else {
          return 'bluContent'
        }
      },
      // 车桩可用状态style
      listIconStyle(item) {
        if (Number(item.status) == 0) {
          return 'listIconAble'
        } else {
          return 'listIconUnable'
        }
      },
      //  获取附近停车桩
      getStations () {
        console.log("加载数据中");
        const self = this;
        getUsableStation(113.549641, 22.215396, -1).then((response) => {
          console.log(response);
          if(response.data.code !== 200){
            self.showPlugin("提示","附近没有可用车桩");
          }	else {
            console.log(response);
            if (response.data.data.length > 0) {
              self.subTitleShow = true;
              self.bleDeviceList = response.data.data;
              self.stationName = self.bleDeviceList[0].stationName;
              self.bleDeviceList.forEach((obj) => {
                if (String(obj.type) === '0') {
                  obj.content = '共享单车';
                }
                if (String(obj.type === '1')){
                  obj.content = '私人单车';
                }
                if (String(obj.status === '0')) {
                  obj.content = '空闲车位';
                }
              });
            } else {
              self.showPlugin("提示","附近没有可用车桩");
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      // 返回上一页
      backPrePage: function () {
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
      showPlugin (title, content) {
        this.$vux.alert.show({
          title: title,
          content: content,
          onShow () {
            console.log('显示的时候触发的事件');
          },
          onHide () {
            console.log('点击确定按钮后触发');
          }
        });
      },

      // 加载框
      showLoading (text) {
        // 显示loading界面
        this.$vux.loading.show({
          text: text,
        });
        // loading在2秒后消失（网络请求结束或者蓝牙链接成功的时候调用）
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 2000)
      }
    }
  }
</script>


<style lang="less" scoped>
  /*********标题栏  *********/
  .title {
    height: 44px;
    line-height: 44px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    .titleName {
      line-height: 64px;
      position: absolute;
      text-align: center;
      left: 0;
      right: 0;
      margin: 0px;
      font-size: 18px;
      color: black;
      vertical-align: middle;
    }

    .leftIcon {
      line-height: 44px;
      position: absolute;
      left: 20px;
      width: 24px;
      height: 24px;
      z-index: 9;
    }
    .rightIcon {
      line-height: 44px;
      position: absolute;
      right: 10px;
      width: 20px;
      height: 20px;
      z-index: 9;
    }
  }

  /*********次标题  *********/
  .subTitle {
    margin-top: 44px;
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
      overflow-y: auto;
      ul {
        list-style: none;
        margin-left: 20px;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          box-sizing: border-box;
          border-bottom: solid 1px #dfdfdf;
          aside {
            .name {
              font-weight: bold;
            }
            .badge {
              margin-left: 9px;
              font-size: 12px;
              padding: 0 5px;
            }
            .bluContent {
              color: red;
              background-color: lighten(red, 45%);
              border: 0.3px solid red;
            }
            .bluContentPrivate {
              color: deepskyblue;
              background-color: lighten(deepskyblue, 45%);
              border: 0.3px solid deepskyblue;
            }
          }
          .icon {
            margin-right: 20px;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
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

  /*********picker *********/
  .picker {
    position: absolute;
    bottom: 0;
    background-color: white;
    width: 100%;
    display: table-column-group;
    height: 30%;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;

    z-index: 999;
  }
  .pickerTitle {
    height: 20px;
    line-height: 64px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  .pickerTitleName {
    line-height: 64px;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    margin: 0px;
    font-size: 14px;
    color: black;
    vertical-align: middle;
  }
  .canclePicker {
    line-height: 64px;
    width: 30px;
    position: absolute;
    margin-left: 10px;
    font-size: 14px;
    vertical-align: middle;
    z-index: 999;
  }
  .openPicker {
    width: 30px;
    line-height: 64px;
    position: absolute;
    margin-right: 10px;
    font-size: 14px;
    vertical-align: middle;
    margin-left: 90%;
  }
</style>
