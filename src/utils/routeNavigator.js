// eslint-disable-next-line
import Vue from 'vue';
import BlueConnect from './bluetoothConnect/BlueConnect';
import ShareAPI from './sharebikeCordovaApi';

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
    this.beginConnectBlue = () => {
      const self = this;
      Vue.$vux.loading.show({
        text: '正在链接蓝牙...',
      });
      // BlueConnect.connectBluetoothWidhMac(this.orderInfo.mac, () => {
      //   Vue.$vux.loading.show({
      //     text: '正在开锁...',
      //   });
      //   // 链接成功，发送开锁请求
      //   BlueConnect.open(() => {
      //     Vue.$vux.loadind.hide();
      //     Vue.$vux.toast.show({
      //       text: '开锁成功',
      //     });
      //     // 开锁成功
      //     BlueConnect.getHasCar();
          // 判断是否有下一段导航
        self.getLineAndOrderValue();
        // }, () => {

        // });
      // }, () => {

      // });
    };

    // 执行下一段导航
    this.getLineAndOrderValue = () => {
      const obj = {
        'deleteorderid': this.orderInfo.mac,
        'line': '',
      };
      this.lines.forEach((line, index) => {
        // 判断是否是骑行
        if (line.type === 1) {
          // 如果路线的取车id=车桩的mac地址，则执行当前导航
          if (line.beginDumpId === this.orderInfo.mac) {
            // 将当前路段发送过去，进行导航
            obj.line = line;
            ShareAPI.nextLineNavigator(obj);
            return;
          } else if(line.endDumpId === this.orderInfo.mac) {
            if (index === this.lines.length - 1) {
              return;
            } else {
              obj.line = this.lines[index + 1];
              ShareAPI.nextLineNavigator(obj);
              return;
            }
          }
        }
      });
      ShareAPI.nextLineNavigator(obj);
    };
  }
}
const routeNavigator = new RouteNavigator();
export default routeNavigator;
