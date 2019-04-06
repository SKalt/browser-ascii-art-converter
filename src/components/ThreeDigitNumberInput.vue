<template>
  <v-flex xs1>
    <v-text-field
      class="mt-0"
      type="number"
      min="0"
      :label="label"
      :value="value"
      @input="bubble"
    />
  </v-flex>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    label: { type: String, default: () => "" },
    value: { type: Number, default: () => 0 }
  },
  methods: {
    bubble(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<style scoped>
.flex {
  padding: 4px;
}
</style>
