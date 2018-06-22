import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';

// 设置axios信息
axios.defaults.baseURL = 'http://bike.zhunilink.com:8889';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response));

//  配置请求的方式
export default {
  //  post
  post(url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 5000,
      headers: {
        mobile_session_flag: true,
        session_token: Vue.prototype.GOBALUUID,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then(
      response => response,
    ).then(
      res => res);
  },
  // get
  get(url, params) {
    return axios({
      method: 'get',
      url,
      params: qs.stringify(params),
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

