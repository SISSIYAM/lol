/* eslint-disable */
class ShareBikeCordovaApi {
  constructor() {
    /*
    *
    * ���е���Handle��ͷ�Ķ�Ϊ��ԭ�����صĽ��
    *
    * */
    window.addEventListener('HandleGetUserLocation', (data) => {
      console.log('wwww')
      this.handleGetUserLocation(data);
    }, '');
  }

  /*
   * �����ݿ����û�������Ϣ,�ṹΪ����ṹ
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
  * ��ʼ����û���ǰλ�ã���ͬ��������Ҫ��д��ǰ���"handleGetUserLocation "������û���ǰλ��
  *
   */
  getUserLocation() {
    console.log("��ʼ��ö�λ��Ϣ");
    Cordova.exec((response) => {

      }, (data) => {

      }, 'ShareBikePlugins',
      'getLocation');
  }
  /*
  *
  * ����û���ǰλ��
  * ��Ҫ����û���λ������Ҫʵ�ָ���
  * data�ṹ��
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
