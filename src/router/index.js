import Vue from 'vue';
import Router from 'vue-router';

/*
用户初次使用
 */

import initLayout from '@/view/init-layout/initLayout';

Vue.use(Router);


export const constantRouterMap = [
  {
    path: '',
    component: initLayout,
    hidden: true,
  },
  {
    path: '/login',
    component: () => import('@/view/login/index'),
    hidden: true,
  },
  {
    path: '/',
    redirect: 'personalInfo/index',
    children: [{
      path: 'personalInfo',
      component: () => import('@/view/personal-info/index'),
      name: 'personalInfo',
      meta: { title: '个人信息', icon: 'icon_male' },
    }],
  },
  {
    path: '/myWallet',
    redirect: 'myWallet/index',
    children: [{
      path: '/myWallet',
      component: () => import('@/view/my-wallet/index'),
      name: 'myWallet',
      meta: { title: '我的钱包', icon: '' },
    }],
  },
  {
    path: '/stationOrder',
    redirect: 'stationOrder/index',
    children: [{
      path: '/stationOrder',
      component: () => import('@/view/station-order/index'),
      name: 'stationOrder',
      meta: { title: '车位订单', icon: '' },
    }],
  },
  {
    path: '/stationBooking',
    redirect: 'stationBooking/index',
    children: [{
      path: '/stationBooking',
      component: () => import('@/view/station-booking/index'),
      name: 'stationBooking',
      meta: { title: '车位预定', icon: '' },
    }],
  },
  {
    path: '/customerService',
    redirect: 'customerService/index',
    children: [{
      path: '/customerService',
      component: () => import('@/view/customer-service/index'),
      name: 'customerService',
      meta: { title: '客服中心', icon: '' },
    }],
  },
  {
    path: '/setting',
    redirect: 'setting/index',
    children: [{
      path: '/setting',
      component: () => import('@/view/setting/index'),
      name: 'setting',
      meta: { title: '设置', icon: '' },
    }],
  },
];

export default new Router({
  routes: constantRouterMap,
});
