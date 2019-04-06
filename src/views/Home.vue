<template>
  <v-container class="home">
    <file-upload @image-added="process" />
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
  data() {
    const grayScaler: GrayScaler = makeGrayScaler();
    return {
      grayScaler,
      processed: "",
      imgData: "",
      chars: ""
    };
  },
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
  methods: {
    process({ img, width, height }) {
      const canvas = document.createElement("canvas");
      canvas.height = height;
      canvas.width = width;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const [grayScaled, target] = ctxToGrayScale(
        ctx,
        width,
        height,
        this.grayScaler
      );
      ctx.putImageData(target, 0, 0);
      this.processed = canvas.toDataURL();
      this.chars = makeCharConverter(
        grayScaled,
        makeGrayConverter(this.$store.state.config.grayRamp),
        width
      );
    }
  }
});
</script>
