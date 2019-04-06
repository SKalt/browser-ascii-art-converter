<template>
  <v-container class="home">
    <file-upload />
    <configuration-form />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ConfigurationForm from "../components/ConfigurationForm.vue";
import FileUpload from "../components/FileUpload.vue";
import { getMonospaceFontRatio } from "../lib";
export default Vue.extend({
  name: "home",
  components: {
    FileUpload,
    ConfigurationForm
  },
  mounted() {
    this.$store.commit("fontInfo/ratios/setRatio", {
      monospace: getMonospaceFontRatio(document, "monospace")
    });
  }
});
</script>
