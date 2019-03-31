<template>
  <div class="home">
    <file-upload />
    <configuration-form />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// @ is an alias to /src
import ConfigurationForm from "../components/ConfigurationForm.vue";
import FileUpload from "../components/FileUpload.vue";
export default Vue.extend({
  name: "home",
  components: {
    FileUpload,
    ConfigurationForm
  }
});
</script>
