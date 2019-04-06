import Vue from "vue";
import Vuetify, {
  VContainer,
  VFlex,
  VImg,
  VInput,
  VLayout,
  VTextField
} from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  components: {
    VContainer,
    VFlex,
    VImg,
    VInput,
    VLayout,
    VTextField
  },
  iconfont: "md"
});
