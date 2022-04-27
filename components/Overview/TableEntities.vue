<template>
  <v-card class="flex flex-row">
    <v-card-title style="text-transform: capitalize;"
      >{{type}} Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>

    <Container>
      <section class="w-full">
        <!-- list of providers -->
        <ListTable :headers="headers" :items="items" class="elevation-1" :hideFooter="true" />
      </section>
    </Container>
  </v-card>
</template>

<script>
import { parseTableHeaders } from "../../utils";
export default {
  props: ["type", "reviews"],
  data() {
    return {
      headers: [],
      items: [],
    };
  },
  methods: {
    async updateTable() {
      ({ headers: this.headers, items: this.items } = parseTableHeaders(
        ["number_of_reviews"],
        this.reviews
      ));
    },
  },
  watch: {
    reviews() {
      this.updateTable();
    },
  },
  async mounted() {
    this.updateTable();
  },
};
</script>

<style scoped>
</style>