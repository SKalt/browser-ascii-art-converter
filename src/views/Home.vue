<template>
  <v-container class="home">
    <v-layout row wrap>
      <v-flex align-self-center xs12 md4>
        <file-upload />
      </v-flex>
      <v-flex xs12 md4>
        <raw-image-view />
      </v-flex>
      <v-flex xs12 md4>
        <enhanced-image :src="processed" />
      </v-flex>
      <div ref="canvas-holder" v-show="false"></div>
    </v-layout>
    <v-layout row wrap>
      <configuration-form />
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 align-self-center align-content-center>
        <pre style="display: inline-block" class="v-card">{{ chars }}</pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import EnhancedImage from "../components/EnhancedImage.vue";
import RawImageView from "../components/RawImageView.vue";
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
    RawImageView
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

</style>
