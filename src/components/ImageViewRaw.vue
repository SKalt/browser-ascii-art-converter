<template>
  <enhanced-image :src="src">
    raw: {{ width }}px × {{ height }}px
  </enhanced-image>
</template>
<script lang="ts">
import Vue from "vue";
import EnhancedImage from "./EnhancedImage.vue";
import {Dimensions} from "../store/types";

export default Vue.extend({
  components: {
    EnhancedImage
  },
  computed: {
    src(): string {
      return this.$store.getters.currentRawImageDataUrl;
    },
    dimensions(): Dimensions {
      return this.$store.getters.currentRawImageDimensions || {};
    },
    width(): string {
      return `${this.dimensions.width}` || '??'
    },
    height(): string {
      return `${this.dimensions.height}` || '??'
    }
  }
});
</script>
