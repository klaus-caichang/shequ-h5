import Vue from 'vue';
import Store from '@/store';
import Plugins from '@/plugins';
import App from './App';
import '@/mixins';
import '@/utils/filter';
const jweixin = require('@/static/js/jweixin-1.4.0.js');
Vue.prototype.jweixin = jweixin;

Vue.config.productionTip = false;

Vue.prototype.$store = Store;
Vue.prototype.$bus = new Vue();
Vue.use(Plugins);
App.mpType = 'app';

const app = new Vue({
  ...App,
});
app.$mount();
