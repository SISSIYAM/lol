/* eslint-disable */
class ShareBikeCordovaApi {
  constructor() {
    /*
    *
    * 所有的以Handle开头的都为从原生返回的结果
    *
    * */
    window.addEventListener('HandleGetUserLocation', (data) => {
      console.log('wwww')
      this.handleGetUserLocation(data);
    }, '');
  }

  /*
   * 从数据库获得用户个人信息,结构为对象结构
   *
   * /
  getUserInfo(successCallback) {
    Cordova.exec((response) => {
      successCallback(response);
    }, (data) => {
      failCallback(data);
    }, 'ShareBikePlugins',
    'getUserInfo',
    []);
  }

  /*
  * 开始获得用户当前位置，不同的类中需要重写当前类的"handleGetUserLocation "来获得用户当前位置
  *
   */
  getUserLocation() {
    console.log("开始获得定位信息");
    Cordova.exec((response) => {

      }, (data) => {

      }, 'ShareBikePlugins',
      'getLocation');
  }
  /*
  *
  * 获得用户当前位置
  * 想要获得用户的位置类需要实现该类
  * data结构：
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
