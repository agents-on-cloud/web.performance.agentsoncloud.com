<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    :options.sync="options"
    :server-items-length="itemsCount"
    :loading="loading"
    :hide-default-footer="hideFooter"
    :disable-sort="disableSort"
    :multi-sort="!disableSort"
  >
    <template #[`header.reviewerName`]="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
    <template #[`header.servicesUtility`]="{ header }">
      {{ header.text }} <br /><span class="text-gray-400">HH:MM:SS</span>
    </template>

    <template #[`item.reviewedName`]="{ item }">
      <MetricsName
        :name="item.reviewedName"
        :type="item.reviewedType"
        :id="item.reviewedId"
      />
    </template>
    <template #[`item.score`]="{ item }">
      <MetricsStars :value="item.score" />
    </template>
    <template #[`item.socialScore`]="{ item }">
      <MetricsStars :value="item.socialScore" />
    </template>
    <template #[`item.reviewedType`]="{ item }">
      <MetricsType :value="item.reviewedType" />
    </template>
    <template #[`item.timeUtility`]="{ item }">
      <MetricsTime :value="item.timeUtility" />
    </template>
    <template #[`item.servicesUtility`]="{ item }">
      <MetricsTime :value="item.servicesUtility" />
    </template>
    <template #[`item.returningCustomers`]="{ item }">
      <MetricsNumber :value="item.returningCustomers" />
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
      <MetricsDateTime :value="item.createdAt" />
    </template>
    <template #[`item.number_of_reviews`]="{ item }">
      <MetricsNumber :value="item.number_of_reviews" />
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ["headers", "items", "itemsCount", "loading", "hideFooter", "disableSort"],
  data() {
    return { options: {} };
  },

  watch: {
    async options() {
      this.$emit("trigger-update", this.options);
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
th:nth-child(1),
td:nth-child(1),
.fixed {
  padding-right: 20px;
  width: 150px;
  position: sticky;
  left: 0;
  top: auto;
  z-index: 1;
  border-bottom: thin solid rgba(255, 255, 255, 0.12);
}

th:nth-child(1),
td:nth-child(1) {
  background-color: #1e1e1e;
}

tr:hover td:nth-child(1) {
  background-color: #616161;
  border-top: thin solid rgba(255, 255, 255, 0.35) !important;
}

td {
  z-index: 0;
}
</style>