<template>
  <v-btn-toggle
    @change="handler"
    v-model="daysBefore"
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
  data() {
    return {
      daysBefore: 999999,
    };
  },
  methods: {
    async handler() {
      this.$store.dispatch("setDaysBefore", this.daysBefore);
    },
  },
  computed: {
    ...mapGetters(["getDaysBefore"]),
  },

  mounted: function () {
    this.daysBefore = this.getDaysBefore;
  },
};
</script>