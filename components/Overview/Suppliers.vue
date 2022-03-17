<template>
  <v-card class="flex flex-row">
    <v-card-title
      >Suppliers Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>
    <v-container id="container" class="gap-5 justify-center">
      <!-- list of suppliers -->
      <CardMiniSupplier v-for="supplier of supplierReviews" :key="supplier.id" :supplier="supplier" />
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["supplierReviews"],
  data() {
    return {
      providers: [],
    };
  },
};
</script>

<style>
#container {
  display: flex;
  grid-gap: 10px;
  flex-wrap: wrap;
}
</style>