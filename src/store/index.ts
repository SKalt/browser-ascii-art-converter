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
  // CurrentImage,
  RootState,
  StateMirror,
} from "./types";
import imageCache from "./modules/image-cache";
import config from "./modules/config";
import current from "./modules/current";
import fontInfo from "./modules/font-info";
import getters, {
  RootGetters,
} from "./getters"
import {
  GrayScaler,
  clampDimensions,
} from "../lib";
// import { replace as replaceRoute, push as pushRoute } from "../router";

const modules: ModuleTree<RootState> = {
  rawImage: imageCache,
  processedImage: imageCache,
  config,
  current,
  fontInfo,
};

const mutations: MutationTree<RootState> = {
  setState(state, hash: string) {
    state.current.image = hash;
  }
};

const actions: ActionTree<RootState, RootState> = {
  async addImage(ctx: ActionContext<RootState, RootState>, dataUrl: string) {
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

const store: StoreOptions<RootState> = {
  mutations,
  actions,
  modules,
  getters
};

export default new Vuex.Store(store);
export { RootGetters, StateMirror };
