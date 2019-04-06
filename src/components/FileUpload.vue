<template>
  <v-input>
    <input
      class="btn"
      ref="loader"
      accept="image/*"
      type="file"
      @change="loadFile"
    />
    <raw-image-view />
    <!-- <raw-image-view /> -->
    <!-- <canvas ref="to-paint" v-show="false"></canvas> -->
  </v-input>
</template>
<script lang="ts">
import dfltImg from "../assets/logo.png";
import RawImageView from "./RawImageView.vue";
import Vue from "vue";
import { loadFile } from "../lib";
import { makeName } from "../router";

interface FileUploadEvent {
  target: { files: File[] };
}

export default Vue.extend({
  components: {
    RawImageView
  },
  created() {
    this.$router.push({ path: "/", query: {} });
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
    loadFile(e: FileUploadEvent): Promise<void> {
      return loadFile(e.target).then((dataUrl: string) => {
        return this.$store.commit("rawImage/addImage", dataUrl);
      });
    }
  }
});
</script>
