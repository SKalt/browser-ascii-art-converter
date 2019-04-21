<template>
  <v-container class="home">
    <v-layout row wrap align-center align-content-center class="centered">
      <v-flex xs12 sm5 md3 align-self-center justify-center justify-space-around>
        <file-upload />
      </v-flex>
      <raw-image-view />
      <processed-image-view />
      <div ref="canvas-holder" v-show="false"></div>
    </v-layout>
    <v-layout row wrap>
      <configuration-form />
    </v-layout>
    <v-layout row wrap row wrap align-center align-content-center class="centered">
      <v-flex xs12 align-self-center justify-center>
        <pre style="display: inline-block" class="v-card">{{ chars }}</pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import EnhancedImage from "../components/EnhancedImage.vue";
import RawImageView from "../components/ImageViewRaw.vue";
import ProcessedImageView from "../components/ImageViewProcessed.vue";
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
    ConfigurationForm,
    EnhancedImage,
    FileUpload,
    RawImageView,
    ProcessedImageView
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
<style scoped>
.centered {
  text-align: center;
}
</style>
