<template>
  <v-input>
    <input ref="loader" accept="image/*" type="file" @change="loadFile"/>
  </v-input>
</template>
<script lang="ts">
import Vue from 'vue';
import { loadFile } from '../lib';
interface FileUploadEvent {
  target: {files: File[]};
}
export default Vue.extend({
  methods: {
    loadFile(e: FileUploadEvent): Promise<void> {
      return loadFile(e.target)
        .then((dataUrl: string) => {
          return this.$store.commit('RawImage/addImage', dataUrl);
        });
    },
  },
});

</script>
<style scoped>
</style>
