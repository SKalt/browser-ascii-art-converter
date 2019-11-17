import md5 from "md5";
import { Module } from "vuex";
import { ImageCache } from "../types";

// interface RawId {
//   hash: string;
//   dataUrl: string;
// }
// type AddImageMutation = (state: HashToDataUrl, dataUrl: string) => RawId
interface ImageWrapper {
  width: number; height: number; img: HTMLImageElement;
}
async function imageOf(
  dataUrl: string
): Promise<ImageWrapper> {
  const result: Promise<ImageWrapper> = new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve({ img, width: img.width, height: img.height });
    };
    img.src = dataUrl;
  });
  return result;
}

const store: Module<ImageCache, any> = {
  namespaced: true,
  state: () => ({}),
  mutations: {
    addImage: (
      state: ImageCache,
      {
        hash = "",
        dataUrl = "",
        img,
        width,
        height
      }: {
          hash: string;
          dataUrl: string;
          img: HTMLImageElement;
          width: number;
          height: number;
        }
    ) => {
      hash = hash || md5(dataUrl);
      if (!(hash in state)) {
        state[hash] = { dataUrl, img: () => img, width, height };
      }
    }
  },
  actions: {
    async addImage(ctx, dataUrl) {
      const hash = md5(dataUrl);
      const { img, width, height } = await imageOf(dataUrl);
      ctx.commit("addImage", { hash, dataUrl, img, width, height });
      return hash;
    }
  }
};

export default store;
