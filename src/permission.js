/*eslint-disable*/
import { Message } from 'element-ui';
import router from './router';
import store from './store';

/**
 *  均不需要用户登录的路由列表
 * @type {string[]}
 */
const whiteList = ['/', '/bikeStations', '/carStations', '/stationSearch', '/registerPage', '/stationAgreement'];

router.beforeEach((to, from, next) => {
  console.log('mytoken:' + store.getters.userToken + store.getters.authCode);
  if (store.getters.userToken && !store.getters.authCode) {
    /**
     *  是注册用户
     */
      store.dispatch('authUser', {token: store.getters.userToken}).then(res => {
        const data = res.data.code;
        console.log(data);
        if(data === 200){
          /**
           * 如果用户登录身份任然有效
           */
          next();
        } else {
          /**
           * 如果用户登录身份失效
           */
          console.log('zouyanheng')
          next({ path: '/login'});
        }
      }).catch((err) => {
        Message.error(err || '请重新登录');
        console.log('cuwu')
        next({ path: '/login' });
      });

  } else if (store.getters.userToken && store.getters.authCode){
    next();
  } else{
    /**
     * 非注册用户
     */
    if (whiteList.indexOf(to.path) !== -1) {
      /**
       * 使用无需登录功能
       */
      next();
    }
    else if (to.path ==='/login'){
      next();
    }
    else {
      next({path:'/login'});
    }
  }
});
