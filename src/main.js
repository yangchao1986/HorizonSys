// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'
import api from './api/index'

Vue.prototype.$api = api; //设置全局变量$api，$用来特殊化，不污染其他变量
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* 引入公共方法 */
import date from '@/assets/js/date'
import crypt from '@/assets/js/crypt'
Vue.prototype.$date = date;
Vue.prototype.$crypt = crypt;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>',
  render: h => h(App)
}).$mount('#app')
