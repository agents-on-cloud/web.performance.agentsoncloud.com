<template>
  <v-btn-toggle
    @change="handler"
    v-model="daysBefore"
    tile
    color="white accent-5"
    group
    class="justify-end w-full my-3 pr-6"
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
    async handler() {
      this.$store.dispatch("setDaysBefore", this.daysBefore);
      await this.$store.dispatch("getAllReviews");
    },
  },

  watch: {
    daysBefore(before, after) {
      this.$store.dispatch("getOverviewReviews");
    },
  },
};
</script>