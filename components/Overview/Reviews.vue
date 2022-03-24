<template>
  <v-card class="flex flex-row">
    <v-card-title
      >Reviews Needing Attention
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>

    <Container>
      <!-- TODO: add search tools -->
      <!-- list of critical reviews -->
      <CardMiniReview
        class="w-80"
        v-for="review of reviews"
        :key="review.id"
        :review="review"
      />
    </Container>
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