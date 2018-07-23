/* eslint-disable */
import BleManager from './BleManager';

class BluetoothManager {
  // 构造函数
  constructor() {
    /**
     * 外部调用的方法清单
     *
     * */
    // 1.判断蓝牙是否打开
    // this.enableBluetooth = (successCallBack, failorCallBack)
    // 2.开始搜索附近的蓝牙
    // this.beginSearchNearbyBlue = () =>
    // 3.开始链接蓝牙
    // this.startConnectBlue = (peripheral) => {
    // 4.断开蓝牙链接
    // this.disconnectBlue = (peripheral) =>
    // 5.发送消息获得车锁状态
    // this.sendOrderToGetBlueLockStatus = (peripheral) => {
    // 6.判断车桩中是否有车
    // this.sendOrderToGetBlueHasCar = (peripheral) =>
    // 7.获得车桩电池电量
    // this.sendOrderToGetBlueBattery = (peripheral) => {
    // 8.开锁
    // this.openBlueLock = (peripheral) => {
    // 9.关锁
    // this.closeBlueLock = (peripheral) => {

    /**
     *
     * 外部需要实现的方法清单
     *
     * */
    // 1.蓝牙搜索关闭了
    this.onHandleStopScan = () => {

    };
    // 2.蓝牙链接成功了
    this.onHandleBluetoothConnect = (data) => {
      console.log(data);
    };
    // 3.蓝牙链接断开了
    this.onHandleBluetoothDisConnect = (data) => {
      console.log(data);
    };
    // 4.蓝牙操作成功了，开锁/关锁
    this.onHandlegetWriteValue = (value) => {
      console.log(value);
    };
    // 5.获得蓝牙车锁的状态，0：开锁，1：关锁
    this.onHandleGetLockStatus = (value) => {
      console.log(value);
    };
    // 6.获得车桩中是否有车
    this.onHandleGetLockHasCar = (value) => {
      console.log(value);
    };
    // 7.获得电量
    this.onHandleGetBatteryStatus = (value) => {
      console.log(value);
    };
    // 8.搜索到附近的蓝牙
    this.onHandleFindBluetooth = (peripheral) => {
      console.log(peripheral);
    };

    // 原生回调信息
    /**
     *
     * 蓝牙链接发生改变
     *
     * */
    // BleManager.onHandleConnectStateChanged = this.handleConnectStateChanged.bind(this);

    /**
     *
     * 发现附近的蓝牙
     *
     * */
    // console.log(this.handleDiscoverPeripheral);
    BleManager.onHandleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

    /**
     *
     *
     * 获得蓝牙返回的数据
     *
     * */
    BleManager.onHandleUpdateValueForCharacteristic = this.handleReceiveValueFromBlueDevice.bind(this);

    /**
     *
     * 蓝牙链接成功回调
     *
     * */
    BleManager.onHandleBluetoothConnect = this.handleBluetoothConnect.bind(this);

    /**
     *
     * 蓝牙链接断开
     *
     *
     * */
    BleManager.onHandleConnectStateChanged = this.handleBluetoothDisConnect.bind(this);

    /**
     *
     * 蓝牙扫描关闭
     *
     *
     * */
    BleManager.onHandleStopScan = this.handleStopScan.bind(this);


    /**
     * 类初始化的时候就打开blemanager的配置，用来监测原生返回的信息
     * */
    // 打开Blemanager，用来接收原生回调的信息，信息返回在blemanager中
    BleManager.open();
  }
  // ---------------------------------------------------------------------------------
  // 判断蓝牙是否打开
  // ---------------------------------------------------------------------------------

  /**
   *
   * 判断蓝牙是否打开
   *
   *
   * */
  enableBluetooth(successCallBack, failorCallBack) {
    BleManager.enableBluetooth().then(() => {
      successCallBack();
    }).catch(() => {
      failorCallBack();
    });
  }

  // ---------------------------------------------------------------------------------
  // 搜索蓝牙
  // ---------------------------------------------------------------------------------
  /**
   * 开始搜索附近蓝牙，打开蓝牙扫描
   *
   * */
  beginSearchNearbyBlue() {
    // 开始进行附近的搜索
    BleManager.scan(['0001'], 5, false).then((results) => {
      console.log(results);
    }).catch((error) => {
      console.log(error);
    });
  }
  // 蓝牙扫描关闭了
  handleStopScan() {
    this.onHandleStopScan();
  }

  // ---------------------------------------------------------------------------------
  // 链接车桩
  // ---------------------------------------------------------------------------------
  /**
   *
   * 开始链接蓝牙
   * peripheral:必须为搜索附近所返回的蓝牙变量，即：handleDiscoverPeripheral得到的结果
   * */
  startConnectBlue(peripheral) {
    // console.log(peripheral);
    // 开始链接蓝牙
    if (peripheral) {
      BleManager.connectAndRegisterNotify(peripheral);
    }
  }
  /**
   *
   * 蓝牙是否链接成功
   *
   * */
  handleBluetoothConnect(data) {
    this.onHandleBluetoothConnect(data);
    // console.log('蓝牙链接成功: ' + data);
  }

  // ---------------------------------------------------------------------------------
  // 断开蓝牙
  // ---------------------------------------------------------------------------------
  /**
   *
   *
   * 断开蓝牙链接
   *
   *
   * */
  disconnectBlue(peripheral) {
    BleManager.disconnect(peripheral);
  }
  // 发现蓝牙链接断开链接信息
  handleBluetoothDisConnect(data) {
    // console.log('蓝牙链接断开：' + data);
    this.onHandleBluetoothDisConnect(data);
  }


  // ---------------------------------------------------------------------------------
  // 发送消息：车桩开锁、关锁
  // ---------------------------------------------------------------------------------
  // 开锁
  openBlueLock(peripheral) {
    const data = [0xa5, 0x5a, 0x00, 0x05, 0x03, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00];
    this.sendDataToBlue(data, peripheral);
  }
  // 关锁
  closeBlueLock(peripheral) {
    const data = [0xa5, 0x5a, 0x00, 0x05, 0x03, 0x00, 0x00, 0x07, 0x01, 0x00, 0x00];
    this.sendDataToBlue(data, peripheral);
  }
  // 收到消息：写入是否成功
  getWriteValue(value) {
    // console.log('写入后返回的结果：' + value);
    this.onHandlegetWriteValue(value);
    // 0:写入失败，1：写入成功
  }
  // ---------------------------------------------------------------------------------
  // 获得车锁状态
  // ---------------------------------------------------------------------------------
  /**
   *
   * 发送消息：获得蓝牙车桩锁当前状态,关锁还是开锁状态
   *
   *
   * */

  sendOrderToGetBlueLockStatus(peripheral) {
    // 获得当前车桩的状态，是开的还是关着的
    const data = [0xa5, 0x5a, 0x00, 0x03, 0x02, 0x00, 0x00, 0x00, 0x00];
    this.sendDataToBlue(data, peripheral);
  }

  /**
   * 接收消息：获得车锁的状态
   * */
  getLockStatus(value) {
    // console.log('是否开锁：' + value);
    // 0：开锁状态 1：关锁状态
    this.onHandleGetLockStatus(value);
  }
  // ---------------------------------------------------------------------------------
  // 判断车桩中是否有车
  // ---------------------------------------------------------------------------------
  /**
   *
   * 发送消息：获得车桩中是否有车、无车
   *
   * */
  sendOrderToGetBlueHasCar(peripheral) {
    const data = [0xa5, 0x5a, 0x00, 0x03, 0x02, 0x01, 0x00, 0x00, 0x00];
    this.sendDataToBlue(data, peripheral);
  }
  /**
   * 接收消息： 得到车桩中是否有车
   *
   * */
  getLockHasCar(value) {
    this.onHandleGetLockHasCar(value);
    // console.log('是否有车：' + value);
    // 0:无车，1：有车，其他：未知状态
  }

  // ---------------------------------------------------------------------------------
  // 获得车桩电池电量
  // ---------------------------------------------------------------------------------
  /**
   *
   * 发送消息：获得车桩电量
   *
   * */
  sendOrderToGetBlueBattery(peripheral) {
    const data = [0xa5, 0x5a, 0x00, 0x03, 0x02, 0x02, 0x00, 0x00, 0x00];
    this.sendDataToBlue(data, peripheral);
  }
  /**
   *
   * 接收消息：得到电池电量
   *
   * */
  getBatteryStatus(value) {
    // 0:电池耗尽，100：满电量，其他：其他电量百分比
    this.onHandleGetBatteryStatus(value);
    // console.log('电池电量：' + value);
  }


  // ---------------------------------------------------------------------------------
  // 发送信息给车桩
  // ---------------------------------------------------------------------------------
  /**
   *
   * 发送信息给车桩
   *
   *
   * */
  sendDataToBlue(data, peripheral) {
    console.log('正在发送数据');
    console.log(peripheral);
    console.log(data);
    BleManager.sendData(data, peripheral).then(() => {
      console.log('发送成功');
    }).catch((err) => {
      console.log('发送失败');
    });
  }
  // ---------------------------------------------------------------------------------
  // 以下内容为原生回调结果
  // ---------------------------------------------------------------------------------

  /**
   *
   * 监测到附近的蓝牙
   *
   *
   * */
  handleDiscoverPeripheral(peripheral) {
    console.log('发现的蓝牙: ' + peripheral);
    let advertByte = peripheral.advertising.bytes;

    let offect = 7;
    let endOff = 13;
    if (BleManager.osType === 'ios') {
      advertByte = peripheral.advertising.kCBAdvDataManufacturerData.bytes;
      offect = 5;
      endOff = 11;
    }
    console.log('advertByte::: ' + advertByte);
    let bleMac = '';
    if (advertByte.length >= endOff) {
      const macAdrByte = advertByte.slice(offect, endOff);
      console.log(macAdrByte);
      bleMac = this.byteToString(macAdrByte).toUpperCase();

    }
    console.log(bleMac);
    // const sqrMac = this.BleScanCode.replace(/:/g, "");
    peripheral.macString = this.transToMac(bleMac);
    this.onHandleFindBluetooth(peripheral);
    // console.log('发现的蓝牙号:' + bleMac);
  }
  byteToString(arr) {
    let str = '';
    for (let i = 0; i < arr.length; i += 1) {
      let tmp = arr[i].toString(16);
      if (tmp.length === 1) {
        tmp = '0' + tmp;
      }
      str += tmp;
    }
    return str;
  }
  transToMac(tempString) {
    let result = '';
    for (let i = 0; i < tempString.length; i += 1) {
      let temp = tempString[i];
      result += temp;
      if (i % 2 !== 0 && i !== tempString.length - 1) {
        result += ':';
      }
    }
    return result;
  }
  /**
   *
   *
   * 获得蓝牙返回结果
   *
   *
   * */
  handleReceiveValueFromBlueDevice(data) {
    const valueData = data.value;
    console.log('接收到消息了');
    if (valueData[0] === 0xA5 && valueData[1] === 0x5A) {
      // 获得功能码
      const feature = valueData[4];
      // console.log('功能码 :' + feature);
      // console.log('车桩信息 :' + valueData[5]);
      // console.log('设备编号 :' + valueData[6]);
      // console.log('数据类型 :' + valueData[7]);
      // console.log('车桩返回结果 :' + valueData[8]);
      switch (feature) {
        case 0x01: // 主设备获取动态密钥
          break;
        case 0x02: // 读取蓝牙设备的状态
          // 得到读取到的车桩信息,0:单车锁，1：汽车锁
          const produceType = valueData[5];
          // 得到车桩的设备编号，0：车锁状态，1：车位状态，2：电池状态
          const produceNum = valueData[6];
          // 数据类型0x07
          // const valueType = produceNum[7];
          // 数据值，车桩的状态结果
          //
          const statusvalue = valueData[8];
          // 如果是车桩锁
          if (produceType === 0) {
            // 判断车桩设备编号
            switch (produceNum) {
              case 0: // 车锁状态
                this.getLockStatus(statusvalue);
                break;
              case 1: // 车位状态
                this.getLockHasCar(statusvalue);
                break;
              case 2: // 电池状态
                this.getBatteryStatus(statusvalue);
                break;
              default:
                break;
            }
          }
          break;
        case 0x03: // 写入指定蓝牙设备状态
          // 1:写入成功，0：写入失败
          const writeValue = valueData[5];
          this.getWriteValue(writeValue);
          console.log('写入是否成功: ' + writeValue);
          break;
        case 0x04: // 读取车桩配置参数
          break;
        case 0x05: // 写入车桩配置参数
          break;
        default:
          break;
      }
    }
  };
}

export default new BluetoothManager();


// let data = [0xa5, 0x5a, 0x00, 0x02, 0x0E, 0x00]
//
// 1.发送读取车锁设备状态
// //  同步头      报文长度     功能码    产品类型    设备编号
// 发送[0xa5,0x5a, 0x00,0x03 , 0x02,   0x00,       0x00];
// //  同步头      报文长度     //功能码   产品类型    设备编号    数据类型(1个字节)     数据值（状态值）
// 获得[0xa5,0x5a, 0x00,0x05，  0x02,    0x00,       0x00,     0x07,      ,        0x01/0x00];
//
// 2.判断是否有车位
