<template>
  <v-card class="flex flex-row">
    <v-card-title
      >Providers Overview
      <v-btn icon @click="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>

    <v-container class="flex p-10 gap-5 justify-between">
      <section class="w-full">
        <!-- list of providers -->
        <!-- TODO: add search tools -->
        <v-data-table
          :headers="headers"
          :items="providers"
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
          <template #[`item.services`]="{ item }">
            {{
              (item.services && parseInt(item.services / 60 / 24) + " hours") ||
              "Inapplicable"
            }}
          </template>
          <template #[`item.sales`]="{ item }">
            {{ (item.sales && parseInt(item.sales) + " $") || "Inapplicable" }}
          </template>
        </v-data-table>
      </section>
    </v-container>
  </v-card>
</template>

<script>
import { parseProvidersTable } from "../../utils";

export default {
  props: ["providerReviews"],
  data() {
    return {
      headers: [
        {
          text: "Full Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Roles", sortable: false, align: "center", value: "roles" },
        { text: "Score (%)", sortable: false, align: "center", value: "score" },
        {
          text: "Behavioral Score (%)",
          sortable: false,
          align: "center",
          value: "behavioral",
        },
        {
          text: "Services (hours)",
          sortable: false,
          align: "center",
          value: "services",
        },
        {
          text: "Sales Contribution ($)",
          sortable: false,
          align: "center",
          value: "sales",
        },
      ],
      providers: [],
    };
  },
  watch: {
    providerReviews() {
      this.providers = parseProvidersTable(this.providerReviews);
    },
  },
  mounted() {
    this.providers = parseProvidersTable(this.providerReviews);
  },
};
</script>

<style scoped>
</style>