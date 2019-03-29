<template>
  <v-input>
    <input class="btn" ref="loader" accept="image/*" type="file" @change="loadFile"/>
    <v-img ref="img" :src="src" max-height="200" max-width="200" />
  </v-input>
</template>
<script lang="ts">
import Vue from 'vue';
import { loadFile } from '../lib';
import dfltImg from '../assets/logo.png';
interface FileUploadEvent {
  target: {files: File[]};
}
export default Vue.extend({
  data() {
    return {src: ''};
  },
  created() {
    fetch(dfltImg)
      .then((r) => r.ok ? r.blob() : 'bad')
      .then((blob) => loadFile({files: [blob]}).then((dataUrl) => {
        this.src = dataUrl;
        this.$store.commit('RawImage/addImage', dataUrl);
      }));
  },
  // computed: {
  //   src() {
  //     return this.$store.getters.
  //   }
  // },
  methods: {
    loadFile(e: FileUploadEvent): Promise<void> {
      return loadFile(e.target)
        .then((dataUrl: string) => {
          this.src = dataUrl;
          return this.$store.commit('RawImage/addImage', dataUrl);
        });
    },
  },
});
</script>
<style scoped>
input {

}
</style>
