// eslint-disable-next-line
import Store from '../store';
import BlueConnect from './bluetoothConnect/BlueConnect';
import ShareAPI from './sharebikeCordovaApi';
import {lockStatusUpdate, lockStatusUpdateclose, canOpen, payOrder} from "../api/shareStation";
import BluetoothManager from './bluetoothConnect/bluetoothManager';

class RouteNavigator {
  constructor() {
    // 获得路线数据
    // 打开蓝牙
    // 判断是否有下一段导航
    // 执行下一段导航

    //
    // 打开蓝牙，进行搜索

    this.lines = [];
    this.orderInfo = {};
    this.hasEnoughMoney = true;
    this.connectingBlue = '';
    this.isConnecting = false;
    // ---------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
    // 判断是取车还是还车
    this.beginConnectBlue = (state, isOrderBlue) => {
      // BluetoothManager.onHandleBluetoothDisConnect = this.onHandleBluetoothDisConnect.bind(this);
      // 判断传输过来的是否是已经发送过的
      console.log('conn === ' + this.connectingBlue);
      console.log('conn111 === ' + this.orderInfo);
      ShareAPI.noSendOrderNearby(this.orderInfo.mac);
      if (this.connectingBlue.length <= 0) {
        this.connectingBlue = this.orderInfo.mac;
        // // 判断蓝牙是否开启
        BluetoothManager.enableBluetooth(() => {
          // 是否开锁弹出框
          ShareAPI.showAlertView({
            title: '提示',
            content: '您已到达车桩附近，是否开锁！',
            rightTitle: '确定',
            leftTitle: '取消',
          },() => {
            if (this.orderInfo.type === '1') {
              // 取车
              this.getCar(state);
            } else if (this.orderInfo.type === '0') {
              // 还车
              this.stopCar(state);
            }
          });
        }, () => {
          console.log('蓝牙没有打开');
          this.connectingBlue = '';
          // Vue.$vux.alert.show({
          //   title: '提示',
          //   content: '请开启蓝牙！',
          // });
          ShareAPI.showAlertView({
            title: '提示',
            content: '请打开蓝牙!',
            rightTitle: '确定',
          });
        });
      }
      // this.stopCar(state);
    };


    this.onHandleBluetoothDisConnect = () => {
      this.connectingBlue = '';
      self.isConnecting = false;
    };


    // // 对外接口：链接蓝牙
    this.beginConnectBluetoothWithMac = (state) => {
      console.log('走到开始蓝牙');
      const self = this;
      if (this.isConnecting) {
        return;
      }
      BlueConnect.connectBluetoothWithMac(this.orderInfo.mac, () => {
        self.isConnecting = true;
        Vue.$vux.loading.show({
          text: '正在开锁...',
        });
        // 链接成功，发送开锁请求
        BlueConnect.open(() => {
          // 开锁成功
          Vue.$vux.loading.hide();
          Vue.$vux.toast.show({
            text: '开锁成功',
          });
          // 如果是1，则是取车，显示支付界面
          if (self.orderInfo.type === '1') {
            self.payOrderMoney();
          }
          // 进行下一次导航
          self.getLineAndOrderValue(state);
        }, () => {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.show({
            text: '开锁失败',
          });
          // 上传开锁失败
        });
      });
    };



    // -----------------------------------------------------------------
    // 取车
    // -----------------------------------------------------------------
    this.getCar = (state) => {
      const self = this;
      // 判断是否有钱
      BlueConnect.canOpenCarPile(this.orderInfo.mac, () => {
        console.log('有钱');
        console.log(self);
        // 进行蓝牙链接
        self.beginConnectBluetoothWithMac(state);
      }, () => {
        ShareAPI.showAlertView({
          title: '提示',
          content: '账户余额不足，请充值！',
          rightTitle: '确定',
          leftTitle: '取消',
        });
      });

    };
    this.payOrderMoney = () => {
      // 付款
      payOrder().then((response) => {
        if (response.data.code === 200) {
          // 弹出支付成功界面
          const money = Number(response.data.data.cost) / 100;
          ShareAPI.showPaySuccess(money);
        }
      }).catch(() => {

      });
    };
    // -----------------------------------------------------------------
    // 停车
    // -----------------------------------------------------------------
    this.stopCar = (state) => {
      console.log('进入停车了');
      console.log('Vue' + Store.getters.authCode);
      if (Store.getters.authCode) {
        console.log('急急急');
        Store.dispatch('beginShowPicker', state);

      }
    };



    // 执行下一段导航
    this.getLineAndOrderValue = (state) => {
      console.log('开始下一段');
      const obj = {
        'deleteorderid': this.orderInfo.mac,
        'line': '',
      };
      if (this.lines.length === 0) {
        ShareAPI.nextLineNavigator(obj);
        return;
      }
      let myIndex = 0;
      this.lines.forEach((line, index) => {
        // 判断是否是骑行
        if (String(line.type) === '1') {
          // 如果路线的取车id=车桩的mac地址，则执行当前导航
          if (line.beginDumpId === this.orderInfo.mac) {
            // 将当前路段发送过去，进行导航
            obj.line = line;
            console.log('发送头数据');
            console.log(obj);
            ShareAPI.nextLineNavigator(obj);
            myIndex = index;
            // return;
          } else if (String(line.endDumpId) === String(this.orderInfo.mac)) {
            if (index === this.lines.length - 1) {
              // return;
            } else {
              console.log('发送底部数据');
              console.log(obj);
              obj.line = this.lines[index + 1];
              ShareAPI.nextLineNavigator(obj);
              myIndex = index + 1;
            }
          }
        }
      });
      // 判断是否是在导航界面，如果不在，则进入导航提示
      const self = this;
      if (state === false) {
        Vue.$vux.confirm.show({
          title: '开锁成功',
          content: '是否进行下一段导航！',
          onCancel () {
          },
          onConfirm () {
            console.log('点击确定');
            console.log(self.lines);
            const myLineList = self.lines.slice(myIndex);
            console.log('下一段的数据line: ');
            console.log(myLineList);
            ShareAPI.orderLineNavigator(myLineList, [], '0');
          },
        });
      }
    };
  }
}
const routeNavigator = new RouteNavigator();
export default routeNavigator;
