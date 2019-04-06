<template>
  <form>
    <v-text-field label="grayramp" placeholder="" :value.sync="grayramp" />
    <v-text-field
      class="mt-0"
      type="number"
      label="width"
      min="0"
      :value="width"
      @input="v => $store.commit('config/setWidth', Number(v))"
    />
    <v-text-field
      class="mt-0"
      type="number"
      label="height"
      min="0"
      :value="height"
      @input="v => $store.commit('config/setHeight', Number(v))"
    />
  </form>
</template>
<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { DEFAULT_RAMP } from "../lib";
export default Vue.extend({
  data() {
    return {
      grayramp: DEFAULT_RAMP,
      height: 80,
      width: 80
    };
  },
  methods: {
    ...mapMutations(["config"])
  }
});
</script>
<style scoped>
/deep/ .v-text-field__slot input {
  font-family: monospace;
}
</style>
