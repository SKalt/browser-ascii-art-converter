<template>
  <form>
    <v-text-field
      label="grayramp"
      placeholder=""
      :value="DEFAULT_RAMP"
    />
    <v-text-field
       class="mt-0"
       type="number"
       label="width"
       min="0"
     />
     <v-text-field
        class="mt-0"
        type="number"
        label="height"
        min="0"
      />
  </form>
</template>
<script lang="ts">
import Vue from 'vue';
import {DEFAULT_RAMP} from '../lib';
export default Vue.extend({
  data() {
    return {
      DEFAULT_RAMP,
    };
  },
});
</script>
<style scoped>
input {
  font-family: monospace;
}
</style>
