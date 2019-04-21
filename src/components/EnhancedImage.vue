<template>
  <v-img :src="src" class="v-card spaced" height="200" width="200" contain>
    <v-layout row align-end justify-end fill-height>
      <v-flex shrink class="enhanced-image-label">
        <slot>
          <!--  -->
        </slot>
      </v-flex>
    </v-layout>
  </v-img>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    src: { type: String, default: () => "" }
  }
});
</script>
<style scoped>
.spaced {
  margin: 5px;
}
/deep/ .enhanced-image-label {
  color: white;
  font-family: monospace;
}
:hover /deep/ .enhanced-image-label {
  background-color: rgba(0, 0, 0, .2);
}
</style>
