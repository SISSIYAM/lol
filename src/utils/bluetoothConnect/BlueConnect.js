/* eslint-disable */
import BluetoothManager from './bluetoothManager';
import Vue from 'vue';
import {lockStatusUpdate, lockStatusUpdateclose, canOpen} from "../../api/shareStation";
import ShareAPI from "../sharebikeCordovaApi";

class BlueConnect {
  // 构造函数
  constructor() {
    // 当前蓝牙地址
    this.currentBlueMac = '';
    // 正在链接的蓝牙
    this.connectingBlue = '';
    // 车桩中是否有车
    this.isHasCar = false;
    this.isHasCarTimer = '';
    // 链接成功回调
    this.connectSuccessCallBack = '';
    // 是否上传车桩里面是否有车
    this.isSendCar = false;
    this.hasCar = false;
    // 开锁成功回调
    this.openLockSuccess = '';
    this.openLockError = '';
    // 0:代表发送的是开锁，1：代表发送的是关锁
    this.sendValueToLock = 0;
    this.hasEnoughMoney = true;
    //
    //
    BluetoothManager.onHandleStopScan = this.onHandleStopScan.bind(this);
    BluetoothManager.onHandleBluetoothConnect = this.onHandleBluetoothConnect.bind(this);
    BluetoothManager.onHandleBluetoothDisConnect = this.onHandleBluetoothDisConnect.bind(this);
    BluetoothManager.onHandlegetWriteValue = this.onHandlegetWriteValue.bind(this);
    BluetoothManager.onHandleGetLockStatus = this.onHandleGetLockStatus.bind(this);
    BluetoothManager.onHandleGetLockHasCar = this.onHandleGetLockHasCar.bind(this);
    BluetoothManager.onHandleGetBatteryStatus = this.onHandleGetBatteryStatus.bind(this);
    BluetoothManager.onHandleFindBluetooth = this.onHandleFindBluetooth.bind(this);
  }

  // 判断钱是否够，如果够了，则开始链接蓝牙
  canOpenCarPile(mac,successCallback, errorCallback) {
    Vue.$vux.loading.show({
      text: '请等待...',
    });
    const self = this;
    canOpen(mac).then((response) => {
      console.log('是否有钱');
      console.log(response);
      Vue.$vux.loading.hide();
      if (response.data.code === 200) {
        if (String(response.data.data) === '-1') {
          errorCallback();
          // Vue.$vux.alert.show({
          //   title: '提示',
          //   content: '账户余额不足，请充值！',
          // });
          ShareAPI.showAlertView({
            title: '提示',
            content: '账户余额不足，请充值！',
            rightTitle: '确定',
            // leftTitle: '取消',
          });
        } else if (String(response.data.data) === '-2') {
          errorCallback();
          ShareAPI.showAlertView({
            title: '提示',
            content: '您有为支付订单，请先支付！',
            rightTitle: '确定',
            // leftTitle: '取消',
          });
        } else if (String(response.data.data) === '0') {
          successCallback();
        }
      }
    }).catch((error) => {
      Vue.$vux.loading.hide();
    });
  }


  // ----------------------------------------------------------------------
  // 链接蓝牙
  // ----------------------------------------------------------------------
  connectBluetoothWithMac(mac, successCallBack, errorCallBack) {
    if (this.currentBlueMac === mac) {
      return;
    }
    this.currentBlueMac = mac;
    // 1。开始搜索
    BluetoothManager.enableBluetooth(() => {
      BluetoothManager.beginSearchNearbyBlue();
      this.connectSuccessCallBack = successCallBack;
    }, () => {
      Vue.$vux.loading.hide();
      // Vue.$vux.alert.show({
      //   title: '提示',
      //   content: '请打开蓝牙',
      // });
      ShareAPI.showAlertView({
        title: '提示',
        content: '请打开蓝牙！',
        rightTitle: '确定',
      });
      errorCallBack();
    });
  }
  // 1.蓝牙搜索关闭了
  onHandleStopScan() {
    // 如果没有正在链接的蓝牙，则1秒后继续搜索（延时是为了避免出错）
    const myThis = this;
    console.log('搜索关闭了');
    console.log(this.connectingBlue);
    // 如果没有发现匹配的蓝牙，则继续搜索
    if (this.connectingBlue === '') {
      console.log('开始新的搜索');
      setTimeout(() => {
        BluetoothManager.beginSearchNearbyBlue();
      }, 1000);
    }
  }
  // 2.蓝牙链接成功了
  onHandleBluetoothConnect(data) {
    // 回调链接成功了
    this.connectSuccessCallBack();
  }
// 8.搜索到附近的蓝牙
  onHandleFindBluetooth(peripheral) {
    console.log('我已经搜索到了蓝牙 ： ' + peripheral.macString);
    if (peripheral.macString === this.currentBlueMac) {

      this.connectingBlue = peripheral;
      // 停止搜索
      BluetoothManager.stopScanBlue();
      // 开始链接蓝牙
      BluetoothManager.startConnectBlue(this.connectingBlue);
    }
  }


  // ----------------------------------------------------------------------
  // 蓝牙操作
  // ----------------------------------------------------------------------
  // 获得车中是否有车
  getHasCar() {
    this.isSendCar = true;
    const self = this;
    this.isHasCarTimer = setInterval(() => {
      BluetoothManager.sendOrderToGetBlueHasCar(self.connectingBlue);
    }, 1000);
  }
  // 6.获得车桩中是否有车
  onHandleGetLockHasCar(value) {
    if (value === 0) {
      this.hasCar = '无车';
    } else if (value === 1) {
      this.hasCar = '有车';
    } else {
      this.hasCar = '未知状态';
    }
  }
  // mydisconnect() {
  //   console.log('iii');
  //   BluetoothManager.disconnectBlue(this.connectingBlue);
  // }
  // getLockStatus() {
  //   BluetoothManager.sendOrderToGetBlueLockStatus(this.connectingBlue);
  // }
  //
  // getBattery() {
  //   BluetoothManager.sendOrderToGetBlueBattery(this.connectingBlue);
  // }

  // 开锁
  open(successCallback, errorCallBack) {
    this.sendValueToLock = 0;
    this.openLockSuccess = successCallback;
    this.openLockError = errorCallBack;
    BluetoothManager.openBlueLock(this.connectingBlue);
  }
  // ----------------------------------------------------------------------
  // 蓝牙操作回调
  // ----------------------------------------------------------------------

  // 4.蓝牙操作成功了，开锁/关锁
  onHandlegetWriteValue(value) {
    if (value === 1) {
      // 发送的是0:开锁 1:关锁
      if (this.sendValueToLock === 0) {
        // 开锁成功回调
        this.openLockSuccess();
      } else if (this.sendValueToLock === 1) {
        // 关锁成功回调

      } else {
        // 开锁失败回调
        if (this.openLockError) {
          this.openLockError();
        }
      }
    }
  }

  // 获得锁的状态，是开锁还是关锁状态
  getLockStatus() {
    BluetoothManager.sendOrderToGetBlueLockStatus(this.connectingBlue);
  }
  onHandleGetLockStatus(value) {
    if (value === 0) {
      this.lockStatus = '开锁';
    } else if (value === 1) {
      this.lockStatus = '关锁';
    } else {
      this.lockStatus = '未知状态';
    }
  }

// 7.获得电量
  onHandleGetBatteryStatus(value) {
    this.lockBattery = value;
  }


  // 3.蓝牙链接断开了，开始上传状态
  onHandleBluetoothDisConnect(data) {
    console.log('蓝牙断开了');
    // 如果调用了获得车桩中是否有车的方法，则上传车桩中是否有车
    // if (this.isSendCar === true) {
    //   if (this.hasCar === '无车') {
    //     lockStatusUpdate(this.currentBlueMac).then((response) => {
    //       console.log('车位状态已经上传');
    //
    //     }).catch((error) => {
    //
    //     });
    //   } else if (this.hasCar === '有车') {
    //     lockStatusUpdateclose(this.currentBlueMac).then((response) => {
    //       console.log('车位状态已经上传');
    //     }).catch((error) => {
    //
    //     });
    //   }
    // }
    this.onBlueDisConnect(this.currentBlueMac);
    this.isSendCar = false;
    if (this.isHasCarTimer) {
      this.isHasCarTimer.clearInterval();
    }
    // 当前蓝牙地址
    this.currentBlueMac = '';
    // 正在链接的蓝牙
    this.connectingBlue = '';
    // 车桩中是否有车
    this.isHasCar = false;
    this.isHasCarTimer = '';
    // 链接成功回调
    this.connectSuccessCallBack = '';
    // 是否上传车桩里面是否有车
    this.isSendCar = false;
    this.hasCar = false;
    // 开锁成功回调
    this.openLockSuccess = '';
    this.openLockError = '';
    // 0:代表发送的是开锁，1：代表发送的是关锁
    this.sendValueToLock = 0;


  }

  onBlueDisConnect(mac) {

  }

}

export default new BlueConnect();

