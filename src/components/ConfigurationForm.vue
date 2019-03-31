<template>
  <form>
    <v-text-field label="grayramp" placeholder="" :value.sync="grayramp" />
    <v-text-field
      class="mt-0"
      type="number"
      label="width"
      min="0"
      :value.sync="width"
    />
    <v-text-field
      class="mt-0"
      type="number"
      label="height"
      min="0"
      :value.sync="height"
    />
  </form>
</template>
<script lang="ts">
import Vue from "vue";
import { DEFAULT_RAMP } from "../lib";
export default Vue.extend({
  data() {
    return {
      grayramp: DEFAULT_RAMP,
      height: 80,
      width: 80
    };
  }
});
</script>
<style scoped>
input {
  font-family: monospace;
}
</style>
