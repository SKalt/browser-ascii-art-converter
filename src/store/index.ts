import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import RawImage from './modules/raw-images';
import Config from './modules/config';

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
  },
  actions: {
    // newImage
  },
  modules: {
    Config,
    RawImage,
  },
});
