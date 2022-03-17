<template>
  <v-btn-toggle
    @change="handler"
    v-model="daysBefore"
    tile
    color="white accent-5"
    group
    class="select-day"
  >
    <v-btn value="">All</v-btn>
    <v-btn :value="365">1 Year</v-btn>
    <v-btn :value="30">1 month</v-btn>
    <v-btn :value="7">1 week</v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  data() {
    return {
      daysBefore: "",
    };
  },
  methods: {
    handler() {
      this.$store.dispatch("setDaysBefore", this.daysBefore);
    },
  },

  watch: {
    daysBefore(before, after) {
      this.$store.dispatch("getGroupedWorstReviews");
      this.$store.dispatch("getWorstReviews");
    },
  },
};
</script>

<style>
.select-day {
  position: absolute;
  top: -55px;
  right: 50px;
  z-index: 1;
}
</style>