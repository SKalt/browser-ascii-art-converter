<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <file-upload />
  </div>
</template>

<script>
// @ is an alias to /src
import FileUpload from '../components/FileUpload.vue';
export default {
  name: 'home',
  components: {
    FileUpload,
  },
};
</script>
