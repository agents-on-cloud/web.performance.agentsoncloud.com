<template>
  <v-card class="flex flex-row">
    <v-card-title
      >Reviews Needing Attention
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>

    <v-container class="flex p-10 gap-5 justify-between">
      <section class="w-full">
        <!-- list of providers -->
        <!-- TODO: add search tools -->
        <!-- list of critical reviews -->
        <h3 class="text-center mb-5"></h3>
        <v-container id="container">
          <CardMiniReview
            class="w-80"
            v-for="review of reviews"
            :key="review.id"
            :review="review"
          />
        </v-container>
      </section>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["reviews"],
};
</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
}
</style>