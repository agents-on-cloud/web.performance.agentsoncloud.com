<template>
  <v-card class="flex flex-row">
    <v-card-title class="title">
      Services Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>
    <Container>
      <!-- list of services -->
      <CardMiniService
        v-for="service of serviceReviews"
        :key="service.id"
        :service="service"
      />
    </Container>
  </v-card>
</template>

<script>
export default {
  props: ["serviceReviews"],
  data() {
    return {
      providers: [],
    };
  },
};
</script>