import Vue from 'vue';
import Router from 'vue-router';

/**
 * 用户进入入口
 */

import initLayout from '@/view/init-layout/initLayout';

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
  },
  {
    path: '/login',
    component: () => import('@/view/login/index'),
    hidden: true,
  },
  {
    path: '/personalInfo',
    component: () => import('@/view/personal-info/index'),
    name: 'personalInfo',
    meta: { title: '个人信息', icon: 'icon_male' },
  },
  {
    path: '/myWallet',
    component: () => import('@/view/my-wallet/index'),
    name: 'myWallet',
    meta: { title: '我的钱包', icon: '' },
  },
  {
    path: '/stationOrder',
    component: () => import('@/view/station-order/index'),
    name: 'stationOrder',
    meta: { title: '车位订单', icon: '' },
  },
  {
    path: '/stationBooking',
    component: () => import('@/view/station-booking/index'),
    name: 'stationBooking',
    meta: { title: '车位预定', icon: '' },
  },
  {
    path: '/customerService',
    component: () => import('@/view/customer-service/index'),
    name: 'customerService',
    meta: { title: '客服中心', icon: '' },
  },
  {
    path: '/setting',
    component: () => import('@/view/setting/index'),
    name: 'setting',
    meta: { title: '设置', icon: '' },
  },
];

export default new Router({
  routes: constantRouterMap,
});
