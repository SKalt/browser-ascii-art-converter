<template>
  <v-layout>
    <v-img :src="src" max-height="200" max-width="200" />
    <!-- span > width x height -->
  </v-layout>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    src: { type: String, default: () => "" }
  }
});
</script>
