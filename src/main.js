// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';

import Element from 'element-ui';
import DrawerLayout from 'vue-drawer-layout';
import 'element-ui/lib/theme-chalk/index.css';
import { AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux';

import App from './App';
import router from './router';
import store from './store';

import './icons';
import './permission';

import encryptCode from './utils/encrypt';

Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(DrawerLayout);

Vue.use(Element, {
  size: 'small',
});

Vue.use(encryptCode);

Vue.use(Vuex);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
