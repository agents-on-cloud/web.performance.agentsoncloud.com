<template>
  <v-card class="flex flex-row">
    <v-card-title
      >Consumer Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>

    <Container>
      <section class="w-full">
        <!-- list of providers -->
        <v-data-table
          :headers="headers"
          :items="consumers"
          :items-per-page="5"
          class="elevation-1"
          hide-default-footer
        >
          <template #[`header.stars`]>Behavioral (%)</template>
          <template #[`item.score`]="{ item }">
            <MetricsStars :value="item.score" />
          </template>
          <template #[`item.stars`]="{ item }">
            <MetricsStars :value="item.stars" />
          </template>
        </v-data-table>
      </section>
    </Container>
  </v-card>
</template>

<script>
import { parseConsumersTable } from "../../utils";
export default {
  props: ["consumerReviews"],
  data() {
    return {
      headers: [],
      consumers: [],
    };
  },
  methods: {
    updateTable() {
      ({ headers: this.headers, items: this.consumers } = parseConsumersTable(
        this.consumerReviews
      ));
    },
  },
  watch: {
    consumerReviews() {
      this.updateTable();
    },
  },
  mounted() {
    this.updateTable();
  },
};
</script>

<style scoped>
</style>