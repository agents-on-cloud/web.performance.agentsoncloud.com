<template>
  <v-card class="flex flex-row">
    <v-card-title>
      Facilities Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>
    <!-- TODO: Facilities should be displayed as nested, with multiple facilities  -->
    <Container>
      <!-- list of facilities -->
      <CardMiniFacility
        v-for="facility of facilityReviews"
        :facility="facility"
        :key="facility.id"
      />
    </Container>
  </v-card>
</template>

<script>
export default {
  props: ["facilityReviews", "worstReviews"],
};
</script>
