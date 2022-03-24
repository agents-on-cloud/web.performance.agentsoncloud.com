<template>
  <v-card class="flex flex-row">
    <v-card-title
      >Providers Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>

    <Container>
      <section class="w-full">
        <!-- list of providers -->
        <!-- TODO: add more search tools -->
        <v-data-table
          :headers="headers"
          :items="providers"
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
import { parseProvidersTable } from "../../utils";

export default {
  props: ["providerReviews"],
  data() {
    return {
      headers: [],
      providers: [],
    };
  },
  methods: {
    updateTable() {
      ({ headers: this.headers, items: this.providers } = parseProvidersTable(
        this.providerReviews
      ));
    },
  },
  watch: {
    providerReviews() {
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