/* eslint-disable */
class ShareBikeCordovaApi {
  getUserInfo(successCallback) {
    Cordova.exec((response) => {
      successCallback(response);
    }, (data) => {
      failCallback(data);
    }, 'ShareBikePlugins',
    'getUserInfo',
    []);
  }
}

export default new ShareBikeCordovaApi();
