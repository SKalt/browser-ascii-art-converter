<template>
  <enhanced-image :src="src" />
</template>
<script lang="ts">
import Vue from "vue";
import EnhancedImage from "./EnhancedImage.vue";
export default Vue.extend({
  components: {
    EnhancedImage
  },
  computed: {
    src() {
      return this.$store.getters.rawImage;
    }
  }
});
</script>
