<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    :options.sync="options"
    :server-items-length="itemsCount"
    :loading="loading"
    multi-sort
  >
    <template #[`header.reviewerName`]="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
    <template #[`header.servicesUtility`]="{ header }">
      {{ header.text }} <br /><span class="text-gray-400">HH:MM:SS</span>
    </template>
    <template #[`item.score`]="{ item }">
      <MetricsStars :value="item.score" />
    </template>
    <template #[`item.stars`]="{ item }">
      <MetricsStars :value="item.stars" />
    </template>
    <template #[`item.providerType`]="{ item }">
      <MetricsRoles :value="item.providerType" />
    </template>
    <template #[`item.timeUtility`]="{ item }">
      <MetricsTime :value="item.timeUtility" />
    </template>
    <template #[`item.servicesUtility`]="{ item }">
      <MetricsTime :value="item.servicesUtility" />
    </template>
    <template #[`item.responseTime`]="{ item }">
      <MetricsTime :value="item.responseTime" />
    </template>
    <template #[`item.payments`]="{ item }">
      <MetricsCash :mini="true" :value="item.payments" />
    </template>
    <template #[`item.sales`]="{ item }">
      <MetricsCash :mini="true" :value="item.sales" />
    </template>
    <template #[`item.profit`]="{ item }">
      <MetricsCash :mini="true" :value="item.profit" />
    </template>
    <template #[`item.bookings`]="{ item }">
      <MetricsNumber :mini="true" :value="item.bookings" />
    </template>
    <template #[`item.createdAt`]="{ item }">
      <MetricsCreatedAt :createdAt="item.createdAt" />
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { parseEntitiesTable, parseReviewsTable } from "../../utils";

export default {
  props: ["type", "toggleUpdate"],
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
      ({ headers: this.headers, items: this.items } = (
        this.type === "reviews" ? parseReviewsTable : parseEntitiesTable
      )(this.getAllReviews(this.type).rows, this.type));

      this.itemsCount = this.getAllReviews(this.type).count;
      typeof this.itemsCount === "object" && (this.itemsCount = 0);
    },

    async fetchUpdate(sortBy, sortDesc, page, itemsPerPage) {
      await this.$store.dispatch("sortReviews", {
        type: this.type,
        limit: itemsPerPage,
        offset: itemsPerPage * (page - 1) || null,
        orderBy: sortBy,
        orderDesc: sortDesc,
      });
    },
  },
  computed: {
    ...mapGetters(["getAllReviews"]),
  },
  mounted() {
    this.updateTable();
  },
  watch: {
    toggleUpdate() {
      this.options.page = 1;
      this.updateTable();
    },
    async options() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      this.loading = true;
      await this.fetchUpdate(sortBy, sortDesc, page, itemsPerPage);
      this.updateTable();
      this.loading = false;
    },
  },
};
</script>

<style>
th,
td {
  white-space: nowrap;
}

.v-data-table {
  max-width: 1280px;
}
</style>

<style>
th:nth-child(2),
td:nth-child(2),
.fixed {
  padding-right: 20px;
  width: 150px;
  position: sticky;
  left: 0;
  top: auto;
  z-index: 1;
  border-bottom: thin solid rgba(255, 255, 255, 0.12);
}

th:nth-child(2),
td:nth-child(2) {
  background-color: #1e1e1e;
}

tr:hover td:nth-child(2) {
  background-color: #616161;
  border-top: thin solid rgba(255, 255, 255, 0.35) !important;
}

td {
  z-index: 0;
}
</style>