import router from './router';
import store from './store';


/**
 *  均不需要用户登录的路由列表
 * @type {string[]}
 */
const whiteList = ['/login', '/bikeStations', '/carStations', '/stationSearch'];

router.beforeEach((to, from, next) => {
  store.dispatch('authUser').then((res) => {
    const data = res.data.code;
  });
  if (getToken) {
    /**
     *  用户登录身份有效
     */
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      store.dispatch('GenerateRoutes', { data });
      next();
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
  }
});