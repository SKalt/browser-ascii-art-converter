import { Module } from 'vuex';
import md5 from 'md5';


interface HashToDataUrl {
  [index: string]: string;
}

const mutations = {
  addImage: (state: HashToDataUrl, dataUrl: string): boolean => {
    const hash = md5(dataUrl);
    if (hash in state) {
      return true;
    } else {
      return Boolean(state[hash] = dataUrl);
    }
  },
};

const store: Module<HashToDataUrl, object> = {
  namespaced: true,
  state: {},
  mutations,
};

export default store;
