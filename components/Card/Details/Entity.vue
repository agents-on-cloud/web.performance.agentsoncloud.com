<template>
  <v-card id="entity-mini-card" class="px-10 py-5" elevation="10">
    <h2>{{ getEntityReviews.name }} - Review Details</h2>
    <h4 class="text-gray-400 font-light w-fit whitespace-nowrap">
      Type: <MetricsType class="inline-block" :value="getEntityReviews.type" />
    </h4>
    <section>
      <AnalyticsGraph :array="getEntityReviews.scores" />
    </section>
    <div class="flex justify-between">
      <h3 class="mt-5 whitespace-nowrap">Past Reviews List</h3>
      <FiltersDaysBefore class="flex-0" />
    </div>

    <Container v-if="getEntityReviews.all.rows.length > 0">
      <CardMiniReview
        class="w-80"
        v-for="review of getEntityReviews.all.rows"
        :key="review.id"
        :review="review"
        :hideTitle="true"
      />
    </Container>
    <v-pagination
      v-if="getEntityReviews.all.rows.length > 0"
      v-model="page"
      :length="Math.round(parseFloat(getEntityReviews.all.count / 4))"
      :total-visible="10"
    ></v-pagination>
    <h2 v-else class="text-center">No Records Found</h2>
    <slot></slot>
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
    ...mapGetters(["getEntityReviews", "getDaysBefore"]),
  },
  watch: {
    page(curr, prev) {
      const offset = (curr - 1) * 4;
      this.$store.dispatch("sortEntityReviews", { offset });
    },
    getDaysBefore() {
      this.$store.dispatch("getEntityReviews");
    },
  },
};
</script>

<style>
#entity-mini-card {
  border: 1px solid rgb(126, 126, 126);
}
</style>