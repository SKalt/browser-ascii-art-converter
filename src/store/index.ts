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
import imageCache from "./modules/image-cache";
import config from "./modules/config";
import {
  CurrentImage,
  RootState,
  StateMirror,
  OverallGetters /*, Config, ImageCache */
} from "./types";
// import { replace as replaceRoute, push as pushRoute } from "../router";

const modules: ModuleTree<RootState> = {
  rawImage: imageCache,
  processedImage: imageCache,
  config
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
  }
};

const getters: GetterTree<CurrentImage, RootState> = {
  urlObj(
    state,
    ignoredGetters,
    ignoredRootState,
    rootGetters: OverallGetters
  ): StateMirror {
    return {
      raw: state.current,
      width: rootGetters["config/strWidth"],
      height: rootGetters["config/strHeight"],
      grayramp: rootGetters["config/grayramp"]
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
