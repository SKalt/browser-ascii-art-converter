import { Module } from 'vuex';
import md5 from 'md5';


interface HashToDataUrl {
  [index: string]: string;
}
interface RawId {
  hash: string; dataUrl: string;
}

const mutations = {
  addImage: (state: HashToDataUrl, dataUrl: string): RawId => {
    const hash = md5(dataUrl);
    if (!(hash in state)) {
      state[hash] = dataUrl;
    }
    return { hash, dataUrl };
  },
};

const store: Module<HashToDataUrl, object> = {
  namespaced: true,
  state: {},
  mutations,
};

export default store;
