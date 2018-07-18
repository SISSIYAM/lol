/*eslint-disable*/
import { Message } from 'element-ui';
import router from './router';
import store from './store';

/**
 *  均不需要用户登录的路由列表
 * @type {string[]}
 */
const whiteList = ['/', '/bikeStations', '/carStations', '/stationSearch'];
const token = store.getters.userToken;

router.beforeEach((to, from, next) => {
  if (token) {
    /**
     *  用户登录身份有效
     */
      store.dispatch('authUser', { token }).then((res) => {
        const data = res.data.code;
        if (data === 200){
          store.dispatch('GenerateRoutes', {data}).then(() => {
            router.addRouters(store.getters.addRouters);
          });
        } else {
          next({ path: '/login'});
        }
      }).catch((err) => {
        Message.error(err || '请重新登录');
        next({ path: '/login' });
      });
  } else {
    /**
     * 用户的登录身份失效
     */
    if (whiteList.indexOf(to.path) !== -1) {
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

