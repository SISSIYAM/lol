/* eslint-disable */
import RouteNavigator from './routeNavigator';

class ShareBikeCordovaApi {

  userLocation = {
    lat: '',
    lng: '',
    des: '',
  };

  constructor() {
    /**
    *
    * 所有的Handle开头的方法为回调
    *
    * */
    window.addEventListener('HandleGetUserLocation', (data) => {
      console.log('wwww');
      this.onHandleGetUserLocation(data['0']);
    }, '');
    /**
     *
     * 扫描二维码回调
     *
     * */
    window.addEventListener('HandleBikePile', (data) => {//蓝牙mac地址上送
      console.log("HandleBikePile event");
      this.onHandleBleCode(data["0"]);
    }, "");
    /**
     *
     * 从原生返回路线和预约数据，data的数据格式
     * {
     * "line":[],  路线数组
     * "order":{}, 到达位置的车桩信息
     * }
     *
     * */
    window.addEventListener('HandleOrderAndLine', (data) => {
      // 进行车桩判断，并且进行下一段导航
      this.onHandleGetLineAndOrder(data['0']);
    }, '');
    window.addEventListener('HandleFindOrderNoNav', (data) => {
      this.onHandleFindOrderNoNav(data[0]);
    });
  }

  // 回调内容
	/**
	*
	* 显示原生加载框
	*
	* {
	*
	*
	* }
	* */
  showDialog(msg) {
	  Cordova.exec((data) => {

			}, (data) => {

			}, "ShareBikePlugins",
		  "showDialog",
		  [msg]);
  }
	// 回调内容
	/**
	*
	* 显示原生吐司
	*
	* {
	*
	*
	* }
	* */
	 showToast(msg) {
    Cordova.exec((data) => {
      }, (data) => {
      }, "ShareBikePlugins",
      "showToast",
      [msg]);
  }
	/**
	*
	* 调用摄像头拍照
	*
	* {
	*
	*
	* }
	* */
	openCamera(msg) {
		Cordova.exec((data) => {
			}, (data) => {
			}, "ShareBikePlugins",
			"openCamera",
			[msg]);
	}
	/**
	*
	* 选择相册头像作为头像
	*
	* {
	*
	*
	* }
	* */
	openAlbum(msg) {
		Cordova.exec((data) => {
			}, (data) => {
			}, "ShareBikePlugins",
			"openAlbum",
			[msg]);
	}
	/**
	*
	* 上传图片
	*
	* {
	*
	*
	* }
	* */
	selectAlbum(msg) {
		Cordova.exec((data) => {
			}, (data) => {
			}, "ShareBikePlugins",
			"selectAlbum",
			[msg]);
	}
	hideDialog() {
    Cordova.exec((data) => {

      }, (data) => {

      }, "ShareBikePlugins",
      "hideDialog",
      []);
  }

  /**
  *
  * 存储用户的个人信息，将接口中返回的数据全部通过msg对象传入
  * msg为用户信息对象
  * {
  * id:
  * uuid:
  * pic:
  * ..........
  * }
  * */
  saveUserInfo(msg) {
    Cordova.exec(() => {

      }, (data) => {

      }, "ShareBikePlugins",
      "saveUserInfo",
      [msg]);
  }

  /**
   * 获得用户的信息 response中为用户的完整信息列表
   *
   */

  getUserInfo(successCallback) {
    Cordova.exec((response) => {
      console.log('前端获得');
      console.log(typeof response);
      console.log(response);
      console.log(response.uuid);
      const data = JSON.parse(response);
      console.log(data);
      successCallback(data);
    }, (data) => {
      failCallback(data);
    }, 'ShareBikePlugins',
    'getUserInfo',
    []);
  }
  /**
   *
   * 删除用户信息
   *
   * */
  deleteUser() {
    Cordova.exec(() => {

      }, (data) => {

      }, "ShareBikePlugins",
      "deleteUser",
      []);
  }

  /**
  * 调用getUserLocation是为了获得用户当前的位置，需要实现haadleGetUserLocation获得用户的位置信息
  *
  *
   */
  getUserLocation() {
    console.log("???????????");
    Cordova.exec((response) => {

      }, (data) => {

      }, 'ShareBikePlugins',
      'getLocation');
  }

  /**
  *
  * 调用支付宝支付
  * 将调用接口返回的数据全部通过msg传入原生
  *
  * */
  alipay(msg) {
    Cordova.exec(() => {
        successCallback();

      }, (data) => {
        failCallback(data);
      }, "ShareBikePlugins",
      "aliPay",
      [msg]);
  }
  /**
  *
  * 微信支付
  * 将调用接口返回的数据全部通过msg传入原生
  *
  * */
  wxpay(msg) {
    Cordova.exec(() => {
        successCallback();

      }, (data) => {
        failCallback(data);
      }, "ShareBikePlugins",
      "wechatPay",
      [msg]);
  }
  /**
   *
   * 出行规划，点击立即出发后，进入导航
   * lineList:路线数组
   * orderList：预约的车桩数组
   * type:0:普通预约进入导航
   *      1：路线规划进入导航
   *
   * */
  orderLineNavigator(lineList, orderList, type) {
    Cordova.exec(() => {
      }, (data) => {
      }, "ShareBikePlugins",
      "lineNavigator",
      [lineList, orderList, type]);
  }
  /**
   *
   * 进行下一段路线导航
   *
   * */
  nextLineNavigator(obj) {
    Cordova.exec(() => {
      }, (data) => {
      }, "ShareBikePlugins",
      "nextLineNavigator",
      [obj]);
  }
  /**
   *
   * 存储预约车桩信息
   *
   * */
  saveBookingStation(msg) {
    Cordova.exec(() => {
      }, (data) => {
      }, "ShareBikePlugins",
      "saveUserOrderInfo",
      [msg]);
  }
  /**
   *
   * 调用扫描二维码
   *
   * */
  startScan(successCallback, failCallback) {
    Cordova.exec(() => {
        successCallback();
      }, (data) => {
        failCallback(data);
      }, "ShareBikePlugins",
      "startScan",
      ['0']);
  }
  /**
   *
   * 验证是哪个平台
   *
   * */
  checkPlatform(successCallback){
    Cordova.exec((response) => {
      const data = JSON.parse(response);
      successCallback(data);
    }, (data) => {
    }, 'ShareBikePlugins',
    'checkPlatform',
    []);
  }
  /**
   *
   * 显示支付成功界面
   *
   * */
  showPaySuccess(money) {
    Cordova.exec((response) => {
        const data = JSON.parse(response);
        successCallback(data);
      }, (data) => {
      }, 'ShareBikePlugins',
      'showPaySuccess',
      [money]);
  }
  /**
   *
   * 显示弹出框
   * obj结构：
   * {
   *   title: 标题
   *   content：显示内容
   *   leftTitle：左边的按钮文本
   *   rightTitle: 右边的按钮的文本
   * }
   *
   * */
  showAlertView(obj, successCallback, failorCallback) {
    Cordova.exec(() => {
        successCallback();
      }, () => {
        failorCallback();
      }, 'ShareBikePlugins',
      'showAlertView',
      [obj]);
  }
/**
 * 获取图片，回调回来的是图像url
 * @method pickPhotos
 * @param  {整形}  num             选择的图像数量
 * @param  {[type]}  successCallback 成功回调
 * @param  {[type]}  failorCallback  失败回调
 * @return {[type]}                  回调结果是个json，结构为{urls:[xxxxxx,xxxxxx,xxxxxx],num:xxxxxx}
 */
  pickPhotos(num,successCallback, failorCallback){
    Cordova.exec((response) => {
      //data结构为{urls:[xxxxxx,xxxxxx,xxxxxx],num:xxxxxx},
      //其中urls是原生端成功上传到服务器的图片url数组，num是成功的数量，有可能选择的图片数与成功上传的数量不一样
      const data = JSON.parse(response);
      successCallback(data);
      }, () => {
        failorCallback();
      }, 'ShareBikePlugins',
      'pickPhoto',
      [num]);
  }

/**
 * 拍照并回传一张照片的url
 * @method pickCamera
 * @param  {[type]}   successCallback 成功回调
 * @param  {[type]}   failorCallback  失败会掉
 * @return {[type]}                   回调结果是个json，结构为{urls:[xxxxxx,xxxxxx,xxxxxx],num:xxxxxx}
 */
  pickCamera(successCallback, failorCallback){
    Cordova.exec((response) => {
      //data结构为{urls:[xxxxxx,xxxxxx,xxxxxx],num:xxxxxx},
      //其中urls是原生端成功上传到服务器的图片url数组，num是成功的数量，有可能选择的图片数与成功上传的数量不一样
      const data = JSON.parse(response);
      successCallback(data);
      }, () => {
        failorCallback();
      }, 'ShareBikePlugins',
      'pickCamera',
      []);
  }
  /**
   *
   * 打电话
   *
   * */
  callPhone(tel) {
    Cordova.exec(() => {
      }, () => {

      }, 'ShareBikePlugins',
      'callPhone',
      [tel]);
  }
  // ---------------------------------------------------------------------------------
  // 以下都为从原生回调回来的函数，如果在不同的界面使用，需要实现使用界面实现该函数
  // ---------------------------------------------------------------------------------
  /**
  *
  * 原生回调回来的用户信息
  * data
  * {
  * lat:
  * lng:
  * }
  *
  * */
  handleGetUserLocation(data) {
  }
  // 获得用户定位回调
  onHandleGetUserLocation(data) {
    console.log('回调书' + JSON.stringify(data));
    this.userLocation = {
      lat: String(data.lat),
      lng: String(data.lng),
      des: data.des,
    };
    this.handleGetUserLocation(data);
  }
  // 二维码扫描回调函数
  onHandleBleCode(data) {
    // 开始链接蓝牙
    if (data.code === 200) {
      console.log('获得二维码');
      console.log(data);
    }
  }
  // 获得路线信息
  onHandleGetLineAndOrder(data) {
    console.log('用户导航到车桩，返回给前端的数据');
    console.log(data);
    RouteNavigator.orderInfo = data.order;
    RouteNavigator.lines = data.line;
    RouteNavigator.beginConnectBlue(true);
  }
  // 通过定位用户位置找到的附近车桩
  onHandleFindOrderNoNav(data) {
    // console.log('')
    RouteNavigator.orderInfo = data.order;
    RouteNavigator.lines = data.line;
    RouteNavigator.beginConnectBlue(false);
  }

  //
  // {
  //   'type': '',  // 数据类型：0：步行，1：骑行，2：公交
  //   'headTitle': '',  // 标题，其中type为3或者4的时候，代表起点或终点的标题
  //   'middleTitle': '',// 中间的标题，type为0，1，2的时候才会存在，为0时，只有middletitle，没有其他title
  //   'bottomTitle': '',// 下面的标题，type为0，1，2的时候才会存在
  //   'beginLat': '',// 本段路线开始的纬度
  //   'beginLng': '',// 本段路线开始的经度
  //   'endLat': '',// 本段路线结束点的纬度
  //   'endLng': '',// 本段路线结束点的经度
  //   "beginDumpId": 1, // 预约取车的车桩mac地址
  //   "beginDumpNum": "02",//预约取车的车桩编号
  //   "endDumpId": 56,// 预约停车的车桩mac地址，
  //   "endDumpNum": "03",//预约停车的车桩编号
  //   "path": 23, //公交路线号
  // }
}

export default new ShareBikeCordovaApi();
