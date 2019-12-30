// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';

Vue.use(Mint);
import Api from './api/api.js'
import {PATH} from './router/path'
import {Store} from './router/store'

Vue.use(Api);
Vue.prototype.Api = Api;

Vue.use(PATH);
Vue.prototype.PATH = PATH;

Vue.use(Store);
Vue.prototype.Store = Store;

Vue.config.productionTip = false;

// 判断是否登录
router.beforeEach(function (to, from, next) {
  if (to.meta.isLogin) {
    Api.isLogin();
  }
  next();
})


router.afterEach(function (to, from) {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
