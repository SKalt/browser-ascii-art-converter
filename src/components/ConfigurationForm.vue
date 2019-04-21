<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        label="grayramp"
        :value="grayramp"
        @input="v => $store.commit('config/setGrayramp', v)"
      />
    </v-flex>
    <!-- <three-digit-number-input label="R" />
    <three-digit-number-input label="G" />
    <three-digit-number-input label="B" /> -->
    <!-- <three-digit-number-input
      label="width"
      :value="width"
      @input="v => $store.commit('config/setWidth', Number(v))"
    /> -->
    <v-flex xs1 style="padding: 4px">
      <v-text-field
        class="mt-0"
        disabled
        type="number"
        min="0"
        label="width"
        :value="width"
      />
    </v-flex>
    <three-digit-number-input
      label="height"
      :value="height"
      @input="v => $store.commit('config/setHeight', Number(v))"
    />
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";
import ThreeDigitNumberInput from "./ThreeDigitNumberInput.vue";
import { mapMutations, /*mapState,*/ mapGetters } from "vuex";
import { DEFAULT_RAMP } from "../lib";
export default Vue.extend({
  components: {
    ThreeDigitNumberInput
  },
  data() {
    return {
      grayramp: DEFAULT_RAMP,
      height: 20,
    };
  },
  methods: {
    ...mapMutations(["config"])
  },
  computed: {
    // ...mapState('config', ['width'])
    // ...mapGetters({clampedDimensions')
    width() {
      return this.$store.getters.clampedDimensions.width || 20;
    }
  }
});
</script>
<style scoped>
/deep/ .v-text-field__slot input {
  font-family: monospace;
}
</style>
