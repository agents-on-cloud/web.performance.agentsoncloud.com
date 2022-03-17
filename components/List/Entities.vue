<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    :options.sync="options"
    :server-items-length="itemsCount"
    :loading="loading"
  >
    <template #[`header.reviewerName`]="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
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
    <template v-if="type !== 'reviews'" #[`item.sales`]="{ item }">
      {{ (item.sales && parseInt(item.sales) + " $") || "Inapplicable" }}
    </template>
    <template #[`item.createdAt`]="{ item }">
      <span class="block min-w-max p-3">
        {{ item.createdAt.substr(0, 10) }}
      </span>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { parseEntitiesTable, parseReviewsTable } from "../../utils";

export default {
  props: ["type"],
  data() {
    return {
      headers: [],
      items: [],
      itemsCount: 10,
      loading: true,
      options: {},
    };
  },
  methods: {
    updateTable() {
      if (this.type !== "reviews") {
        ({ headers: this.headers, items: this.items } = parseEntitiesTable(
          this.getGroupedReviews,
          this.type
        ));
      } else {
        ({ headers: this.headers, items: this.items } = parseReviewsTable(
          this.getAllReviews
        ));
      }
    },
  },
  computed: {
    ...mapGetters([
      "getAllReviews",
      "getAllReviewsLength",
      "getGroupedReviews",
    ]),
  },
  mounted() {
    this.updateTable();
    this.itemsCount = this.getAllReviewsLength;
  },
  watch: {
    type(newVal, oldVal) {
      this.updateTable();
    },
    options: {
      async handler() {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;
        console.log(sortBy, sortDesc);
        this.loading = true;
        await this.$store.dispatch("getAllReviews", {
          limit: itemsPerPage,
          offset: itemsPerPage * (page - 1),
        });
        this.loading = false;
      },
      deep: true,
    },
    loading() {
      console.log(this.getAllReviews);
      if (!this.loading && this.getAllReviews.length > 0)
        return this.updateTable();
    },
  },
};
</script>

<style>
th,
td {
  white-space: nowrap;
}
</style>