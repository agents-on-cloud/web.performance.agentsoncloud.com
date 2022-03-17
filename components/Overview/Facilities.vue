<template>
  <v-card class="flex flex-row">
    <v-card-title>
      Facilities Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>
    <!-- TODO: Facilities should be displayed as nested, with multiple facilities  -->
    <v-container id="container" class="gap-5 justify-center">
      <!-- list of facilities -->
      <CardMiniFacility
        v-for="facility of facilityReviews"
        :facility="facility"
        :key="facility.id"
      />
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["facilityReviews", "worstReviews"],
};
</script>

<style scoped>
#container {
  display: flex;
  grid-gap: 10px;
  flex-wrap: wrap;
}
</style>