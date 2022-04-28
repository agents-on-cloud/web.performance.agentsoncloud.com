<template>
  <v-card id="entity-mini-card" class="px-10 py-5" elevation="10">
    <div class="flex justify-between">
      <h2 class="capitalize">{{ type }} - List</h2>
      <FiltersDaysBefore class="flex-0" />
    </div>
    <ListTable
      :headers="headers"
      :items="items"
      :itemsCount="itemsCount"
      :loading="loading"
      @trigger-update="fetchUpdate"
    />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTableHeaders } from "../../utils";

export default {
  props: ["type"],
  data() {
    return {
      headers: [],
      items: [],
      itemsCount: 10,
      loading: false,
      options: {},
    };
  },
  methods: {
    async updateTable() {
      await this.$store.dispatch("getRequiredMetrics", {
        reviewedType: this.type,
      });

      const requiredKeys = await this.getRequiredMetrics(this.type);
      if (this.type !== "reviews") requiredKeys?.push("number_of_reviews");

      ({ headers: this.headers, items: this.items } = parseTableHeaders(
        requiredKeys,
        this.getAllReviews(this.type).rows
      ));

      this.itemsCount = this.getAllReviews(this.type).count;
      typeof this.itemsCount === "object" && (this.itemsCount = 0);
    },

    async fetchUpdate(options) {
      this.options = options;
      const { sortBy, sortDesc, page, itemsPerPage } = options;
      this.loading = true;
      await this.$store.dispatch("sortGroupedReviews", {
        type: this.type,
        limit: itemsPerPage,
        offset: itemsPerPage * (page - 1) || null,
        orderBy: sortBy,
        orderDesc: sortDesc,
      });
      this.updateTable();
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters(["getAllReviews", "getRequiredMetrics", "getDaysBefore"]),
  },
  mounted() {
    this.updateTable();
  },
  watch: {
    type() {
      this.options.page = 1;
      this.options.sortBy = [];
      this.options.sortDesc = ["false"];
      this.updateTable();
    },
    getDaysBefore() {
      this.updateTable();
    },
  },
};
</script>