<template>
  <v-card class="flex flex-row">
    <v-card-title
      >Suppliers Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>
    <Container>
      <!-- list of suppliers -->
      <CardMiniSupplier
        v-for="supplier of supplierReviews"
        :key="supplier.id"
        :supplier="supplier"
      />
    </Container>
  </v-card>
</template>

<script>
export default {
  props: ["supplierReviews"],
};
</script>

<style>
#container {
  display: flex;
  grid-gap: 10px;
  flex-wrap: wrap;
}
</style>