/* eslint-disable */
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
      this.onHandleGetUserLocation(data);
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
    this.userLocation = {
      lat: data.lat,
      lng: data.lng,
      des: data.des,
    };
    this.handleGetUserLocation(data);
  }
  // 二维码扫描回调函数
  onHandleBleCode(data) {

  }

}

export default new ShareBikeCordovaApi();
