import { Module } from 'vuex';
import {DEFAULT_RAMP} from '../../lib';

interface Config {
  width: number;
  height: number;
  grayramp: string;
}

const module: Module<Config, object> = {
  state: {
    grayramp: DEFAULT_RAMP,
    width: 80,
    height: 80,
  },
};

export default module;
