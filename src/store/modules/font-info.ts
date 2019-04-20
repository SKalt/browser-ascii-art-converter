import { Module } from "vuex";
import { FontRatioInfo, FontState, RootState } from "../types";

const ratios: Module<FontRatioInfo, RootState> = {
  namespaced: true,
  mutations: {
    setRatio(state, info: FontRatioInfo) {
      Object.entries(info).forEach(([f, r]: [string, number]) => {
        state[f] = r;
      });
    }
  }
};

const main: Module<FontState, RootState> = {
  namespaced: true,
  modules: { ratios },
  mutations: {
    set(state, font: string) {
      state.current = font;
    }
  }
};

export default main;
