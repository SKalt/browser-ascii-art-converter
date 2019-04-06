import md5 from "md5";
import { Module } from "vuex";
import { ImageCache } from "../types";

// interface RawId {
//   hash: string;
//   dataUrl: string;
// }
// type AddImageMutation = (state: HashToDataUrl, dataUrl: string) => RawId

const store: Module<ImageCache, object> = {
  namespaced: true,
  state: () => ({}),
  mutations: {
    addImage: (
      state: ImageCache,
      { hash = "", dataUrl = "" }: { hash: string; dataUrl: string }
    ) => {
      hash = hash || md5(dataUrl);
      if (!(hash in state)) {
        state[hash] = dataUrl;
      }
    }
  },
  actions: {
    async addImage(ctx, dataUrl) {
      const hash = md5(dataUrl);
      ctx.commit("addImage", { hash, dataUrl });
      return hash;
    }
  }
};

export default store;
