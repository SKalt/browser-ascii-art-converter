import md5 from "md5";
import { Module } from "vuex";

interface HashToDataUrl {
  [index: string]: string;
}
interface RawId {
  hash: string;
  dataUrl: string;
}

const mutations = {
  addImage: (state: HashToDataUrl, dataUrl: string): RawId => {
    const hash = md5(dataUrl);
    if (!(hash in state)) {
      state[hash] = dataUrl;
    }
    return { hash, dataUrl };
  }
};

const store: Module<HashToDataUrl, object> = {
  mutations,
  namespaced: true,
  state: {}
};

export default store;
