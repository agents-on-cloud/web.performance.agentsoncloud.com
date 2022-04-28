<template>
  <v-card id="facility-mini-card" class="px-10 py-5" elevation="10">
    <Container>
      <CardMiniReview
        class="w-80"
        v-for="review of getEntityReviews.all.rows"
        :key="review.id"
        :review="review"
      />
    </Container>
    <v-pagination
      v-model="page"
      :length="Math.round(parseFloat(getEntityReviews.all.count / 8))"
      :total-visible="10"
    ></v-pagination>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["type", "id"],
  data: () => ({
    page: 1,
  }),
  computed: {
    ...mapGetters(["getEntityReviews"]),
  },
  mounted: function () {
    console.log(this.getEntityReviews.all.rows);
  },
  watch: {
    async page(curr, prev) {
      const offset = (curr - 1) * 8;
      await this.$store.dispatch("sortEntityReviews", { offset });
      console.log(this.getEntityReviews.all.rows);
      console.log(curr + " page");
    },
  },
};
</script>

<style>
#facility-mini-card {
  border: 1px solid rgb(126, 126, 126);
}
</style>