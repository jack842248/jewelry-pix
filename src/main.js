import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store';
Vue.use(Vuex);

//載入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);

import router from './router';

//引入alert訊息彈窗
import './utils/bus.js';

//引入貨幣過濾器
import currency from './filters/currency.js';
Vue.filter('currency',currency);

//引入bootstrap方法
import 'bootstrap'

//把$掛載到window
import $ from 'jquery'
window.$ = $

//引入loading效果和樣式
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component('Loading', Loading)

//引入表單驗證
import VeeValidate, { Validator } from 'vee-validate';
import VeeValidateTW from 'vee-validate/dist/locale/zh_TW.js'
Vue.use(VeeValidate,{
  events: 'input|blur',
});
Validator.localize('zh_TW', VeeValidateTW);

//axios跨域攜帶cookie
axios.defaults.withCredentials = true

//axios request攔截器
axios.interceptors.request.use(
  config => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (token) {
      //避免 headers 不存在的情況
      config.headers = config.headers || {};
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//axios response攔截器
axios.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    const errorMessage = (error.response && error.response.data && error.response.data.message) || '系統錯誤，請稍後再試';
    Vue.prototype.$bus.$emit('message:push', errorMessage, 'danger');
    if (error.response && error.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

//建立Vue2應用程式
new Vue({
  router,
  store,
  render: createElement => createElement(App),
}).$mount('#app')
