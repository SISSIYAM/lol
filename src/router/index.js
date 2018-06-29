import Vue from 'vue';
import Router from 'vue-router';

/*
用户初次使用
 */

import initLayout from '@/view/init-layout/initLayout';

Vue.use(Router);


export const constantRouterMap = [
  {},
];
export default new Router({
  routes: [
    {
      path: '/',
      name: 'initLayout',
      component: initLayout,
    },
  ],
});
