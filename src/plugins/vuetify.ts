import Vue from 'vue';
import Vuetify, {
  VContainer,
  VImg,
  VInput,
  VLayout,
  VTextField,
} from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  components: {
    VContainer,
    VImg,
    VInput,
    VLayout,
    VTextField,
  },
  iconfont: 'md',
});
