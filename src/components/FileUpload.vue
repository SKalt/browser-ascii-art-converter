<template>
  <input
    class="btn"
    ref="loader"
    accept="image/*"
    type="file"
    @change="loadFile"
  />
</template>
<script lang="ts">
const dfltImg = require("../assets/logo.png");
import Vue from "vue";
import { loadFile } from "../lib";
import { makeName } from "../router";

interface FileUploadEvent {
  target: { files: File[] };
}

export default Vue.extend({
  created() {
    // this.$router.push({ path: "/", query: {} });
    fetch(dfltImg)
      .then(r => r.blob())
      .then((b: Blob) => new File([b], "vue-logo.png", { type: "image/png" }))
      .then((file: File) =>
        loadFile({ files: [file] })
          // TODO: mirror loaded filename to document.title
          .then(async (dataUrl: string) => {
            // this.src = dataUrl;
            await this.$store
              .dispatch("addImage", dataUrl)
              .then(result => this.$emit("image-added", result));
          })
          .then(() => (document.title = makeName(file.name)))
      );
  },
  methods: {
    async loadFile(e: FileUploadEvent): Promise<string> {
      const [file = null] = e.target.files || [];
      if (!file) {
        return '';
      }
      return loadFile({files: [file]})
        .then(async (dataUrl: string) => {
          // this.src = dataUrl;
          await this.$store
            .dispatch("addImage", dataUrl)
            .then(result => this.$emit("image-added", result));
        })
        .then(() => (document.title = makeName(file.name)))
    }
  }
});
</script>
