<template>
  <v-btn-toggle
    @change="handler"
    :value="getDaysBefore"
    tile
    color="white accent-5"
    group
    class="justify-end w-full my-3 pr-6"
  >
    <v-btn :value="999999">All</v-btn>
    <v-btn :value="365">1 Year</v-btn>
    <v-btn :value="30">1 month</v-btn>
    <v-btn :value="7">1 week</v-btn>
  </v-btn-toggle>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    async handler(value) {
      this.$store.dispatch("setDaysBefore", value);
    },
  },
  computed: {
    ...mapGetters(["getDaysBefore"]),
  },
};
</script>