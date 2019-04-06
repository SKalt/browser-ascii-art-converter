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
import {
  GrayScaler,
  makeGrayScaler,
  makeGrayConverter,
  clampDimensions
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
    const { fontRatio } = ctx.getters;
    return new Promise(r => {
      const img = new Image();
      img.onload = () => {
        const [width, height] = clampDimensions({
          width: img.width,
          height: img.height,
          fontRatio,
          maxWidth: Number(ctx.rootState.config.width),
          maxHeight: Number(ctx.rootState.config.height)
        });
        r({ img, width, height });
      };
      img.src = dataUrl;
    });
    // the current config
    // the fontRatio
  }
};

const getters: GetterTree<CurrentImage, RootState> = {
  font(state, ignoredGetters, rootState, rootGetters) {
    return rootState.fontInfo.current;
  },
  fontRatio(state, getters, rootState) {
    return rootState.fontInfo.ratios[getters.font];
  },
  rawImage(state, getters, rootState) {
    return rootState.rawImage[state.current];
  },
  grayConverter(state, getters, rootState) {
    return makeGrayConverter(rootState.config.grayRamp);
  },
  // grayScaler(state, getters, rootState): GrayScaler {
  //   return rootState.config
  // },
  urlObj(
    state,
    ignoredGetters,
    rootState,
    rootGetters: OverallGetters
  ): StateMirror {
    return {
      raw: state.current,
      width: rootGetters["config/strWidth"],
      height: rootGetters["config/strHeight"],
      grayramp: rootState.config.grayramp
    };
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
