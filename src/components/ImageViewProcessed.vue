<template>
  <enhanced-image :src="src">
    transformed: {{ width }}chars × {{ height }}chars
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
      return this.$store.getters.grayScaled.dataUrl;
    },
    dimensions(): Dimensions {
      return this.$store.getters.clampedDimensions || {}
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
