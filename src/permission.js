/*eslint-disable*/
import { Message } from 'element-ui';
import router from './router';
import store from './store';

/**
 *  均不需要用户登录的路由列表
 * @type {string[]}
 */
const whiteList = ['/login', '/bikeStations', '/carStations', '/stationSearch'];

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    /**
     *  用户登录身份有效
     */
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      store.dispatch('authUser', { token }).then((res) => {
        const data = res.data.code;
        store.dispatch('GenerateRoutes', { data }).then(() => {
          router.addRouters(store.getters.addRouters);
        });
      }).catch((err) => {
        Message.error(err || '请重新登录');
        next({ path: '/login' });
      });
    }
  } else {
    /**
     * 用户的登录身份失效
     */
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
    }
    next('/login');
  }
});

