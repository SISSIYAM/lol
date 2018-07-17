/* eslint-disable */
class ShareBikeCordovaApi {
  constructor() {
    /**
     *
     * 所有的Handle开头的方法为回调
     *
     * */
    window.addEventListener('HandleGetUserLocation', (data) => {
      console.log('wwww')
      this.handleGetUserLocation(data);
    }, '');
  }

  /**
   *
   * 存储用户的个人信息，将接口中返回的数据全部通过msg对象传入
   * 用户信息对象 msg: {
   *                  id:
   *                  uuid:
   *                  pic:
   *                }
   * */
  saveUserInfo(successCallback,msg) {
    Cordova.exec(() => {
        successCallback();
      }, (data) => {
        failCallback(data);
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
        successCallback(response);
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
}

export default new ShareBikeCordovaApi();
