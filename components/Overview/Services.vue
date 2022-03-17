<template>
  <v-card class="flex flex-row">
    <v-card-title class="title">
      Services Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>
    <v-container id="container" class="gap-5 justify-center">
      <!-- list of services -->
      <CardMiniService
        v-for="service of serviceReviews"
        :key="service.id"
        :service="service"
      />
    </v-container>
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

<style scoped>
#container {
  display: flex;
  grid-gap: 10px;
  flex-wrap: wrap;
}
</style>