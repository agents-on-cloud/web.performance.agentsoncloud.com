<template>
  <ListTable
    :headers="headers"
    :items="items"
    :itemsCount="itemsCount"
    :loading="loading"
    @trigger-update="fetchUpdate"
  />
</template>

<script>
import { mapGetters } from "vuex";
import { parseTableData } from "../../utils";

export default {
  props: ["type", "requiredKeys"],
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
    updateTable() {
      ({ headers: this.headers, items: this.items } = parseTableData(
        this.requiredKeys,
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
    ...mapGetters(["getAllReviews"]),
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
  },
};
</script>