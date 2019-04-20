import { Module } from "vuex";
import router from "../../router";
import { Config, RootState } from "../types";
import { DEFAULT_RAMP } from "../../lib";

type ConfigKey = "width" | "height" | "grayramp";

function setter(name: ConfigKey) {
  return function _setter(state: Config, value: string | number) {
    state[name] = value;
  };
}

const str = (key: ConfigKey) => (state: Config): string => `${state[key]}`;

const module: Module<Config, RootState> = {
  namespaced: true,
  state: () => ({
    grayramp: DEFAULT_RAMP,
    height: 20,
    width: 20
  }),
  mutations: {
    setGrayramp: setter("grayramp"),
    setHeight: setter("height"),
    setWidth: setter("width")
  },
  getters: {
    strHeight: str("height"),
    strWidth: str("width")
  }
};

export default module;
