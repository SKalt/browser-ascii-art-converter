<template>
  <v-input>
    <input
      class="btn"
      ref="loader"
      accept="image/*"
      type="file"
      @change="loadFile"
    />
    <enhanced-image :src="src" />
  </v-input>
</template>
<script lang="ts">
import dfltImg from "../assets/logo.png"
import Vue from "vue"
import EnhancedImage from './EnhancedImage.vue'
import { loadFile } from "../lib"
interface FileUploadEvent {
  target: { files: File[] }
}
export default Vue.extend({
  data() {
    return { src: "" };
  },
  components: {
    EnhancedImage,
  },
  created() {
    fetch(dfltImg)
      .then(r => r.blob())
      .then((b: Blob) => new File([b], 'vue-logo.png', {type: 'image/png'}))
      .then(
        (file: File) => loadFile({ files: [file] })
          .then(
            (dataUrl: string) => {
              this.src = dataUrl;
              this.$store.commit("RawImage/addImage", dataUrl)
            }
          )
  },
  // computed: {
  //   src() {
  //     return this.$store.getters.
  //   }
  // },
  methods: {
    loadFile(e: FileUploadEvent): Promise<void> {
      return loadFile(e.target).then((dataUrl: string) => {
        this.src = dataUrl
        return this.$store.commit("RawImage/addImage", dataUrl)
      })
    }
  }
});
</script>
