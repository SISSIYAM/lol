// eslint-disable-next-line
import Vue from 'vue';
import BlueConnect from './bluetoothConnect/BlueConnect';
import ShareAPI from './sharebikeCordovaApi';
import {lockStatusUpdate, lockStatusUpdateclose, canOpen, payOrder} from "../api/shareStation";

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
    this.beginConnectBlue = (state) => {
      BlueConnect.onBlueDisConnect = this.onBlueDisConnect.bind(this);

      const self = this;

      // 判断现在是否有蓝牙已经在链接，如果没有，则开始进行蓝牙链接
      if (this.connectingBlue === '') {
        this.connectingBlue = this.orderInfo.mac;
        // 判断是否开锁
        ShareAPI.showAlertView({
          title: '提示',
          content: '您已到达车桩附近，是否开锁',
          rightTitle: '开锁',
          leftTitle: '取消',
        }, ()=> {
          console.log('点击成功');
          self.judgeHasMoney(state);
        });
      }
    };

    this.judgeHasMoney = (state) => {
      // 判断是否是取车，如果是取车，则判断钱包中的钱是否够
      const self = this;
      if (String(this.orderInfo.type) === '1') {
        // 判断钱包中的钱是否足够，如果不够，则不进行蓝牙链接
        if (this.hasEnoughMoney === false) {
          return;
        }
        // 判断是否有钱
        BlueConnect.canOpenCarPile(this.orderInfo.mac, () => {
          console.log('有钱');
          // 如果钱够，则开始进行蓝牙链接
          self.isConnectingBlue = true;
          // 进行蓝牙链接
          self.beginConnectBluetoothWithMac(state);



        }, () => {
          // 如果没钱，则不再进入
          self.isConnectingBlue = false;
        });
      } else if (String(this.orderInfo.type === '0')) {
        // 如果是存车，则提示选择车辆类型

      }
    };

    // 对外接口：链接蓝牙
    this.beginConnectBluetoothWithMac = (state) => {
      Vue.$vux.loading.show({
        text: '正在链接蓝牙...',
      });
      const self = this;
      BlueConnect.connectBluetoothWithMac(this.orderInfo.mac, () => {
        Vue.$vux.loading.show({
          text: '正在开锁...',
        });
        // 链接成功，发送开锁请求
        BlueConnect.open(() => {
          // 开锁成功
          Vue.$vux.loadind.hide();
          Vue.$vux.toast.show({
            text: '开锁成功',
          });
          // 如果是1，则是取车，显示支付界面
          if (self.orderInfo.type === '1') {
            self.payOrderMoney();
          }

          // BlueConnect.getHasCar();
          // 进行下一次导航
          self.getLineAndOrderValue(state);

          // 上传车位状态


        }, () => {
          Vue.$vux.loadind.hide();
          Vue.$vux.toast.show({
            text: '开锁失败',
          });
          // 上传开锁失败

        });
      }, () => {
        Vue.$vux.loading.hide();
        // 如果没开蓝牙，则10秒以后将当前链接蓝牙设置为空，方便下次链接
        setTimeout(() => {
          self.connectingBlue = '';
        }, 10000);
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

    // 上传车位状态
    this.uploadCarPileState = () => {
      if (this.orderInfo.type === 1) {

      }
    };


    this.onBlueDisConnect = () => {
      this.connectingBlue = '';
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
