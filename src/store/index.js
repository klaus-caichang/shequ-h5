import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins';
import * as modules from './module';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins,
  getters
});
