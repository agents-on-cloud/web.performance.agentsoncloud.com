<template>
  <v-card class="flex flex-row">
    <v-card-title
      >Consumer Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>

    <v-container class="flex p-10 gap-5 justify-between">
      <section class="w-full">
        <!-- list of providers -->
        <v-data-table
          :headers="headers"
          :items="consumers"
          :items-per-page="5"
          class="elevation-1"
          hide-default-footer
        >
          <template #[`item.behavioral`]="{ item }">
            <v-rating
              title="Durability"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              hover
              length="5"
              :value="item.behavioral / 20"
              half-increments
              readonly
              class="text-center"
            ></v-rating>
          </template>
          <template #[`item.payments`]="{ item }">
            {{
              (item.payments && parseInt(item.payments) + " $") ||
              "Inapplicable"
            }}
          </template>
        </v-data-table>
      </section>
    </v-container>
  </v-card>
</template>

<script>
import { parseConsumersTable } from "../../utils";
export default {
  props: ["consumerReviews"],
  data() {
    return {
      headers: [
        {
          text: "Full Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Score", align: "center", sortable: false, value: "score" },
        {
          text: "Behavioral Score",
          align: "center",
          sortable: false,
          value: "behavioral",
        },
        {
          text: "Payments Contribution",
          align: "center",
          sortable: false,
          value: "payments",
        },
        {
          text: "Recent Used Services",
          align: "center",
          sortable: false,
          value: "services",
        },
      ],
      consumers: [],
    };
  },
  watch: {
    consumerReviews() {
      this.consumers = parseConsumersTable(this.consumerReviews);
    },
  },
  mounted() {
    this.consumers = parseConsumersTable(this.consumerReviews);
  },
};
</script>

<style scoped>
</style>