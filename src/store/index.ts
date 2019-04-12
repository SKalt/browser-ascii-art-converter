import Vue from "vue";
import Vuex, {
  ActionContext,
  ActionTree,
  GetterTree,
  ModuleTree,
  MutationTree,
  StoreOptions
} from "vuex";
Vue.use(Vuex);
import {
  CurrentImage,
  RootState,
  StateMirror,
  OverallGetters /*, Config, ImageCache */
} from "./types";
import imageCache from "./modules/image-cache";
import config from "./modules/config";
import fontInfo from "./modules/font-info";
import * as getters from "./getters"
import {
  GrayScaler,
  makeGrayScaler,
  makeGrayConverter,
  clampDimensions,
  ctxToGrayScale,
  makeCharConverter
} from "../lib";
// import { replace as replaceRoute, push as pushRoute } from "../router";
const grayscaler = makeGrayScaler();

const modules: ModuleTree<RootState> = {
  rawImage: imageCache,
  processedImage: imageCache,
  config,
  fontInfo
};

const mutations: MutationTree<CurrentImage> = {
  setState(state, hash: string) {
    state.current = hash;
  }
};

const actions: ActionTree<CurrentImage, RootState> = {
  async addImage(ctx: ActionContext<CurrentImage, RootState>, dataUrl: string) {
    const md5 = await ctx.dispatch("rawImage/addImage", dataUrl);
    ctx.commit("setState", md5);
    const {
      fontRatio,
      currentRawImageDimensions,
      currentRawImage
    } = ctx.getters;
    const [width, height] = clampDimensions({
      width: currentRawImageDimensions.width,
      height: currentRawImageDimensions.height,
      fontRatio,
      maxWidth: Number(ctx.rootState.config.width),
      maxHeight: Number(ctx.rootState.config.height)
    });
    return { img: currentRawImage, width, height };
  }
};

const store: StoreOptions<CurrentImage> = {
  state: () => ({ current: "" }),
  mutations,
  actions,
  modules,
  getters
};

export default new Vuex.Store(store);
export { OverallGetters, StateMirror };
