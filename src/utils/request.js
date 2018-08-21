import axios from 'axios';
import qs from 'qs';
import { AlertModule, Loading } from 'vux';
import store from '../store';

// 设置axios信息
// axios.defaults.baseURL = 'http://bike.zhunilink.com:8889/api';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  // TODO: loading
  config => config,
  error => Promise.reject(error),
);

axios.interceptors.response.use((response) => {
  if (response.data.code && response.data.code !== 200) {
    console.log(response.data && response.data);
    AlertModule.show({
      title: `错误码：${response.data.code && response.data.code}`,
      content: `错误信息：${response.data.msg && response.data.msg}`,
    });
    return Promise.reject(response);
  }
  return response;
}, (error) => {
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    console.log(error.response.data);
    console.log(`${error.response.status}`);
    console.log(error.response.headers);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
  return Promise.reject(error);
});

//  配置请求的方式
export default {
  // post总入口
  post(url, data) {
    if (url === '/userLogin/uploadimg') {
      console.log('去到图片上传===');
      return this.postForUpload(url, data);
    } else if (url === '/userLogin/updateName') {
      return this.postForUpdateName(url, data);
    } else if (store.getters.platformType === 'ios') {
      console.log('去到post for ios===');
      return this.postForiOS(url, data);
    }
    console.log('去到post for normal===');
    return this.postForNormal(url, data);
  },

  // get总入口
  get(url, data) {
    if (store.getters.platformType === 'ios') {
      return this.getForiOS(url, data);
    }
    return this.getForNomal(url, data);
  },

  // iOS的post方法
  postForiOS(url, data) {
    return new Promise(((resolve, reject) => {
      Cordova.exec((response) => {
        const obj = JSON.parse(response);
        resolve(obj);
      }, (data) => {
        reject(data);
      }, 'RequestPlugin',
      'postAsync',
      [url, data]);
    }));
  },
  // 安卓或者web端的post方法
  postForNormal(url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 5000,
      headers: {
        mobile_session_flag: true,
        session_token: store.getters.userToken,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then(
      response => response,
    ).then(
      res => res);
  },
  postForUpload(url, data1) {
    return axios({
      method: 'post',
      url,
      data: data1,
      timeout: 5000,
      headers: {
        mobile_session_flag: true,
        session_token: store.getters.userToken,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data;charset=utf-8',
      },
    }).then(
      response => response,
    ).then(res => res);
  },
  postForUpdateName(url, data2) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data2),
      timeout: 5000,
      headers: {
        mobile_session_flag: true,
        session_token: store.getters.userToken,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8',
      },
    }).then(
      response => response,
    ).then(res => res);
  },
  // iOS这边的get方法
  getForiOS(url, data) {
    return new Promise(((resolve, reject) => {
      Cordova.exec((response) => {
        const obj = JSON.parse(response);
        resolve(obj);
      }, (data) => {
        const obj = JSON.parse(data);
        reject(data);
      }, 'RequestPlugin',
      'getAsync',
      [url, data]);
    }));
  },
  // 安卓或web这边的get方法
  getForNomal(url, data) {
    return axios({
      method: 'get',
      url,
      params: qs.stringify(data),
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).then(
      response => response,
    ).then(
      res => res,
    );
  },

};
