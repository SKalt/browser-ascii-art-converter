<template>
  <v-container class="home">
    <file-upload />
    <enhanced-image :src="processed" />
    <div ref="canvas-holder" v-show="false"></div>
    <configuration-form />
    <pre>{{ chars }}</pre>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import EnhancedImage from "../components/EnhancedImage.vue";
import ConfigurationForm from "../components/ConfigurationForm.vue";
import FileUpload from "../components/FileUpload.vue";
import {
  getMonospaceFontRatio,
  GrayScaler,
  makeGrayScaler,
  makeGrayConverter,
  ctxToGrayScale,
  makeCharConverter
} from "../lib";
export default Vue.extend({
  name: "home",
  components: {
    EnhancedImage,
    FileUpload,
    ConfigurationForm
  },
  mounted() {
    this.$store.commit("fontInfo/ratios/setRatio", {
      monospace: getMonospaceFontRatio(document, "monospace")
    });
  },
  computed: {
    processed(): string {
      return this.$store.getters.grayScaled.dataUrl;
    },
    chars(): string {
      return this.$store.getters.chArt;
    }
  }
});
</script>
