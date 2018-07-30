import Vue from 'vue';
import Router from 'vue-router';

/**
 * 用户进入入口
 */

import initLayout from '@/view/init-Layout/initLayout';

Vue.use(Router);

/**
 * 路由列表配置说明：
 *
 * 为普通用户配置,免登录，预览app功能的 whitelist［ ］
 *
 * hidden: true               设置true则不出现在左侧抽屉式菜单栏里
 * name: 'router-name'        用于配置keep-alive，缓存组件，避免多次重复加载，提高性能
 * meta:{
 *   auth: true               设置为true，则需要验证用户是否登录才可访问
 *   title: 'title'           设置显示在侧边抽屉式菜单栏每个分类的名字
 *   icon: 'svg-name'         设置显示每个需要显示类别对应的icon
 *
 */

export const constantRouterMap = [
  {
    path: '/',
    component: initLayout,
    hidden: true,
    name: 'initLayout',
  },
  {
    path: '/login',
    component: () => import('@/view/login/index'),
    hidden: true,
    name: 'login',
  },
  {
    path: '/registerPage',
    component: () => import('@/view/login/registerPage'),
    hidden: true,
    name: 'registerPage',
  },
  {
    path: '/stationSearch',
    component: () => import('@/view/station-search/index'),
    hidden: true,
    name: 'stationSearch',
  },
  {
    path: '/bikeStations',
    component: () => import('@/view/bike-stations/index'),
    hidden: true,
    name: 'bikeStations',
  },
  {
    path: '/carStations',
    component: () => import('@/view/car-stations/index'),
    hidden: true,
    name: 'carStations',
  },
  {
    path: '/recharge',
    component: () => import('@/view/my-wallet/recharge'),
    hidden: true,
    name: 'recharge',
  },
  {
    path: '/rechargeHistory',
    component: () => import('@/view/my-wallet/rechargeHistory'),
    hidden: true,
    name: 'rechargeHistory',
  },
  {
    path: '/rechargeResult',
    component: () => import('@/view/my-wallet/rechargeResult'),
    hidden: true,
    name: 'rechargeResult',
  },
  {
    path: '/personalInfo',
    component: () => import('@/view/personal-info/index'),
    name: 'personalInfo',
    meta: { title: '个人信息', icon: 'icon_male', auth: true },
  },
  { path: '/changeName',
    component: () => import('@/view/personal-info/changeName'),
    name: 'changeName',
  },
  {
    path: '/myWallet',
    component: () => import('@/view/my-wallet/index'),
    name: 'myWallet',
    meta: { title: '我的钱包', icon: '', auth: true },
  },
  {
    path: '/stationOrder',
    component: () => import('@/view/station-order/index'),
    name: 'stationOrder',
    meta: { title: '车位订单', icon: '', auth: true },
  },
  {
    path: '/stationBooking',
    component: () => import('@/view/station-booking/index'),
    name: 'stationBooking',
    meta: { title: '车位预定', icon: '', auth: true },
  },
  {
    path: '/customerService',
    component: () => import('@/view/customer-service/index'),
    name: 'customerService',
    meta: { title: '客服中心', icon: '', auth: true },
  },
  {
    path: '/setting',
    component: () => import('@/view/setting/index'),
    name: 'setting',
    meta: { title: '设置', icon: '', auth: true },
  },
  {
    path: '/report',
    component: () => import('@/view/setting/report'),
  },
  {
    path: '/aboutUs',
    component: () => import('@/view/setting/aboutUs'),
  },
  {
    path: '/routePlanning',
    component: () => import('@/view/route-planning/index'),
    name: 'routePlanning',
    hidden: true,
    meta: { title: '出行', icon: '', auth: true },
  },
  {
    path: '/xiuxiuUnlocking',
    component: () => import('@/view/xiuxiu-unlocking/index'),
    name: 'xiuxiuUnlocking',
    hidden: true,
    meta: { title: '咻咻开锁', icon: '', auth: true },
  },
];

export default new Router({
  routes: constantRouterMap,
});
