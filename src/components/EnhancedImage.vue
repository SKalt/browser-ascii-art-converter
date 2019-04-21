<template>
  <v-img :src="src" class="v-card spaced" height="200" width="200" contain/>
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
</style>
